const CustomColorThemePage = () => {
    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <a
                        href="customizations.html"
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Color Theme
                    </a>
                    <a
                        href="customizations_notification.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Notification Preferences
                    </a>
                    <a
                        href="customizations_integration.html"
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Integration Preferences
                    </a>
                </div>
                <div>
                    <div className="flex justify-end mb-4 gap-2">
                        <button className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                            Cancel
                        </button>
                        <button className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 px-3 py-3 gap-3">
                <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
                    {/* Recordings */}
                    <div className="h-full">
                        <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                            <h2 className="text-lg font-medium">Set Color Theme</h2>
                            <button className="text-primary">Reset to Default</button>
                        </div>
                        <div className="relative">
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="primaryColor"
                                    className="block text-nowrap my-auto">
                                    Primary Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="primaryColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#002952"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="primaryColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-primary rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="secondaryColor"
                                    className="block text-nowrap my-auto">
                                    Secondary Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="secondaryColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#CF0000"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="secondaryColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#CF0000] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="tertiaryColor"
                                    className="block text-nowrap my-auto">
                                    Tertiary Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="tertiaryColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#00A1CF"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="tertiaryColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#00A1CF] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="headingColor"
                                    className="block text-nowrap my-auto">
                                    Heading Text Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="headingColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#333333"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="headingColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#333333] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="bodyTextColor"
                                    className="block text-nowrap my-auto">
                                    Body Text Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="bodyTextColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#666666"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="bodyTextColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#666666] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="borderColor"
                                    className="block text-nowrap my-auto">
                                    Border Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="borderColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#CCCCCC"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="borderColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#CCCCCC] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 grid lg:grid-cols-3 grid-cols-1">
                                <label
                                    htmlFor="linkColor"
                                    className="block text-nowrap my-auto">
                                    Link Color:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <input
                                        id="linkColor"
                                        type="text"
                                        placeholder="#000000"
                                        defaultValue="#1A73E8"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full"
                                    />
                                    <input
                                        id="linkColorOpacity"
                                        type="number"
                                        min={0}
                                        max={1}
                                        step="0.01"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2"
                                        placeholder="Opacity"
                                        defaultValue={100}
                                    />
                                    <div className="w-6 h-6 bg-[#1A73E8] rounded-full ms-1 p-5 rounded-full border-8 border-grey outline outline-white" />
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recordings Output */}
                <div className="bg-white rounded-[20px] shadow-lg mb-4">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
                        <h2 className="text-lg font-medium">Set Typography</h2>
                        <button className="text-primary">Reset to Default</button>
                    </div>
                    <div className="">
                        <div className="p-4">
                            <label
                                htmlFor="linkColor"
                                className="block text-nowrap my-auto mb-3">
                                Link Color:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="fontSelect"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                    <option value="Poppins">Poppins</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                </select>
                                <select
                                    id="fontWeightSelect"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                    <option value={400}>Normal</option>
                                    <option value={500}>Medium</option>
                                    <option value={600}>Semi-Bold</option>
                                    <option value={700}>Bold</option>
                                </select>
                                <select
                                    id="fontSizeSelect"
                                    className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                    <option value="12px">12px</option>
                                    <option value="14px">14px</option>
                                    <option value="16px">16px</option>
                                    <option value="18px">18px</option>
                                    <option value="20px">20px</option>
                                    <option value="22px">22px</option>
                                    <option value="24px">24px</option>
                                </select>
                                <div className="ml-2">
                                    <button className="bg-white rounded-full p-2 pb-1">
                                        <i className="material-icons text-body">refresh</i>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    htmlFor="subHeading"
                                    className="block text-nowrap my-auto mb-3">
                                    Sub Heading:
                                </label>
                                <div className="flex items-center w-full col-span-2">
                                    <select
                                        id="fontSelect"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                        <option value="Poppins">Poppins</option>
                                        <option value="Arial">Arial</option>
                                        <option value="Helvetica">Helvetica</option>
                                    </select>
                                    <select
                                        id="fontWeightSelect"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                        <option value={400}>Normal</option>
                                        <option value={500}>Medium</option>
                                        <option value={600}>Semi-Bold</option>
                                        <option value={700}>Bold</option>
                                    </select>
                                    <select
                                        id="fontSizeSelect"
                                        className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                        <option value="12px">12px</option>
                                        <option value="14px">14px</option>
                                        <option value="16px">16px</option>
                                        <option value="18px">18px</option>
                                        <option value="20px">20px</option>
                                        <option value="22px">22px</option>
                                        <option value="24px">24px</option>
                                    </select>
                                    <div className="ml-2">
                                        <button className="bg-white rounded-full p-2 pb-1">
                                            <i className="material-icons text-body">refresh</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        htmlFor="bodyText1"
                                        className="block text-nowrap my-auto mb-3">
                                        Body Text 1:
                                    </label>
                                    <div className="flex items-center w-full col-span-2">
                                        <select
                                            id="fontSelect"
                                            className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                            <option value="Poppins">Poppins</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Helvetica">Helvetica</option>
                                        </select>
                                        <select
                                            id="fontWeightSelect"
                                            className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                            <option value={400}>Normal</option>
                                            <option value={500}>Medium</option>
                                            <option value={600}>Semi-Bold</option>
                                            <option value={700}>Bold</option>
                                        </select>
                                        <select
                                            id="fontSizeSelect"
                                            className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                            <option value="12px">12px</option>
                                            <option value="14px">14px</option>
                                            <option value="16px">16px</option>
                                            <option value="18px">18px</option>
                                            <option value="20px">20px</option>
                                            <option value="22px">22px</option>
                                            <option value="24px">24px</option>
                                        </select>
                                        <div className="ml-2">
                                            <button className="bg-white rounded-full p-2 pb-1">
                                                <i className="material-icons text-body">refresh</i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label
                                            htmlFor="bodyText2"
                                            className="block text-nowrap my-auto mb-3">
                                            Body Text 2:
                                        </label>
                                        <div className="flex items-center w-full col-span-2">
                                            <select
                                                id="fontSelect"
                                                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                                <option value="Poppins">Poppins</option>
                                                <option value="Arial">Arial</option>
                                                <option value="Helvetica">Helvetica</option>
                                            </select>
                                            <select
                                                id="fontWeightSelect"
                                                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                                <option value={400}>Normal</option>
                                                <option value={500}>Medium</option>
                                                <option value={600}>Semi-Bold</option>
                                                <option value={700}>Bold</option>
                                            </select>
                                            <select
                                                id="fontSizeSelect"
                                                className="focus:outline-none w-full px-5 py-3 bg-grey rounded-full ml-2">
                                                <option value="12px">12px</option>
                                                <option value="14px">14px</option>
                                                <option value="16px">16px</option>
                                                <option value="18px">18px</option>
                                                <option value="20px">20px</option>
                                                <option value="22px">22px</option>
                                                <option value="24px">24px</option>
                                            </select>
                                            <div className="ml-2">
                                                <button className="bg-white rounded-full p-2 pb-1">
                                                    <i className="material-icons text-body">refresh</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomColorThemePage;
