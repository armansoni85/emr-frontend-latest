import { InputWithLabel } from "@src/components";

const ScheduleAndAvailabilityPage = () => {
    return (
        <>
            <div className="bg-white rounded-2xl grid lg:grid-cols-2 grid-cols-1 px-3 py-3">
                <div className="">
                    <InputWithLabel
                        wrapperClassName={"p-4"}
                        label={"Departement:"}
                        id={"department"}
                        type={"text"}
                        value={"Cardiology"}
                        readOnly=""
                    />
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="shiftTimings"
                            className="block text-nowrap my-auto">
                            Shift Timings:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <div className="flex gap-2 mt-1">
                                <span className="flex items-center pr-3">From</span>
                                <input
                                    id="shiftStart"
                                    type="time"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                                />
                            </div>
                            <div className="flex gap-2 mt-1 ml-2">
                                <span className="flex items-center pr-3">To</span>
                                <input
                                    id="shiftEnd"
                                    type="time"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="medicalLicense"
                            className="block text-nowrap my-auto">
                            Medical License:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <div className="flex gap-2 mt-1">
                                <span className="flex items-center pr-3">From</span>
                                <input
                                    id="shiftStart"
                                    type="text"
                                    placeholder="Monday"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                                />
                            </div>
                            <div className="flex gap-2 mt-1 ml-2">
                                <span className="flex items-center pr-3">To</span>
                                <input
                                    id="shiftEnd"
                                    type="text"
                                    placeholder="Friday"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey border rounded-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="onCallAvailability"
                            className="block text-nowrap my-auto">
                            On Call Availability:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <select
                                id="onCallAvailability"
                                className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full">
                                <option
                                    value=""
                                    disabled=""
                                    selected="">
                                    Yes
                                </option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                        <label
                            htmlFor="consultationRoom"
                            className="block text-nowrap my-auto">
                            Consultation Room:
                        </label>
                        <div className="flex items-center w-full col-span-2">
                            <input
                                id="consultationRoom"
                                type="text"
                                readOnly=""
                                className="focus:outline-none w-full mt-1 px-5 py-3 border rounded-full"
                                defaultValue="Room 101"
                                placeholder="Enter Consultation Room"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleAndAvailabilityPage;
