const DiagnosisArticlesPage = () => {
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <div className="mb-3">
                    <label htmlFor="search">Search</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search by Article Name"
                            className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                        />
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                        <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">Search</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Filter by Article Category</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Ongoing
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Filter By Date</label>
                    <div className="relative mt-2 text-muted">
                        <input
                            type="date"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                        />
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">calendar_today</i>
                    </div>
                </div>
            </div>
            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2">
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/image 1 (1).png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                    <div className="p-0">
                        <img
                            className="h-46"
                            src="../assets/images/weak-young.png"
                            alt=""
                        />
                    </div>
                    <div className="flex justify-between text-muted text-xs">
                        <span className="text-xs">Category: Lorem Ipsum</span>
                        <span className="text-xs">Category: Lorem Ipsum</span>
                    </div>
                    <h3 className="font-semibold 2xl:text-xl text-lg">Lorem, ipsum dolor.</h3>
                    <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                        Read More
                    </button>
                </div>
            </div>
            <div className="flex justify-center py-3 gap-2">
                <span className="text-primary">View More</span>
                <span className="material-icons">expand_more</span>
            </div>
        </>
    );
};

export default DiagnosisArticlesPage;
