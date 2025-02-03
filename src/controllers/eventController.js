import { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent, filterEvents } from "../services/eventService.js";

export const addEvent = async (req, res) => {
  try {
    const { name, description, date, time, location, creator, attendees, imageUrl } = req.body;
    const event = await createEvent(name, description, date, time, location, creator, attendees, imageUrl);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await getEventById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedEvent = await updateEvent(id, updateData);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEvent(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterEvent = async (req, res) => {
  try {
    const filter = req.query;
    const events = await filterEvents(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByAttendee = async (req, res) => {
  try {
    const { attendeeId } = req.query;
    const events = await filterEvents({ attendeeId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los eventos', error });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    res.status(200).json({ message: 'Asistencia confirmada', event });
  } catch (error) {
    res.status(500).json({ message: 'Error al confirmar asistencia', error });
  }
};