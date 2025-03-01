import { Candidate } from "../interfaces/candidates.interface";
import express from "express";
import User, { userType } from "../models/user.models";
import { getCookie } from "../utils/auth.utils";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import parseQueryParams from "../utils/query.utils";
import { ClassDates } from "../interfaces/classDates.interface";
import { checkIfDateIsValid, getAllClasses } from "../utils/classes.utils";
import {
  getCorporationFromCookie,
  getIdFromCookie,
} from "../utils/token.utils";
import { format } from "date-fns";

const getCandidates = async (req: express.Request, res: express.Response) => {
  //extracts all of the information that is needed for the candidates to display properly
  let info: Candidate[] = [];
  let corp = getCorporationFromCookie(req, res);
  const allCandidates = await User.find({
    role: "user",
    organization: corp,
  }).lean();

  for (let i = 0; i < allCandidates.length; i++) {
    info.push({
      firstName: allCandidates[i].firstName,
      surname: allCandidates[i].surname,
      lastName: allCandidates[i].lastName,
      _id: allCandidates[i]._id.toString(),
    });
  }
  res.send(info);
};

const signNewClass = async (req: express.Request, res: express.Response) => {
  //id - userId

  const { id, date, hours, minutes, longHour } = req.body;

  if (
    id == undefined ||
    date == undefined ||
    hours == undefined ||
    hours == null ||
    minutes == undefined ||
    longHour == undefined
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Невалидни данни за часа" });
    return;
  }

  let idInstructor = getIdFromCookie(req, res);

  //checks if the date for the lesson is valid
  if (
    (await checkIfDateIsValid(
      idInstructor,
      id,
      date,
      hours,
      minutes,
      longHour
    )) == false
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Невалиден час" });
    return;
  }

  //getting the time for the start of the lesson
  let addingHoursAndMinutes =
    new Date(date).getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000;
  let startDate = new Date(addingHoursAndMinutes);

  //adding the duration of the lesson (either 50 mins or 100 mins)
  addingHoursAndMinutes += parseInt(longHour) * 60 * 1000;
  let finalDate = new Date(addingHoursAndMinutes);

  //TODO има разлика във времевите зони сървър-utc фронтенд- utc+2

  //pushing the start of the lesson and the end of it to the instructor and user in the database
  await User.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        dates: {
          startDate: startDate,
          name: idInstructor,
          finalDate: finalDate,
        },
      },
    }
  );

  await User.findOneAndUpdate(
    { _id: idInstructor },
    {
      $push: {
        dates: { startDate: startDate, name: id, finalDate: finalDate },
      },
    }
  );

  res.status(StatusCodes.OK).send("Class signed successfully");
  return;
};

const getAllClassesEndPoint = async (
  req: express.Request,
  res: express.Response
) => {
  let token = getCookie("access", req, res);

  let { id } = jwt.decode(token);

  let formatedData = [];
  let dates = await getAllClasses(req.body.searchedDate, id, 1);

  //this function is used because async functions cant be used in map or at least this is what i think :D
  async function getFirstAndLastNames() {
    let names = [];
    for (let i = 0; i < dates.length; i++) {
      let user = await User.findById(dates[i].name);
      names.push({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    return names;
  }

  let names;
  names = await getFirstAndLastNames();

  dates.map((date: any, index: number) => {
    formatedData.push({
      start: format(date.startDate, "HH:mm"),
      end: format(date.finalDate, "HH:mm"),
      firstName: names[index].firstName,
      lastName: names[index].lastName,
      class_id: date._id,
    });
  });

  res.send(formatedData);
};

const searchCandidates = async (
  req: express.Request,
  res: express.Response
) => {
  const { name } = req.body;

  if (name == undefined || name == null) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Невалидно търсене" });
    return;
  }

  //splits given names to determine how many are they
  let names = name.split(" ");

  let candidates;
  //Array that holds candidates that are ready to be displayed in the frontend
  let formatedCandidates: Candidate[] = [];

  //making the first letter of the names given capital and the other lowercase so the input of the user is not case sensitive
  for (let i = 0; i < names.length; i++) {
    let lowerCaseName = names[i].toLowerCase();
    names[i] = lowerCaseName[0].toUpperCase() + lowerCaseName.slice(1);
  }

  //depending on the number of names there is search for the full name or partial
  if (names.length == 3) {
    candidates = await User.find({
      firstName: names[0],
      surname: names[1],
      lastName: names[2],
    });
  } else if (names.length == 2) {
    candidates = await User.find({ firstName: names[0], lastName: names[1] });
  } else if (names.length == 1) {
    candidates = await User.find({ firstName: names[0] });
  }

  //getting the info that is needed for the frontend
  for (let i = 0; i < candidates.length; i++) {
    formatedCandidates.push({
      firstName: candidates[i].firstName,
      lastName: candidates[i].lastName,
      surname: candidates[i].surname,
      _id: candidates[i]._id,
    });
  }

  res.send(formatedCandidates);
};

const timeLeft = async (req: express.Request, res: express.Response) => {
  let fullWorkDay = 500 * 60 * 1000; //500 minutes in miliseconds (10 learning hours)

  let params = parseQueryParams(req.originalUrl);

  if (params == undefined) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Невалидна заявка" });
    return;
  }

  let searchedDate = parseInt(params.searchedDate);
  let cookie = getCookie("access", req, res);
  let id = jwt.decode(cookie).id;

  let dates: ClassDates[] = await getAllClasses(searchedDate, id, 1);
  dates.map((date) => {
    fullWorkDay -= date.finalDate.getTime() - date.startDate.getTime();
  });

  res.send({ workTimeLeft: fullWorkDay });
};

const deleteClass = async (req: express.Request, res: express.Response) => {
  let userId = getIdFromCookie(req, res);
  const { classId } = req.body;
  let user = await User.findOne({ _id: userId });
  let dates = user.dates;

  dates.map((date: any, index: number) => {
    if (date._id.toString() == classId) {
      dates.splice(index, 1);
    }
  });
  user.dates = dates;
  user.save();
};

const getAllClassesUser = async (
  req: express.Request,
  res: express.Response
) => {
  let params = parseQueryParams(req.originalUrl);
  let result = (await User.findById({ _id: params.id })).dates;
  let dates = [];

  for (let i = 0; i < result.length; i++) {
    let date = result[i];
    let instructor = await User.findById({ _id: date.name });
    dates.push({
      start: format(date.startDate, "HH:mm"),
      end: format(date.finalDate, "HH:mm dd.MM.yyyy"),

      firstNameInstructor: instructor?.firstName || "СИМО",
      lastNameInstructor: instructor?.lastName || "СИМО",
    });
  }

  res.send(dates);
};

export default {
  getCandidates,
  signNewClass,
  getAllClassesEndPoint,
  searchCandidates,
  timeLeft,
  deleteClass,
  getAllClassesUser,
};
