import Event from "../models/event.model.js";

export const createEventService = async (payload: any) => {
  return await Event.create(payload);
};


export const getAllEventsService = async (query: any) => {

  const {
    search,
    category,
    location,
    sort,
    page = 1,
    limit = 8,
  } = query;


  const filter: any = {};


  // Search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }


  // Category Filter
  if (category) {
    filter.category = category;
  }


  // Location Filter
  if (location) {
    filter.location = location;
  }


  // Sorting
  let sortOption: any = {
    createdAt: -1,
  };


  if (sort === "price_asc") {
    sortOption = {
      price: 1,
    };
  }


  if (sort === "price_desc") {
    sortOption = {
      price: -1,
    };
  }


  if (sort === "oldest") {
    sortOption = {
      createdAt: 1,
    };
  }


  const skip = (Number(page) - 1) * Number(limit);


  const events = await Event.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));


  const total = await Event.countDocuments(filter);


  return {
    events,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getSingleEventService = async (id: string) => {
  return await Event.findById(id);
};

export const updateEventService = async (
  id: string,
  payload: any
) => {
  return await Event.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

export const deleteEventService = async (id: string) => {
  return await Event.findByIdAndDelete(id);
};