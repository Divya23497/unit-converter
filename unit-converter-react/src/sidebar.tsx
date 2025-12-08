import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div style={{ width: "250px", background: "black", color: "white", padding: "30px" }}>
            <h3 style={{ marginBottom: "20px" }}>Unit Converter</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "12px" }}>
                    <Link to="/Measurements" style={{ color: "white", textDecoration: "none" }}>Measurement Type</Link>
                </li>

                <li style={{ marginBottom: "12px" }}>
                    <Link to="/MeasurementType" style={{ color: "white", textDecoration: "none" }}>Measurements/Units</Link>
                </li>


                <li style={{ marginBottom: "12px" }}>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Converters</Link>
                </li>




            </ul>
        </div>
    );
}
