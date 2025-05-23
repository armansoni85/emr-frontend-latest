const DashboardPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
                {/* Total Patients Card */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#FF5206] to-[#4F1955] text-white shadow-md">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold font-dashboard">Blood Pressure (mm/Hg)</p>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                                    <svg
                                        width={41}
                                        height={41}
                                        viewBox="0 0 41 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <mask
                                            id="mask0_3557_19400"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={41}
                                            height={41}>
                                            <rect
                                                x="0.466797"
                                                y="0.604279"
                                                width="39.611"
                                                height="39.58"
                                                fill="url(#pattern0_3557_19400)"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_3557_19400)">
                                            <rect
                                                x="0.466797"
                                                y="0.604279"
                                                width="39.611"
                                                height="39.58"
                                                fill="url(#pattern1_3557_19400)"
                                            />
                                            <rect
                                                x="0.466797"
                                                y="0.604279"
                                                width="39.611"
                                                height="39.58"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <pattern
                                                id="pattern0_3557_19400"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}>
                                                <use
                                                    xlinkHref="#image0_3557_19400"
                                                    transform="matrix(0.00195312 0 0 0.00195466 0 -0.00039183)"
                                                />
                                            </pattern>
                                            <pattern
                                                id="pattern1_3557_19400"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}>
                                                <use
                                                    xlinkHref="#image1_3557_19400"
                                                    transform="matrix(0.00195312 0 0 0.00195466 0 -0.00039183)"
                                                />
                                            </pattern>
                                            <image
                                                id="image0_3557_19400"
                                                width={512}
                                                height={512}
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                            <image
                                                id="image1_3557_19400"
                                                width={512}
                                                height={512}
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col text-end mt-auto">
                                <p className="font-dashboard-number text-3xl font-bold">645</p>
                                <p className="font-dashboard-trend text-sm mt-2">145 ↑ vs Last Visit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#299FDF] to-[#4D0CC0] text-white shadow-md">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold font-dashboard">Heart Rate (bpm)</p>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                                    <svg
                                        width={41}
                                        height={41}
                                        viewBox="0 0 41 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <mask
                                            id="mask0_3557_19412"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={41}
                                            height={41}>
                                            <rect
                                                x="0.720703"
                                                y="0.604279"
                                                width="39.611"
                                                height="39.58"
                                                fill="url(#pattern0_3557_19412)"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_3557_19412)">
                                            <rect
                                                x="0.720703"
                                                y="0.604279"
                                                width="39.611"
                                                height="39.58"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <pattern
                                                id="pattern0_3557_19412"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}>
                                                <use
                                                    xlinkHref="#image0_3557_19412"
                                                    transform="matrix(0.00195312 0 0 0.00195466 0 -0.00039183)"
                                                />
                                            </pattern>
                                            <image
                                                id="image0_3557_19412"
                                                width={512}
                                                height={512}
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col text-end mt-auto">
                                <p className="font-dashboard-number text-3xl font-bold">72</p>
                                <p className="font-dashboard-trend text-sm mt-2">145 ↑ vs Last Visit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#E21E78] to-[#702D8A] text-white shadow-md">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold font-dashboard">Respiration Rate (b/min)</p>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                                    <svg
                                        width={41}
                                        height={41}
                                        viewBox="0 0 41 41"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <mask
                                            id="mask0_3557_19423"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={41}
                                            height={41}>
                                            <rect
                                                x="0.974609"
                                                y="0.979279"
                                                width="39.611"
                                                height="39.58"
                                                fill="url(#pattern0_3557_19423)"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_3557_19423)">
                                            <rect
                                                x="0.974609"
                                                y="0.979279"
                                                width="39.611"
                                                height="39.58"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <pattern
                                                id="pattern0_3557_19423"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}>
                                                <use
                                                    xlinkHref="#image0_3557_19423"
                                                    transform="matrix(0.00195312 0 0 0.00195466 0 -0.00039183)"
                                                />
                                            </pattern>
                                            <image
                                                id="image0_3557_19423"
                                                width={512}
                                                height={512}
                                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAIABJREFUeJzt3Xe8HVXV//HPvamkAKEloYTQEaRK7wioqChFBNRHRBGxoT4K+lge0UcUxQai/kAsKIoKCigWBEEFBVSKFJHeSUIvIZD++2PlwM3NPeeesvasmdnf9+u1XoIke9aduWdmnT27gIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIeOqLTkBECjEG2A7YDJgMrA6sADwNPAs8CdwIXAfcBSyOSVNERER6NQn4b+BSYA72UG8nngB+BLwWGF141iIiItKVTYHvYN/s233oN4vHgM9gxYSIiIiU0ATgK8B8en/wD44ngU8DYwv7aURERGRY+wL34f/gHxw3AVsX9DOJiIhICx8EFpD+4d+IedjYAhEREQkwAjiF4h78g+NkoD/5TykiIiIv6MNG6kc9/BtxJioCRERECvMV4h/+jfi/xD+riIiIAAcT/9AfGIuAQ5P+xCIiIpmbDjxF/EN/cMwG1k73Y4uIiOTtAuIf9s3ilwl/bhERkWy9kviH/HDxqmQ/vYiISKauIP4BP1z8PdlPLyIikqGdiX+4txsvS3QORMSR5u+KVMMR0Ql04OjoBERkeH3RCYjIsEYDjwDLRyfSpqeBlbHliUWkpNQDIFJ+O1Cdhz9YrltEJyEirakAECm/PaIT6MKu0QmISGsqAETKb7PoBLqwY3QCItKaCgCR8ts4OoEurBmdgIi0pgJApPymRifQhVWiExCR1lQAiJTfxOgEuqACQKTkNA1QpNxGUM3pdAuBkdFJiEhz6gEQKbeqFulVzVskGyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDKkAkBERCRDKgBEREQypAJAREQkQyoAREREMqQCQEREJEMqAERERDI0MjoBKa0JwBpL/negccAYYC7wxICYU2h2InlbDpgErLQkRgPPA88N+nPPAA8BswvNTipBBUC+lgM2ATYHNgXWBVYDpgJTsAd9JwYXBHcDtwG3D4inPBIXqbmRwDrARktiwyWxCvawn4R9fjsxB5gBzARmAXcBNwE3Ajdjn1/JTF90AlKIfmALYC9gO+yhvz4wouA8HgH+A1wNXAFcCTxccA5VMxKYH51EFxZR/O9XFfUDLwV2A3YGtsKK8VEF5rAAK9BvxD6blyz558UF5iABVADU1zrYA39v4OXAqrHpNHUb8Dfgr8DFwL2x6ZSOCoB66ceK8N2BXbGH/oqhGQ3tYeCPWDFwCXBfbDoiMpw1gQ9g364XVzRuBo4HNvY9NZU1kvhr0k0sTHEyKqofeBn2e30n8deml8/lOq5nRkR6sjJwNPBn7KYbfaPwjOuBT2FdorlSAVBdOwInAw8Qfz08r+ulwJHYWAQRCbAhdnOZQ/xNoYibzsXAfuT32koFQLWMBg7GxrdEX4PU8TzwQ2wQsYgUYBfg19g71ugbQETcir3mGN/riawIFQDVMBn4KPX6tt9JXEGeBbpIcv3Am4B/E/9BL0s8BhwHjO3hvFaBCoByWwM4A5tGF33OyxA3Yj0gKgREHOwNXEP8B7uscT9wFPUdca4CoJwmYIPicngF103cgBUCItKF7bDBNtEf5KrEzdTzhqMCoFxGYwXnLOLPcRXiYmCbrs60SIamAD8l/oNb1fgltqJhXagAKI89gDuIP7dVi0XYYMGyrkUiEq4PeCvwKPEf2KrHw8BBnZ3+0lIB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"
                                            />
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col text-end mt-auto">
                                <p className="font-dashboard-number text-3xl font-bold">16</p>
                                <p className="font-dashboard-trend text-sm mt-2">2 ↑ vs Last Visit</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#3B9E81] to-[#0A587E] text-white shadow-md">
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold font-dashboard">Temperature</p>
                        <div className="flex justify-between w-full">
                            <div>
                                <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                                    <svg
                                        width={40}
                                        height={40}
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <mask
                                            id="mask0_3557_19434"
                                            style={{ maskType: "alpha" }}
                                            maskUnits="userSpaceOnUse"
                                            x={0}
                                            y={0}
                                            width={40}
                                            height={40}>
                                            <rect
                                                x="0.226562"
                                                y="0.0183411"
                                                width="39.611"
                                                height="39.58"
                                                fill="url(#pattern0_3557_19434)"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_3557_19434)">
                                            <rect
                                                x="0.226562"
                                                y="0.0183411"
                                                width="39.611"
                                                height="39.58"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <pattern
                                                id="pattern0_3557_19434"
                                                patternContentUnits="objectBoundingBox"
                                                width={1}
                                                height={1}>
                                                <use
                                                    xlinkHref="#image0_3557_19434"
                                                    transform="matrix(0.00195312 0 0 0.00195466 0 -0.00039183)"
                                                />
                                            </pattern>
                                            <image
                                                id="image0_3557_19434"
                                                width={512}
                                                height={512}
                                                xlinkHref="data:image/png;base64,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"
                                            />
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col text-end mt-auto">
                                <p className="font-dashboard-number text-3xl font-bold">98.6</p>
                                <p className="font-dashboard-trend text-sm mt-2">2% ↑ vs Last Visit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="grid xl:grid-cols-10 lg:grid-cols-2 md:grid-cols-1 gap-4 grid-cols-1">
                {/* First row, first and second columns */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-5">
                    <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                        <h3 className="2xl:text-xl lg:text-sm font-semibold">Analytics</h3>
                        <div className="relative inline-block">
                            <button
                                id="dropdownButton"
                                className="text-primary font-medium flex items-center 2xl:text-lg text-sm">
                                Weekly
                                <span className="material-icons ml-1">expand_more</span>
                            </button>
                            {/* Dropdown Menu */}
                            <ul
                                id="dropdownMenu"
                                className="hidden absolute bg-white shadow-md mt-2 rounded-lg p-2 w-32">
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadWeeklyData()">
                                    Weekly
                                </li>
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadMonthlyData()">
                                    Monthly
                                </li>
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadYearlyData()">
                                    Yearly
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4">
                        {/* Buttons for Patients */}
                        <div className="flex space-x-2 mb-4">
                            <button
                                id="totalPatientsBtn"
                                className="px-4 py-2 bg-primary text-white rounded-lg"
                                style={{ borderRadius: "1.5rem" }}>
                                Blood Pleasure
                            </button>
                            <button
                                id="newPatientsBtn"
                                className="px-4 py-2 bg-[#F4F7F9] text-primary rounded-lg"
                                style={{ borderRadius: "1.5rem" }}>
                                Respiration Rate
                            </button>
                        </div>
                        {/* Chart.js Canvas */}
                        <canvas
                            id="analyticsChart"
                            style={{ width: "100%", minHeight: 400, height: "auto" }}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-5">
                    <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                        <h3 className="2xl:text-xl lg:text-sm font-semibold">Analytics</h3>
                        <div className="relative inline-block">
                            <button
                                id="dropdownButton2"
                                className="text-primary font-medium flex items-center 2xl:text-lg text-sm">
                                Weekly
                                <span className="material-icons ml-1">expand_more</span>
                            </button>
                            {/* Dropdown Menu */}
                            <ul
                                id="dropdownMenu2"
                                className="hidden absolute bg-white shadow-md mt-2 rounded-lg p-2 w-32">
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadWeeklyData2()">
                                    Weekly
                                </li>
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadMonthlyData2()">
                                    Monthly
                                </li>
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-100"
                                    onclick="loadYearlyData2()">
                                    Yearly
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4">
                        {/* Buttons for Patients */}
                        <div className="flex space-x-2 mb-4">
                            <button
                                id="totalPatientsBtn2"
                                className="px-4 py-2 bg-primary text-white rounded-lg"
                                style={{ borderRadius: "1.5rem" }}>
                                Heart Rate
                            </button>
                            <button
                                id="newPatientsBtn2"
                                className="px-4 py-2 bg-[#F4F7F9] text-primary rounded-lg"
                                style={{ borderRadius: "1.5rem" }}>
                                Temperature
                            </button>
                        </div>
                        {/* Chart.js Canvas */}
                        <canvas
                            id="analyticsChart2"
                            style={{ width: "100%", minHeight: 400, height: "auto" }}
                        />
                    </div>
                </div>
                {/* This cell will merge with the row below (spans 2 rows) */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto lg:col-span-4 col-span-4">
                    <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                        <h2 className="2xl:text-lg text-sm font-medium">Appointments/Lab Tests</h2>
                        <span className="text-primary font-medium cursor-pointer 2xl:text-lg text-sm">
                            Upcoming <span className="material-icons">expand_more</span>
                        </span>
                    </div>
                    <div className="p-4 2xl:text-lg lg:text-sm">
                        {/* Appointment 1 */}
                        <div className="flex justify-between font-semibold">
                            <h6>Where &amp; When</h6>
                            <h6>Report/Test Name</h6>
                        </div>
                        <div className="flex justify-between items-center border-b py-3">
                            <div>
                                <div className="flex flex-wrap 2xl:text-lg text-xs">
                                    <span className="inline-block w-5 h-5 bg-orange-500 text-white rounded-full text-center mr-2">Q</span>
                                    <div className="flex flex-col">
                                        <h6>Quest Diagnostics</h6>
                                        <span className="2xl:text-xs text-xs text-muted">Aug 20, 2024 - 12:40PM</span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-body">
                                Echocardiogram
                            </a>
                        </div>
                        {/* Appointment 2 */}
                        <div className="flex justify-between items-center border-b py-3">
                            <div>
                                <div className="flex flex-wrap 2xl:text-lg text-xs">
                                    <span className="inline-block w-5 h-5 bg-green-500 text-white rounded-full text-center mr-2">Q</span>
                                    <div className="flex flex-col">
                                        <h6>LabCorp</h6>
                                        <span className="2xl:text-xs text-xs text-muted">Aug 21, 2024 - 09:00AM</span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-body">
                                Blood Test
                            </a>
                        </div>
                        {/* Appointment 3 */}
                        <div className="flex justify-between items-center border-b py-3">
                            <div>
                                <div className="flex flex-wrap 2xl:text-lg text-xs">
                                    <span className="inline-block w-5 h-5 bg-blue-500 text-white rounded-full text-center mr-2">Q</span>
                                    <div className="flex flex-col">
                                        <h6>HealthPlus</h6>
                                        <span className="2xl:text-xs text-xs text-muted">Aug 22, 2024 - 11:30AM</span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-body">
                                X-Ray
                            </a>
                        </div>
                        {/* Appointment 4 */}
                        <div className="flex justify-between items-center border-b py-3">
                            <div>
                                <div className="flex flex-wrap 2xl:text-lg text-xs">
                                    <span className="inline-block w-5 h-5 bg-red-500 text-white rounded-full text-center mr-2">Q</span>
                                    <div className="flex flex-col">
                                        <h6>City Hospital</h6>
                                        <span className="2xl:text-xs text-xs text-muted">Aug 23, 2024 - 02:00PM</span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-body">
                                MRI Scan
                            </a>
                        </div>
                        {/* Appointment 5 */}
                        <div className="flex justify-between items-center border-b py-3">
                            <div>
                                <div className="flex flex-wrap 2xl:text-lg text-xs">
                                    <span className="inline-block w-5 h-5 bg-purple-500 text-white rounded-full text-center mr-2">Q</span>
                                    <div className="flex flex-col">
                                        <h6>Wellness Center</h6>
                                        <span className="2xl:text-xs text-xs text-muted">Aug 24, 2024 - 03:15PM</span>
                                    </div>
                                </div>
                            </div>
                            <a
                                href="#"
                                className="text-body">
                                Physical Exam
                            </a>
                        </div>
                    </div>
                </div>
                {/* Second row, first and second columns */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto lg:col-span-3 col-span-4">
                    <div className="flex justify-between items-center mb-4 p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                        <h3 className="2xl:text-lg text-sm font-semibold">Medications</h3>
                    </div>
                    <div className="px-4">
                        <div className="flex justify-between font-semibold">
                            <h6>Medicine Name</h6>
                            <h6>Frequency</h6>
                        </div>
                        <ul>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.98193"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3557_13383)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3557_13383"
                                                x1="6.53256"
                                                y1="0.981934"
                                                x2="-0.343134"
                                                y2="2.32135"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FBB040" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#EF4126"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Echonoclor</p>
                                    <p className="text-gray-500">1-0-1</p>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.98193"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3557_13384)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3557_13384"
                                                x1="6.53256"
                                                y1="0.981934"
                                                x2="-0.343134"
                                                y2="2.32135"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#4CAF50" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#388E3C"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Aspirin</p>
                                    <p className="text-gray-500">1-0-2</p>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.98193"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3557_13385)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3557_13385"
                                                x1="6.53256"
                                                y1="0.981934"
                                                x2="-0.343134"
                                                y2="2.32135"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#2196F3" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#1976D2"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Ibuprofen</p>
                                    <p className="text-gray-500">1-1-1</p>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.98193"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3557_13386)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3557_13386"
                                                x1="6.53256"
                                                y1="0.981934"
                                                x2="-0.343134"
                                                y2="2.32135"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FF9800" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#F57C00"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Metformin</p>
                                    <p className="text-gray-500">1-0-1</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Second row, first and second columns */}
                <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto lg:col-span-3 col-span-4">
                    <div className="flex justify-between items-center mb-4 p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                        <h3 className="2xl:text-lg text-sm font-semibold">Reports/Documents</h3>
                    </div>
                    <div className="px-4">
                        <div className="flex justify-between font-semibold">
                            <h6>Blood Report</h6>
                        </div>
                        <ul>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.17786"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3564_13718)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3564_13718"
                                                x1="6.53256"
                                                y1="0.177857"
                                                x2="-0.343134"
                                                y2="1.51727"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#00AEEF" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#1E5FAC"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Echonoclor</p>
                                    <div className="flex">
                                        <span className="text-body">
                                            <i className="material-icons text-sm">download</i>
                                        </span>
                                        <span className="text-body">
                                            <i className="material-icons text-sm">delete_outline</i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.17786"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3564_13719)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3564_13719"
                                                x1="6.53256"
                                                y1="0.177857"
                                                x2="-0.343134"
                                                y2="1.51727"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FBB040" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#EF4126"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Aspirin</p>
                                    <div className="flex">
                                        <span className="text-body">
                                            <i className="material-icons text-sm">download</i>
                                        </span>
                                        <span className="text-body">
                                            <i className="material-icons text-sm">delete_outline</i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.17786"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3564_13720)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3564_13720"
                                                x1="6.53256"
                                                y1="0.177857"
                                                x2="-0.343134"
                                                y2="1.51727"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#00AEEF" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#1E5FAC"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Ibuprofen</p>
                                    <div className="flex">
                                        <span className="text-body">
                                            <i className="material-icons text-sm">download</i>
                                        </span>
                                        <span className="text-body">
                                            <i className="material-icons text-sm">delete_outline</i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li className="border-b py-3 flex gap-1 w-full">
                                <span className="my-auto">
                                    <svg
                                        width={7}
                                        height={7}
                                        viewBox="0 0 7 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <ellipse
                                            cx="3.52507"
                                            cy="3.17786"
                                            rx="3.00749"
                                            ry={3}
                                            fill="url(#paint0_linear_3564_13721)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_3564_13721"
                                                x1="6.53256"
                                                y1="0.177857"
                                                x2="-0.343134"
                                                y2="1.51727"
                                                gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FBB040" />
                                                <stop
                                                    offset={1}
                                                    stopColor="#EF4126"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                                <div className="flex justify-between 2xl:text-sm text-xs w-full">
                                    <p className="text-body">Metformin</p>
                                    <div className="flex">
                                        <span className="text-body">
                                            <i className="material-icons text-sm">download</i>
                                        </span>
                                        <span className="text-body">
                                            <i className="material-icons text-sm">delete_outline</i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* All pop-ups here */}
            {/* Add Reminder Popup */}
            <div
                id="reminderPopup"
                className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 hidden">
                <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
                    <span
                        className="absolute top-4 right-4 text-gray-600 cursor-pointer text-2xl"
                        onclick="closePopup('reminderPopup')">
                        ×
                    </span>
                    <h3 className="2xl:text-lg text-sm font-semibold mb-4">Add Reminder</h3>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700">
                            Title:
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="Add Your Title Here"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-gray-700">
                            Date:
                        </label>
                        <input
                            id="date"
                            type="text"
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="August 25, 2024"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="time"
                            className="block text-gray-700">
                            Time:
                        </label>
                        <input
                            id="time"
                            type="text"
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="12:00 PM"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="Add Description Here"
                            defaultValue={""}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="notify"
                            className="block text-gray-700">
                            Notify Before:
                        </label>
                        <select
                            id="notify"
                            className="w-full mt-1 p-2 border rounded-lg">
                            <option>30 Mins</option>
                            <option>1 Hour</option>
                            <option>2 Hours</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                            onclick="closePopup('reminderPopup')">
                            Cancel
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Schedule</button>
                    </div>
                </div>
            </div>
            {/* Notifications Popup */}
            {/* Notifications Popup */}
            <div
                id="notificationsPopup"
                className="absolute right-0 top-50 mt-2 bg-white rounded-lg shadow-lg z-50 hidden"
                style={{ marginTop: "-86em", marginLeft: "42em" }}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold font-dashboard">Notifications</h3>
                    <a
                        href="#"
                        className="text-blue-500 text-sm">
                        Mark all as read
                    </a>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                    <li className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-orange-500">person_add</span>
                            <div>
                                <p className="font-bold">New patient Added</p>
                                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">Just Now</span>
                    </li>
                    <li className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-blue-500">check_circle</span>
                            <div>
                                <p className="font-bold">Your leave is approved</p>
                                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">3 Mins Ago</span>
                    </li>
                    <li className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-pink-500">description</span>
                            <div>
                                <p className="font-bold">Patient report generated</p>
                                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">10 Mins Ago</span>
                    </li>
                    <li className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center space-x-3">
                            <span className="material-icons text-purple-500">mail</span>
                            <div>
                                <p className="font-bold">Please check your mail</p>
                                <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur.</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">15 Mins Ago</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default DashboardPage;
