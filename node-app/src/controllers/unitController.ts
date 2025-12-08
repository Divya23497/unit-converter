import { Request, Response } from "express";
import Unit from "../models/unitModel";
import MeasurementType from "../models/measurementTypeModel";

export const addUnit = async (req: Request, res: Response) => {
  try {

    // res.json(req.body);
      const data= req.body;

          const savedUnits = [];

      for (const item of data){
        if(!item.measurement_type || !item.unit_name || !item.conversion){
          return res.status(400).json({ error: "All fields required" });
        }

         let measurementType_details = await MeasurementType.findOne({ name: item.measurement_type });

          console.log(measurementType_details);
        
         if(!measurementType_details){
           measurementType_details= await MeasurementType.create({ name: item.measurement_type });
         }
        
          let measurementTypeId = measurementType_details._id;

          const exists = await Unit.findOne({ unitName: item.unit_name, measurementTypeId });
          if (exists)
            return res.status(400).json({ error: "Unit already exists" });

          const mewUnit = await Unit.create({ unitName: item.unit_name,conv:item.conversion, measurementTypeId });

          savedUnits.push(mewUnit);

      }

    return res.json({
      message:"Units Saved Successfully",
      units: savedUnits,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUnits = async (req: Request, res: Response) => {
  const units = await Unit.find().populate("measurementTypeId", "name");
  res.json(units);
};
export const get_units_bymid = async (req: Request, res: Response) => {

  const measurementTypeName=req.query.measurement_type_id;
 
const measurementType = await MeasurementType.findOne({ name: measurementTypeName });

if (!measurementType) {
  return res.status(404).json({ message: "Measurement type not found" });
}

// Step 2: Use its ID to find units
const units = await Unit.find({ measurementTypeId: measurementType._id });   res.json(units);
};
