import { Request, Response } from "express";
import {
  createEventService,
  getAllEventsService,
  getSingleEventService,
  updateEventService,
  deleteEventService,
} from "../services/event.service.js";
import Event from "../models/event.model.js";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  try {
    console.log("USER:", req.user);

    const event = await Event.create({

  ...req.body,

  createdBy: req.user?.id,

});

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch(error:any){

 console.log("CREATE EVENT ERROR:", error);


 res.status(500).json({
   success:false,
   message:"Failed to create event",
   error:error.message,
 });

}
};

// Get All Events
export const getEvents = async (
 req: Request,
 res: Response
) => {

try {


const {
 search,
 category,
 location,
 sort,
 page = 1,
 limit = 8
} = req.query;



const filter:any = {};



// Search

if(search){

filter.title = {
 $regex: search,
 $options:"i"
};

}



// Category filter

if(category){

filter.category = category;

}



// Location filter

if(location){

filter.location = location;

}




let query = Event.find(filter);



// Sorting

if(sort === "price-low"){

query = query.sort({
 price:1
});

}

else if(sort === "price-high"){

query=query.sort({
 price:-1
});

}

else{

query=query.sort({
 createdAt:-1
});

}




const skip =
(Number(page)-1)
*
Number(limit);



const events =
await query
.skip(skip)
.limit(Number(limit));



const total =
await Event.countDocuments(filter);



res.status(200).json({

success:true,

events,

pagination:{
 total,
 page:Number(page),
 totalPages:Math.ceil(total / Number(limit))
}

});



}catch(error){

res.status(500).json({

success:false,
message:"Failed to fetch events"

});

}

};

// Get Single Event
export const getSingleEvent = async (
  req: Request,
  res: Response
) => {

  try {


    const event = await getSingleEventService(
      String(req.params.id)
    );


    if (!event) {

      return res.status(404).json({

        success:false,

        message:"Event not found"

      });

    }



    res.status(200).json({

      success:true,

      data:event

    });



  } catch(error:any) {


    console.log(
      "GET SINGLE EVENT ERROR:",
      error
    );


    res.status(500).json({

      success:false,

      message:"Failed to fetch event"

    });


  }

};

// Update Event
export const updateEvent = async (
  req: Request,
  res: Response
) => {

  try {

   const event = await Event.findOneAndUpdate(
  {
    _id: req.params.id,
    createdBy: req.user?.id
  },
  req.body,
  {
    returnDocument: "after",
    runValidators: true
  }
);


    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized"
      });
    }


    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event
    });


  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update event"
    });

  }

};

// Delete Event
export const deleteEvent = async (
  req: Request,
  res: Response
) => {

  try {

    const event = await Event.findOne({
      _id: req.params.id,
      createdBy: req.user?.id
    });


    if (!event) {
      return res.status(404).json({
        success:false,
        message:"Event not found"
      });
    }


    await event.deleteOne();


    res.json({
      success:true,
      message:"Event deleted successfully"
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to delete event"
    });

  }

};

 export const getMyEvents = async (
 req:Request,
 res:Response
)=>{

 try{
console.log("getMyEvents loaded");
console.log("USER:", req.user);
  const events = await Event.find({
    createdBy:req.user?.id
  });


  res.json({
    success:true,
    events
  });


 }catch(error){

  res.status(500).json({
    success:false,
    message:"Failed to fetch my events"
  });

}

};

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {

  try {

    const userId = req.user?.id;


    const events = await Event.find({
      createdBy: userId
    });



    const totalEvents = events.length;



    const upcomingEvents = events.filter(
      (event) =>
        new Date(event.date) > new Date()
    ).length;



    const revenue = events.reduce(
      (total, event) =>
        total + event.price,
      0
    );



    res.json({

      success:true,

      stats:{
        totalEvents,
        upcomingEvents,
        revenue
      }

    });



  } catch(error:any){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};

