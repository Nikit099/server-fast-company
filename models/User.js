const { model, Schema } = require("mongoose")

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    completedMeetings: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profession: {
      type: Schema.Types.ObjectId,
      ref: "Profession",
    },
    qualities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quality",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model("User", schema)
