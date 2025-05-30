import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {
  getMonthlyPatient,
  getPatientStatistics,
} from "@src/services/patientService";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  // Patient data state
  const [monthlyPatientData, setMonthlyPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);

  // Today's patient data state
  const [todayPatientData, setTodayPatientData] = useState({
    patients_today: 0,
    difference_from_yesterday: 0,
    is_increase: false,
  });

  // Patient Statistics data state
  const [patientStatistics, setPatientStatistics] = useState({
    total_patients: 0,
    last_month_patients: 0,
    this_month_patients: 0,
    difference_from_last_month: 0,
    is_increase: false,
  });

  // Fetch patient statistics
  const fetchPatientStatistics = async () => {
    try {
      const data = await getPatientStatistics();
      setPatientStatistics(data);
    } catch (err) {
      console.error("Error fetching patient statistics:", err);
    }
  };

  // Fetch patient statistics on component mount
  useEffect(() => {
    fetchPatientStatistics();
  }, []);

  // Fetch today's patient data
  const fetchTodayPatients = async () => {
    try {
      const data = await getMonthlyPatient();
      setTodayPatientData(data);
    } catch (err) {
      console.error("Error fetching today's patients:", err);
      setError("Failed to fetch today's patient data");
    }
  };

  // Fetch today's patient data on component mount
  useEffect(() => {
    fetchTodayPatients();
  }, []);

  console.log(todayPatientData);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate calendar days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const prevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    0
  );
  const daysInPrevMonth = prevMonth.getDate();

  const calendarDays = [];

  // Previous month days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // Next month days
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  // Fetch monthly patient data
  const fetchMonthlyPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMonthlyPatient();
      setMonthlyPatientData(data);
    } catch (err) {
      setError("Failed to fetch monthly patient data");
      console.error("Error fetching monthly patients:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when month changes
  useEffect(() => {
    fetchMonthlyPatients();
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(day);
      // Get appointments for the selected date
      const selectedDateObj = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const appointmentsForDate = getAppointmentsForDate(selectedDateObj);
      setSelectedDateAppointments(appointmentsForDate);
    }
  };

  // Helper function to check if a date has patient appointments
  const hasPatientAppointments = (day) => {
    if (!monthlyPatientData?.patients) return false;

    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return monthlyPatientData.patients.some((patient) => {
      const patientDate = new Date(patient.date_joined);
      return patientDate.toDateString() === targetDate.toDateString();
    });
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (targetDate) => {
    if (!monthlyPatientData?.patients) return [];

    return monthlyPatientData.patients.filter((patient) => {
      const patientDate = new Date(patient.date_joined);
      return patientDate.toDateString() === targetDate.toDateString();
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get today's date for highlighting
  const today = new Date();
  const isToday = (day) => {
    return (
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear() &&
      day === today.getDate()
    );
  };

  const chartData = {
    weekly: {
      labels: [
        "Cholesterol",
        "Diabetic",
        "Low Blood Pressure",
        "Malaria",
        "Others",
      ],
      data: [100, 50, 40, 30, 10],
      totalPatients: 230,
    },
    monthly: {
      labels: [
        "Cholesterol",
        "Diabetic",
        "Low Blood Pressure",
        "Malaria",
        "Others",
      ],
      data: [420, 200, 180, 150, 50],
      totalPatients: 1000,
    },
    yearly: {
      labels: [
        "Cholesterol",
        "Diabetic",
        "Low Blood Pressure",
        "Malaria",
        "Others",
      ],
      data: [5000, 3000, 2500, 2000, 1000],
      totalPatients: 13500,
    },
  };

  const currentData = chartData[selectedPeriod];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
  };

  const data = {
    labels: currentData.labels,
    datasets: [
      {
        data: currentData.data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF8C00",
          "#9ACD32",
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const getPeriodLabel = (period) => {
    switch (period) {
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
      case "yearly":
        return "This Year";
      default:
        return "This Month";
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {/* Total Patients Card */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold font-dashboard">
                Total Patients
              </p>
              <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                <svg
                  width={42}
                  height={41}
                  viewBox="0 0 42 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask
                    id="mask0_3418_1471"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={42}
                    height={41}
                  >
                    <rect
                      x="0.9375"
                      y="0.10498"
                      width="40.5791"
                      height="40.5791"
                      fill="url(#pattern0_3418_1471)"
                    />
                  </mask>
                  <g mask="url(#mask0_3418_1471)">
                    <rect
                      x="0.9375"
                      y="0.10498"
                      width="40.5791"
                      height="40.5791"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <pattern
                      id="pattern0_3418_1471"
                      patternContentUnits="objectBoundingBox"
                      width={1}
                      height={1}
                    >
                      <use
                        xlinkHref="#image0_3418_1471"
                        transform="scale(0.00195312)"
                      />
                    </pattern>
                    <image
                      id="image0_3418_1471"
                      width={512}
                      height={512}
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center mt-auto">
              <p className="font-dashboard-number text-4xl font-bold">
                {patientStatistics.total_patients}
              </p>
              <p className="font-dashboard-trend text-sm mt-2">
                {patientStatistics.difference_from_last_month}{" "}
                {patientStatistics.is_increase ? "↑" : "↓"} vs Last Month
              </p>
            </div>
          </div>
        </div>
        {/* New Patients Card */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold font-dashboard">
                New Patients
              </p>
              <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                <svg
                  width={42}
                  height={41}
                  viewBox="0 0 42 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask
                    id="mask0_3418_1491"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={42}
                    height={41}
                  >
                    <rect
                      x="0.9375"
                      y="0.104004"
                      width="40.58"
                      height="40.58"
                      fill="url(#pattern0_3418_1491)"
                    />
                  </mask>
                  <g mask="url(#mask0_3418_1491)">
                    <rect
                      x="0.9375"
                      y="0.104004"
                      width="40.58"
                      height="40.58"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <pattern
                      id="pattern0_3418_1491"
                      patternContentUnits="objectBoundingBox"
                      width={1}
                      height={1}
                    >
                      <use
                        xlinkHref="#image0_3418_1491"
                        transform="scale(0.00195312)"
                      />
                    </pattern>
                    <image
                      id="image0_3418_1491"
                      width={512}
                      height={512}
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center mt-auto">
              <p className="font-dashboard-number text-4xl font-bold">
                {todayPatientData.patients_today}
              </p>
              <p className="font-dashboard-trend text-sm mt-2">
                {todayPatientData.difference_from_yesterday}{" "}
                {todayPatientData.is_increase ? "↑" : "↓"} vs Yesterday
              </p>
            </div>
          </div>
        </div>
        {/* Total Appointments Card */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold font-dashboard">
                Total Appointments
              </p>
              <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask
                    id="mask0_3418_1481"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={42}
                    height={42}
                  >
                    <rect
                      x="0.9375"
                      y="0.479004"
                      width="40.58"
                      height="40.58"
                      fill="url(#pattern0_3418_1481)"
                    />
                  </mask>
                  <g mask="url(#mask0_3418_1481)">
                    <rect
                      x="0.9375"
                      y="0.479004"
                      width="40.58"
                      height="40.58"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <pattern
                      id="pattern0_3418_1481"
                      patternContentUnits="objectBoundingBox"
                      width={1}
                      height={1}
                    >
                      <use
                        xlinkHref="#image0_3418_1481"
                        transform="scale(0.00195312)"
                      />
                    </pattern>
                    <image
                      id="image0_3418_1481"
                      width={512}
                      height={512}
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center mt-auto">
              <p className="font-dashboard-number text-4xl font-bold">105</p>
              <p className="font-dashboard-trend text-sm mt-2">
                10 ↑ vs Yesterday
              </p>
            </div>
          </div>
        </div>
        {/* Online Appointments Card */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#DF00FF] to-[#8100FF] text-white shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold font-dashboard">
                Online Appointments
              </p>
              <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14">
                <svg
                  width={42}
                  height={42}
                  viewBox="0 0 42 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <mask
                    id="mask0_3418_1501"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={42}
                    height={42}
                  >
                    <rect
                      x="0.9375"
                      y="0.518066"
                      width="40.58"
                      height="40.58"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_3418_1501)">
                    <mask
                      id="mask1_3418_1501"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={-5}
                      y={-6}
                      width={53}
                      height={53}
                    >
                      <rect
                        x="-4.64062"
                        y="-5.06372"
                        width="51.7436"
                        height="51.7436"
                        fill="url(#pattern0_3418_1501)"
                      />
                    </mask>
                    <g mask="url(#mask1_3418_1501)">
                      <rect
                        x="0.9375"
                        y="0.518066"
                        width="40.58"
                        height="40.58"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <pattern
                      id="pattern0_3418_1501"
                      patternContentUnits="objectBoundingBox"
                      width={1}
                      height={1}
                    >
                      <use
                        xlinkHref="#image0_3418_1501"
                        transform="scale(0.00195312)"
                      />
                    </pattern>
                    <image
                      id="image0_3418_1501"
                      width={512}
                      height={512}
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center mt-auto">
              <p className="font-dashboard-number text-4xl font-bold">45</p>
              <p className="font-dashboard-trend text-sm mt-2">
                5 ↑ vs Yesterday
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="grid xl:grid-cols-8 lg:grid-cols-2 md:grid-cols-1 gap-4 grid-cols-1">
        {/* First row, first and second columns */}
        <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-3">
          <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
            <h3 className="2xl:text-xl lg:text-sm font-semibold">
              Appointments Date
            </h3>
            {/* Patient Statistics */}
            {monthlyPatientData && (
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-blue-600 font-medium">
                  Total: {monthlyPatientData.total_current_month_patients}
                </span>
                <span className="text-green-600 font-medium">
                  Today: {monthlyPatientData.patients_today}
                </span>
              </div>
            )}
          </div>

          <div className="p-4">
            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-2 text-blue-600">
                Loading patient data...
              </div>
            )}
            {error && (
              <div className="text-center py-2 text-red-600 bg-red-50 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Month/Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {months[currentDate.getMonth()]}
                </h2>
                <h2 className="text-lg font-semibold text-gray-800">
                  {currentDate.getFullYear()}
                </h2>
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className="text-center py-2 text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dateObj, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleDateClick(dateObj.day, dateObj.isCurrentMonth)
                  }
                  className={`
                                    h-10 w-full flex items-center justify-center text-sm rounded-lg transition-colors relative
                                    ${
                                      dateObj.isCurrentMonth
                                        ? "text-gray-900 hover:bg-gray-100"
                                        : "text-gray-300"
                                    }
                                    ${
                                      dateObj.isCurrentMonth &&
                                      dateObj.day === selectedDate
                                        ? "bg-blue-500 text-white hover:bg-blue-600"
                                        : ""
                                    }
                                    ${
                                      dateObj.isCurrentMonth &&
                                      isToday(dateObj.day)
                                        ? "ring-2 ring-blue-300"
                                        : ""
                                    }
                                `}
                >
                  {dateObj.day}
                  {/* Patient appointment indicator */}
                  {dateObj.isCurrentMonth &&
                    hasPatientAppointments(dateObj.day) && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                </button>
              ))}
            </div>

            {/* Patient Summary for Selected Date */}
            {monthlyPatientData && (
              <div className="mt-4 space-y-4">
                {/* Selected Date Appointments */}
                {selectedDateAppointments.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">
                      Appointments for {months[currentDate.getMonth()]}{" "}
                      {selectedDate}, {currentDate.getFullYear()}
                      <span className="ml-2 text-sm font-normal text-blue-600">
                        ({selectedDateAppointments.length} patient
                        {selectedDateAppointments.length !== 1 ? "s" : ""})
                      </span>
                    </h4>
                    <div className="space-y-3">
                      {selectedDateAppointments.map((patient, index) => (
                        <div
                          key={patient.id}
                          className="bg-white p-3 rounded-lg shadow-sm border"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  {patient.profile_picture ? (
                                    <img
                                      src={patient.profile_picture}
                                      alt="Profile"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-blue-600 font-semibold text-sm">
                                      {(
                                        patient.first_name?.[0] ||
                                        patient.email?.[0] ||
                                        "P"
                                      ).toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">
                                    {patient.first_name || "N/A"}{" "}
                                    {patient.last_name || ""}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {patient.email}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Joined:</span>
                                  <p className="font-medium text-gray-700">
                                    {formatDate(patient.date_joined)}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-500">
                                    Country:
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <img
                                      src={patient.flag}
                                      alt="Flag"
                                      className="w-4 h-3 object-cover"
                                    />
                                    <span className="font-medium text-gray-700">
                                      {patient.country}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-500">
                                    Hospital:
                                  </span>
                                  <p className="font-medium text-gray-700">
                                    {patient.hospital.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {patient.hospital.city},{" "}
                                    {patient.hospital.country}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-gray-500">Status:</span>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        patient.is_active
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {patient.is_active
                                        ? "Active"
                                        : "Inactive"}
                                    </span>
                                    {patient.is_blocked && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        Blocked
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {(patient.disease ||
                                patient.height_feet ||
                                patient.weight_kilo) && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <h6 className="text-sm font-medium text-gray-700 mb-2">
                                    Medical Information
                                  </h6>
                                  <div className="grid grid-cols-3 gap-3 text-sm">
                                    {patient.disease && (
                                      <div>
                                        <span className="text-gray-500">
                                          Disease:
                                        </span>
                                        <p className="font-medium text-gray-700">
                                          {patient.disease}
                                        </p>
                                      </div>
                                    )}
                                    {(patient.height_feet ||
                                      patient.height_inches) && (
                                      <div>
                                        <span className="text-gray-500">
                                          Height:
                                        </span>
                                        <p className="font-medium text-gray-700">
                                          {patient.height_feet || 0}'
                                          {patient.height_inches || 0}"
                                        </p>
                                      </div>
                                    )}
                                    {(patient.weight_kilo ||
                                      patient.weight_grams) && (
                                      <div>
                                        <span className="text-gray-500">
                                          Weight:
                                        </span>
                                        <p className="font-medium text-gray-700">
                                          {patient.weight_kilo || 0}.
                                          {patient.weight_grams || 0} kg
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="text-sm text-gray-500">
                                  Created by:{" "}
                                  <span className="font-medium">
                                    {patient.created_by.email}
                                  </span>
                                  {patient.last_login && (
                                    <span className="ml-4">
                                      Last login:{" "}
                                      <span className="font-medium">
                                        {formatDate(patient.last_login)}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show message when no appointments for selected date */}
                {selectedDate && selectedDateAppointments.length === 0 && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                    <div className="text-gray-500">
                      <svg
                        className="w-8 h-8 mx-auto mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-5M8 7h8m-8 0V5m8 2V5"
                        />
                      </svg>
                      <p className="text-sm">
                        No appointments scheduled for{" "}
                        {months[currentDate.getMonth()]} {selectedDate},{" "}
                        {currentDate.getFullYear()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Monthly Statistics */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Monthly Patient Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Patients:</span>
                      <span className="ml-2 font-medium">
                        {monthlyPatientData.total_current_month_patients}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Today:</span>
                      <span className="ml-2 font-medium">
                        {monthlyPatientData.patients_today}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Till Yesterday:</span>
                      <span className="ml-2 font-medium">
                        {monthlyPatientData.patients_till_yesterday}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Difference:</span>
                      <span
                        className={`ml-2 font-medium ${
                          monthlyPatientData.is_increase
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {monthlyPatientData.is_increase ? "+" : ""}
                        {monthlyPatientData.difference_from_yesterday}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto lg:col-span-3 col-span-4">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-gray-100 bg-opacity-40 shadow">
            <h2 className="2xl:text-lg lg:text-sm font-medium">
              Diseases Chart
            </h2>
            {/* Dropdown for time period selection */}
            <div className="relative inline-block">
              <button
                onClick={toggleDropdown}
                className="text-blue-600 font-medium flex items-center 2xl:text-lg text-sm hover:text-blue-800 transition-colors"
              >
                {getPeriodLabel(selectedPeriod)}
                <span className="ml-1 text-sm">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute right-0 bg-white shadow-lg mt-2 rounded-lg p-2 w-32 z-10 border">
                  <li
                    className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-sm"
                    onClick={() => handlePeriodChange("weekly")}
                  >
                    This Week
                  </li>
                  <li
                    className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-sm"
                    onClick={() => handlePeriodChange("monthly")}
                  >
                    This Month
                  </li>
                  <li
                    className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-sm"
                    onClick={() => handlePeriodChange("yearly")}
                  >
                    This Year
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="p-4">
            {/* Chart Container */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <Doughnut
                  data={data}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      datalabels: { display: false },
                    },
                  }}
                  width={400}
                  height={400}
                />

                {/* Center text overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {currentData.totalPatients.toLocaleString()}
                    </h2>
                    <p className="text-gray-500 text-base">Patients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="mt-8">
              <ul className="space-y-3">
                {currentData.labels.map((label, index) => {
                  const total = currentData.data.reduce((a, b) => a + b, 0);
                  const percentage = (
                    (currentData.data[index] / total) *
                    100
                  ).toFixed(1);

                  return (
                    <li key={label} className="flex items-center text-base">
                      <span
                        className="inline-block w-4 h-4 rounded-full mr-3"
                        style={{
                          backgroundColor:
                            data.datasets[0].backgroundColor[index],
                        }}
                      ></span>
                      <span className="flex-1">{label}</span>
                      <span className="text-gray-500 ml-auto">
                        {currentData.data[index]} ({percentage}%)
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* This cell will merge with the row below (spans 2 rows) */}
        <div className="bg-white rounded-[20px] shadow-lg row-span-2 overflow-x-auto lg:col-span-2 col-span-4">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
            <h2 className="2xl:text-lg text-sm font-medium">Appointments</h2>
            <span className="text-primary font-medium cursor-pointer 2xl:text-lg text-sm">
              Upcoming
            </span>
          </div>
          <div className="p-4 2xl:text-lg lg:text-sm">
            {/* Appointment 1 */}
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
            <div className="flex justify-between items-center border-b py-3">
              <div>
                <div className="flex flex-wrap items-center 2xl:text-lg text-xs">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 mr-2" />
                  <span className="font-semibold">Temitope Joshua</span>
                  <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                    • Asthma
                  </span>
                </div>
                <div className="2xl:text-sm text-xs text-gray-500">3:00 PM</div>
                <div className="2xl:text-sm text-xs">
                  <a href="#" className="text-blue-500 mr-2">
                    View Profile
                  </a>
                  <a href="#" className="text-blue-500">
                    Recordings
                  </a>
                </div>
              </div>
              <a href="#" className="text-red-500">
                Skip
              </a>
            </div>
          </div>
        </div>
        {/* Second row, first and second columns */}
        <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto lg:col-span-2 col-span-4">
          <div className="flex justify-between items-center mb-4 p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
            <h3 className="2xl:text-lg text-sm font-semibold">Reminders</h3>
            <span
              className="material-icons add_circle text-gray-400 cursor-pointer"
              onClick="showPopup('reminderPopup');"
            >
              add_circle
            </span>
          </div>
          <div className="p-4">
            <ul>
              <li className="border-b py-3">
                <div className="flex justify-between 2xl:text-sm text-xs">
                  <p className="font-semibold">Upcoming Appointment</p>
                  <p className="text-gray-500">3:00 PM</p>
                </div>
                <p className="text-gray-500 2xl:text-sm text-xs">
                  Dr. Williams, your next appointment with Mrs. Taylor is in 15
                  minutes.
                </p>
              </li>
              <li className="border-b py-3">
                <div className="flex justify-between 2xl:text-sm text-xs">
                  <p className="font-semibold">Medication Review Due</p>
                  <p className="text-gray-500">3:00 PM</p>
                </div>
                <p className="text-gray-500 2xl:text-sm text-xs">
                  You have 30 minutes left to review Mr. Adams' medication list.
                </p>
              </li>
              <li className="border-b py-3">
                <div className="flex justify-between 2xl:text-sm text-xs">
                  <p className="font-semibold">Surgery Preparation</p>
                  <p className="text-gray-500">3:00 PM</p>
                </div>
                <p className="text-gray-500 2xl:text-sm text-xs">
                  Prepare for Mr. Patel's surgery in 30 minutes.
                </p>
              </li>
              <li className="border-b py-3">
                <div className="flex justify-between 2xl:text-sm text-xs">
                  <p className="font-semibold">Patient Follow-Up Call</p>
                  <p className="text-gray-500">3:00 PM</p>
                </div>
                <p className="text-gray-500 2xl:text-sm text-xs">
                  Follow up with Mr. Brown about his treatment progress in 15
                  minutes.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-4">
          <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
            <h3 className="2xl:text-lg text-sm font-semibold">
              Recent Lab Results
            </h3>
            <p className="text-blue-500">Upcoming</p>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-nowrap 2xl:text-sm text-xs">
                <thead>
                  <tr className="text-gray-500">
                    <th className="pb-3">Report/Test Name</th>
                    <th className="pb-3">Lab Name</th>
                    <th className="pb-3">Patient Name</th>
                    <th className="pb-3">Test Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3">Echocardiogram</td>
                    <td className="py-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-orange-500 text-white rounded-full text-center mr-2">
                        Q
                      </span>
                      Quest Diagnostics
                    </td>
                    <td className="py-3">Arman soni</td>
                    <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">X-Ray (Shoulder)</td>
                    <td className="py-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-blue-500 text-white rounded-full text-center mr-2">
                        L
                      </span>
                      LabCorp
                    </td>
                    <td className="py-3">Arman soni</td>
                    <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">X-Ray (Arms)</td>
                    <td className="py-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-purple text-white rounded-full text-center mr-2">
                        M
                      </span>
                      Mayo Clinic Lab
                    </td>
                    <td className="py-3">Arman soni</td>
                    <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">Echocardiogram</td>
                    <td className="py-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-teal-500 text-white rounded-full text-center mr-2">
                        A
                      </span>
                      ARUP Laboratories
                    </td>
                    <td className="py-3">Arman soni</td>
                    <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">Echocardiogram</td>
                    <td className="py-3 flex items-center">
                      <span className="inline-block w-5 h-5 bg-pink-500 text-white rounded-full text-center mr-2">
                        B
                      </span>
                      BioReference Lab
                    </td>
                    <td className="py-3">Arman soni</td>
                    <td className="py-3">Aug 20, 2024 - 12:40PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* All pop-ups here */}
      {/* Add Reminder Popup */}
      <div
        id="reminderPopup"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
          <span
            className="absolute top-4 right-4 text-gray-600 cursor-pointer text-2xl"
            onClick="closePopup('reminderPopup')"
          >
            ×
          </span>
          <h3 className="2xl:text-lg text-sm font-semibold mb-4">
            Add Reminder
          </h3>
          <div className="mb-3 grid lg:grid-cols-3 grid-cols-1">
            <label htmlFor="title" className="block text-nowrap my-auto">
              Title:
            </label>
            <div className="flex items-center w-full col-span-2">
              <input
                id="title"
                type="text"
                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                placeholder="Add Your Title"
              />
            </div>
          </div>
          <div className="mb-3 grid lg:grid-cols-3 grid-cols-1">
            <label htmlFor="title" className="block text-nowrap my-auto">
              Date:
            </label>
            <div className="flex items-center w-full col-span-2">
              <input
                id="Date"
                type="date"
                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                placeholder="Add Your Date"
              />
            </div>
          </div>
          <div className="mb-3 grid lg:grid-cols-3 grid-cols-1">
            <label htmlFor="title" className="block text-nowrap my-auto">
              Time:
            </label>
            <div className="flex items-center w-full col-span-2">
              <input
                id="Time"
                type="time"
                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                placeholder="Add Your Time"
              />
            </div>
          </div>
          <div className="mb-3 grid lg:grid-cols-3 grid-cols-1">
            <label
              htmlFor="doctor"
              className="block text-gray-700 text-nowrap mb-auto mt-3"
            >
              Description:
            </label>
            <div className="flex items-center w-full col-span-2">
              <textarea
                id="patientAddress"
                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                placeholder="Enter Description"
                rows={3}
                cols={10}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="mb-3 grid lg:grid-cols-3 grid-cols-1">
            <label htmlFor="doctor" className="block text-nowrap my-auto">
              Notify Before:
            </label>
            <div className="flex items-center w-full col-span-2">
              <select
                id="doctor"
                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
              >
                <option value="" disabled="" selected="">
                  30 Mins
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick="closePopup('reminderPopup')"
            >
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Schedule
            </button>
          </div>
        </div>
      </div>
      {/* Notifications Popup */}
      <div
        id="notificationsPopup"
        className="absolute right-0 top-50 mt-2 bg-white rounded-lg shadow-lg z-50 hidden"
        style={{ marginTop: "-86em", marginLeft: "42em" }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold font-dashboard">
            Notifications
          </h3>
          <a href="#" className="text-blue-500 text-sm">
            Mark all as read
          </a>
        </div>
        <ul className="max-h-80 overflow-y-auto">
          <li className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-orange-500">person_add</span>
              <div>
                <p className="font-bold">New patient Added</p>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">Just Now</span>
          </li>
          <li className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-blue-500">check_circle</span>
              <div>
                <p className="font-bold">Your leave is approved</p>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">3 Mins Ago</span>
          </li>
          <li className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-pink-500">description</span>
              <div>
                <p className="font-bold">Patient report generated</p>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">10 Mins Ago</span>
          </li>
          <li className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-purple-500">mail</span>
              <div>
                <p className="font-bold">Please check your mail</p>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
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
