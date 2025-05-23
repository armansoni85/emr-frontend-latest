const PatientNotesPage = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Notes</h2>
                    <div className="text-end inline-block">
                        <button
                            className="bg-primary text-white rounded-full text-nowrap px-3 py-2"
                            onclick="openModal('modalTemplate')">
                            + Add Notes
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">
                                    Subjective <i className="material-icons align-middle">arrow_drop_down</i>
                                </th>
                                <th className="py-2 px-4 border-b text-start font-medium">CC</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Allergies</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Vitals</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Plan</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 1</td>
                                <td className="py-2 px-4 border-b">Routine Checkup</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-info text-info">None</span>
                                </td>
                                <td className="py-2 px-4 border-b">Normal</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Done</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editNote(1)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteNote(1)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 2</td>
                                <td className="py-2 px-4 border-b">Follow-up</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-danger text-danger">None</span>
                                </td>
                                <td className="py-2 px-4 border-b">Normal</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editNote(2)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteNote(2)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 3</td>
                                <td className="py-2 px-4 border-b">Consultation</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-purple text-purple">None</span>
                                </td>
                                <td className="py-2 px-4 border-b">Normal</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-info">In Progress</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editNote(3)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteNote(3)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 4</td>
                                <td className="py-2 px-4 border-b">Emergency</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-warning text-warning">None</span>
                                </td>
                                <td className="py-2 px-4 border-b">Normal</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Done</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editNote(4)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteNote(4)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">Subjective 5</td>
                                <td className="py-2 px-4 border-b">Follow-up</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-danger text-danger">None</span>
                                </td>
                                <td className="py-2 px-4 border-b">Normal</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onclick="editNote(5)">
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onclick="deleteNote(5)">
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

export default PatientNotesPage;
