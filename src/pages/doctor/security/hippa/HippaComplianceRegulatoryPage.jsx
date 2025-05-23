const HippaComplianceRegulatoryPage = () => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href="hippa_compliance.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Audit Logs &amp; Monitoring
                    </a>
                    <a
                        href="hippa_compliance_regulatory.html"
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Regulatory Compliance
                    </a>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="shadow-lg border p-3 rounded-2xl">
                        <img
                            src="./assets/images/lock.png"
                            alt=""
                        />
                    </div>
                    <h6 className="text-2xl font-medium text-center py-4">You all Data is End to End Encrypted</h6>
                    <p className="text-gray-500 text-center max-w-[90%]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente qui aliquid inventore modi, eaque asperiores numquam
                        rem adipisci eos. Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti id dolorum nobis possimus reiciendis
                        distinctio omnis dolor quos consequatur!
                    </p>
                    <table className="text-start">
                        <tbody>
                            <tr>
                                <td className="p-3">
                                    <i className="material-icons text-green-500 pt-1">check</i> Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Fugit, optio?
                                </td>
                                <td className="p-3">
                                    <i className="material-icons text-green-500">check</i>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, optio?</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3">
                                    <i className="material-icons text-green-500 pt-1">check</i> Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit. Fugit, optio?
                                </td>
                                <td className="p-3">
                                    <i className="material-icons text-green-500">check</i>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, optio?</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HippaComplianceRegulatoryPage;
