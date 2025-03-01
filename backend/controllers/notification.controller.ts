import express from "express";
import Document from "../models/document.model";
import { StatusCodes } from "http-status-codes";
import {
  getCorporationFromCookie,
  getRoleFromCookie,
  getIdFromCookie,
} from "../utils/token.utils";
import User from "../models/user.models";
import { getAllClasses, getAllExam } from "../utils/classes.utils";

const getNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  //getting notifications that are due within 1 month
  let organization = getCorporationFromCookie(req, res);
  let role = getRoleFromCookie(req, res);
  let _id = getIdFromCookie(req, res);

  let todaysDate = new Date();
  let oneMonthLater = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth() + 1,
    todaysDate.getDate(),
    0
  );

  if (role == "user") {
    await getAllClasses(todaysDate.getTime(), _id, 365);
  } else if (role == "superAdmin") {
    const pipeLine = [
      {
        $match: {
          date: {
            $lte: oneMonthLater,
          },
          organization: organization,
        },
      },
    ];
    const response = await Document.aggregate(pipeLine);
    res.status(StatusCodes.OK).send(response);
  }
};

export default { getNotifications };
