import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MTEditModel from "./MTEditModel";
import MTDeleteModal from "./MTDeleteModel";



interface TableItem {
    measurement_type: string;
    id: string;
    unit: string;
    unit_conv: number;
}

const UnitList: React.FC = () => {

    const [measurement_type, setMeasurementType] = useState("");
    const [measurement_select, setMeasurementSelect] = useState([]);
    const [unit_name, setUnit] = useState("");
    const [conversion, setConversion] = useState<number>(0);
    const [showTable, setShowTable] = useState(true);
    const [showSubmit, setShowSubmit] = useState(false);
    const [error, setError] = useState("");
    const [items, setItems] = useState<TableItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");

    const [showEditModal, setShowEditModal] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<TableItem>({
        measurement_type: "",
        unit_name: "",
        conversion: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:5000/get_unit_details")
            .then((res) => {
                const newItems: TableItem[] = res.data.map((item: any) => ({
                    measurement_type: item.measurementTypeId.name,
                    id: item._id,
                    unit: item.unitName,
                    unit_conv: item.conv,
                }));

                setItems(newItems);
            })
            .catch((err) => console.log(err));
    }, []);

    const get_measurement_types = () => {
        axios
            .get("http://localhost:5000/get_measurement_types")
            .then((res) => {
                const newItems: TableItem[] = res.data.map((item: any) => ({
                    measurement_type: item.name,
                    id: item._id,
                }));

                setItems(newItems);
            })
            .catch((err) => console.log(err));
    }
    // const handleAdd = () => {
    //     // console.log(conversion);

    //     if (measurement_type.trim() == "") {
    //         setError("Measurement Type is Required");
    //         return;
    //     }
    //     if (unit_name.trim() == "") {
    //         setError("Unit is Required");
    //         return;
    //     }
    //     if(!conversion){
    //         setError("Enter the conversion");
    //         return;
    //     }
    //     setError("");

    //     const isDuplicate = items.some(
    //         (item) =>
    //             item.measurement_type === measurement_type && item.unit_name === unit_name && item.conversion===conversion
    //     );

    //     if (isDuplicate) {
    //         setError("Unit already exists");
    //         return;
    //     }

    //     const newItem: TableItem = {
    //         measurement_type,
    //         unit_name,
    //         conversion,
    //     };
    //     setShowTable(true);
    //     setItems([...items, newItem]);
    //     setShowSubmit(true);

    //     setMeasurementType("");
    //     setUnit("");
    // }

    // const handleSubmit = () => {
    //     if (items.length === 0) {
    //         setError("Add atleast one row");
    //         return;
    //     }
    //     axios
    //         .post("http://localhost:5000/save", items)
    //         .then(() => {
    //             alert("Saved Successfully!");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert("Error Saving Data");
    //         });
    // };

    const openEditModal = (index: number) => {
        setEditIndex(index);
        setEditData(items[index]); // load row data
        setShowEditModal(true);
    };

    const saveEdit = () => {
        if (editIndex === null) return;

        const updatedItems = [...items];
        updatedItems[editIndex] = editData;

        setItems(updatedItems);
        setShowEditModal(false);
    };


    const handleSave = () => {
        axios.put(`http://localhost:5000/update_measurement_type/${currentId}`, {
            name: currentValue,
        })
            .then(() => {
                setShowModal(false);
                get_measurement_types();
                // refresh table
                // setItems(items.map(i => i._id === currentId ? { ...i, name: currentValue } : i));
            });

    };

    const handleDeleteClick = (id: string) => {

        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const deleteItem = async () => {
        // alert(deleteId);
        await axios.delete(`http://localhost:5000/delete_measurement_type/${deleteId}`);
        setShowDeleteModal(false);
        get_measurement_types();
    };
    return (
        <div>
            <div className="desc mt-5">
                <h1>Unit Converter - Unit List</h1>
                <p>Unit converter allows accurately, quickly, and for free convert common units of measurement. Enter your value in the input box and select from and to unit from the drop-down to convert the unit.</p>

                <div className="row mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className="text-end">
                            <Link to="/CreateUnits"><button className="btn btn-dark me-2">Create</button>
                            </Link> </div>
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Measurement Type</th>
                                    <th>Units</th>
                                    <th>Conversion</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.measurement_type}</td>
                                        <td>{item.unit}</td>
                                        <td>{item.unit_conv}</td>
                                        <td>
                                            <button className="btn btn-primary me-2" onClick={() => openEditModal(index)}>Edit</button>
                                            <button className="btn btn-danger ml-2" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>



                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>

            {showEditModal && (
                <div className="modal show fade d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Edit Unit</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">

                                <label className="form-label">Measurement Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.measurement_type}
                                    onChange={(e) =>
                                        setEditData({ ...editData, measurement_type: e.target.value })
                                    }
                                />

                                <label className="form-label mt-3">Unit Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.unit}
                                    onChange={(e) =>
                                        setEditData({ ...editData, unit: e.target.value })
                                    }
                                />

                                <label className="form-label mt-3">Conversion</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editData.unit_conv}
                                    onChange={(e) =>
                                        setEditData({ ...editData, unit_conv: e.target.value })
                                    }
                                />
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Close
                                </button>

                                <button className="btn btn-primary" onClick={saveEdit}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>

    );

};
export default UnitList;
