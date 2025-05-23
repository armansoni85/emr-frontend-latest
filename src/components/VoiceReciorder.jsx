import React, { useRef, useState } from "react";

import axios from "axios";

const VoiceRecorder = ({ onStopRecord }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]); // Stores recorded audio chunks
    const [audioBlob, setAudioBlob] = useState(null); // Final audio Blob
    const [uploadStatus, setUploadStatus] = useState("");

    const mediaRecorderRef = useRef(null); // Reference to MediaRecorder instance

    // Start recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setAudioChunks((prev) => [...prev, event.data]); // Append audio chunks
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunks, { type: "audio/webm" });
                setAudioBlob(blob); // Save the final audio Blob
                if (onStopRecord) {
                    onStopRecord(blob); // Call the callback function with the Blob
                }
                console.log("Recording stopped. Blob:", blob);
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    };

    // Pause recording
    const pauseRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
        }
    };

    // Resume recording
    const resumeRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    };

    const handleColorMic = () => {
        if (isRecording) {
            return "bg-red-500 animate-pulse";
        } else if (isPaused) {
            return "bg-yellow-500 animate-pulse";
        } else {
            return "bg-primary bg-opacity-20";
        }
    };

    // Upload the recorded audio file
    const handleUpload = async () => {
        if (!audioBlob) {
            alert("No audio recorded!");
            return;
        }

        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm"); // Append the Blob as a file

        try {
            const response = await axios.post("/api/upload-audio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Upload successful:", response.data);
            setUploadStatus("Upload successful!");
        } catch (error) {
            console.error("Upload failed:", error);
            setUploadStatus("Upload failed.");
        }
    };

    return (
        <>
            <span
                className={`my-auto ${handleColorMic()} bg-opacity-20 rounded-full p-2 cursor-pointer`}
                onClick={() => {
                    if (isRecording) {
                        if (isPaused) {
                            resumeRecording();
                        } else {
                            pauseRecording();
                        }
                    } else {
                        startRecording();
                    }
                }}>
                <i className="material-icons align-middle">{isRecording ? (isPaused ? "play_arrow" : "pause") : "mic"}</i>
            </span>
            {isRecording && (
                <button
                    className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                    onClick={stopRecording}>
                    Stop
                </button>
            )}
        </>
    );
};

export default VoiceRecorder;
