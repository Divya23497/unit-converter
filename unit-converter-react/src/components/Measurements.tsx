import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface TableItem {
    measurement_type: string;
    unit_name: string;
}

const Measurements: React.FC = () => {

    const [measurement_type, setMeasurementType] = useState("");
    const [unit_name, setUnit] = useState("");
    const [showTable, setShowTable] = useState(false);
    const [showSubmit, setShowSubmit] = useState(false);
    const [error, setError] = useState("");
    const [items, setItems] = useState<TableItem[]>([]);

    const handleSubmit = () => {
        if (measurement_type.trim() == "") {
            setError("Measurement Type is Required");
            return;
        }
        axios
            .post("http://localhost:5000/measurement_save",
                {
                    measurement_type: measurement_type
                })
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
                <h1>Unit Converter - Measurements</h1>

                <p>Unit converter allows accurately, quickly, and for free convert common units of measurement. Enter your value in the input box and select from and to unit from the drop-down to convert the unit.</p>

                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3">
                        <div className="mb-3">
                            <label className="form-label text-start d-block">Measurement Type</label>
                            <input
                                className="form-control"
                                type="text"
                                value={measurement_type}
                                onChange={(e) => setMeasurementType(e.target.value)}
                                placeholder="Length"
                            />


                        </div>

                    </div>
                    <div className="col-lg-3 mt-4  text-end">
                        <button type="button" className="btn btn-dark  me-4" onClick={handleSubmit}>Submit</button>
                        <Link to="/Measurements" ><button type="button" className="btn btn-light me-2">Back</button>
                        </Link>
                    </div>


                    {error && <small className="text-danger">{error}</small>}
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr>
                                            <td>{item.measurement_type}</td>
                                            <td>{item.unit_name}</td>
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
export default Measurements;
