import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MTEditModel from "./MTEditModel";
import MTDeleteModal from "./MTDeleteModel";



interface TableItem {
    measurement_type: string;
}

const MeasurementTypeList: React.FC = () => {

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



    useEffect(() => {
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

    const handleEdit = (item: any) => {
        setCurrentValue(item.measurement_type);
        setCurrentId(item.id);
        setShowModal(true);
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
        get_measurement_types(); // refresh list
    };
    return (
        <div>
            <div className="desc mt-5">
                <h1>Unit Converter - Measurement List</h1>
                <p>Unit converter allows accurately, quickly, and for free convert common units of measurement. Enter your value in the input box and select from and to unit from the drop-down to convert the unit.</p>

                <div className="row mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <div className="text-end">
                            <Link to="/CreateMeasurements"><button className="btn btn-dark me-2">Create</button>
                            </Link> </div>
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th className="w-50">Measurement Type</th>
                                    <th className="w-auto">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.measurement_type}</td>

                                        <td>
                                            <button className="btn btn-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn btn-danger ml-2" onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>



                    </div>
                    <div className="col-lg-2"></div>
                </div>

                <MTEditModel
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                    value={currentValue}
                    id={currentId}
                    setValue={setCurrentValue}
                />

                <MTDeleteModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirm={deleteItem}
                />
            </div>

        </div>
    );

};
export default MeasurementTypeList;
