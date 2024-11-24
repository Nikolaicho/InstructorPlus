import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from "./routers/auth.router";
import adminRouter from "./routers/admin.router"
import userRouter from "./routers/user.router";
import documentsRouter from "./routers/documents.router"
import classesRouter from "./routers/classes.router"
import superAdminRouter from "./routers/superAdmin.router"
dotenv.config();

const app = express();

mongoose.connect("mongodb+srv://chess:Niki2006@cluster0.unabrut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
  catch(error => console.log(error))

app.use(cors({ origin: "http://localhost:3000",credentials:true}));
app.use(express.json());

// post, get, delete, patch, put
app.use(authRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(documentsRouter);
app.use(classesRouter);
app.use(superAdminRouter)

// MVC
// client -> WAN -> server -> router ( handles endpoint ) -> middleware (prepare requests ) -> controller ( handles requests ) -> view ( formats reponse ) 


app.listen(process.env.PORT, () => {
  console.log("Server is on");
})