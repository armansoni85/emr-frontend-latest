import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@src/services/appointmentService";
import { useParams } from "react-router-dom";
import StatusText from "../../components/StatusText";
import { useDispatch } from "react-redux";
import { showModal } from "@src/redux/reducers/modalReducer";

const THEME_STORAGE_KEY = "customColorTheme";
const getFontTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    return theme ? JSON.parse(theme) : {};
  } catch {
    return {};
  }
};
const getFontStyle = (fontTheme, type = "main") => {
  if (!fontTheme) return {};
  if (type === "subHeading") {
    return {
      fontFamily: fontTheme.subHeadingFontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.subHeadingFontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.subHeadingFontSize || fontTheme.fontSize,
    };
  }
  if (type === "body1") {
    return {
      fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
    };
  }
  if (type === "body2") {
    return {
      fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
    };
  }
  return {
    fontFamily: fontTheme.fontFamily,
    fontWeight: fontTheme.fontWeight,
    fontSize: fontTheme.fontSize,
  };
};

const PatientAppointmentPage = () => {
  const [fontTheme, setFontTheme] = useState(getFontTheme());
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationMeta, setPaginationMeta] = useState({
    currentPage: 1,
    totalPages: 1
  });
  const { patient } = useParams();
  const dispatch = useDispatch();

  const { data, isSuccess, isError, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["appointments", searchTerm, paginationMeta.currentPage],
    queryFn: async () => {
      const params = {
        search: searchTerm,
        limit: 1000,
        offset: 0,
        patient: patient
      };

      const data = await getAppointments(params);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const filteredAppointments = useMemo(() => {
    if (!data?.data?.results) return [];

    let appointments = data.data.results;

    return appointments;
  }, [data?.data?.results]);

  useEffect(() => {
    const reloadTheme = () => setFontTheme(getFontTheme());
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_STORAGE_KEY) reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  useEffect(() => {
    if (!fontTheme) return;
    document.body.style.fontFamily = fontTheme.fontFamily || "inherit";
    document.body.style.fontWeight = fontTheme.fontWeight || 400;
    document.body.style.fontSize = fontTheme.fontSize || "16px";
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.fontWeight = "";
      document.body.style.fontSize = "";
    };
  }, [fontTheme]);


  const handleOpenModal = (notes) => {
    dispatch(showModal({
      id: "view-notes",
      title: "View Notes",
      content: (
        <>
          {/* Recordings Output */}
          <div className="bg-white rounded-[20px] border mb-4 col-span-2">
            <div className="p-4">
              {notes}
            </div>
          </div>
        </>
      ),
    }));
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div
          className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
          style={getFontStyle(fontTheme, "subHeading")}
        >
          <h2
            className="text-lg font-medium"
            style={getFontStyle(fontTheme, "subHeading")}
          >
            All Appointments
          </h2>
          <div className="text-end inline-block">
            <button
              className="bg-primary text-white rounded-full h-8 w-8 text-2xl"
              style={getFontStyle(fontTheme, "body2")}
            >
              +
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(fontTheme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Doctor Name{" "}
                  <i className="material-icons align-middle">arrow_drop_down</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Disease
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Reason of Visit
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Full Details
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(fontTheme, "body1")}
            >
              {isPending ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-red-500">Error: {error.message}</td>
                </tr>
              ) : filteredAppointments?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No appointments found</td>
                </tr>
              ) : (
                filteredAppointments?.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="py-2 px-4 border-b ">
                      <div className="flex items-center cursor-pointer">
                        <img
                          src="assets/images/profile.png"
                          alt="profile"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="text-start">
                          <p style={getFontStyle(fontTheme, "body1")}>
                            {appointment.doctor.first_name} {appointment.doctor.last_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      {appointment.appointment_datetime}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className="px-2 py-1 border rounded-full border-info text-info"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        {appointment.disease ?? 'Unknown'}
                      </span>
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(fontTheme, "body1")}
                    >
                      {appointment.reason_of_visit ?? 'Unknown'}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        <StatusText status={appointment.appointment_status} />
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() =>
                          handleOpenModal(appointment.consultation_ai_voice_note)
                        }
                        className="px-3 py-1 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        View Notes
                      </button>
                      <div className="float-right relative">
                        <button
                          className="px-3 py-1"
                          style={getFontStyle(fontTheme, "body2")}
                        >
                          <i className="material-icons">more_vert</i>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg hidden">
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            style={getFontStyle(fontTheme, "body2")}
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            style={getFontStyle(fontTheme, "body2")}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mx-4">
            <div className="space-x-1" style={getFontStyle(fontTheme, "body2")}>
              <span>Page</span>
              <button
                className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150"
                style={getFontStyle(fontTheme, "body2")}
              >
                {paginationMeta.currentPage}
              </button>
              <span>of {paginationMeta.totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAppointmentPage;
