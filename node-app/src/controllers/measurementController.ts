import { Request, Response } from "express";
import MeasurementType from "../models/measurementTypeModel";

export const save_measurement = async(req: Request, res:Response) =>{

    try{
        const name  = req.body.measurement_type;

        console.log(req.body.measurement_type);
        if(!name) return res.status(400).json({error:"Name Required"});

        const exists = await MeasurementType.findOne({name});

        if(exists) return res.status(400).json({ error:"Type Already exists"});

        const newType= await MeasurementType.create({ name });

        res.json(newType);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Server Error"});
    }

};

export const getMeasurementType = async (req: Request, res: Response) =>{
    const types=await MeasurementType.find();
    res.json(types);
};

export const update_measurement_type =async (req: Request, res:Response) =>{
    try{
        const {name}= req.body;

        const updated= await MeasurementType.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true}
        );

        if(!updated){
            return res.status(400).json({message : "Measurement Type Not Found"});
        }
        res.json({ message : "Measurement Type Updated Successfully"});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};

export const delete_measurement_type =async (req: Request, res:Response) =>{
    try{
        

        const deleted= await MeasurementType.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.status(400).json({message : "Measurement Type Not Found"});
        }
        res.json({ message : "Measurement Type Deleted"});
    }
    catch(err){
        res.status(500).json({message: err});
    }
};