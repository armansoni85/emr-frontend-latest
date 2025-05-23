const PrescriptionListPage = () => {
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
                    <label htmlFor="search">Disease or Allergy</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Disease
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Date</label>
                    <div className="relative mt-2 text-muted">
                        <input
                            type="date"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                        />
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">calendar_today</i>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Prescriptions</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">
                                    Patient Name <i className="material-icons align-middle">arrow_drop_down</i>
                                </th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date of Birth</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Disease</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Refill in</th>
                                <th className="py-2 px-4 border-b text-start font-medium" />
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
                                        <span>Michael Brown</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">01/01/1980</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-warning text-warning">Typhoid</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 11:00 AM</td>
                                <td className="py-2 px-4 border-b">5 days</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">file_download</i>
                                            </button>
                                            <button className="px-3 py-1">
                                                <i className="material-icons">print</i>
                                            </button>
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
                                        <span>Michael Brown</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">02/02/1990</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-info text-info">Cholera</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 12:00 PM</td>
                                <td className="py-2 px-4 border-b">10 days</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">file_download</i>
                                            </button>
                                            <button className="px-3 py-1">
                                                <i className="material-icons">print</i>
                                            </button>
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
                                        <span>Michael Brown</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">03/03/1985</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-danger text-danger">Fever</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 01:00 PM</td>
                                <td className="py-2 px-4 border-b">15 days</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">file_download</i>
                                            </button>
                                            <button className="px-3 py-1">
                                                <i className="material-icons">print</i>
                                            </button>
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
                                        <span>Michael Brown</span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">04/04/1975</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-purple text-purple">Malaria</span>
                                </td>
                                <td className="py-2 px-4 border-b">November 12, 2024, 02:00 PM</td>
                                <td className="py-2 px-4 border-b">20 days</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="float-right relative">
                                            <button className="px-3 py-1">
                                                <i className="material-icons">file_download</i>
                                            </button>
                                            <button className="px-3 py-1">
                                                <i className="material-icons">print</i>
                                            </button>
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
                            {/* Add more rows as needed */}
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

export default PrescriptionListPage;
