import { useEffect, useState } from "react";
import { getUsers } from "@src/services/userService";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [customTheme, setCustomTheme] = useState(() => {
    try {
      const theme = localStorage.getItem("customColorTheme");
      return theme ? JSON.parse(theme) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const reloadTheme = () => {
      try {
        const theme = localStorage.getItem("customColorTheme");
        setCustomTheme(theme ? JSON.parse(theme) : {});
      } catch {
        setCustomTheme({});
      }
    };
    window.addEventListener("customColorThemeChanged", reloadTheme);
    window.addEventListener("storage", (e) => {
      if (e.key === "customColorTheme") reloadTheme();
    });
    return () => {
      window.removeEventListener("customColorThemeChanged", reloadTheme);
      window.removeEventListener("storage", reloadTheme);
    };
  }, []);

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? customTheme.primaryColor : "#fff",
    color: filled ? "#fff" : customTheme.primaryColor,
    border: `1.5px solid ${customTheme.primaryColor}`,
    fontFamily: customTheme.fontFamily || "inherit",
    fontWeight: customTheme.fontWeight || 400,
    fontSize: customTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getOutlineButtonStyle = () => ({
    backgroundColor: "#fff",
    color: customTheme.primaryColor,
    border: `1.5px solid ${customTheme.primaryColor}`,
    fontFamily: customTheme.fontFamily || "inherit",
    fontWeight: customTheme.fontWeight || 400,
    fontSize: customTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconStyle = () => ({
    color: customTheme.primaryColor,
    fontSize: customTheme.fontSize || "20px",
    fontFamily: customTheme.fontFamily || "inherit",
    fontWeight: customTheme.fontWeight || 400,
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
          <label htmlFor="search">Search</label>
          <div className="relative mt-2">
            <input
              type="text"
              placeholder="Search by Name or DOB"
              className="w-full rounded-full pe-4 ps-10 py-3 border-grey focus:outline-grey2"
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
          <label htmlFor="speciality-select">Select Speciality</label>
          <div className="relative mt-2 text-muted">
            <select
              id="speciality-select"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
            >
              <option value="" disabled="" selected="">
                Search by Speciality
              </option>
              {/* Add options here */}
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2">
              arrow_drop_down
            </i>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="sub-speciality-select">Select Sub Speciality</label>
          <div className="relative mt-2 text-muted">
            <select
              id="sub-speciality-select"
              className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none"
            >
              <option value="" disabled="" selected="">
                Search by Sub Speciality
              </option>
              {/* Add options here */}
            </select>
            <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2">
              arrow_drop_down
            </i>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl pb-4">
        <div className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
          <h2 className="text-lg font-medium">All Doctors</h2>
          <div className="text-end inline-block">
            <span className="text-muted">
              Total {doctors.length} Results Found
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr>
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
            <tbody className="text-body">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    Loading...
                  </td>
                </tr>
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
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
                          <p>
                            {doctor.first_name || doctor.last_name
                              ? `Dr. ${doctor.first_name || ""} ${
                                  doctor.last_name || ""
                                }`
                              : "Dr. (No Name)"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doctor.gender || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doctor.speciality || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doctor.sub_speciality || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doctor.mobile_number || "-"}
                    </td>
                    <td className="py-2 px-4 border-b">{doctor.email}</td>
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
