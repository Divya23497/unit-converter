import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface MeasurementType {
  _id: string;
  name: string;
}

interface Unit {
  _id: string;
  unitName: string;
}

const UnitConverter: React.FC = () => {
  // const [value, setValue] = useState<number | null>(null);

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [type, setType] = useState<MeasurementType[]>([]);
  const [selectedType, setSelectedType] = useState("");

  const [from, setFrom] = useState<Unit[]>([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [to, setTo] = useState<Unit[]>([]);
  const [selectedTo, setSelectedTo] = useState("");
  const [fromNumber, setFromNumber] = useState<number | "">("");
  const [toNumber, setToNumber] = useState<number | "">("");

  const getMeasurementTypes = () => {
    axios
      .get("http://localhost:5000/get_measurement_types")
      .then((res) => setType(res.data))
      .catch((err) => console.log(err));
  }

  const getUnits = (e) => {
    axios.get("http://localhost:5000/get_units_bymid", {
      params: { measurement_type_id: e.target.value }

    })
      .then((res) => {
        setFrom(res.data);
        setTo(res.data);
      })
      .catch((err) => console.log(err));
  }
  const handleConvert = async (newtype = type, newValue = fromNumber, newFrom = from, newTo = to) => {
    if (!newValue || isNaN(Number(newValue))) return;

    try {
      const response = await axios.get("http://localhost:5000/convert", {
        params: {
          type: newtype,
          from: newFrom,
          to: newTo,
          value: newValue,
        },
      });

      setToNumber(response.data.result);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // const changeType = async (e) => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/changeType", {
  //       params: {
  //         type: e.target.value,
  //       },
  //     });

  //     console.log(response.data.result);
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // }

  useEffect(() => {
    getMeasurementTypes();
    
  }, []);


  return (
    <div className="desc mt-5">
      <h1>Unit Converter</h1>

      <p>Unit converter allows accurately, quickly, and for free convert common units of measurement. Enter your value in the input box and select from and to unit from the drop-down to convert the unit.</p>

      <div className="row mb-3">
        <div className="col-lg-3"></div>
        <div className="col-lg-3">
          <div className="mb-3">
            <label className="form-label text-start d-block">Measurement Type</label>
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); getUnits(e); }}
              className="form-control"
            >
              <option value="">Select Measurement Type</option>
              {type.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

        </div>
        <div className="col-lg-3 mt-4">
          <label className="form-label text-start d-block"></label>
          <Link to="/MeasurementType"><button type="button" className="btn btn-dark">Add Measurement Type</button>
          </Link>
        </div>

      </div>
      <div className="row mb-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-3">
          <select value={selectedFrom} onChange={(e) => {
            setSelectedFrom(e.target.value);
            handleConvert(selectedType, fromNumber, e.target.value, selectedTo); // auto convert
          }}
            className="form-control">
           <option value="">Select Units</option>
              {from.map((item) => (
                <option key={item._id} value={item.unitName}>
                  {item.unitName}
                </option>
              ))}
          </select>
        </div>

        <div className="col-lg-3">
          <select value={selectedTo} onChange={(e) => {
            setSelectedTo(e.target.value);
           //
            handleConvert(selectedType, fromNumber, selectedFrom, e.target.value); // auto convert
          }}
            className="form-control">
           <option value="">Select Units</option>
              {to.map((item) => (
                <option key={item._id} value={item.unitName}>
                  {item.unitName}
                </option>
              ))}
          </select>

        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-3">
          <input
            className="form-control"
            type="text"
            style={{ textAlign: "center" }}
            value={fromNumber}
            onChange={(e) => {
              const val = e.target.value;

              if (/^\d*\.?\d*$/.test(val)) {
                setFromNumber(val);
                handleConvert(selectedType, val, selectedFrom, selectedTo); // auto update convert
              }
            }}
            placeholder="0"
          />

        </div>
        <div className="col-lg-3">
          <input
            className="form-control"
            type="text"
            value={toNumber}
            style={{ textAlign: "center" }}
            onChange={(e) => {
              const val = e.target.value;

              if (/^\d*\.?\d*$/.test(val)) {
                setToNumber(val);
                handleConvert(selectedType, val, selectedFrom, selectedTo); // auto update convert
              }
            }}
            placeholder="0"
          />

        </div>
      </div>

      <br />


      {result !== null && <h3>Result: {result}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}

    </div >

  );
};

export default UnitConverter;
