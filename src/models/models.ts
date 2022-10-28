const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * FileSystemSchema
 */
const FileSystemSchema = new Schema(
  {
    fileId: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "FileSystem" }
);

/**
 * FileSystemSchema
 * @param fileId
 * @param createdAt
 * @param updatedAt
 */
export const FileSystemModel = mongoose.model("FileSystem", FileSystemSchema);
