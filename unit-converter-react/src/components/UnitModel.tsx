import React from "react";
import { Modal, Button } from "react-bootstrap";

interface EditModalProps {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
    value: string;
    id: string;
    setValue: (v: string) => void;
}

export default function MTEditModal({ show, onClose, onSave, value, id, setValue }: EditModalProps) {

    const handleSubmit = () => {
        
        onSave(id, value);  // send id + updated text back
    };
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Measurement Type</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter new name"
                />

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}
