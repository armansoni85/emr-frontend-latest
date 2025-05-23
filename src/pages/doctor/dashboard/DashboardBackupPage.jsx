const DashboardBackupPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Patients Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg font-semibold">Total Patients</p>
                            <p className="text-4xl font-bold">645</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="material-icons text-6xl opacity-50">person</span>
                            <p className="text-sm mt-2">145 ↑ vs Last Month</p>
                        </div>
                    </div>
                </div>
                {/* New Patients Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg font-semibold">New Patients</p>
                            <p className="text-4xl font-bold">145</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="material-icons text-6xl opacity-50">person_add</span>
                            <p className="text-sm mt-2">15 ↑ vs Yesterday</p>
                        </div>
                    </div>
                </div>
                {/* Total Appointments Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg font-semibold">Total Appointments</p>
                            <p className="text-4xl font-bold">105</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="material-icons text-6xl opacity-50">favorite</span>
                            <p className="text-sm mt-2">10 ↑ vs Yesterday</p>
                        </div>
                    </div>
                </div>
                {/* Online Appointments Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-md">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-lg font-semibold">Online Appointments</p>
                            <p className="text-4xl font-bold">45</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="material-icons text-6xl opacity-50">chat</span>
                            <p className="text-sm mt-2">5 ↑ vs Yesterday</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Analytics Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-xl font-semibold">Analytics</h3>
                        <p className="text-blue-500">Weekly</p>
                    </div>
                    <div className="flex space-x-2 mb-4">
                        <button className="px-4 py-2 bg-blue-900 text-white rounded-lg">Blood Pressure</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Heart Rate</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Respiration Rate</button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">+1</button>
                    </div>
                    {/* Chart.js Canvas */}
                    <canvas
                        id="analyticsChart"
                        className="w-full h-40"
                    />
                </div>
                {/* Appointments/Lab Tests Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between mb-4">
                        <h3 className="text-xl font-semibold">Appointments/Lab Tests</h3>
                        <p className="text-blue-500">Upcoming</p>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="pb-3">Report/Test Name</th>
                                <th className="pb-3">Lab Name</th>
                                <th className="pb-3">Test Date &amp; Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-3">Echocardiogram</td>
                                <td className="py-3 flex items-center">
                                    <span className="inline-block w-6 h-6 bg-orange-500 text-white rounded-full text-center mr-2">Q</span> Quest
                                    Diagnostics
                                </td>
                                <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3">X-Ray (Shoulder)</td>
                                <td className="py-3 flex items-center">
                                    <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full text-center mr-2">L</span> LabCorp
                                </td>
                                <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3">X-Ray (Arms)</td>
                                <td className="py-3 flex items-center">
                                    <span className="inline-block w-6 h-6 bg-purple-500 text-white rounded-full text-center mr-2">M</span> Mayo Clinic
                                    Lab
                                </td>
                                <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3">Echocardiogram</td>
                                <td className="py-3 flex items-center">
                                    <span className="inline-block w-6 h-6 bg-teal-500 text-white rounded-full text-center mr-2">A</span> ARUP
                                    Laboratories
                                </td>
                                <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                            </tr>
                            <tr className="border-t">
                                <td className="py-3">Echocardiogram</td>
                                <td className="py-3 flex items-center">
                                    <span className="inline-block w-6 h-6 bg-pink-500 text-white rounded-full text-center mr-2">B</span>
                                    BioReference Lab
                                </td>
                                <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardBackupPage;
