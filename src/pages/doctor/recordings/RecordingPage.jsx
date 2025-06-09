import { Button } from "@src/components";
import { analyzeRecording, getConsultation, updateConsultation, uploadRecording } from "@src/services/consultation.service";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";

const RecordingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState({});
    const [recordingStartTime, setRecordingStartTime] = useState(null);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const chunksRef = useRef([]);

    const consultationId = localStorage.getItem('consultationId');
    // const consultationId = "144839ac-1c87-4fb2-b720-9d22ba3a72f3";

    useEffect(() => {
        if (!consultationId) {
            toast("No active consultation found", { type: "warning" });
            navigate(getRoutePath("doctor.appointments.list"));
            return;
        }
    }, [consultationId, navigate]);

    const { data: consultation, refetch } = useQuery({
        queryKey: ["consultation"],
        queryFn: () => getConsultation(consultationId),
        enabled: !!consultationId,
    });

    // const consultation = {
    //     "id": "144839ac-1c87-4fb2-b720-9d22ba3a72f3",
    //     "appointment": {
    //         "id": "5dace8eb-eef5-4478-a170-23c65301ef03",
    //         "doctor": {
    //             "id": "db0a9534-d52a-4a49-b49d-a899db467cc3",
    //             "date_joined": "2025-05-21T18:03:25Z",
    //             "first_name": "akhil",
    //             "profile_picture": null,
    //             "last_name": "sharma",
    //             "email": "akhil123@gmail.com",
    //             "role": "2",
    //             "country": "India",
    //             "flag": "/static/flags/in.gif",
    //             "last_login": null,
    //             "is_active": true,
    //             "is_blocked": false
    //         },
    //         "patient": {
    //             "id": "ae600115-96fc-476e-9504-f8a4943ce889",
    //             "date_joined": "2025-05-24T14:01:12.439720Z",
    //             "first_name": "",
    //             "profile_picture": null,
    //             "last_name": "",
    //             "email": "yaelahman0810+1@gmail.com",
    //             "role": "3",
    //             "country": "India",
    //             "flag": "/static/flags/in.gif",
    //             "last_login": null,
    //             "is_active": true,
    //             "is_blocked": false
    //         },
    //         "reason_of_visit": "111",
    //         "appointment_datetime": "2025-06-04T18:13:00Z",
    //         "disease": null,
    //         "appointment_status": "DONE"
    //     },
    //     "recording_ai_voice_note": "Hello! It seems like you might be describing some discomfort or pain. Can you please provide more information about your symptoms and how you are feeling?\n\nSubjective:\nThe patient is expressing discomfort and is making a sound \"짝짝 뾰로롱\"\n\nVitals:\n- Heart rate: Not recorded\n- Blood pressure: Not recorded\n- Respiratory rate: Not recorded\n- Temperature: Not recorded\n\nAssessment:\nThe patient seems to be experiencing some form of discomfort or pain but specific details are not provided. Further exploration and assessment are needed to determine the exact nature and severity of the symptoms.\n\nPlan:\n1. Detailed Assessment: It is important to gather more information about the location, quality, intensity, and any associated symptoms of the discomfort or pain the patient is experiencing.\n2. Physical Examination: A thorough physical examination may be necessary to help identify any underlying issues or causes of the symptoms.\n3. Diagnostic Tests: Depending on the findings from the assessment and physical examination, additional tests such as blood tests, imaging studies, or others may be recommended.\n4. Symptom Management: In the meantime, over-the-counter pain relief medications such as acetaminophen or ibuprofen may help alleviate any immediate discomfort. Heat or cold therapy may also be beneficial depending on the type of pain.\n5. Follow-up: The patient should follow up with a healthcare provider for further evaluation and management of their symptoms.\n\nIt is important to consult with a healthcare provider to receive a proper diagnosis and appropriate treatment based on a thorough evaluation of the patient's symptoms and clinical findings.",
    //     "recording_ai_voice_note_status": "REJECTED",
    //     "is_started": true,
    //     "is_finished": true,
    //     "follow_up_date": "2025-05-25"
    // }



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
                        refetch()
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
            refetch()
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
            localStorage.setItem('consultationFinished', true);
            refetch();
        } catch (error) {
            toast.error("Failed to finish consultation");
        }
    }

    const handleAnalyzeRecording = async () => {
        try {
            setIsAnalyzing(true);
            const response = await analyzeRecording(consultationId);
            toast.success("Recording analyzed successfully");
        } catch (error) {
            toast.error("Failed to analyze recording");
        } finally {
            refetch()
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
                                            src={consultation?.appointment?.patient?.profile_image || "./assets/images/johnson.png"}
                                            className="rounded-xl h-16"
                                            alt=""
                                        />
                                    </div>
                                    <div className="text-start w-full">
                                        <div className="flex justify-between flex-wrap w-full">
                                            <h6 className="2xl:text-xl text-sm text-darkBlue font-medium">
                                                {consultation?.appointment?.patient?.first_name} {consultation?.appointment?.patient?.last_name}
                                            </h6>
                                            <Button
                                                color="link"
                                                className="2xl:text-xl text-sm text-darkBlue"
                                                onClick={() => navigate(getRoutePath("doctor.patients.detail", { patientId: consultation?.appointment?.patient?.id }))}>
                                                View Profile
                                            </Button>
                                        </div>
                                        <div className="flex gap-1 text-xs">
                                            <span>Date of Birth :</span>
                                            <span className="text-muted">{consultation?.appointment?.patient?.dob || '-'}</span>
                                        </div>
                                        <div className="flex gap-1 text-xs">
                                            <span>Appointment Date &amp; Time :</span>
                                            <span className="text-muted">{consultation?.appointment?.appointment_datetime || '-'}</span>
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
                                                <td className="text-muted text-center">{consultation?.appointment?.patient?.gender || '-'}</td>
                                                <td className="text-muted text-center">{consultation?.appointment?.patient?.age || '-'} Years</td>
                                                <td className="text-muted text-center">{consultation?.appointment?.patient?.weight || '-'}Kg</td>
                                                <td className="text-muted text-center">{consultation?.appointment?.patient?.height || '-'}</td>
                                                <td className="text-muted text-center">{consultation?.appointment?.patient?.blood_group || '-'}</td>
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
                            {consultation?.recordings?.length === 0 && (

                                <div class="my-32 text-center">
                                    <h1 class="text-muted text-2xl font-bold my-auto">No Recordings to Show</h1>
                                </div>
                            )}

                            {consultation?.recordings?.map((rec, idx) => (
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
                            <Button color="primary" size="small" disabled={!consultation?.is_finished || isAnalyzing || consultation?.recording_ai_voice_note} onClick={handleAnalyzeRecording}>
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
                    {!consultation?.is_finished && !consultation?.recording_ai_voice_note ? (
                        <div className="my-32 text-center">
                            <h1 className="text-muted text-2xl font-bold my-auto">No Analysis Data Available</h1>
                        </div>
                    ) : (
                        <div className="p-4" dangerouslySetInnerHTML={{ __html: consultation?.recording_ai_voice_note?.replace(/\n/g, '<br/>') }}>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecordingPage;
