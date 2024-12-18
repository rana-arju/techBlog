import { Types } from "mongoose";

export type IBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean
};