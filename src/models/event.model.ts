import { Schema, model } from "mongoose";
import { IEvent } from "../interfaces/event.interface.js";


const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
  type: String,
  required: true,
},
  },
  
  {
    timestamps: true,
  }
);

const Event = model<IEvent>("Event", eventSchema);

export default Event;