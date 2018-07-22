const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFolderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  folder_id: { type: Schema.Types.ObjectId, ref: "Folder", required: true },
  read_access: { type: Boolean, default: true},
  update_access: { type: Boolean, default: false}
});

const UserFolder = mongoose.model("UserFolder", userFolderSchema);

module.exports = UserFolder;