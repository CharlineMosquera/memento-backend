import { model, Schema } from "mongoose";

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }], // Usuarios que asistirán
  createdAt: { type: Date, default: Date.now }
});

const EventModel = model("Event", eventSchema);

export default EventModel;
