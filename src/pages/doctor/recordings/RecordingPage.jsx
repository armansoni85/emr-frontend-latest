import { Button } from "@src/components";
import { analyzeRecording, getConsultation, updateConsultation, uploadRecording } from "@src/services/consultation.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const RecordingPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState({});
    const [recordingStartTime, setRecordingStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const chunksRef = useRef([]);

    // const { consultationId } = useParams();
    const consultationId = "8c2e8b3b-b3cb-4b56-8d05-b3e4d363b900";

    const { data: consultation, refetch } = useQuery({
        queryKey: ["consultation"],
        queryFn: () => getConsultation(consultationId),
        enabled: !!consultationId,
    });

    // Helper to format duration in mm:ss
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    // Try to find a supported wav mimeType for MediaRecorder
    const getSupportedWavMimeType = () => {
        // The most common browser-supported wav type is "audio/wav"
        // But not all browsers support wav in MediaRecorder
        if (window.MediaRecorder && window.MediaRecorder.isTypeSupported) {
            if (window.MediaRecorder.isTypeSupported("audio/wav")) {
                return "audio/wav";
            }
            // fallback to webm if wav is not supported
            if (window.MediaRecorder.isTypeSupported("audio/webm")) {
                return "audio/webm";
            }
        }
        // fallback to default
        return "";
    };

    // Start recording
    const handleStartRecording = async () => {
        if (isRecording) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = getSupportedWavMimeType();
            const recorder = new window.MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            chunksRef.current = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };
            recorder.onstop = async () => {
                // Save as webm
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const ext = "webm";
                const url = URL.createObjectURL(blob);
                const now = new Date();
                const duration = Math.floor((Date.now() - recordingStartTime) / 1000);

                // Upload the recording
                const formData = new FormData();
                formData.append("consultation", consultationId);
                formData.append("recording_audio", new File([blob], "recording.webm", { type: "audio/webm" }));

                try {
                    const response = await uploadRecording(formData);
                    if (response) {
                        toast.success("Recording uploaded successfully");
                    } else {
                        toast.error("Failed to upload recording");
                    }
                } catch (err) {
                    toast.error("Error uploading recording");
                }

                setRecording({
                    url,
                    blob,
                    ext,
                    time: now,
                    duration
                });
            };
            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setRecordingStartTime(Date.now());
            // Timer for duration
            const startTime = Date.now();
            setRecordingStartTime(startTime);
            setRecordingDuration(0);
            const interval = setInterval(() => {
                setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            setTimerInterval(interval);
        } catch (err) {
            alert("Could not start recording: " + err.message);
        }
    };

    // Stop recording
    const handleStopRecording = async () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            setRecordingStartTime(null);
            setRecordingDuration(0);
            if (timerInterval) {
                clearInterval(timerInterval);
                setTimerInterval(null);
            }
        }
    };

    const handleFinishConsultation = async () => {
        if (isRecording) {
            toast.error("Please stop recording before finishing consultation");
            return;
        }
        try {
            const response = await updateConsultation(consultationId, {
                is_finished: true,
                follow_up_date: new Date().toLocaleDateString('en-CA'),
            });
            toast.success("Consultation finished successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to finish consultation");
        }
    }

    const handleAnalyzeRecording = async () => {
        try {
            setIsAnalyzing(true);
            const response = await analyzeRecording(consultationId);
            console.log(response);
            toast.success("Recording analyzed successfully");
        } catch (error) {
            toast.error("Failed to analyze recording");
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <>
            <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
                <div className="flex flex-col">
                    {/* Current Patient */}
                    <div className="bg-white rounded-[20px] shadow-lg mb-4">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                            <h2 className="text-lg font-medium">Current Patient</h2>
                            <span className="text-red-500">SKIP</span>
                        </div>
                        <div className="p-4">
                            <div className="relative">
                                <div className="flex gap-3 lg:flex-row flex-col">
                                    <div className="text-center">
                                        <img
                                            src="./assets/images/johnson.png"
                                            className="rounded-xl h-16"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-start w-full">
                                        <div className="flex justify-between flex-wrap w-full">
                                            <h6 className="2xl:text-xl text-sm text-darkBlue font-medium">Henry Johnson</h6>
                                            <a
                                                className="2xl:text-xl text-sm text-darkBlue"
                                                href="">
                                                View Profile
                                            </a>
                                        </div>
                                        <div className="flex gap-1 text-xs">
                                            <span>Date of Birth :</span>
                                            <span className="text-muted">May 20, 2000</span>
                                        </div>
                                        <div className="flex gap-1 text-xs">
                                            <span>Appointment Date &amp; Time :</span>
                                            <span className="text-muted">August 12, 2025 - 2:00PM</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-grey px-2 rounded-lg py-2 mt-3 overflow-x-auto">
                                    <table className="2xl:text-sm text-xs w-full text-nowrap">
                                        <tbody>
                                            <tr>
                                                <th className="font-medium">Gender</th>
                                                <th className="font-medium">Age</th>
                                                <th className="font-medium">Weight</th>
                                                <th className="font-medium">Height</th>
                                                <th className="font-medium">Blood Group</th>
                                            </tr>
                                            <tr>
                                                <td className="text-muted text-center">Male</td>
                                                <td className="text-muted text-center">26 Years</td>
                                                <td className="text-muted text-center">68Kg</td>
                                                <td className="text-muted text-center">5ft 9in</td>
                                                <td className="text-muted text-center">O+</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-end mt-4 space-y-2 gap-2">
                                    <Button disabled={consultation?.is_finished} isOutline color="primary" size="small" onClick={handleFinishConsultation}>Finish Consultation</Button>
                                    &nbsp;
                                    {!isRecording ? (
                                        <Button disabled={consultation?.is_finished} color="primary" size="small" onClick={handleStartRecording}>Start Recording</Button>
                                    ) : (
                                        <Button disabled={consultation?.is_finished} color="danger" size="small" onClick={handleStopRecording}>Stop Recording {recordingDuration > 0 && `(${formatDuration(recordingDuration)})`}</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Recordings */}
                    <div className="bg-white min-h-[200px] rounded-[20px] shadow-lg mb-4">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                            <h2 className="text-lg font-medium">Recordings</h2>
                            <h2 className="text-lg font-medium">Time</h2>
                        </div>
                        <div className="relative">
                            {!consultation?.is_finished && (

                                <div class="my-32 text-center">
                                    <h1 class="text-muted text-2xl font-bold my-auto">No Recordings to Show</h1>
                                </div>
                            )}

                            {consultation?.is_finished && consultation?.recordings?.map((rec, idx) => (
                                <div key={idx} className="flex justify-content-between border-b px-3 pt-4 pb-2">
                                    <div className="flex gap-2 w-full">
                                        <span
                                            className="inline-block bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                            <i className="material-icons">play_arrow</i>
                                        </span>
                                        <div className="text-medium text-start">
                                            <p className="leading-none">{`Recording ${idx + 1}`}</p>
                                            <span className="text-muted 2xl:text-sm text-xs">
                                                Just Now
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-muted 2xl:text-sm text-xs text-nowrap my-auto">
                                        4 mins 35 secs
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="text-end mt-4 space-y-2 p-3">
                            <Button color="primary" size="small" disabled={consultation?.recordings?.length === 0 || isAnalyzing} onClick={handleAnalyzeRecording}>
                                {isAnalyzing ? "Analyzing..." : "Analyze & Generate"}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                        <h2 className="text-lg font-medium">Recordings Output</h2>
                        <a
                            href=""
                            className="text-primary">
                            Update Data in Profile
                        </a>
                    </div>
                    <div className="p-4">
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
                            <p className="text-body px-2">
                                Patient John Doe, a 35-year-old male, reports experiencing persistent headaches for the past two weeks. He describes
                                the pain as a throbbing sensation on the left side of his head, which worsens with physical activity. He also notes
                                symptoms of nausea and sensitivity to light. He rates the pain as 7 out of 10.
                            </p>
                        </div>
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
                            <div className="px-2">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="font-medium text-start">Vitals:</th>
                                            <th className="font-medium text-start">Exam:</th>
                                        </tr>
                                        <tr>
                                            <td className="text-body">
                                                <ul className="ps-5 list-disc">
                                                    <li>BP: [e.g., 120/80 mmHg]</li>
                                                    <li>HR: [e.g., 72 bpm]</li>
                                                    <li>RR: [e.g., 16 breaths/min]</li>
                                                    <li>Temp: [e.g., 98.6°F]</li>
                                                </ul>
                                            </td>
                                            <td className="text-body">
                                                <ul className="ps-5 list-disc">
                                                    <li>BP: [e.g., 120/80 mmHg]</li>
                                                    <li>HR: [e.g., 72 bpm]</li>
                                                    <li>RR: [e.g., 16 breaths/min]</li>
                                                    <li>Temp: [e.g., 98.6°F]</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Assessment</h3>
                            <div className="px-2 text-body">
                                <ul className="ps-5 list-disc">
                                    <li>Likely diagnosis: Migraine without aura</li>
                                    <li>Other possible diagnoses: None</li>
                                    <li>ICD 10 = G43.0</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Plan</h3>
                            <div className="px-2">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="font-medium text-start">Medications:</th>
                                        </tr>
                                        <tr>
                                            <td className="text-body">
                                                <ul className="ps-8 list-disc">
                                                    <li>Sumatriptan 100mg: take at the onset of headache</li>
                                                    <li>Consider preventive medication: Propranolol or Topiramate if headache is frequent</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="font-medium text-start">Lifestyle Modifications:</th>
                                        </tr>
                                        <tr>
                                            <td className="text-body">
                                                <ul className="ps-8 list-disc">
                                                    <li>Sumatriptan 100mg: take at the onset of headache</li>
                                                    <li>Consider preventive medication: Propranolol or Topiramate if headache is frequent</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecordingPage;
