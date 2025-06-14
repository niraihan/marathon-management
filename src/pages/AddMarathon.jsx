import React from 'react';

import { useContext, useState } from "react";

import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../context/AuthContext';

const AddMarathon = () => {
    const { user } = useContext(AuthContext);
    const [startReg, setStartReg] = useState(new Date());
    const [endReg, setEndReg] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const marathon = {
            title: form.title.value,
            startRegistrationDate: startReg.toISOString(),
            endRegistrationDate: endReg.toISOString(),
            marathonDate: startDate.toISOString(),
            location: form.location.value,
            distance: form.distance.value,
            description: form.description.value,
            image: form.image.value,
            organizerEmail: user?.email,
        };
console.log(marathon)
        fetch("http://localhost:5000/marathons", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify(marathon),
        }).then(res => res.json()).then(data => {
          Swal.fire("Success", "Marathon added successfully", "success");
                form.reset();
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Add Marathon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" placeholder="Title" className="input input-bordered w-full" required />
                <input name="location" placeholder="Location" className="input input-bordered w-full" required />
                <select name="distance"  className="select select-bordered w-full" required>
                    <option disabled selected>Choose Distance</option>
                    <option value='3k'>3k</option>
                    <option value='10k'>10k</option>
                    <option value='25k'>25k</option>
                </select>
                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
                <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />

                <div className="flex gap-2">
                    <label>Start Registration: <DatePicker selected={startReg} onChange={date => setStartReg(date)} /></label>
                    <label>End Registration: <DatePicker selected={endReg} onChange={date => setEndReg(date)} /></label>
                </div>
                <label>Marathon Date: <DatePicker selected={startDate} onChange={date => setStartDate(date)} /></label>

                <button type="submit" className="btn btn-primary w-full">Add Marathon</button>
            </form>
        </div>
    );
};

export default AddMarathon;