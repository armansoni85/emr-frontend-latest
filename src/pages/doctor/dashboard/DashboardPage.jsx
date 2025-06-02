import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "flatpickr/dist/themes/material_blue.css";
import { useNavigate } from "react-router-dom";
import {
  getMonthlyPatient,
  getPatientStatistics,
} from "@src/services/patientService";
import { getAppointments } from "@src/services/appointmentService";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const navigate = useNavigate();
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

  // Appointment data state
  const [appointments, setAppointments] = useState({
    data: [],
  });

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

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

  // Updated handleDateClick function with navigation
  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(day);

      // Create the selected date object
      const selectedDateObj = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      // Format date for URL parameter (YYYY-MM-DD format)
      const formattedDate = selectedDateObj.toISOString().split("T")[0];

      // Get appointments for the selected date (for local state update)
      const appointmentsForDate = getAppointmentsForDate(selectedDateObj);
      setSelectedDateAppointments(appointmentsForDate);

      navigate("/doctor/appointments/list", {
        state: {
          selectedDate: formattedDate,
          appointmentsCount: appointmentsForDate.length,
        },
      });
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
                  <rect
                    x="0.9375"
                    y="0.10498"
                    width="40.5791"
                    height="40.5791"
                    fill="white"
                  />
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
                  <rect
                    x="0.9375"
                    y="0.104004"
                    width="40.58"
                    height="40.58"
                    fill="white"
                  />
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
                  <rect
                    x="0.9375"
                    y="0.479004"
                    width="40.58"
                    height="40.58"
                    fill="white"
                  />
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
                    <image id="image0_3418_1481" width={512} height={512} />
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center mt-auto">
              <p className="font-dashboard-number text-4xl font-bold">
                {appointments.data?.count || 0}
              </p>
              <p className="font-dashboard-trend text-sm mt-2">
                0 ↑ vs Yesterday
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
                  <rect
                    x="0.9375"
                    y="0.518066"
                    width="40.58"
                    height="40.58"
                    fill="white"
                  />
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
                                    h-10 w-full flex items-center justify-center text-sm rounded-lg transition-colors relative hover:bg-blue-50 cursor-pointer
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
