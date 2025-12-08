import mongoose from "mongoose";

const measurementTypeSchema = new mongoose.Schema(
    {
        name:{ type: String, required: true, unique: true }
    },
    { timestamps: true}
);

export default mongoose.model("MeasurementType", measurementTypeSchema);