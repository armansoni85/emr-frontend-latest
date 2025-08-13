import { useEffect, useState } from "react";
import { getUsers } from "@src/services/userService";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const DoctorPage = () => {
  const { theme } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? theme.primaryColor : "#fff",
    color: filled ? "#fff" : theme.primaryColor,
    border: `1.5px solid ${theme.primaryColor}`,
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
    fontSize: theme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getOutlineButtonStyle = () => ({
    backgroundColor: "#fff",
    color: theme.primaryColor,
    border: `1.5px solid ${theme.primaryColor}`,
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
    fontSize: theme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconStyle = () => ({
    color: theme.primaryColor,
    fontSize: theme.fontSize || "20px",
    fontFamily: theme.fontFamily || "inherit",
    fontWeight: theme.fontWeight || 400,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const data = await getUsers({ role: 2 });
        setDoctors(data.results || []);
      } catch (error) {
        setDoctors([]);
      }
      setIsLoading(false);
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="mb-3 grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="mb-3">
          <label htmlFor="search" style={getFontStyle(theme, "body1")}>
            Search
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or DOB"
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
              style={getFontStyle(theme, "body2")}
            />
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              search
            </span>
            <button
              style={getButtonStyle(true)}
              className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white"
            >
              Search
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="speciality-select"
            style={getFontStyle(theme, "body1")}
          >
            Select Speciality
          </label>
          <div className="relative mt-2 text-muted">
            <select
              id="speciality-select"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
              style={getFontStyle(theme, "body2")}
            >
              <option value="" disabled="" selected="">
                Search by Speciality
              </option>
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2">
              arrow_drop_down
            </i>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="sub-speciality-select"
            style={getFontStyle(theme, "body1")}
          >
            Select Sub Speciality
          </label>
          <div className="relative mt-2 text-muted">
            <select
              id="sub-speciality-select"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
              style={getFontStyle(theme, "body2")}
            >
              <option value="" disabled="" selected="">
                Search by Sub Speciality
              </option>
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2">
              arrow_drop_down
            </i>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2
            className="text-lg font-medium"
            style={getFontStyle(theme, "subHeading")}
          >
            All Doctors
          </h2>
          <div className="text-end inline-block">
            <span
              className="text-muted"
              style={getFontStyle(theme, "body2")}
            >
              Total {doctors.length} Results Found
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Doctor Name
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Gender
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Speciality
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Sub Speciality
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Mobile Number
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-start font-medium" />
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
            >
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-muted"
                    style={getFontStyle(theme, "body2")}
                  >
                    Loading...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-muted"
                    style={getFontStyle(theme, "body2")}
                  >
                    No doctors found.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="py-2 px-4 border-b ">
                      <div className="flex items-center cursor-pointer">
                        <img
                          src={
                            doctor.profile_picture ||
                            "assets/images/profile.png"
                          }
                          alt="profile"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="text-start">
                          <p style={getFontStyle(theme, "body1")}>
                            {doctor.first_name || doctor.last_name
                              ? `Dr. ${doctor.first_name || ""} ${doctor.last_name || ""
                              }`
                              : "Dr. (No Name)"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(theme, "body1")}
                    >
                      {doctor.gender || "-"}
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(theme, "body1")}
                    >
                      {doctor.speciality || "-"}
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(theme, "body1")}
                    >
                      {doctor.sub_speciality || "-"}
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(theme, "body1")}
                    >
                      {doctor.mobile_number || "-"}
                    </td>
                    <td
                      className="py-2 px-4 border-b"
                      style={getFontStyle(theme, "body1")}
                    >
                      {doctor.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex justify-between">
                        <div className="my-auto">
                          <a
                            href="#"
                            style={getOutlineButtonStyle()}
                            className="px-3 py-1 border rounded-full hover:bg-primary hover:text-white transition-all duration-150"
                          >
                            View Profile
                          </a>
                        </div>
                        <div className="float-right relative">
                          <button
                            style={getOutlineButtonStyle()}
                            className="px-3 py-1"
                          >
                            <i className="material-icons">more_vert</i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorPage;
