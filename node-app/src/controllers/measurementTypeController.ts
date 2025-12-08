import { Request, Response } from "express";
import MeasurementType from "../models/measurementTypeModel";

export const addMeasurementType = async(req: Request, res:Response) =>{

    try{
        const {name}= req.body;

        if(!name) return res.status(400).json({error:"Name Required"});

        const exists = await MeasurementType.findOne({name});

        if(exists) return res.status(400).json({ error:"Type Already exists"});

        const newType= await MeasurementType.create({ name });

        res.json(newType);
    }
    catch(err){
        res.status(500).json({ error: "Server Error"});
    }

};

export const getMeasurementType = async (req: Request, res: Response) =>{
    const types=await MeasurementType.find();
    res.json(types);
};