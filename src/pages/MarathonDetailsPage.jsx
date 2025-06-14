import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Swal from "sweetalert2";

const MarathonDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [marathon, setMarathon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://assignment11-server-dun.vercel.app/marathons/${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch marathon");
                return res.json();
            })
            .then((data) => {
                setMarathon(data);
                setLoading(false);
                document.title = `${data.title} | Marathon Details`;
            })
            .catch(() => {
                Swal.fire("Error", "Could not fetch marathon data", "error");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!marathon) return <div className="text-center mt-10">No marathon found</div>;

    // Calculate if registration is open
    const now = new Date();
    const regStart = new Date(marathon.startRegistrationDate);
    const regEnd = new Date(marathon.endRegistrationDate);
    const isRegistrationOpen = now >= regStart && now <= regEnd;

    // Timer duration in seconds (until marathon start)
    const marathonStart = new Date(marathon.marathonDate);
    const timeLeft = Math.max((marathonStart.getTime() - now.getTime()) / 1000, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-4">{marathon.title}</h1>

            <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full h-64 object-cover rounded mb-6"
            />

            <p className="mb-2">
                <strong>Location:</strong> {marathon.location}
            </p>
            <p className="mb-2">
                <strong>Running Distance:</strong> {marathon.runningDistance}
            </p>
            <p className="mb-2">
                <strong>Registration Dates:</strong>{" "}
                {regStart.toLocaleDateString()} - {regEnd.toLocaleDateString()}
            </p>
            <p className="mb-2">
                <strong>Marathon Start Date:</strong> {marathonStart.toLocaleDateString()}
            </p>
            <p className="mb-4">{marathon.description}</p>

            <p className="mb-4">
                <strong>Total Registration Count:</strong> {marathon.totalRegistrationCount}
            </p>

            <div className="mb-8 flex justify-center">
                <CountdownCircleTimer
                    isPlaying
                    duration={timeLeft}
                    colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
                    size={150}
                    strokeWidth={8}
                >
                    {({ remainingTime }) => {
                        const days = Math.floor(remainingTime / (3600 * 24));
                        const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
                        const minutes = Math.floor((remainingTime % 3600) / 60);
                        return (
                            <div className="text-center">
                                <div className="text-2xl font-bold">{days}d</div>
                                <div>{hours}h {minutes}m</div>
                            </div>
                        );
                    }}
                </CountdownCircleTimer>
            </div>

            <div className="text-center">
                <button
                    disabled={!isRegistrationOpen}
                    onClick={() => navigate(`/marathons/${id}/register`)}
                    className={`btn btn-primary ${!isRegistrationOpen ? "btn-disabled" : ""}`}
                >
                    {isRegistrationOpen ? "Register Now" : "Registration Closed"}
                </button>
            </div>
        </div>
    );
};

export default MarathonDetailsPage;