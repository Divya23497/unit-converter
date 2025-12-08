import { Request, Response } from "express";

import MeasurementType from "../models/measurementTypeModel";
import Unit from "../models/unitModel";


export const convertController =async (req: Request, res: Response) => {
  const { type, from, to, value } = req.query;

  const numValue = Number(value);

  try {

    const mType =await MeasurementType.findOne({ name: type });
    if (!mType) return res.status(404).json({ message: "Measurement type not found" });


    const unitFrom =await Unit.findOne({ unitName: from, measurementTypeId: mType._id });
    const unitTo =await Unit.findOne({ unitName: to, measurementTypeId: mType._id });

    if (!unitFrom || !unitTo) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const valueInBase = numValue * Number(unitFrom.conv);
     
    const result =valueInBase / Number(unitTo.conv);

   
        res.json({ result });

  }
  catch(err){
    res.status(500).json({ error: err.message});
  }
};
