const PatientVitalsPage = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Vitals</h2>
                    <div className="text-end inline-block">
                        <button
                            className="bg-primary text-white rounded-full text-nowrap px-3 py-2"
                            onclick="openModal('modalTemplate')">
                            + Add Vitals
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">For (Disease or Allergy)</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Blood Group</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Blood Pressure</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Weight</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Heart Rate</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Height</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Respiratory Rate</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Smoking Status</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Temperature</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 1</td>
                                <td className="py-2 px-4 border-b">A+</td>
                                <td className="py-2 px-4 border-b">120/80</td>
                                <td className="py-2 px-4 border-b">70 kg</td>
                                <td className="py-2 px-4 border-b">72 bpm</td>
                                <td className="py-2 px-4 border-b">175 cm</td>
                                <td className="py-2 px-4 border-b">16 breaths/min</td>
                                <td className="py-2 px-4 border-b">Non-Smoker</td>
                                <td className="py-2 px-4 border-b">98.6°F</td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editVital(1)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteVital(1)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 2</td>
                                <td className="py-2 px-4 border-b">O-</td>
                                <td className="py-2 px-4 border-b">130/85</td>
                                <td className="py-2 px-4 border-b">80 kg</td>
                                <td className="py-2 px-4 border-b">75 bpm</td>
                                <td className="py-2 px-4 border-b">180 cm</td>
                                <td className="py-2 px-4 border-b">18 breaths/min</td>
                                <td className="py-2 px-4 border-b">Smoker</td>
                                <td className="py-2 px-4 border-b">99.1°F</td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editVital(2)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteVital(2)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 3</td>
                                <td className="py-2 px-4 border-b">B+</td>
                                <td className="py-2 px-4 border-b">125/82</td>
                                <td className="py-2 px-4 border-b">65 kg</td>
                                <td className="py-2 px-4 border-b">70 bpm</td>
                                <td className="py-2 px-4 border-b">170 cm</td>
                                <td className="py-2 px-4 border-b">15 breaths/min</td>
                                <td className="py-2 px-4 border-b">Non-Smoker</td>
                                <td className="py-2 px-4 border-b">98.4°F</td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editVital(3)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteVital(3)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 4</td>
                                <td className="py-2 px-4 border-b">AB-</td>
                                <td className="py-2 px-4 border-b">140/90</td>
                                <td className="py-2 px-4 border-b">90 kg</td>
                                <td className="py-2 px-4 border-b">80 bpm</td>
                                <td className="py-2 px-4 border-b">160 cm</td>
                                <td className="py-2 px-4 border-b">20 breaths/min</td>
                                <td className="py-2 px-4 border-b">Smoker</td>
                                <td className="py-2 px-4 border-b">100.2°F</td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editVital(4)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteVital(4)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 5</td>
                                <td className="py-2 px-4 border-b">A+</td>
                                <td className="py-2 px-4 border-b">118/76</td>
                                <td className="py-2 px-4 border-b">68 kg</td>
                                <td className="py-2 px-4 border-b">68 bpm</td>
                                <td className="py-2 px-4 border-b">172 cm</td>
                                <td className="py-2 px-4 border-b">14 breaths/min</td>
                                <td className="py-2 px-4 border-b">Non-Smoker</td>
                                <td className="py-2 px-4 border-b">98.7°F</td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editVital(5)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteVital(5)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end items-center mt-4 mx-4">
                        <div className="space-x-1">
                            <span>Page</span>
                            <button className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150">
                                1
                            </button>
                            <span>of 100</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientVitalsPage;
