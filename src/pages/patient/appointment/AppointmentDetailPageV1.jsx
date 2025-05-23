const AppointmentDetailPageV1 = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Add Your Details</h2>
                </div>
                <div className="mx-auto pt-8 pb-4 2xl:max-w-[60%] md:max-w-[60%] max-w-[80%] relative mb-8">
                    <div className="bg-gray-300 h-[1px] w-full relative">
                        <div className="bg-primary w-[0%] h-[1px] absolute" />
                    </div>
                    <div className="absolute text-primary flex justify-between w-full">
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-primary rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute md:-left-10 -left-4 md:text-nowrap text-body">Personal Details</h6>
                        </div>
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-gray-300 rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute md:-left-9 -left-4 md:text-nowrap text-gray-300">Health Records</h6>
                        </div>
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-gray-300 rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute -left-10 md:text-nowrap text-gray-300">Medical Records</h6>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full pb-3 relative">
                    <div className="bg-grey rounded-xl px-4 py-2">
                        <span className="text-header">• Personal Details</span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="p-4 pt-0">
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="patientName"
                                className="block text-nowrap my-auto">
                                Patient's Name:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="patientName"
                                    type="text"
                                    defaultValue="Henry Johnson"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    placeholder="Enter Patient's Name"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="gender"
                                className="block text-nowrap my-auto">
                                Gender:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="gender"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Male
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="dob"
                                className="block text-nowrap my-auto">
                                Date of Birth:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="dob"
                                    type="date"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    defaultValue="2024-11-20"
                                    placeholder="Enter Date of Birth"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="nationality"
                                className="block text-nowrap my-auto">
                                Nationality:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="nationality"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Indian
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="email"
                                className="block text-nowrap my-auto">
                                Email:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="email"
                                    type="email"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    defaultValue="yaelahman0810@gmail.com"
                                    placeholder="Enter Email"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="mobile"
                                className="block text-nowrap my-auto">
                                Mobile Number:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="mobile"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    defaultValue="+91 86500-65231"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="patientAddress"
                                className="block text-nowrap mb-auto mt-3">
                                Residental Address:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <textarea
                                    id="patientAddress"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-2xl"
                                    placeholder="Enter Address"
                                    rows={6}
                                    cols={30}
                                    defaultValue={"867 Shemika Trail, South Rosalbaborough, AR 84252-6233"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentDetailPageV1;
