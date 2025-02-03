import { findEventById, findAllEvents, saveEvent, updateEventById, deleteEventById, findEventsByFilter } from "../repositories/eventRepository.js";
import EventModel from "../models/event.js";

export const createEvent = async (name, description, date, time, location, creator, attendees, imageUrl) => {
  const newEvent = new EventModel({
    name,
    description,
    date,
    time,
    location,
    creator,
    attendees,
    imageUrl
  });

  return await saveEvent(newEvent);
};

export const getEventById = async (id) => {
  return await findEventById(id);
};

export const getAllEvents = async () => {
  return await findAllEvents();
};

export const updateEvent = async (id, updateData) => {
  return await updateEventById(id, updateData);
};

export const deleteEvent = async (id) => {
  return await deleteEventById(id);
};

export const filterEvents = async (filter) => {
  return await findEventsByFilter(filter);
};