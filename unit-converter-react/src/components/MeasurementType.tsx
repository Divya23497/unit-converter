import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface TableItem {
    measurement_type: string;
    unit_name: string;
    conversion: number | "";
}

const MeasurementType: React.FC = () => {

    const [measurement_type, setMeasurementType] = useState("");
    const [measurement_select, setMeasurementSelect] = useState([]);
    const [unit_name, setUnit] = useState("");
    const [conversion, setConversion] = useState<number>(0);
    const [showTable, setShowTable] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [error, setError] = useState("");
    const [items, setItems] = useState<TableItem[]>([]);


    useEffect(() => {
        axios
            .get("http://localhost:5000/get_measurement_types")
            .then((res) => setMeasurementSelect(res.data))
            .catch((err) => console.log(err));
    }, []);
    const handleAdd = () => {
        // console.log(conversion);
        
        if (measurement_type.trim() == "") {
            setError("Measurement Type is Required");
            return;
        }
        if (unit_name.trim() == "") {
            setError("Unit is Required");
            return;
        }
        if(!conversion){
            setError("Enter the conversion");
            return;
        }
        setError("");

        const isDuplicate = items.some(
            (item) =>
                item.measurement_type === measurement_type && item.unit_name === unit_name && item.conversion===conversion
        );

        if (isDuplicate) {
            setError("Unit already exists");
            return;
        }

        const newItem: TableItem = {
            measurement_type,
            unit_name,
            conversion,
        };
        setShowTable(true);
        setItems([...items, newItem]);
        setShowSubmit(true);

        setMeasurementType("");
        setUnit("");
    }

    const handleSubmit = () => {
        if (items.length === 0) {
            setError("Add atleast one row");
            return;
        }
        axios
            .post("http://localhost:5000/save", items)
            .then(() => {
                alert("Saved Successfully!");
            })
            .catch((err) => {
                console.log(err);
                alert("Error Saving Data");
            });
    };

    return (
        <div>
            <div className="desc mt-5">
                <h1>Unit Converter</h1>
                <div className="m-3">
                    <label className="form-label text-start d-block"></label>
                    <Link to="/Measurements"><button type="button" className="btn btn-dark">Measurement Type</button>
                    </Link>
                </div>

                <p>Unit converter allows accurately, quickly, and for free convert common units of measurement. Enter your value in the input box and select from and to unit from the drop-down to convert the unit.</p>

                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label className="form-label text-start d-block">Measurement Type</label>
                            <select
                                className="form-control"
                                value={measurement_type}
                                onChange={(e) => setMeasurementType(e.target.value)}
                            >
                                <option value="">Select Measurement Type</option>

                                {measurement_select.map((types) => (
                                    <option key={types._id} value={types.name}>
                                        {types.name}
                                    </option>
                                ))}
                            </select>


                        </div>

                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label className="form-label text-start d-block">Unit</label>
                            <input
                                className="form-control"
                                type="text"
                                value={unit_name}
                                onChange={(e) => setUnit(e.target.value)}
                                placeholder="Meter (m)"
                            />
                        </div>

                    </div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label className="form-label text-start d-block">Conversion</label>
                            <input
                                className="form-control"
                                type="text"
                                value={conversion}
                                onChange={(e) => {
                                    const val = e.target.value;

                                    if (/^\d*\.?\d*$/.test(val)) {
                                        setConversion(val);
                                       
                                    }
                                }}
                                placeholder="0.1"
                            />
                        </div>

                    </div>

                    {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="col-lg-9 mt-4 text-end">
                    <label className="form-label text-start d-block"></label>
                    <button type="button" className="btn btn-dark" onClick={handleAdd}>Add</button>

                </div>

                <br />
                {showSubmit && (
                    <div className="row">
                        <div className="col-lg-3 text-start"></div>
                        <div className="col-lg-9 text-start">
                            <label className="form-label text-start d-block"></label>
                            <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Submit</button>

                        </div>
                    </div>
                )
                }
                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        {showTable && (
                            <table className="table table-bordered mt-4">
                                <thead>
                                    <tr>
                                        <th className="w-50">Measurement Type</th>
                                        <th className="w-50">Unit</th>
                                        <th className="w-50">Conversion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr>
                                            <td>{item.measurement_type}</td>
                                            <td>{item.unit_name}</td>
                                            <td>{item.conversion}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        )}
                    </div>
                </div>




            </div>

        </div>
    );

};
export default MeasurementType;
