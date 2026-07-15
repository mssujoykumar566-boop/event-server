import { Request, Response } from "express";
import { Registration } from "../models/registration.model.js";
import Event from "../models/event.model.js";

export const joinEvent = async (req: Request, res: Response) => {
  try {
   const eventId = String(req.params.id);

    const userId = req.user?.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,

        message: "Event not found",
      });
    }

    const alreadyJoined = await Registration.findOne({
      event: eventId,

      user: userId,
    });

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,

        message: "Already joined this event",
      });
    }

    const registration = await Registration.create({
      event: eventId, 

      user: userId,
    });

    res.status(201).json({
      success: true,

      message: "Event joined successfully",

      data: registration,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Failed to join event",
    });
  }
};

export const getMyJoinedEvents = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const registrations = await Registration.find({
      user: userId,
    }).populate("event");

    res.status(200).json({
      success: true,

      data: registrations,
    });
  } catch (error: any) {
    console.log("GET JOINED EVENTS ERROR:", error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch joined events",
    });
  }
};
