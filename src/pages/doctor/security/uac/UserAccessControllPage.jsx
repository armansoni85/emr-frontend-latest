const UserAccessControlPage = () => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href=""
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Admin
                    </a>
                    <a
                        href=""
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Doctor
                    </a>
                    <a
                        href=""
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Patient
                    </a>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
                <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
                    {/* Recordings */}
                    <div className=" h-full">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">Doctor's Access</h2>
                            <button className="text-primary">Edit</button>
                        </div>
                        <div className="relative p-4">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <th className="text-start">Access</th>
                                        <th className="text-end">Status</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="flex gap-2">
                                                <div className="form-group">
                                                    <input
                                                        type="checkbox"
                                                        id="edit_patient_profile"
                                                        name="edit_patient_profile"
                                                        className="hidden"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="edit_patient_profile"
                                                        className="cursor-pointer border-2 rounded-lg pt-1">
                                                        <i
                                                            className="material-icons text-green-500"
                                                            id="check_icon">
                                                            check
                                                        </i>
                                                    </label>
                                                </div>
                                                <span className="my-auto inline">To Edit Patient Profile</span>
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <span className="text-green-500 ">Enabled</span>
                                        </td>
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

export default UserAccessControlPage;
