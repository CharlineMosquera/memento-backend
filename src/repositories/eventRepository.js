import EventModel from "../models/event.js";

export const findEventById = async (id) => {
  return await EventModel.findById(id).populate('creator attendees');
};

export const findAllEvents = async () => {
  return await EventModel.find().populate('creator attendees');
};

export const saveEvent = async (event) => {
  return await event.save();
};

export const updateEventById = async (id, updateData) => {
  return await EventModel.findByIdAndUpdate(id, updateData, { new: true }).populate('creator attendees');
};

export const deleteEventById = async (id) => {
  return await EventModel.findByIdAndDelete(id);
};

export const findEventsByFilter = async (filter) => {
  const query = {};

  if (filter.date) {
    query.date = new Date(filter.date);
  }

  if (filter.location) {
    query.location = filter.location;
  }

  if (filter.creator) {
    query.creator = filter.creator;
  }

  if (filter.attendeeId) {
    query.attendees = filter.attendeeId;
  }

  return await EventModel.find(query).populate('creator attendees');
};