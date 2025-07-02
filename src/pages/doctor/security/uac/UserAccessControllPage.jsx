import { useEffect, useState } from "react";

const UserAccessControlPage = () => {
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

  const getIconStyle = (color = customTheme.primaryColor) => ({
    color: color,
    fontSize: customTheme.fontSize || "20px",
    fontFamily: customTheme.fontFamily || "inherit",
    fontWeight: customTheme.fontWeight || 400,
  });

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
          <a
            href=""
            style={getButtonStyle(false)}
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
          >
            Admin
          </a>
          <a
            href=""
            style={getButtonStyle(true)}
            className="px-5 py-2 rounded-full font-light"
          >
            Doctor
          </a>
          <a
            href=""
            style={getButtonStyle(false)}
            className="px-5 py-2 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
          >
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
              <button
                style={getButtonStyle(false)}
                className="px-4 py-1 rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white"
              >
                Edit
              </button>
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
                            className="cursor-pointer border-2 rounded-lg pt-1"
                          >
                            <i className="material-icons" id="check_icon">
                              check
                            </i>
                          </label>
                        </div>
                        <span className="my-auto inline">
                          To Edit Patient Profile
                        </span>
                      </div>
                    </td>
                    <td className="text-end">
                      <span className="text-green-500 ">Enabled</span>
                    </td>
                  </tr>
                  {/* Add more access rows as needed */}
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
