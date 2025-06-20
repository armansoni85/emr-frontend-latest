const AppointmentDatePage = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">
                        <span id="date" /> Appointments
                    </h2>
                    <div className="text-end inline-block">
                        <button className="text-primary  rounded-full text-lg flex">
                            Summary <i className="material-icons pt-1">expand_more</i>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">
                                    Patient Name <i className="material-icons align-middle">arrow_drop_down</i>
                                </th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date of Birth</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Mobile Number</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Disease</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Status</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Full Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'patient_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Sarah Connor</p>
                                            <span className="text-muted">#45678901</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">January 1, 1980</td>
                                <td className="py-2 px-4 border-b">123-456-7890</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-info text-info">Cold</span>
                                </td>
                                <td className="py-2 px-4 border-b">July 10, 2024 - 10:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Done</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button
                                            disabled=""
                                            className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            View
                                        </button>
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'patient_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>John Doe</p>
                                            <span className="text-muted">#23456789</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">February 2, 1985</td>
                                <td className="py-2 px-4 border-b">987-654-3210</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-danger text-danger">Fever</span>
                                </td>
                                <td className="py-2 px-4 border-b">June 15, 2024 - 11:30AM</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button
                                            onclick="openModal('modalTemplate')"
                                            className="px-3 py-1 border border-warning rounded-full text-warning hover:bg-warning hover:text-white transition-all duration-150">
                                            Start
                                        </button>
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'patient_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Jane Smith</p>
                                            <span className="text-muted">#34567890</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">March 3, 1990</td>
                                <td className="py-2 px-4 border-b">555-123-4567</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-purple text-purple">Allergy</span>
                                </td>
                                <td className="py-2 px-4 border-b">May 5, 2024 - 9:00AM</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-info">In Progress</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button
                                            onclick="openModal('modalTemplate')"
                                            className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            View
                                        </button>
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'patient_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Robert Wilson</p>
                                            <span className="text-muted">#56789012</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">April 20, 1982</td>
                                <td className="py-2 px-4 border-b">222-333-4444</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-warning text-warning">Headache</span>
                                </td>
                                <td className="py-2 px-4 border-b">April 20, 2024 - 2:00PM</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Done</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button
                                            onclick="openModal('modalTemplate')"
                                            className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            View
                                        </button>
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'patient_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Emily Davis</p>
                                            <span className="text-muted">#67890123</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">May 15, 1995</td>
                                <td className="py-2 px-4 border-b">333-444-5555</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-danger text-danger">Infection</span>
                                </td>
                                <td className="py-2 px-4 border-b">March 30, 2024 - 4:30PM</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button
                                            onclick="openModal('modalTemplate')"
                                            className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            View
                                        </button>
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">more_vert</i>
                                            </button>
                                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </div>
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

export default AppointmentDatePage;
