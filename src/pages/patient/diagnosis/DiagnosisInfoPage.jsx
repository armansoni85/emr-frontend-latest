const DiagnosisInfoPage = () => {
    return (
        <>
            <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
                <div className="mb-3">
                    <label htmlFor="search">Search</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search by Diagnosis"
                            className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
                        />
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                        <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">Search</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Filter by Treatment Status</label>
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
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                        <h2 className="text-lg font-medium">Hypertension</h2>
                    </div>
                    <div className="p-4">
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Condition Overview</h3>
                            <div className="px-2 text-black">
                                <ul className="ps-5 list-disc">
                                    <li>
                                        <strong>What is Hypertension?</strong> <br />
                                        <p className="text-body">
                                            Hypertension, or high blood pressure, is a condition where the force of the blood against your artery
                                            walls is too high. If left untreated, it can lead to heart disease or stroke.
                                        </p>
                                    </li>
                                    <li>
                                        <strong>How Does It Work?</strong> <br />
                                        <p className="text-body">
                                            Your heart pumps blood through your arteries. When this pressure becomes too high, it puts extra strain on
                                            your heart and blood vessels, which can lead to damage over time.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3">
                            <h3 className="2xl:text-md text-sm font-medium bg-grey px-3 py-2 rounded-lg mb-2">Treatment Options</h3>
                            <div className="px-2 text-black">
                                <ul className="ps-5 list-disc">
                                    <li>
                                        <strong>Your Treatment Choices</strong> <br />
                                        <p className="text-body">
                                            <strong className="text-black">Medications:</strong> Doctors may prescribe blood pressure-lowering
                                            medications such as ACE inhibitors, diuretics, or beta-blockers. <br />
                                            <strong className="text-black">Lifestyle Changes:</strong> Maintaining a healthy diet, regular exercise,
                                            and reducing salt intake can help control your blood pressure.
                                        </p>
                                    </li>
                                    <li>
                                        <strong>What to Expect from Treatment</strong> <br />
                                        <p className="text-body">
                                            Medications may need to be taken daily. Regular monitoring of your blood pressure will help track the
                                            treatment's effectiveness. Lifestyle changes can take time, but consistent habits can significantly lower
                                            your blood pressure.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <img
                        src="../assets/images/weak-young.png"
                        className="rounded-xl"
                        alt=""
                    />
                    <div className="p-3 py-2 bg-white rounded-xl">Context</div>
                    <ul className="ps-5 list-disc">
                        <li>
                            <strong>Condition Overview</strong>
                        </li>
                        <li>Treatment Options</li>
                        <li>Next Step &amp; Recommendations</li>
                        <li>FAQs and Common Concerns</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default DiagnosisInfoPage;
