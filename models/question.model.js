import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true }
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
