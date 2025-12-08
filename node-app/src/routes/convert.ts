import { Router } from "express";
import { convertController } from "../controllers/convertController";
import { addUnit } from "../controllers/unitController";
import { get_units_bymid } from "../controllers/unitController";
import { save_measurement } from "../controllers/measurementController";
import { getMeasurementType } from "../controllers/measurementController";
import { update_measurement_type } from "../controllers/measurementController";
import { delete_measurement_type } from "../controllers/measurementController";

import { getUnits } from "../controllers/unitController";


const router = Router();

router.get("/convert", convertController);
router.post("/save", addUnit);
router.post("/measurement_save", save_measurement);

router.get("/get_measurement_types", getMeasurementType);
router.get("/get_units_bymid", get_units_bymid);
router.put("/update_measurement_type/:id",update_measurement_type);
router.delete("/delete_measurement_type/:id",delete_measurement_type);

router.get("/get_unit_details", getUnits);

export default router;
