import { useTheme } from "@src/context/ThemeContext";

const DocumentUploadPage = () => {
    const { theme } = useTheme();
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <div>
                        <div
                            className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                            onclick="goBack()">
                            <i className="material-icons">chevron_left</i>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mb-4 gap-2">
                    <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                        Cancel
                    </button>
                    <button
                        onclick="openModal('modalTemplate')"
                        className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Upload Document
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-3 my-3">
                <div id="dropzone">
                    <div className="border border-dashed rounded-xl flex justify-center" style={{ borderColor: theme.borderColor }}>
                        <div className="flex flex-col items-center gap-2 py-24">
                            <img
                                className="w-12"
                                src="../assets/icons/Upload.svg"
                                alt=""
                            />
                            <span>
                                Drag and Drop File Here or <u>Choose File</u>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between text-body py-2">
                        <span>Supported Files (PDF, JPG, PNG)</span>
                        <span>Maximum Size: 25MB</span>
                    </div>
                </div>
                <div className="grid w-full">
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="p-4 flex gap-2 w-full lg:flex-row flex-col">
                            <label
                                htmlFor="patientName"
                                className="block text-nowrap my-auto">
                                Patient's Name:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="patientName"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Enter Patient's Name"
                                />
                            </div>
                        </div>
                        <div className="p-4 flex gap-2 w-full lg:flex-row flex-col">
                            <label
                                htmlFor="disease"
                                className="block text-nowrap my-auto">
                                Category:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="category"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full">
                                    <option
                                        value=""
                                        disabled=""
                                        selected="">
                                        Select Category
                                    </option>
                                    {/* Add category options here */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex gap-2 lg:flex-row flex-col col-span-2">
                        <label
                            htmlFor="reasonsOfVisit"
                            className="block text-nowrap mb-auto mt-2">
                            Reasons of Visit:
                        </label>
                        <div className="flex items-center w-full">
                            <textarea
                                id="reasonsOfVisit"
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                                placeholder="Enter Reasons of Visit"
                                rows={4}
                                cols={30}
                                defaultValue={""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DocumentUploadPage;
