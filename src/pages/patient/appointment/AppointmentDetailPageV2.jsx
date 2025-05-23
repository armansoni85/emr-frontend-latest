const AppointmentDetailPageV2 = () => {
    return (
        <>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                    <h2 className="text-lg font-medium">Add Your Details</h2>
                </div>
                <div className="mx-auto pt-8 pb-4 2xl:max-w-[60%] md:max-w-[60%] max-w-[80%] relative mb-8">
                    <div className="bg-gray-300 h-[1px] w-full relative">
                        <div className="bg-primary w-[50%] h-[1px] absolute" />
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
                            <div className="w-4 h-4 bg-white border-4 border-gray-300 rounded-full outline outline-white absolute -top-[9px] "></div>
                            <h6 className="pt-3 text-center absolute -left-10 md:text-nowrap text-gray-300">Medical Records</h6>
                        </div>
                    </div>
                </div>
                <div className="p-4 w-full pb-3 relative">
                    <div className="bg-grey rounded-xl px-4 py-2">
                        <span className="text-header">• Health Records</span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="p-4 pt-0">
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="bloodGroup"
                                className="block text-nowrap my-auto">
                                Blood Group:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="bloodGroup"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Blood Group
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="weight"
                                className="block text-nowrap my-auto">
                                Weight (kg):
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="weight"
                                    type="number"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    placeholder="Enter Weight"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="height"
                                className="block text-nowrap my-auto">
                                Height (cm):
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="height"
                                    type="number"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                    placeholder="Enter Height"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 pt-0">
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="smokingStatus"
                                className="block text-nowrap my-auto">
                                Smoking Status:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="smokingStatus"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Smoking Status
                                    </option>
                                    <option value="smoker">Smoker</option>
                                    <option value="non-smoker">Non-Smoker</option>
                                    <option value="former-smoker">Former Smoker</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="alcoholConsumption"
                                className="block text-nowrap my-auto">
                                Alcohol Consumption:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="alcoholConsumption"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Alcohol Consumption
                                    </option>
                                    <option value="none">None</option>
                                    <option value="occasional">Occasional</option>
                                    <option value="regular">Regular</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="dietaryPreference"
                                className="block text-nowrap my-auto">
                                Dietary Preference:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="dietaryPreference"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Dietary Preference
                                    </option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="non-vegetarian">Non-Vegetarian</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 mb-2">
                            <label
                                htmlFor="exerciseFrequency"
                                className="block text-nowrap my-auto">
                                Exercise Frequency:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="exerciseFrequency"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Exercise Frequency
                                    </option>
                                    <option value="never">Never</option>
                                    <option value="occasionally">Occasionally</option>
                                    <option value="regularly">Regularly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppointmentDetailPageV2;
