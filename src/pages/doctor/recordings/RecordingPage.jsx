import { Button } from "@src/components";
import {
  analyzeRecording,
  getConsultation,
  updateConsultation,
  uploadRecording,
} from "@src/services/consultation.service";
import { getUserById } from "@src/services/userService";
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

  const consultationId = localStorage.getItem("consultationId");

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

  const { data: patientDetails } = useQuery({
    queryKey: ["patient", consultation?.appointment?.patient?.id],
    queryFn: () => getUserById(consultation?.appointment?.patient?.id),
    enabled: !!consultation?.appointment?.patient?.id,
  });

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatWeight = (weightKilo, weightGrams) => {
    if (!weightKilo && !weightGrams) return "-";
    const kilo = weightKilo || 0;
    const grams = weightGrams || 0;
    if (grams > 0) {
      return `${kilo}.${grams}`;
    }
    return kilo.toString();
  };

  const formatHeight = (heightFeet, heightInches) => {
    if (!heightFeet && !heightInches) return "-";
    const feet = heightFeet || 0;
    const inches = heightInches || 0;
    if (inches > 0) {
      return `${feet}'${inches}"`;
    }
    return `${feet}'0"`;
  };

  const getPatientData = () => {
    const consultationPatient = consultation?.appointment?.patient || {};
    const detailedPatient = patientDetails?.data || {};

    return {
      id: consultationPatient.id,
      first_name:
        detailedPatient.first_name || consultationPatient.first_name || "",
      last_name:
        detailedPatient.last_name || consultationPatient.last_name || "",
      email: detailedPatient.email || consultationPatient.email || "",
      dob: detailedPatient.dob || consultationPatient.dob || "",
      gender: detailedPatient.gender || consultationPatient.gender || "",
      blood_group:
        detailedPatient.blood_group || consultationPatient.blood_group || "",
      weight_kilo: detailedPatient.weight_kilo || 0,
      weight_grams: detailedPatient.weight_grams || 0,
      height_feet: detailedPatient.height_feet || 0,
      height_inches: detailedPatient.height_inches || 0,
      profile_picture:
        detailedPatient.profile_picture || consultationPatient.profile_picture,
      phone_number:
        detailedPatient.phone_number || detailedPatient.mobile_number || "",
    };
  };

  const patient = getPatientData();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getSupportedWavMimeType = () => {
    if (window.MediaRecorder && window.MediaRecorder.isTypeSupported) {
      if (window.MediaRecorder.isTypeSupported("audio/wav")) {
        return "audio/wav";
      }
      if (window.MediaRecorder.isTypeSupported("audio/webm")) {
        return "audio/webm";
      }
    }
    return "";
  };

  const handleStartRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedWavMimeType();
      const recorder = new window.MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const duration = Math.floor((Date.now() - recordingStartTime) / 1000);

        const formData = new FormData();
        formData.append("consultation", consultationId);
        formData.append(
          "recording_audio",
          new File([blob], "recording.webm", { type: "audio/webm" })
        );

        try {
          const response = await uploadRecording(formData);
          if (response) {
            refetch();
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
          ext: "webm",
          time: now,
          duration,
        });
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingStartTime(Date.now());
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

  const handleStopRecording = async () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingStartTime(null);
      setRecordingDuration(0);
      refetch();
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
        follow_up_date: new Date().toLocaleDateString("en-CA"),
      });
      toast.success("Consultation finished successfully");
      localStorage.setItem("consultationFinished", true);
      refetch();
    } catch (error) {
      toast.error("Failed to finish consultation");
    }
  };

  const handleAnalyzeRecording = async () => {
    try {
      setIsAnalyzing(true);
      const response = await analyzeRecording(consultationId);
      toast.success("Recording analyzed successfully");
    } catch (error) {
      toast.error("Failed to analyze recording");
    } finally {
      refetch();
      setIsAnalyzing(false);
    }
  };

  const formatAppointmentDateTime = (dateTimeString) => {
    if (!dateTimeString) return "-";

    try {
      const date = new Date(dateTimeString);

      const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };

      const timeOptions = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

      return `${formattedDate} at ${formattedTime}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateTimeString;
    }
  };

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
                      src={
                        patient.profile_picture || "./assets/images/johnson.png"
                      }
                      className="rounded-xl h-16"
                      alt=""
                    />
                  </div>
                  <div className="text-start w-full">
                    <div className="flex justify-between flex-wrap w-full">
                      <h6 className="2xl:text-xl text-sm text-darkBlue font-medium">
                        {patient.first_name} {patient.last_name}
                      </h6>
                      <Button
                        color="link"
                        className="2xl:text-xl text-sm text-darkBlue"
                        onClick={() =>
                          navigate(
                            getRoutePath("doctor.patients.detail", {
                              patientId: patient.id,
                            })
                          )
                        }
                      >
                        View Profile
                      </Button>
                    </div>
                    <div className="flex gap-1 text-xs">
                      <span>Date of Birth :</span>
                      <span className="text-muted">{patient.dob || "-"}</span>
                    </div>
                    <div className="flex gap-1 text-xs">
                      <span>Phone Number :</span>
                      <span className="text-muted">
                        {patient.phone_number || "-"}
                      </span>
                    </div>
                    <div className="flex gap-1 text-xs">
                      <span>Appointment Date &amp; Time :</span>
                      <span className="text-muted">
                        {formatAppointmentDateTime(
                          consultation?.appointment?.appointment_datetime
                        )}
                      </span>
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
                        <td className="text-muted text-center">
                          {patient.gender || "-"}
                        </td>
                        <td className="text-muted text-center">
                          {calculateAge(patient.dob)} Years
                        </td>
                        <td className="text-muted text-center">
                          {formatWeight(
                            patient.weight_kilo,
                            patient.weight_grams
                          )}
                          Kg
                        </td>
                        <td className="text-muted text-center">
                          {formatHeight(
                            patient.height_feet,
                            patient.height_inches
                          )}
                        </td>
                        <td className="text-muted text-center">
                          {patient.blood_group || "-"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end mt-4 space-y-2 gap-2">
                  <Button
                    disabled={consultation?.is_finished}
                    isOutline
                    color="primary"
                    size="small"
                    onClick={handleFinishConsultation}
                  >
                    Finish Consultation
                  </Button>
                  &nbsp;
                  {!isRecording ? (
                    <Button
                      disabled={consultation?.is_finished}
                      color="primary"
                      size="small"
                      onClick={handleStartRecording}
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      disabled={consultation?.is_finished}
                      color="danger"
                      size="small"
                      onClick={handleStopRecording}
                    >
                      Stop Recording{" "}
                      {recordingDuration > 0 &&
                        `(${formatDuration(recordingDuration)})`}
                    </Button>
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
                <div className="my-32 text-center">
                  <h1 className="text-muted text-2xl font-bold my-auto">
                    No Recordings to Show
                  </h1>
                </div>
              )}

              {consultation?.recordings?.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex justify-content-between border-b px-3 pt-4 pb-2"
                >
                  <div className="flex gap-2 w-full">
                    <span className="inline-block bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
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
              <Button
                color="primary"
                size="small"
                disabled={
                  !consultation?.is_finished ||
                  isAnalyzing ||
                  consultation?.recording_ai_voice_note
                }
                onClick={handleAnalyzeRecording}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze & Generate"}
              </Button>
            </div>
          </div>
        </div>
        {/* Recordings Output */}
        <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
            <h2 className="text-lg font-medium">Recordings Output</h2>
            <a href="" className="text-primary">
              Update Data in Profile
            </a>
          </div>
          {!consultation?.is_finished &&
          !consultation?.recording_ai_voice_note ? (
            <div className="my-32 text-center">
              <h1 className="text-muted text-2xl font-bold my-auto">
                No Analysis Data Available
              </h1>
            </div>
          ) : (
            <div
              className="p-4"
              dangerouslySetInnerHTML={{
                __html: consultation?.recording_ai_voice_note?.replace(
                  /\n/g,
                  "<br/>"
                ),
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecordingPage;
