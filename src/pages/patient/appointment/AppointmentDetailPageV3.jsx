const AppointmentDetailPageV3 = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Add Your Details</h2>
                </div>
                <div className="mx-auto pt-8 pb-4 2xl:max-w-[60%] md:max-w-[60%] max-w-[80%] relative mb-8">
                    <div className="bg-gray-300 h-[1px] w-full relative">
                        <div className="bg-primary w-[100%] h-[1px] absolute" />
                    </div>
                    <div className="absolute text-primary flex justify-between w-full">
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-primary rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute md:-left-10 -left-4 md:text-nowrap text-body">Personal Details</h6>
                        </div>
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-primary rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute md:-left-9 -left-4 md:text-nowrap text-body">Health Records</h6>
                        </div>
                        <div className="relative">
                            <div className="w-4 h-4 bg-white border-4 border-primary rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute -left-10 md:text-nowrap text-body">Medical Records</h6>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full pb-3 relative">
                    <div className="bg-grey rounded-xl px-4 py-2">
                        <span className="text-header">• Medical Records</span>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex flex-col gap-4 col-span-2">
                        <div className="bg-grey p-6 rounded-2xl">
                            <div className="mb-4 grid lg:grid-cols-3">
                                <label
                                    htmlFor="patientName"
                                    className="block text-nowrap my-auto">
                                    Past Surgeries:
                                </label>
                                <div className="flex items-center w-full col-span-2 relative">
                                    <input
                                        id="patientName"
                                        type="text"
                                        defaultValue="Appendectomy (2016)"
                                        className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                        placeholder="Enter Patient's Name"
                                    />
                                    <span className="absolute right-5 text-primary top-5 cursor-pointer">Add New</span>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                    <span>Appendectomy (2016)</span>
                                    <span className="material-icons text-muted absolute right-3 top-[7px] cursor-pointer">close</span>
                                </div>
                                <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                    <span>Appendectomy (2010)</span>
                                    <span className="material-icons text-muted absolute right-3 top-[7px] cursor-pointer">close</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-grey p-6 rounded-2xl">
                            <div className="mb-4 grid lg:grid-cols-3">
                                <label
                                    htmlFor="patientName"
                                    className="block text-nowrap my-auto">
                                    Previous Hospitalization:
                                </label>
                                <div className="flex items-center w-full col-span-2 relative">
                                    <input
                                        id="patientName"
                                        type="text"
                                        defaultValue="Appendectomy (2016)"
                                        className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                        placeholder="Enter Patient's Name"
                                    />
                                    <span className="absolute right-5 text-primary top-5 cursor-pointer">Add New</span>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                    <span>DMC Hospital (2016 for Pneumonia)</span>
                                    <span className="material-icons text-muted absolute right-3 top-[7px] cursor-pointer">close</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-grey p-6 rounded-2xl">
                            <div className="mb-4 grid lg:grid-cols-3">
                                <label
                                    htmlFor="patientName"
                                    className="block text-nowrap my-auto">
                                    Family Member History:
                                </label>
                                <div className="flex items-center w-full col-span-2 relative">
                                    <input
                                        id="patientName"
                                        type="text"
                                        defaultValue="Appendectomy (2016)"
                                        className="focus:outline-none w-full mt-1 px-5 py-3 bg-white border rounded-full"
                                        placeholder="Enter Patient's Name"
                                    />
                                    <span className="absolute right-5 text-primary top-5 cursor-pointer">Add New</span>
                                </div>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                    <span>Heart Disease (Mother)</span>
                                    <span className="material-icons text-muted absolute right-3 top-[7px] cursor-pointer">close</span>
                                </div>
                                <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                    <span>Heart Disease (Father)</span>
                                    <span className="material-icons text-muted absolute right-3 top-[7px] cursor-pointer">close</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentDetailPageV3;
