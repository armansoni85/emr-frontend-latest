const DoctorPage = () => {
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
                    <label htmlFor="speciality-select">Select Speciality</label>
                    <div className="relative mt-2 text-muted">
                        <select
                            id="speciality-select"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Speciality
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="sub-speciality-select">Select Sub Speciality</label>
                    <div className="relative mt-2 text-muted">
                        <select
                            id="sub-speciality-select"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Sub Speciality
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
                                <th className="py-2 px-4 border-b text-start font-medium">Doctor Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Gender</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Speciality</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Sub Speciality</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Mobile Number</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Email</th>
                                <th className="py-2 px-4 border-b text-start font-medium" />
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b ">
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onclick="window.location.href = 'doctor_profile.html'">
                                        <img
                                            src="assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Dr. Jane Smith</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">Female</td>
                                <td className="py-2 px-4 border-b">Cardiology</td>
                                <td className="py-2 px-4 border-b">Interventional Cardiology</td>
                                <td className="py-2 px-4 border-b">123-456-7890</td>
                                <td className="py-2 px-4 border-b">jane.smith@example.com</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <a
                                                href="doctor_profile.html"
                                                className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                                View Profile
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

export default DoctorPage;
