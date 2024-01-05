import mongoose, { Schema, model, Document, Model } from "mongoose";

interface CompanyName extends Document {
  companyName: string
}


export const companyName = new Schema<CompanyName>({
  companyName: String
});



const CompanyNameModel: Model<CompanyName> = mongoose.model("CompanyName", companyName);

export default CompanyNameModel;
