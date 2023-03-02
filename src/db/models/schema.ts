import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema({
  identifier: { type: String, unique: true },
  title: { type: String },
  url: { type: String, required: true },
  category: { type: String },
  bookmarked: { type: Boolean, default: false },
  time: { type: String, default: Date.now() },
  categories: { type: [String] },
});

const Link = models.Link || model("Link", LinkSchema);

export default Link;
