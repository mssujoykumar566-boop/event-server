import { Request, Response } from "express";
import { db } from "../lib/mongodb.js";
import Event from "../models/event.model.js";
import { ObjectId } from "mongodb";
import User from "../models/User.js";
import { Registration } from "../models/registration.model.js";
// import { db } from ".";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.collection("user").find().toArray();

    res.status(200).json({
      success: true,

      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Failed to fetch users",
    });
  }
};



export const getAllEvents = async(
 req: Request,
 res: Response
)=>{


try{


const events = await Event
.find()
.sort({
 createdAt:-1
});



res.status(200).json({

success:true,

events

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to fetch events"

});


}


};



export const adminDeleteEvent = async (
  req: Request,
  res: Response
) => {

  try {


    const event = await Event.findById(
      req.params.id
    );


    if(!event){

      return res.status(404).json({

        success:false,
        message:"Event not found"

      });

    }



    await event.deleteOne();



    res.status(200).json({

      success:true,
      message:"Event deleted successfully"

    });



  } catch(error){


    console.log(error);


    res.status(500).json({

      success:false,
      message:"Failed to delete event"

    });


  }

};



export const deleteUser = async(
  req: Request,
  res: Response
)=>{


try{


const result = await db
.collection("user")
.deleteOne({
 _id: new ObjectId(String(req.params.id))
});



if(result.deletedCount === 0){

return res.status(404).json({

success:false,
message:"User not found"

});

}



res.json({

success:true,
message:"User deleted successfully"

});



}catch(error){


console.log(error);


res.status(500).json({

success:false,
message:"Failed to delete user"

});


}


};

export const updateUserRole = async (
 req: Request,
 res: Response
)=>{

try{

const {role}=req.body;


const user = await User.findByIdAndUpdate(
 req.params.id,
 {
  role
 },
 {
  new:true
 }
);


res.json({
 success:true,
 user
});


}catch(error){

res.status(500).json({
 success:false,
 message:"Failed to update role"
});

}

};

export const getReports = async(
 req:Request,
 res:Response
)=>{

try{


const totalUsers =
await db.collection("user").countDocuments();


const totalEvents = await Event.countDocuments();


const totalRegistrations =
await Registration.countDocuments();



const totalOrganizers =
await db.collection("user")
.countDocuments({
 role:"organizer"
});



res.status(200).json({

success:true,

data:{
 totalUsers,
 totalEvents,
 totalRegistrations,
 totalOrganizers
}

});



}catch(error){


res.status(500).json({

success:false,

message:"Failed to generate reports"

});


}

};
