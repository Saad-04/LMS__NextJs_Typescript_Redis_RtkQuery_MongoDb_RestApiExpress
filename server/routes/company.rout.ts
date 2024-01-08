

import express from "express";

import { authorizedRole, isAuthenticated } from "../middleware/auth";
import { createCompanyName, getCompanyName, updateCompanyName } from "../controllers/companyName.controller";




const companyNameRouter = express.Router();

companyNameRouter
  .route("/companyName")
  .post(isAuthenticated, authorizedRole("admin"), createCompanyName);
companyNameRouter
  .route("/getCompanyName")
  .get(getCompanyName);
companyNameRouter
  .route("/updateCompanyName/:id")
  .put(isAuthenticated, authorizedRole("admin"), updateCompanyName);


export default companyNameRouter;

