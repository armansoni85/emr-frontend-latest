
import { useNavigate, useParams } from "react-router-dom";
import { getRoutePath } from "@src/utils/routeUtils";
import { useEffect, useRef, useState } from "react";
import { getConsultation, updateConsultation } from "@src/services/consultation.service";
import { closeModal, showModal } from "@src/redux/reducers/modalReducer";
import { useDispatch } from "react-redux";
import { formatDate } from "@src/helper";
import { toast } from "react-toastify";

const AIVisitNotesDetailPage = () => {
    const { id } = useParams();
    const [consultation, setConsultation] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notesRef = useRef(null);


    const handleOpenModal = () => {
        dispatch(showModal({
            id: "edit-review-voice-notes",
            title: "Edit and Review Voice Notes",
            content: (
                <>
                    <div className="flex justify-end mb-4 gap-2">
                        <button
                            onClick={() => dispatch(closeModal("edit-review-voice-notes"))}
                            className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                            Cancel
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    await updateConsultation(id, {
                                        recording_ai_voice_note: notesRef.current?.value
                                    });
                                    toast.success("Notes updated successfully");
                                    await fetchConsultation();
                                    dispatch(closeModal("edit-review-voice-notes"));
                                } catch (error) {
                                    console.error("Error updating notes:", error);
                                    toast.error("Error updating notes");
                                }
                            }}
                            className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                            Save
                        </button>
                    </div>
                    {/* Recordings Output */}
                    <div className="bg-white rounded-[20px] border mb-4 col-span-2">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">Recordings and Output</h2>
                        </div>
                        <div className="p-4">
                            <div className="mb-3 grid lg:grid-cols-2 grid-cols-1">
                                <div className="p-3 rounded-2xl">
                                    <div className="flex gap-3">
                                        <div className="relative">
                                            <img
                                                src={consultation?.appointment?.patient?.flag}
                                                className="rounded-xl h-20 w-24"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-between w-full text-nowrap">
                                            <div className="text-start">
                                                <h6 className="text-2xl text-darkBlue font-medium">{consultation?.appointment?.patient?.first_name + " " + consultation?.appointment?.patient?.last_name ?? "N/A"}</h6>
                                                <div className="flex gap-1 text-sm">
                                                    <span>Date of Birth :</span>
                                                    <span className="text-muted">{consultation?.appointment?.patient?.date_of_birth ?? "N/A"}</span>
                                                </div>
                                                <div className="flex gap-1 text-sm">
                                                    <span>Last Visit :</span>
                                                    <span className="text-muted">{formatDate(consultation?.appointment?.appointment_datetime) ?? "N/A"}</span>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <button
                                                    onClick={() => navigate(getRoutePath("doctor.patients.detail", { id: consultation?.appointment?.patient?.id }))}
                                                    className="text-primary">
                                                    View Profile
                                                </button>
                                                <p className="mt-7 text-sm">
                                                    Status: <span className="text-success">{consultation?.recording_ai_voice_note_status ?? "N/A"}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3 rounded-2xl">
                                    <div className="bg-grey px-2 rounded-lg py-3">
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <th className="font-medium">Gender</th>
                                                    <th className="font-medium">Age</th>
                                                    <th className="font-medium">Weight</th>
                                                    <th className="font-medium">Height</th>
                                                    <th className="font-medium">Blood Group</th>
                                                </tr>
                                                <tr>
                                                    <td className="text-muted text-center">{consultation?.appointment?.patient?.gender ?? "N/A"}</td>
                                                    <td className="text-muted text-center">{consultation?.appointment?.patient?.age ?? "N/A"}</td>
                                                    <td className="text-muted text-center">{consultation?.appointment?.patient?.weight ?? "N/A"}</td>
                                                    <td className="text-muted text-center">{consultation?.appointment?.patient?.height ?? "N/A"}</td>
                                                    <td className="text-muted text-center">{consultation?.appointment?.patient?.blood_group ?? "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-4">
                                {consultation?.recordings?.map((recording, index) => (
                                    <div key={index} className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                        <span className="my-auto">Recording {index + 1}</span>
                                        <audio src={recording.url} className="hidden" id={`audio-${index}`} />
                                        <button
                                            onClick={() => {
                                                const audio = document.getElementById(`audio-${index}`);
                                                if (audio.paused) {
                                                    audio.play();
                                                } else {
                                                    audio.pause();
                                                }
                                            }}
                                            className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                            <i className="material-icons">play_arrow</i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-3">
                                <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Notes</h3>
                                <textarea
                                    ref={notesRef}
                                    className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:border-primary"
                                    placeholder="Enter notes here..."
                                >{notesRef?.current?.value ?? consultation?.recording_ai_voice_note}</textarea>
                            </div>
                        </div>
                    </div>
                </>
            ),
        }));
    };

    const fetchConsultation = async () => {
        const response = await getConsultation(id);
        setConsultation(response);
    };

    useEffect(() => {
        fetchConsultation();
    }, [id]);

    return (
        <>
            <div className="flex justify-between mb-6">
                <div className="">
                    <div
                        className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => navigate(getRoutePath("doctor.ai_supports.visit_notes"))}>
                        <i className="material-icons">chevron_left</i>
                    </div>
                </div>
                <div className="flex gap-2">
                    <label
                        htmlFor="disease"
                        className="block text-nowrap my-auto">
                        AI Voice Note Status:
                    </label>
                    <div className="flex items-center w-full col-span-2">
                        <select
                            id="disease"
                            disabled
                            className="focus:outline-none w-full mt-1 px-5 py-3 bg-white text-success border rounded-full">
                            <option
                                value=""
                                selected="">
                                {consultation?.recording_ai_voice_note_status ?? "N/A"}
                            </option>
                            {/* Add disease options here */}
                        </select>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-[20px] border mb-4 col-span-2">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Patient Details</h2>
                </div>
                <div className="p-4">
                    <div className="mb-3 grid lg:grid-cols-5 grid-cols-1">
                        <div className="p-3 rounded-2xl col-span-2">
                            <div className="flex gap-3">
                                <div className="relative">
                                    <img
                                        src={consultation?.appointment?.patient?.flag}
                                        className="rounded-xl h-20 w-24"
                                        alt=""
                                    />
                                </div>
                                <div className="flex justify-between w-full text-nowrap">
                                    <div className="text-start">
                                        <h6 className="text-2xl text-darkBlue font-medium">{consultation?.appointment?.patient?.first_name + " " + consultation?.appointment?.patient?.last_name ?? "N/A"}</h6>
                                        <div className="flex gap-1 text-sm">
                                            <span>Date of Birth :</span>
                                            <span className="text-muted">{consultation?.appointment?.patient?.date_of_birth ?? "N/A"}</span>
                                        </div>
                                        <div className="flex gap-1 text-sm">
                                            <span>Last Visit :</span>
                                            <span className="text-muted">{formatDate(consultation?.appointment?.appointment_datetime) ?? "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-3 rounded-2xl col-span-3">
                            <div className="bg-grey px-2 rounded-lg py-3">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="font-medium">Mobile Number</th>
                                            <th className="font-medium">Gender</th>
                                            <th className="font-medium">Age</th>
                                            <th className="font-medium">Weight</th>
                                            <th className="font-medium">Height</th>
                                            <th className="font-medium">Blood Group</th>
                                            <th className="font-medium">Disease</th>
                                        </tr>
                                        <tr>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.phone_number ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.gender ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.age ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.weight ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.height ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.blood_group ?? "N/A"}</td>
                                            <td className="text-muted text-center">{consultation?.appointment?.patient?.disease ?? "N/A"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-[20px] border mb-4 col-span-2">
                <div className="bg-white rounded-[20px] border mb-4 col-span-2">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                        <h2 className="text-lg font-medium">Recordings and Output</h2>
                        <button
                            onClick={handleOpenModal}
                            className="text-primary">
                            Edit
                        </button>
                    </div>
                    <div className="p-4">
                        <div className="flex gap-3 mb-4">
                            {consultation?.recordings?.map((recording, index) => (
                                <div key={recording.id} className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                    <span className="my-auto">Recording {index + 1}</span>
                                    <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons">play_arrow</i>
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Notes</h3>
                            <p className="text-body px-2">
                                {consultation?.recording_ai_voice_note ?? "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIVisitNotesDetailPage;
