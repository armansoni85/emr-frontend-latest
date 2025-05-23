import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";

const EmailDeliveryPage = () => {
    return (
        <>
            <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                <NavLinkButton
                    to={getRoutePath("doctor.consultation.efax")}
                    color="white"
                    className={"px-5"}>
                    eFax Delivery
                </NavLinkButton>
                <NavLinkButton
                    to={getRoutePath("doctor.consultation.email")}
                    color="primary"
                    className={"px-5"}>
                    Email Delivery
                </NavLinkButton>
            </div>
            <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
                <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
                    {/* Recordings */}
                    <div className=" h-full">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">History</h2>
                        </div>
                        <div className="relative">
                            <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                                <div className="flex gap-2 w-full">
                                    <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons text-sm">chat</i>
                                    </span>
                                    <div className="text-medium text-start">
                                        <p className="leading-none">Advanced Pharmacology and Drug Management</p>
                                        <span className="text-muted text-sm">Just Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                                <div className="flex gap-2 w-full">
                                    <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons text-sm">chat</i>
                                    </span>
                                    <div className="text-medium text-start">
                                        <p className="leading-none">Advanced Pharmacology and Drug Management</p>
                                        <span className="text-muted text-sm">Just Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                                <div className="flex gap-2 w-full">
                                    <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons text-sm">chat</i>
                                    </span>
                                    <div className="text-medium text-start">
                                        <p className="leading-none">Advanced Pharmacology and Drug Management</p>
                                        <span className="text-muted text-sm">Just Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]">
                                <div className="flex gap-2 w-full">
                                    <span className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center">
                                        <i className="material-icons text-sm">chat</i>
                                    </span>
                                    <div className="text-medium text-start">
                                        <p className="leading-none">Advanced Pharmacology and Drug Management</p>
                                        <span className="text-muted text-sm">Just Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                        <h2 className="text-lg font-medium">Sending Email</h2>
                    </div>
                    <div className="p-4">
                        <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
                            <label
                                htmlFor="recipientFax"
                                className="block my-auto">
                                Recipient Email Number:
                            </label>
                            <div className="flex items-center w-full col-span-4">
                                <input
                                    id="recipientFax"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Enter Email Number"
                                />
                            </div>
                        </div>
                        <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
                            <label
                                htmlFor="recipientName"
                                className="block my-auto">
                                Recipient Name:
                            </label>
                            <div className="flex items-center w-full col-span-4">
                                <input
                                    id="recipientName"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Enter Recipient Name"
                                />
                            </div>
                        </div>
                        <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
                            <label
                                htmlFor="subject"
                                className="block my-auto">
                                Subject:
                            </label>
                            <div className="flex items-center w-full col-span-4">
                                <input
                                    id="subject"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Enter Subject"
                                />
                            </div>
                        </div>
                        <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
                            <label
                                htmlFor="consultationDocument"
                                className="block my-auto">
                                Consultation Document:
                            </label>
                            <div className="flex items-center w-full col-span-4 relative">
                                <input
                                    id="consultationDocument"
                                    type="file"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                />
                                <button className="bg-primary text-white px-4 py-2 rounded-full ml-2 absolute right-2">Browse</button>
                            </div>
                        </div>
                        <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
                            <label
                                htmlFor="reasonsOfVisit"
                                className="block mb-auto mt-2">
                                Custom Message:
                            </label>
                            <div className="flex items-center w-full col-span-4 relative">
                                <textarea
                                    id="reasonsOfVisit"
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                                    placeholder="Type your message here..."
                                    rows={10}
                                    cols={30}
                                    defaultValue={""}
                                />
                                <div className="flex absolute bottom-0 p-2 gap-2">
                                    <button className="bg-primary w-full px-8 py-2 border border-primary text-white rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                        Send
                                    </button>
                                    <button className="bg-white rounded-full p-2 pb-1 transform rotate-45">
                                        <i className="material-icons text-body">attach_file</i>
                                    </button>
                                </div>
                                <div className="flex absolute bottom-0 right-0 p-2 gap-2">
                                    <button className="bg-white rounded-full p-2 pb-1 transform">
                                        <i className="material-icons text-body">delete</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmailDeliveryPage;
