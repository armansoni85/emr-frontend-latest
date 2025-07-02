import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "flatpickr/dist/themes/material_blue.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@src/context/ThemeContext"; // <-- import theme
import {
  getMonthlyPatient,
  getPatientStatistics,
} from "@src/services/patientService";
import { getAppointments } from "@src/services/appointmentService";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const [monthlyPatientData, setMonthlyPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const [todayPatientData, setTodayPatientData] = useState({
    patients_today: 0,
    difference_from_yesterday: 0,
    is_increase: false,
  });

  const [patientStatistics, setPatientStatistics] = useState({
    total_patients: 0,
    last_month_patients: 0,
    this_month_patients: 0,
    difference_from_last_month: 0,
    is_increase: false,
  });

  const fetchAppointments = async () => {
    try {
      setAppointmentsLoading(true);
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const response = await getAppointments({
        limit: 1000, // Get all appointments for the month
        appointment_datetime__gte: startOfMonth.toISOString(),
        appointment_datetime__lte: endOfMonth.toISOString(),
      });

      if (response.success) {
        setAppointments(response.data.results || []);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments");
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Fetch appointments when month changes
  useEffect(() => {
    fetchAppointments();
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const fetchPatientStatistics = async () => {
    try {
      const data = await getPatientStatistics();
      setPatientStatistics(data);
    } catch (err) {
      console.error("Error fetching patient statistics:", err);
    }
  };

  useEffect(() => {
    fetchPatientStatistics();
  }, []);

  const fetchTodayPatients = async () => {
    try {
      const data = await getMonthlyPatient();
      setTodayPatientData(data);
    } catch (err) {
      console.error("Error fetching today's patients:", err);
      // setError("Failed to fetch today's patient data");
    }
  };

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

  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  const fetchMonthlyPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMonthlyPatient();
      setMonthlyPatientData(data);
    } catch (err) {
      // setError("Failed to fetch monthly patient data");
      console.error("Error fetching monthly patients:", err);
    } finally {
      setLoading(false);
    }
  };

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

  // Updated function to check for appointments on a specific date
  const hasAppointments = (day) => {
    if (!appointments.length) return false;

    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    return appointments.some((appointment) => {
      const appointmentDate = new Date(appointment.appointment_datetime);
      return (
        appointmentDate.getFullYear() === targetDate.getFullYear() &&
        appointmentDate.getMonth() === targetDate.getMonth() &&
        appointmentDate.getDate() === targetDate.getDate()
      );
    });
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (targetDate) => {
    if (!appointments.length) return [];

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_datetime);
      return (
        appointmentDate.getFullYear() === targetDate.getFullYear() &&
        appointmentDate.getMonth() === targetDate.getMonth() &&
        appointmentDate.getDate() === targetDate.getDate()
      );
    });
  };

  // Get appointment count for a specific day
  const getAppointmentCount = (day) => {
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return getAppointmentsForDate(targetDate).length;
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(day);

      const selectedDateObj = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      // Fix: Use local date formatting instead of toISOString()
      const year = selectedDateObj.getFullYear();
      const month = String(selectedDateObj.getMonth() + 1).padStart(2, "0");
      const dayStr = String(selectedDateObj.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${dayStr}`; // YYYY-MM-DD format

      const appointmentsForDate = getAppointmentsForDate(selectedDateObj);
      setSelectedDateAppointments(appointmentsForDate);

      console.log("Clicked date:", day);
      console.log("Selected date object:", selectedDateObj);
      console.log("Formatted date for navigation:", formattedDate);

      navigate("/doctor/appointments/list", {
        state: {
          selectedDate: formattedDate,
          appointmentsCount: appointmentsForDate.length,
        },
      });
    }
  };

  // Keep the old function for backward compatibility with patient data
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

  // Add these helper functions and state updates
  const getUpcomingAppointments = () => {
    const now = new Date();
    const upcomingAppointments = appointments
      .filter(
        (appointment) =>
          new Date(appointment.appointment_datetime) >= now &&
          appointment.appointment_status !== "CANCELLED"
      )
      .sort(
        (a, b) =>
          new Date(a.appointment_datetime) - new Date(b.appointment_datetime)
      )
      .slice(0, 10); // Show only first 10 upcoming appointments

    return upcomingAppointments;
  };

  const formatAppointmentTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-500";
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-orange-500";
      case "done":
        return "bg-gray-500";
      default:
        return "bg-orange-500";
    }
  };

  // Helper for gradient backgrounds using theme
  const getGradient = (from, to) =>
    `linear-gradient(90deg, ${from} 0%, ${to} 100%)`;

  return (
    <>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Patients */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-md flex flex-col justify-between">
          <div>
            <p className="text-lg font-semibold font-dashboard">
              Total Patients
            </p>
            <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14 my-2">
              {/* SVG */}
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
        {/* New Patients */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md flex flex-col justify-between">
          <div>
            <p className="text-lg font-semibold font-dashboard">New Patients</p>
            <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14 my-2">
              {/* SVG */}
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
        {/* Total Appointments */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md flex flex-col justify-between">
          <div>
            <p className="text-lg font-semibold font-dashboard">
              Total Appointments
            </p>
            <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14 my-2">
              {/* SVG */}
            </div>
          </div>
          <div className="flex flex-col items-center mt-auto">
            <p className="font-dashboard-number text-4xl font-bold">
              {appointments.length}
            </p>
            <p className="font-dashboard-trend text-sm mt-2">
              0 ↑ vs Yesterday
            </p>
          </div>
        </div>
        {/* Online Appointments */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-[#DF00FF] to-[#8100FF] text-white shadow-md flex flex-col justify-between">
          <div>
            <p className="text-lg font-semibold font-dashboard">
              Online Appointments
            </p>
            <div className="bg-white bg-opacity-50 p-2 rounded-xl w-14 my-2">
              {/* SVG */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-8 gap-4">
        {/* Calendar */}
        <div
          className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-1 xl:col-span-6"
          style={{
            borderColor: theme.borderColor,
            fontFamily: theme.fontFamily,
          }}
        >
          <div
            className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
            style={{
              borderColor: theme.borderColor,
              color: theme.headingColor,
              fontFamily: theme.fontFamily,
            }}
          >
            <h3 className="2xl:text-xl lg:text-sm font-semibold">
              Appointments Calendar
            </h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="font-medium" style={{ color: theme.linkColor }}>
                Total: {appointments.length}
              </span>
              {appointmentsLoading && (
                <span className="text-gray-500">Loading...</span>
              )}
            </div>
          </div>
          <div className="p-6">
            {" "}
            {/* Increased padding for more space */}
            {/* Loading and Error States */}
            {appointmentsLoading && (
              <div className="text-center py-2 text-blue-600">
                Loading appointments...
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
                <h2 className="text-2xl font-semibold text-gray-800">
                  {months[currentDate.getMonth()]}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800">
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
            <div className="grid grid-cols-7 gap-2 mb-2">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className="text-center py-2 text-base font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid - Larger cells */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((dateObj, index) => {
                const appointmentCount = dateObj.isCurrentMonth
                  ? getAppointmentCount(dateObj.day)
                  : 0;
                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleDateClick(dateObj.day, dateObj.isCurrentMonth)
                    }
                    className={`
                      h-20 w-full flex flex-col items-center justify-center text-base rounded-lg transition-colors relative hover:bg-blue-50 cursor-pointer
                      ${
                        dateObj.isCurrentMonth
                          ? "text-gray-900 hover:bg-gray-100"
                          : "text-gray-300"
                      }
                      ${
                        dateObj.isCurrentMonth && dateObj.day === selectedDate
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : ""
                      }
                      ${
                        dateObj.isCurrentMonth && isToday(dateObj.day)
                          ? "ring-2 ring-blue-300"
                          : ""
                      }
                    `}
                  >
                    <span className="text-base">{dateObj.day}</span>
                    {/* Appointment indicators */}
                    {dateObj.isCurrentMonth && appointmentCount > 0 && (
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {appointmentCount > 1 && (
                          <span className="text-xs ml-1 bg-green-500 text-white rounded-full px-2 py-0.5 leading-none">
                            {appointmentCount}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Selected Date Appointments */}
            {selectedDateAppointments.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Appointments for {months[currentDate.getMonth()]}{" "}
                  {selectedDate}, {currentDate.getFullYear()}
                  <span className="ml-2 text-sm font-normal text-blue-600">
                    ({selectedDateAppointments.length} appointment
                    {selectedDateAppointments.length !== 1 ? "s" : ""})
                  </span>
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedDateAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id}
                      className="bg-white p-3 rounded-lg shadow-sm border"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-xs">
                                {(
                                  appointment.patient?.first_name?.[0] || "P"
                                ).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 text-sm">
                                {appointment.patient?.first_name || "N/A"}{" "}
                                {appointment.patient?.last_name || ""}
                              </h5>
                              <p className="text-xs text-gray-600">
                                {formatDate(appointment.appointment_datetime)}
                              </p>
                            </div>
                          </div>
                          {appointment.disease && (
                            <div className="text-xs">
                              <span className="text-gray-500">Disease:</span>
                              <span className="ml-1 font-medium text-gray-700">
                                {appointment.disease}
                              </span>
                            </div>
                          )}
                          {appointment.reason_of_visit && (
                            <div className="text-xs mt-1">
                              <span className="text-gray-500">Reason:</span>
                              <span className="ml-1 text-gray-700">
                                {appointment.reason_of_visit}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-xs">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            ${
                              appointment.appointment_status === "scheduled"
                                ? "bg-green-100 text-green-800"
                                : appointment.appointment_status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {appointment.appointment_status || "Scheduled"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Show message when no appointments for selected date */}
            {selectedDate && selectedDateAppointments.length === 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
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
                  <p className="text-base">
                    No appointments scheduled for{" "}
                    {months[currentDate.getMonth()]} {selectedDate},{" "}
                    {currentDate.getFullYear()}
                  </p>
                </div>
              </div>
            )}
            {/* Monthly Statistics */}
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2 text-base">
                Monthly Appointment Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Appointments:</span>
                  <span className="ml-2 font-medium">
                    {appointments.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">This Month:</span>
                  <span className="ml-2 font-medium">
                    {appointments.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div
          className="bg-white rounded-[20px] shadow-lg row-span-2 overflow-x-auto col-span-1 xl:col-span-2 flex flex-col"
          style={{
            borderColor: theme.borderColor,
            fontFamily: theme.fontFamily,
          }}
        >
          <div
            className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
            style={{
              borderColor: theme.borderColor,
              color: theme.headingColor,
              fontFamily: theme.fontFamily,
            }}
          >
            <h2 className="2xl:text-lg text-sm font-medium">Appointments</h2>
            <span
              className="cursor-pointer 2xl:text-lg text-sm"
              style={{ color: theme.linkColor }}
            >
              Upcoming ({getUpcomingAppointments().length})
            </span>
          </div>
          <div className="p-4 2xl:text-lg lg:text-sm flex-1">
            {appointmentsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-gray-500">
                  Loading appointments...
                </span>
              </div>
            ) : getUpcomingAppointments().length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V8a1 1 0 00-1-1h-5M8 7h8m-8 0V5m8 2V5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Upcoming Appointments
                </h3>
                <p className="text-gray-500">
                  You don't have any upcoming appointments scheduled.
                </p>
              </div>
            ) : (
              getUpcomingAppointments().map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex justify-between items-center border-b py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center 2xl:text-lg text-xs mb-1">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getStatusColor(
                          appointment.appointment_status
                        )}`}
                      />
                      <span className="font-semibold">
                        {appointment.patient?.first_name || "N/A"}{" "}
                        {appointment.patient?.last_name || ""}
                      </span>
                      {appointment.disease && (
                        <span className="2xl:text-sm text-xs text-gray-500 ml-1">
                          • {appointment.disease}
                        </span>
                      )}
                    </div>
                    <div className="2xl:text-sm text-xs text-gray-500 mb-1">
                      {formatAppointmentTime(appointment.appointment_datetime)}
                      <span className="ml-2 text-gray-400">
                        {new Date(
                          appointment.appointment_datetime
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="2xl:text-sm text-xs">
                      <button
                        onClick={() =>
                          navigate(
                            `/doctor/patients/${appointment.patient?.id}`
                          )
                        }
                        className="text-blue-500 mr-2 hover:text-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() =>
                          navigate("/doctor/ai-support/visit-notes")
                        }
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        Recordings
                      </button>
                    </div>
                    {appointment.reason_of_visit && (
                      <div className="2xl:text-sm text-xs text-gray-500 mt-1 italic">
                        "{appointment.reason_of_visit}"
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${
                appointment.appointment_status === "scheduled"
                  ? "bg-blue-100 text-blue-800"
                  : appointment.appointment_status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : appointment.appointment_status === "done"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-orange-100 text-orange-800"
              }`}
                    >
                      {appointment.appointment_status || "Pending"}
                    </span>
                    <button className="text-red-500 hover:text-red-700 transition-colors text-xs">
                      Skip
                    </button>
                  </div>
                </div>
              ))
            )}

            {/* Show "View All" button if there are more appointments */}
            {getUpcomingAppointments().length > 0 &&
              appointments.length > 10 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate("/doctor/appointments/list")}
                    className="text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                  >
                    View All Appointments ({appointments.length})
                  </button>
                </div>
              )}
          </div>
        </div>

        {/* Reminders */}
        <div
          className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-1 xl:col-span-2 flex flex-col"
          style={{
            borderColor: theme.borderColor,
            fontFamily: theme.fontFamily,
          }}
        >
          <div
            className="flex justify-between items-center mb-4 p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
            style={{
              borderColor: theme.borderColor,
              color: theme.headingColor,
              fontFamily: theme.fontFamily,
            }}
          >
            <h3 className="2xl:text-lg text-sm font-semibold">Reminders</h3>
            <span
              className="material-icons add_circle cursor-pointer"
              style={{ color: theme.linkColor }}
              onClick={() => {
                // showPopup('reminderPopup');
                document
                  .getElementById("reminderPopup")
                  .classList.remove("hidden");
              }}
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

        {/* Lab Results */}
        <div
          className="bg-white rounded-[20px] shadow-lg overflow-x-auto col-span-1 xl:col-span-4 flex flex-col"
          style={{
            borderColor: theme.borderColor,
            fontFamily: theme.fontFamily,
          }}
        >
          <div
            className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
            style={{
              borderColor: theme.borderColor,
              color: theme.headingColor,
              fontFamily: theme.fontFamily,
            }}
          >
            <h3 className="2xl:text-lg text-sm font-semibold">
              Recent Lab Results
            </h3>
            <p style={{ color: theme.linkColor }}>Upcoming</p>
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
