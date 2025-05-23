const AIVisitNotesPage = () => {
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <div className="mb-3">
                    <label htmlFor="search">Search</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search by Name or DOB"
                            className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                        />
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                        <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">Search</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Select Consultation Date</label>
                    <div className="relative mt-2 text-muted">
                        <input
                            type="date"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="doctor-select">Select by Doctor Name</label>
                    <div className="relative mt-2 text-muted">
                        <select
                            id="doctor-select"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Doctor
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Consultations (Today)</h2>
                    <div className="text-end inline-block">
                        <span className="text-muted">Total 1460 Results Found</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">Patient Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Patient ID</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Gender</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Mobile Number</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Status</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">AI Voice Notes</th>
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
                                            <p>John Doe</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">#01234568</td>
                                <td className="py-2 px-4 border-b">Male</td>
                                <td className="py-2 px-4 border-b">987-654-3210</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Approved</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 11:00 AM</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="ai_visit_notes_detail.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View &amp; Edit
                                            </a>
                                        </div>
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
                                            <p>Emily Johnson</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">#01234569</td>
                                <td className="py-2 px-4 border-b">Female</td>
                                <td className="py-2 px-4 border-b">555-123-4567</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 12:00 PM</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="ai_visit_notes_detail.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View &amp; Edit
                                            </a>
                                        </div>
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
                                            <p>Michael Brown</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">#01234570</td>
                                <td className="py-2 px-4 border-b">Male</td>
                                <td className="py-2 px-4 border-b">321-654-9870</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Approved</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 1:00 PM</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="ai_visit_notes_detail.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View &amp; Edit
                                            </a>
                                        </div>
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
                                            <p>Sarah Wilson</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">#01234571</td>
                                <td className="py-2 px-4 border-b">Female</td>
                                <td className="py-2 px-4 border-b">456-789-1234</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-danger">Rejected</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 2:00 PM</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="ai_visit_notes_detail.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View &amp; Edit
                                            </a>
                                        </div>
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
                                            <p>David Lee</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">#01234572</td>
                                <td className="py-2 px-4 border-b">Male</td>
                                <td className="py-2 px-4 border-b">789-123-4560</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="text-success">Approved</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 3:00 PM</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="ai_visit_notes_detail.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View &amp; Edit
                                            </a>
                                        </div>
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

export default AIVisitNotesPage;
