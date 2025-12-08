import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";

import UnitConverter from "./components/UnitConverter";

import MeasurementType from "./components/MeasurementType";

import Measurements from "./components/Measurements";

import MeasurementTypeList from "./components/MeasurementTypeList";

import Layout from "./layout";
import UnitList from "./components/UnitList";

export default function App() {
  return (
    <Layout>
      <Routes>

        <Route path="/" element={<UnitConverter />} />
        <Route path="/MeasurementType" element={<UnitList />} />
        <Route path="/CreateMeasurements" element={<Measurements />} />
        <Route path="/Measurements" element={<MeasurementTypeList/>} />
        <Route path="/CreateUnits" element={<MeasurementType/>} />

      </Routes>
    </Layout>
  );
}

