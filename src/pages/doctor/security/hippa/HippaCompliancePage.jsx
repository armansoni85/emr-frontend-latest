const HippaCompliancePage = () => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href="hippa_compliance.html"
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Audit Logs &amp; Monitoring
                    </a>
                    <a
                        href="hippa_compliance_regulatory.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Regulatory Compliance
                    </a>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">Audit Logs &amp; Monitoring</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Event</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Name</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Profile</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Email</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 14:30</td>
                                <td className="py-2 px-4 border-b">Login</td>
                                <td className="py-2 px-4 border-b">Dr. Jane Smith</td>
                                <td className="py-2 px-4 border-b">Doctor</td>
                                <td className="py-2 px-4 border-b">jane.smith@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 15:00</td>
                                <td className="py-2 px-4 border-b">Logout</td>
                                <td className="py-2 px-4 border-b">Dr. John Doe</td>
                                <td className="py-2 px-4 border-b">Doctor</td>
                                <td className="py-2 px-4 border-b">john.doe@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 15:30</td>
                                <td className="py-2 px-4 border-b">File Access</td>
                                <td className="py-2 px-4 border-b">Nurse Mary Johnson</td>
                                <td className="py-2 px-4 border-b">Nurse</td>
                                <td className="py-2 px-4 border-b">mary.johnson@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 16:00</td>
                                <td className="py-2 px-4 border-b">File Update</td>
                                <td className="py-2 px-4 border-b">Admin Alice Brown</td>
                                <td className="py-2 px-4 border-b">Admin</td>
                                <td className="py-2 px-4 border-b">alice.brown@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 16:30</td>
                                <td className="py-2 px-4 border-b">Login</td>
                                <td className="py-2 px-4 border-b">Dr. Emily Davis</td>
                                <td className="py-2 px-4 border-b">Doctor</td>
                                <td className="py-2 px-4 border-b">emily.davis@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 17:00</td>
                                <td className="py-2 px-4 border-b">Logout</td>
                                <td className="py-2 px-4 border-b">Nurse Michael Wilson</td>
                                <td className="py-2 px-4 border-b">Nurse</td>
                                <td className="py-2 px-4 border-b">michael.wilson@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 17:30</td>
                                <td className="py-2 px-4 border-b">File Access</td>
                                <td className="py-2 px-4 border-b">Admin Sarah Lee</td>
                                <td className="py-2 px-4 border-b">Admin</td>
                                <td className="py-2 px-4 border-b">sarah.lee@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 18:00</td>
                                <td className="py-2 px-4 border-b">File Update</td>
                                <td className="py-2 px-4 border-b">Dr. Robert Martinez</td>
                                <td className="py-2 px-4 border-b">Doctor</td>
                                <td className="py-2 px-4 border-b">robert.martinez@example.com</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 border-b">2023-10-01 18:30</td>
                                <td className="py-2 px-4 border-b">Login</td>
                                <td className="py-2 px-4 border-b">Nurse Linda Clark</td>
                                <td className="py-2 px-4 border-b">Nurse</td>
                                <td className="py-2 px-4 border-b">linda.clark@example.com</td>
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

export default HippaCompliancePage;
