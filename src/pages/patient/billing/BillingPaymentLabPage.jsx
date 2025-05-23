const BillingPaymentLabPage = () => {
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <div className="mb-3">
                    <label htmlFor="search">Select by Appointment Date</label>
                    <div className="relative mt-2">
                        <input
                            type="date"
                            placeholder="Search by Test"
                            className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Disease Or Allergy</label>
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
                    <label htmlFor="search">Select by Payment Status</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Payment Status
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
                    <div className="relative inline-block">
                        <button
                            id="dropdownButton"
                            className="text-primary font-medium flex items-center 2xl:text-lg text-sm">
                            Lab Tests
                            <span className="material-icons ml-1">expand_more</span>
                        </button>
                        {/* Dropdown Menu */}
                        <ul
                            id="dropdownMenu"
                            className="hidden absolute bg-white shadow-md mt-2 rounded-lg p-2 w-32">
                            <li
                                className="py-1 cursor-pointer hover:bg-gray-100"
                                onclick="window.location.href = 'billing_payments.html'">
                                Past Appointments
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Lab Test/Report Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Disease</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Lab Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Payment Status</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b">August 15, 2024</td>
                                <td className="py-2 px-4 border-b">Lorem ipsum dolor sit amet.</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-warning text-warning">Typhoid</span>
                                </td>
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
                                <td className="py-2 px-4 border-b text-danger">Pending</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex justify-between">
                                        <button className="disabled:opacity-30 disabled:pointer-events-none px-3 py-1 border border-warning rounded-full text-warning hover:bg-warning hover:text-white transition-all duration-150">
                                            Pay Now
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
                                <td className="py-2 px-4 border-b">August 15, 2024</td>
                                <td className="py-2 px-4 border-b">Lorem ipsum dolor sit amet.</td>
                                <td className="py-2 px-4 border-b">
                                    <span className="px-2 py-1 border rounded-full border-info text-info">Cold</span>
                                </td>
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
                                <td className="py-2 px-4 border-b text-success">Completed</td>
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

export default BillingPaymentLabPage;
