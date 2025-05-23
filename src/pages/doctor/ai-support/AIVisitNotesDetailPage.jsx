import { useSelector } from "react-redux";

const AIVisitNotesDetailPage = () => {
    const { showModal } = useSelector((state) => state.modal);

    const handleOpenModal = () => {
        showModal({
            id: "edit-review-voice-notes",
            title: "Edit and Review Voice Notes",
            content: (
                <>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                            Cancel
                        </button>
                        <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                            Schedule
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
                                                src="./assets/images/johnson.png"
                                                className="rounded-xl h-20 w-24"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-between w-full text-nowrap">
                                            <div className="text-start">
                                                <h6 className="text-2xl text-darkBlue font-medium">Henry Johnson</h6>
                                                <div className="flex gap-1 text-sm">
                                                    <span>Date of Birth :</span>
                                                    <span className="text-muted">May 20, 2000</span>
                                                </div>
                                                <div className="flex gap-1 text-sm">
                                                    <span>Last Visit :</span>
                                                    <span className="text-muted">August 12, 2025 - 2:00PM</span>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <a
                                                    href=""
                                                    className="text-primary">
                                                    View Profile
                                                </a>
                                                <p className="mt-7 text-sm">
                                                    Status: <span className="text-success">Done</span>
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
                                                    <td className="text-muted text-center">Male</td>
                                                    <td className="text-muted text-center">26 Years</td>
                                                    <td className="text-muted text-center">68Kg</td>
                                                    <td className="text-muted text-center">5ft 9in</td>
                                                    <td className="text-muted text-center">O+</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-4">
                                <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                    <span className="my-auto">Recording 1</span>
                                    <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons">play_arrow</i>
                                    </span>
                                </div>
                                <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                    <span className="my-auto">Recording 2</span>
                                    <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons">play_arrow</i>
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
                                <p className="text-body px-2">
                                    Patient John Doe, a 35-year-old male, reports experiencing persistent headaches for the past two weeks. He
                                    describes the pain as a throbbing sensation on the left side of his head, which worsens with physical activity. He
                                    also notes symptoms of nausea and sensitivity to light. He rates the pain as 7 out of 10.
                                </p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
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
                                <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Assessment</h3>
                                <div className="px-2 text-body">
                                    <ul className="ps-5 list-disc">
                                        <li>Likely diagnosis: Migraine without aura</li>
                                        <li>Other possible diagnoses: None</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Plan</h3>
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
                </>
            ),
        });
    };

    return (
        <>
            <div className="flex justify-between mb-6">
                <div className="">
                    <div
                        className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                        onclick="goBack()">
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
                            className="focus:outline-none w-full mt-1 px-5 py-3 bg-white text-success border rounded-full">
                            <option
                                value=""
                                selected="">
                                Approved
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
                                        src="./assets/images/johnson.png"
                                        className="rounded-xl h-20 w-24"
                                        alt=""
                                    />
                                </div>
                                <div className="flex justify-between w-full text-nowrap">
                                    <div className="text-start">
                                        <h6 className="text-2xl text-darkBlue font-medium">Henry Johnson</h6>
                                        <div className="flex gap-1 text-sm">
                                            <span>Date of Birth :</span>
                                            <span className="text-muted">May 20, 2000</span>
                                        </div>
                                        <div className="flex gap-1 text-sm">
                                            <span>Last Visit :</span>
                                            <span className="text-muted">August 12, 2025 - 2:00PM</span>
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
                                            <td className="text-muted text-center">789-123-4560</td>
                                            <td className="text-muted text-center">Male</td>
                                            <td className="text-muted text-center">26 Years</td>
                                            <td className="text-muted text-center">68Kg</td>
                                            <td className="text-muted text-center">5ft 9in</td>
                                            <td className="text-muted text-center">O+</td>
                                            <td className="text-muted text-center">N/A</td>
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
                        <a
                            href="#"
                            onclick="openModal('modalTemplate')"
                            className="text-primary">
                            Edit
                        </a>
                    </div>
                    <div className="p-4">
                        <div className="flex gap-3 mb-4">
                            <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                <span className="my-auto">Recording 1</span>
                                <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                    <i className="material-icons">play_arrow</i>
                                </span>
                            </div>
                            <div className="relative flex justify-between text-primary border border-primary rounded-full ps-4 pe-16 py-3">
                                <span className="my-auto">Recording 2</span>
                                <span className="absolute right-2 top-2 bg-danger text-white rounded-full p-1 h-8 w-8 flex items-center justify-center">
                                    <i className="material-icons">play_arrow</i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
                            <p className="text-body px-2">
                                Patient John Doe, a 35-year-old male, reports experiencing persistent headaches for the past two weeks. He describes
                                the pain as a throbbing sensation on the left side of his head, which worsens with physical activity. He also notes
                                symptoms of nausea and sensitivity to light. He rates the pain as 7 out of 10.
                            </p>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Subjective</h3>
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
                            <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Assessment</h3>
                            <div className="px-2 text-body">
                                <ul className="ps-5 list-disc">
                                    <li>Likely diagnosis: Migraine without aura</li>
                                    <li>Other possible diagnoses: None</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-md font-medium bg-grey px-3 py-2 rounded-lg mb-2">Plan</h3>
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

export default AIVisitNotesDetailPage;
