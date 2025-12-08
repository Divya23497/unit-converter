import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unitName: { type: String, required: true },
    conv: { type: Number, required:true},
    measurementTypeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "MeasurementType",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Unit", unitSchema);
