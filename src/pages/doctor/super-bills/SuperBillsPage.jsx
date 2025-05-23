const SuperBillsPage = () => {
    return (
        <>
            <div className="grid md:gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                    <div className="bg-white min-h-[200px] rounded-[20px] shadow-lg mb-4">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                            <h2 className="text-lg font-medium">ICD Codes</h2>
                        </div>
                        <div className="relative px-4">
                            <div className="mb-3 ">
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search by ICD Codes"
                                        className="w-full rounded-full pe-4 ps-10 py-3 border border-grey bg-grey focus:outline-grey2"
                                    />
                                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                                    <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">
                                        Search
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left mt-4">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b-2">ICD Code</th>
                                        <th className="py-2 px-4 border-b-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A00</td>
                                        <td className="py-2 px-4 border-b">Cholera</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A01</td>
                                        <td className="py-2 px-4 border-b">Typhoid and paratyphoid fevers</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A02</td>
                                        <td className="py-2 px-4 border-b">Other salmonella infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A03</td>
                                        <td className="py-2 px-4 border-b">Shigellosis</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A04</td>
                                        <td className="py-2 px-4 border-b">Other bacterial intestinal infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A05</td>
                                        <td className="py-2 px-4 border-b">Other bacterial foodborne intoxications</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A06</td>
                                        <td className="py-2 px-4 border-b">Amebiasis</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A07</td>
                                        <td className="py-2 px-4 border-b">Other protozoal intestinal diseases</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A08</td>
                                        <td className="py-2 px-4 border-b">Viral and other specified intestinal infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A09</td>
                                        <td className="py-2 px-4 border-b">Infectious gastroenteritis and colitis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="bg-white min-h-[200px] rounded-[20px] shadow-lg mb-4">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] ">
                            <h2 className="text-lg font-medium">CPT Codes</h2>
                        </div>
                        <div className="relative px-4">
                            <div className="mb-3 ">
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search by CPT Codes"
                                        className="w-full rounded-full pe-4 ps-10 py-3 border border-grey bg-grey focus:outline-grey2"
                                    />
                                    <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                                    <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">
                                        Search
                                    </button>
                                </div>
                            </div>
                            <table className="w-full text-left mt-4">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b-2">CPT Code</th>
                                        <th className="py-2 px-4 border-b-2">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A00</td>
                                        <td className="py-2 px-4 border-b">Cholera</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A01</td>
                                        <td className="py-2 px-4 border-b">Typhoid and paratyphoid fevers</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A02</td>
                                        <td className="py-2 px-4 border-b">Other salmonella infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A03</td>
                                        <td className="py-2 px-4 border-b">Shigellosis</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A04</td>
                                        <td className="py-2 px-4 border-b">Other bacterial intestinal infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A05</td>
                                        <td className="py-2 px-4 border-b">Other bacterial foodborne intoxications</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A06</td>
                                        <td className="py-2 px-4 border-b">Amebiasis</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A07</td>
                                        <td className="py-2 px-4 border-b">Other protozoal intestinal diseases</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A08</td>
                                        <td className="py-2 px-4 border-b">Viral and other specified intestinal infections</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b">A09</td>
                                        <td className="py-2 px-4 border-b">Infectious gastroenteritis and colitis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperBillsPage;
