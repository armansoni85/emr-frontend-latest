const MedicalRecordsPage = () => {
    return (
        <>
            <div className="bg-white rounded-2xl grid lg:grid-cols-3 grid-cols-1 p-6 gap-4">
                <div className="bg-white rounded-2xl border">
                    <div className="bg-grey bg-opacity rounded-t-2xl py-3 px-5 border-b">
                        <h6 className="text-xl">Appointments &amp; Lab History</h6>
                    </div>
                    <div className="pt-8 pb-3">
                        <div className="ps-8 pe-6 pb-1">
                            <div className="flex justify-between border-l ps-4 border-primary relative pb-5">
                                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                                <div className="text-start">
                                    <h6>Appointment</h6>
                                    <span className="text-muted font-light">Doctor: John Smith</span>
                                </div>
                                <div className="text-end text-muted font-light text-sm">
                                    <p>August 20,2024</p>
                                    <p>2:00PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="ps-8 pe-6 pb-1">
                            <div className="flex justify-between border-l ps-4 border-primary relative pb-5">
                                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                                <div className="text-start">
                                    <h6>Lab Report</h6>
                                    <span className="text-muted font-light">Report of: Blood Sugar</span>
                                </div>
                                <div className="text-end text-muted font-light text-sm">
                                    <p>August 20,2024</p>
                                    <p>2:00PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="ps-8 pe-6 pb-1">
                            <div className="flex justify-between border-l ps-4 border-primary relative pb-5">
                                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                                <div className="text-start">
                                    <h6>Appointment</h6>
                                    <span className="text-muted font-light">Doctor: John Smith</span>
                                </div>
                                <div className="text-end text-muted font-light text-sm">
                                    <p>August 20,2024</p>
                                    <p>2:00PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="ps-8 pe-6 pb-1">
                            <div className="flex justify-between border-l ps-4 border-primary relative pb-5">
                                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                                <div className="text-start">
                                    <h6>Lab Report</h6>
                                    <span className="text-muted font-light">Report of: Blood Sugar</span>
                                </div>
                                <div className="text-end text-muted font-light text-sm">
                                    <p>August 20,2024</p>
                                    <p>2:00PM</p>
                                </div>
                            </div>
                        </div>
                        <div className="ps-8 pe-6 pb-1">
                            <div className="flex justify-between border-l ps-4 border-primary relative pb-5">
                                <span className="absolute -left-2 bg-white outline outline-white border-4 border-primary rounded-full h-4 w-4" />
                                <div className="text-start">
                                    <h6>Appointment</h6>
                                    <span className="text-muted font-light">Doctor: John Smith</span>
                                </div>
                                <div className="text-end text-muted font-light text-sm">
                                    <p>August 20,2024</p>
                                    <p>2:00PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 col-span-2">
                    <div className="overflow-x-auto border rounded-2xl py-2">
                        <table className="w-full ">
                            <tbody>
                                <tr className="border-b">
                                    <th className="text-start py-2 px-6">Consulting Doctor</th>
                                    <th className="text-start py-2 px-6">For (Disease or Allergy)</th>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-start text-sm py-2 px-6">1. &nbsp;Dr. Alice Johnson</td>
                                    <td className="text-start text-sm py-2 px-6">Allergy to Penicillin</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-start text-sm py-2 px-6">2. Dr. Bob Williams</td>
                                    <td className="text-start text-sm py-2 px-6">Diabetes Type 2</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-start text-sm py-2 px-6">3. Dr. Carol Davis</td>
                                    <td className="text-start text-sm py-2 px-6">Hypertension</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">close</span>
                            </div>
                            <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                <span>Appendectomy (2010)</span>
                                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">close</span>
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
                                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">close</span>
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
                                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">close</span>
                            </div>
                            <div className="bg-white px-5 pr-12 py-2 rounded-full font-light transition-all duration-150 relative">
                                <span>Heart Disease (Father)</span>
                                <span className="material-icons text-muted cursor-pointer absolute right-3 top-[7px] cursor-pointer">close</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MedicalRecordsPage;
