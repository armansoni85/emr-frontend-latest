const LabResultsPage = () => {
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <div className="mb-3">
                    <label htmlFor="search">Search</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search by Test"
                            className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                        />
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                        <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">Search</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Select by Lab Name</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Lab Name
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Select by Doctor Name</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Doctor Name
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">Lab Reports</h2>
                    <div className="text-end inline-block">
                        <span className="text-muted">Total 1460 Lab Results Found</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">Report Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Test Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Lab Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Doctor Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Uploaded On</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b">X-Ray</td>
                                <td className="py-2 px-4 border-b">August 15, 2024</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>John Doe</p>
                                            {/* <span class="text-muted">#12345678</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Michael Johnson</p>
                                            {/* <span class="text-muted">#34567890</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">N/A</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            Download Report
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
                                <td className="py-2 px-4 border-b">MRI Scan</td>
                                <td className="py-2 px-4 border-b">September 20, 2024</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Emily Davis</p>
                                            {/* <span class="text-muted">#45678901</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Jessica Taylor</p>
                                            {/* <span class="text-muted">#67890123</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">N/A</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            Download Report
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
                                <td className="py-2 px-4 border-b">CT Scan</td>
                                <td className="py-2 px-4 border-b">October 5, 2024</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>David Wilson</p>
                                            {/* <span class="text-muted">#78901234</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Robert Garcia</p>
                                            {/* <span class="text-muted">#90123456</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">N/A</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            Download Report
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
                                <td className="py-2 px-4 border-b">Urine Test</td>
                                <td className="py-2 px-4 border-b">November 12, 2024</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Patricia Lee</p>
                                            {/* <span class="text-muted">#01234567</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            src="../assets/images/profile.png"
                                            alt="profile"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div className="text-start">
                                            <p>Daniel Harris</p>
                                            {/* <span class="text-muted">#23456789</span> */}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b">N/A</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                                            Download Report
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
                </div>
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
        </>
    );
};

export default LabResultsPage;
