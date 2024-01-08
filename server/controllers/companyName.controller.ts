import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import CompanyNameModel from "../models/company.model";
import ErrorHandler from "../utils/errorHandler";

export const createCompanyName = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { companyName } = req.body;

      const name = await CompanyNameModel.create({ companyName });

      res.status(201).json({
        success: true,
        name,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
export const getCompanyName = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const company = await CompanyNameModel.find();

      res.status(200).json({
        success: true,
        company: company[0],
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
interface NewName {
  newName: string,
}
export const updateCompanyName = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { newName } = req.body as NewName
      const id = req.params.id
      const updatedCompany = await CompanyNameModel.findByIdAndUpdate(id, { companyName: newName },
        { new: true })
      // 
      const company = await CompanyNameModel.find()

      res.status(200).json({
        success: true,
        company: company[0],
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);