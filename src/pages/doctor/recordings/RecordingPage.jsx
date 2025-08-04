import React, { useEffect, useRef, useState } from "react";
import { Button } from "@src/components";
import {
  analyzeRecording,
  getConsultation,
  updateConsultation,
  uploadRecording,
} from "@src/services/consultation.service";
import { getUserById } from "@src/services/userService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";

const THEME_STORAGE_KEY = "customColorTheme";
const getFontTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : {};
  } catch {
    return {};
  }
};
const getFontStyle = (fontTheme, type = "main") => {
  if (!fontTheme) return {};
  if (type === "subHeading") {
    return {
      fontFamily: fontTheme.subHeadingFontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.subHeadingFontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.subHeadingFontSize || fontTheme.fontSize,
    };
  }
  if (type === "body1") {
    return {
      fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
    };
  }
  if (type === "body2") {
    return {
      fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
    };
  }
  return {
    fontFamily: fontTheme.fontFamily,
    fontWeight: fontTheme.fontWeight,
    fontSize: fontTheme.fontSize,
  };
};

const RecordingPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState({});
  const [recordingStartTime, setRecordingStartTime] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [stream, setStream] = useState(null);

  const [fontTheme, setFontTheme] = useState(getFontTheme());
  useEffect(() => {
    const reloadTheme = () => setFontTheme(getFontTheme());
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_STORAGE_KEY) reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);
  useEffect(() => {
    if (!fontTheme) return;
    document.body.style.fontFamily = fontTheme.fontFamily || "inherit";
    document.body.style.fontWeight = fontTheme.fontWeight || 400;
    document.body.style.fontSize = fontTheme.fontSize || "16px";
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.fontWeight = "";
      document.body.style.fontSize = "";
    };
  }, [fontTheme]);

  // Cleanup stream on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

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

  const getSupportedMimeType = () => {
    if (!window.MediaRecorder) return null;

    // Try supported types in order of preference
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mp4;codecs=mp4a.40.2',
      'audio/mpeg',
      'audio/wav'
    ];

    for (const type of types) {
      if (window.MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return null; // Let MediaRecorder use default
  };

  const handleStartRecording = async () => {
    if (isRecording) return;

    try {
      // Clear any existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Request audio with specific constraints for better iPad compatibility
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });

      setStream(audioStream);

      const mimeType = getSupportedMimeType();
      console.log('Using MIME type:', mimeType);

      const recorderOptions = mimeType ? { mimeType } : {};

      // Add timeslice for better compatibility with iOS/iPad
      const recorder = new window.MediaRecorder(audioStream, recorderOptions);

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const actualMimeType = mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type: actualMimeType });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const duration = Math.floor((Date.now() - recordingStartTime) / 1000);

        // Determine file extension based on MIME type
        let fileExtension = 'webm';
        let fileName = 'recording.webm';

        if (actualMimeType.includes('mp4')) {
          fileExtension = 'mp4';
          fileName = 'recording.mp4';
        } else if (actualMimeType.includes('mpeg')) {
          fileExtension = 'mp3';
          fileName = 'recording.mp3';
        } else if (actualMimeType.includes('wav')) {
          fileExtension = 'wav';
          fileName = 'recording.wav';
        }

        const formData = new FormData();
        formData.append("consultation", consultationId);
        formData.append(
          "recording_audio",
          new File([blob], fileName, { type: actualMimeType })
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
          console.error('Upload error:', err);
          toast.error("Error uploading recording");
        }

        setRecording({
          url,
          blob,
          ext: fileExtension,
          time: now,
          duration,
        });

        // Clean up stream
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      };

      recorder.onerror = (e) => {
        console.error('MediaRecorder error:', e);
        toast.error('Recording error occurred');
        setIsRecording(false);
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      };

      // Start recording with timeslice for better iOS compatibility
      recorder.start(1000); // Record in 1-second chunks
      setMediaRecorder(recorder);
      setIsRecording(true);

      const startTime = Date.now();
      setRecordingStartTime(startTime);
      setRecordingDuration(0);

      const interval = setInterval(() => {
        setRecordingDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerInterval(interval);

    } catch (err) {
      console.error('Recording error:', err);
      let errorMessage = "Could not start recording: " + err.message;

      if (err.name === 'NotAllowedError') {
        errorMessage = "Microphone permission denied. Please allow microphone access and try again.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "No microphone found. Please ensure a microphone is connected.";
      } else if (err.name === 'NotSupportedError') {
        errorMessage = "Recording not supported on this device/browser.";
      }

      toast.error(errorMessage);
    }
  };

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

      refetch();
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
            <div
              className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                Current Patient
              </h2>
              <span
                className="text-red-500"
                style={getFontStyle(fontTheme, "body2")}
              >
                SKIP
              </span>
            </div>
            <div className="p-4" style={getFontStyle(fontTheme, "body1")}>
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
                      <h6
                        className="2xl:text-xl text-sm text-darkBlue font-medium"
                        style={getFontStyle(fontTheme, "main")}
                      >
                        {patient.first_name} {patient.last_name}
                      </h6>
                      <Button
                        color="link"
                        className="2xl:text-xl text-sm text-darkBlue"
                        style={getFontStyle(fontTheme, "body2")}
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
                    <div
                      className="flex gap-1 text-xs"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <span>Date of Birth :</span>
                      <span className="text-muted">{patient.dob || "-"}</span>
                    </div>
                    <div
                      className="flex gap-1 text-xs"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <span>Phone Number :</span>
                      <span className="text-muted">
                        {patient.phone_number || "-"}
                      </span>
                    </div>
                    <div
                      className="flex gap-1 text-xs"
                      style={getFontStyle(fontTheme, "body2")}
                    >
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
                  <table
                    className="2xl:text-sm text-xs w-full text-nowrap"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    <tbody>
                      <tr>
                        <th
                          className="font-medium"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          Gender
                        </th>
                        <th
                          className="font-medium"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          Age
                        </th>
                        <th
                          className="font-medium"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          Weight
                        </th>
                        <th
                          className="font-medium"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          Height
                        </th>
                        <th
                          className="font-medium"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          Blood Group
                        </th>
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
                    style={getFontStyle(fontTheme, "body2")}
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
                      style={getFontStyle(fontTheme, "body2")}
                      onClick={handleStartRecording}
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <Button
                      disabled={consultation?.is_finished}
                      color="danger"
                      size="small"
                      style={getFontStyle(fontTheme, "body2")}
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
            <div
              className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                Recordings
              </h2>
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                Time
              </h2>
            </div>
            <div className="relative" style={getFontStyle(fontTheme, "body1")}>
              {consultation?.recordings?.length === 0 && (
                <div className="my-32 text-center">
                  <h1
                    className="text-muted text-2xl font-bold my-auto"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    No Recordings to Show
                  </h1>
                </div>
              )}

              {consultation?.recordings?.map((rec, idx) => (
                <div
                  key={idx}
                  className="flex justify-content-between border-b px-3 pt-4 pb-2"
                  style={getFontStyle(fontTheme, "body1")}
                >
                  <div className="flex gap-2 w-full">
                    <span className="inline-block bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                      <i className="material-icons">play_arrow</i>
                    </span>
                    <div className="text-medium text-start">
                      <p
                        className="leading-none"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        {`Recording ${idx + 1}`}
                      </p>
                      <span
                        className="text-muted 2xl:text-sm text-xs"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Just Now
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-muted 2xl:text-sm text-xs text-nowrap my-auto"
                    style={getFontStyle(fontTheme, "body2")}
                  >
                    4 mins 35 secs
                  </span>
                </div>
              ))}
            </div>
            <div className="text-end mt-4 space-y-2 p-3">
              <Button
                color="primary"
                size="small"
                style={getFontStyle(fontTheme, "body2")}
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
          <div
            className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            <h2
              className="text-lg font-medium"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Recordings Output
            </h2>
            <a
              href=""
              className="text-primary"
              style={getFontStyle(fontTheme, "body2")}
            >
              Update Data in Profile
            </a>
          </div>
          {!consultation?.is_finished &&
            !consultation?.recording_ai_voice_note ? (
            <div className="my-32 text-center">
              <h1
                className="text-muted text-2xl font-bold my-auto"
                style={getFontStyle(fontTheme, "body2")}
              >
                No Analysis Data Available
              </h1>
            </div>
          ) : (
            <div
              className="p-4"
              style={getFontStyle(fontTheme, "body1")}
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
