import { Document } from "mongoose";

export interface IEvent extends Document {
  title: string;

  shortDescription: string;

  description: string;

  category: string;

  location: string;

  date: Date;

  price: number;

  image: string;

  organizer: string;

  featured: boolean;

  createdAt: Date;

  updatedAt: Date;
}