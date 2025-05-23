const DocumentPage = () => {
    return (
        <>
            <div className="flex justify-between md:flex-row flex-col">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href="documents.html"
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Received Documents
                    </a>
                    <a
                        href="documents_uploaded.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Upload Documents
                    </a>
                </div>
                <div>
                    <button
                        onclick="window.location.href = 'documents_upload.html'"
                        className="px-8 py-3 flex gap-1 text-sm bg-white border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                        <i className="material-icons">upload</i>
                        Upload
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-3 my-3">
                <div className="flex justify-end text-primary mb-2">
                    <a
                        href=""
                        className="text-primary flex">
                        Recents <i className="material-icons">expand_more</i>
                    </a>
                </div>
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2">
                    {/* Recordings Output */}
                    <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                        <div className="p-0">
                            <img
                                className="h-46"
                                src="../assets/images/image 1 (4).png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-between text-muted text-xs">
                            <span className="text-xs">Sent by: Dr. Harry Starc</span>
                            <span className="text-xs">August 20, 2024</span>
                        </div>
                        <h3 className="font-semibold 2xl:text-xl text-lg">Medical Clearance to Race.</h3>
                        <p className="text-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </p>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                        <div className="p-0">
                            <img
                                className="h-46"
                                src="../assets/images/image 1 (4).png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-between text-muted text-xs">
                            <span className="text-xs">Sent by: Dr. Harry Starc</span>
                            <span className="text-xs">August 20, 2024</span>
                        </div>
                        <h3 className="font-semibold 2xl:text-xl text-lg">Medical Clearance to Race.</h3>
                        <p className="text-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </p>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                        <div className="p-0">
                            <img
                                className="h-46"
                                src="../assets/images/image 1 (4).png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-between text-muted text-xs">
                            <span className="text-xs">Sent by: Dr. Harry Starc</span>
                            <span className="text-xs">August 20, 2024</span>
                        </div>
                        <h3 className="font-semibold 2xl:text-xl text-lg">Medical Clearance to Race.</h3>
                        <p className="text-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </p>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                        <div className="p-0">
                            <img
                                className="h-46"
                                src="../assets/images/image 1 (4).png"
                                alt=""
                            />
                        </div>
                        <div className="flex justify-between text-muted text-xs">
                            <span className="text-xs">Sent by: Dr. Harry Starc</span>
                            <span className="text-xs">August 20, 2024</span>
                        </div>
                        <h3 className="font-semibold 2xl:text-xl text-lg">Medical Clearance to Race.</h3>
                        <p className="text-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </p>
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center py-3 gap-2">
                    <span className="text-primary">View More</span>
                    <span className="material-icons">expand_more</span>
                </div>
            </div>
        </>
    );
};

export default DocumentPage;
