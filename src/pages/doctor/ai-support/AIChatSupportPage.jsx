const AIChatSupportPage = () => {
    return (
        <>
            <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
                <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
                    {/* Recordings */}
                    <div className=" h-full">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">Chat History</h2>
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
                    <div className="p-3">
                        <button className="bg-primary w-full border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                            Start New Conversation
                        </button>
                    </div>
                </div>
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                        <h2 className="text-lg font-medium">AI Chat Support Agent</h2>
                    </div>
                    <div className="p-4 min-h-96">
                        <div className="mb-6 flex gap-2">
                            <div className="bg-primary px-3 py-2 text-white h-[40px] w-[40px] text-center rounded-full">
                                <span>AI</span>
                            </div>
                            <div className="bg-grey text-body p-4 rounded-2xl max-w-lg">
                                Hi!, I am your AI Chat support agent, How can I help you ?
                            </div>
                        </div>
                        <div className="mb-6 flex gap-2 flex-row-reverse">
                            <div className="bg-primary px-3 py-2 text-white h-[40px] w-[40px] text-center rounded-full">
                                <span>JP</span>
                            </div>
                            <div className="bg-grey text-body p-4 rounded-2xl max-w-lg">
                                What are the latest advancements in biologics for autoimmune diseases like rheumatoid arthritis or psoriasis?
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex gap-2">
                            <div className="relative w-full">
                                <input
                                    id="patientName"
                                    type="text"
                                    className="focus:outline-none w-full mt-1 px-14 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Type a message"
                                />
                                <div className="absolute left-1 top-2">
                                    <button className="bg-white rounded-full p-2 pb-1 transform rotate-45">
                                        <i className="material-icons text-body">attach_file</i>
                                    </button>
                                </div>
                                <div className="absolute right-2 top-2">
                                    <button className="rounded-full p-2 pb-1">
                                        <i className="material-icons text-body">mic</i>
                                    </button>
                                </div>
                            </div>
                            <div className="relative pt-1">
                                <button className="bg-primary w-full px-3 py-2 border border-primary text-white rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                    <i className="material-icons">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIChatSupportPage;
