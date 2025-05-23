const CustomNotificationPage = () => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href="customizations.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Color Theme
                    </a>
                    <a
                        href="customizations_notification.html"
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Notification Preferences
                    </a>
                    <a
                        href="customizations_integration.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Integration Preferences
                    </a>
                </div>
                <div>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                            Cancel
                        </button>
                        <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
                <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
                    {/* Recordings */}
                    <div className=" h-full">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">Set Notification Preferences</h2>
                        </div>
                        <div className="relative">
                            <div className="p-4 flex justify-between">
                                <label
                                    htmlFor="appointmentBookingToggle"
                                    className="block text-nowrap my-auto">
                                    Patient's Appointment Booking:
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="appointmentBookingToggle"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="p-4 flex justify-between">
                                <label
                                    htmlFor="newPatientToggle"
                                    className="block text-nowrap my-auto">
                                    New Patient added by admin:
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="newPatientToggle"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="p-4 flex justify-between">
                                <label
                                    htmlFor="labReportsToggle"
                                    className="block text-nowrap my-auto">
                                    Lab Reports Received:
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="labReportsToggle"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="p-4 flex justify-between">
                                <label
                                    htmlFor="upcomingAppointmentsToggle"
                                    className="block text-nowrap my-auto">
                                    Upcoming Appointments:
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="upcomingAppointmentsToggle"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                            <div className="p-4 flex justify-between">
                                <label
                                    htmlFor="adminActivityToggle"
                                    className="block text-nowrap my-auto">
                                    Any Activity by Admin in your profile:
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id="adminActivityToggle"
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-grey peer peer-focus:ring-4 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomNotificationPage;
