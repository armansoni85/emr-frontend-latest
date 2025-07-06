import React, { useState, useEffect } from "react";
import { getIcd, getCpt } from "@src/services/superbillService";
import apiClient from "@src/utils/apiClient";

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
      color: fontTheme.headingColor || "#333333",
    };
  }
  if (type === "body1") {
    return {
      fontFamily: fontTheme.bodyText1FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText1FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText1FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#333333"
          : fontTheme.bodyTextColor || "#333333",
    };
  }
  if (type === "body2") {
    return {
      fontFamily: fontTheme.bodyText2FontFamily || fontTheme.fontFamily,
      fontWeight: fontTheme.bodyText2FontWeight || fontTheme.fontWeight,
      fontSize: fontTheme.bodyText2FontSize || fontTheme.fontSize,
      color:
        fontTheme.bodyTextColor === "#FFFFFF"
          ? "#666666"
          : fontTheme.bodyTextColor || "#666666",
    };
  }
  return {
    fontFamily: fontTheme.fontFamily,
    fontWeight: fontTheme.fontWeight,
    fontSize: fontTheme.fontSize,
    color: fontTheme.headingColor || "#333333",
  };
};

const useCustomTheme = () => {
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

  return customTheme;
};

const SuperBillsPage = () => {
  const customTheme = useCustomTheme();
  const [icdCodes, setIcdCodes] = useState([]);
  const [cptCodes, setCptCodes] = useState([]);
  const [selectedIcdCode, setSelectedIcdCode] = useState(null);
  const [icdSearch, setIcdSearch] = useState("");
  const [cptSearch, setCptSearch] = useState("");
  const [icdLoading, setIcdLoading] = useState(false);
  const [cptLoading, setCptLoading] = useState(false);
  const [icdError, setIcdError] = useState(null);
  const [cptError, setCptError] = useState(null);
  const [icdPagination, setIcdPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });
  const [cptPagination, setCptPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const [fontTheme, setFontTheme] = useState(getFontTheme());

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

  useEffect(() => {
    fetchIcdCodes();
  }, []);

  const fetchIcdCodes = async (searchTerm = "", url = null) => {
    setIcdLoading(true);
    setIcdError(null);
    try {
      let data;
      if (url) {
        const urlObj = new URL(url);
        const pathWithQuery =
          urlObj.pathname.replace("/api/v1", "") + urlObj.search;
        const response = await apiClient.get(pathWithQuery);
        data = response.data;
      } else {
        data = await getIcd(searchTerm);
      }
      setIcdCodes(data.results || []);
      setIcdPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
    } catch (error) {
      setIcdError("Failed to fetch ICD codes");
      console.error("Error fetching ICD codes:", error);
    } finally {
      setIcdLoading(false);
    }
  };

  const handleIcdNextPage = () => {
    if (icdPagination.next) {
      fetchIcdCodes("", icdPagination.next);
    }
  };

  const handleIcdPreviousPage = () => {
    if (icdPagination.previous) {
      fetchIcdCodes("", icdPagination.previous);
    }
  };

  const getIcdCurrentPageInfo = () => {
    if (!icdPagination.next && !icdPagination.previous)
      return { current: 1, total: 1 };

    const pageSize = 10;
    const totalPages = Math.ceil(icdPagination.count / pageSize);

    if (icdPagination.next) {
      const nextUrl = new URL(icdPagination.next);
      const nextOffset = parseInt(nextUrl.searchParams.get("offset")) || 10;
      const currentPage = nextOffset / pageSize;
      return { current: currentPage, total: totalPages };
    } else if (icdPagination.previous) {
      return { current: totalPages, total: totalPages };
    }

    return { current: 1, total: totalPages };
  };

  const handleIcdSearch = () => {
    setIcdPagination({ count: 0, next: null, previous: null });
    fetchIcdCodes(icdSearch);
  };

  const handleIcdCodeClick = async (icdCode) => {
    setSelectedIcdCode(icdCode);
    setCptLoading(true);
    setCptError(null);
    setCptCodes([]);
    setCptPagination({ count: 0, next: null, previous: null });

    try {
      const cptData = await getCpt(icdCode.code);

      if (cptData.results) {
        setCptCodes(cptData.results);
        setCptPagination({
          count: cptData.count,
          next: cptData.next,
          previous: cptData.previous,
        });
      } else if (cptData.code) {
        setCptCodes([cptData]);
        setCptPagination({ count: 1, next: null, previous: null });
      } else {
        setCptCodes([]);
        setCptPagination({ count: 0, next: null, previous: null });
      }
    } catch (error) {
      setCptError("Failed to fetch CPT codes");
      console.error("Error fetching CPT codes:", error);
    } finally {
      setCptLoading(false);
    }
  };

  const fetchCptCodes = async (searchTerm = "", url = null) => {
    if (!selectedIcdCode) return;

    setCptLoading(true);
    setCptError(null);
    try {
      let data;
      if (url) {
        const urlObj = new URL(url);
        const pathWithQuery = urlObj.pathname + urlObj.search;
        const response = await apiClient.get(pathWithQuery);
        data = response.data;
      } else {
        data = await getCpt(selectedIcdCode.code, searchTerm);
      }

      if (data.results) {
        setCptCodes(data.results);
        setCptPagination({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
      } else if (data.code) {
        setCptCodes([data]);
        setCptPagination({ count: 1, next: null, previous: null });
      } else {
        setCptCodes([]);
        setCptPagination({ count: 0, next: null, previous: null });
      }
    } catch (error) {
      setCptError("Failed to fetch CPT codes");
      console.error("Error fetching CPT codes:", error);
    } finally {
      setCptLoading(false);
    }
  };

  const handleCptNextPage = () => {
    if (cptPagination.next) {
      fetchCptCodes("", cptPagination.next);
    }
  };

  const handleCptPreviousPage = () => {
    if (cptPagination.previous) {
      fetchCptCodes("", cptPagination.previous);
    }
  };

  const getCptCurrentPageInfo = () => {
    if (!cptPagination.next && !cptPagination.previous)
      return { current: 1, total: 1 };

    const pageSize = 10;
    const totalPages = Math.ceil(cptPagination.count / pageSize);

    if (cptPagination.next) {
      const nextUrl = new URL(cptPagination.next);
      const nextOffset = parseInt(nextUrl.searchParams.get("offset")) || 10;
      const currentPage = nextOffset / pageSize;
      return { current: currentPage, total: totalPages };
    } else if (cptPagination.previous) {
      return { current: totalPages, total: totalPages };
    }

    return { current: 1, total: totalPages };
  };

  const handleCptSearch = () => {
    if (!selectedIcdCode) return;
    setCptPagination({ count: 0, next: null, previous: null });
    fetchCptCodes(cptSearch);
  };

  const handleKeyPress = (e, searchType) => {
    if (e.key === "Enter") {
      if (searchType === "icd") {
        handleIcdSearch();
      } else {
        handleCptSearch();
      }
    }
  };

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? customTheme.primaryColor : "#fff",
    color: filled ? "#fff" : customTheme.primaryColor,
    border: `1.5px solid ${customTheme.primaryColor}`,
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
    fontSize: fontTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconButtonStyle = () => ({
    backgroundColor: "#fff",
    color: customTheme.primaryColor,
    border: `1.5px solid ${customTheme.primaryColor}`,
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
    fontSize: fontTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconStyle = () => ({
    color: customTheme.primaryColor,
    fontSize: fontTheme.fontSize || "20px",
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
  });

  return (
    <>
      <div className="grid md:gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="bg-white min-h-[200px] rounded-[20px] shadow-lg mb-4">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                ICD Codes
              </h2>
              <span
                className="text-sm"
                style={getFontStyle(fontTheme, "body2")}
              >
                {icdPagination.count} total codes
              </span>
            </div>
            <div className="relative px-4">
              <div className="mb-3">
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Search by ICD Codes"
                    value={icdSearch}
                    onChange={(e) => setIcdSearch(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "icd")}
                    className="w-full rounded-full pe-4 ps-10 py-3 border border-grey bg-grey focus:outline-grey2"
                    style={getFontStyle(fontTheme, "body1")}
                  />
                  <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    search
                  </span>
                  <button
                    onClick={handleIcdSearch}
                    style={getButtonStyle(true)}
                    className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>

              {icdError && (
                <div
                  className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  {icdError}
                </div>
              )}

              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-left mt-4">
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th
                        className="py-2 px-4 border-b-2"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        ICD Code
                      </th>
                      <th
                        className="py-2 px-4 border-b-2"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {icdLoading ? (
                      <tr>
                        <td colSpan="2" className="py-4 px-4 text-center">
                          <div className="flex justify-center items-center">
                            <div
                              className="animate-spin rounded-full h-6 w-6 border-b-2"
                              style={{ borderColor: customTheme.primaryColor }}
                            ></div>
                            <span
                              className="ml-2"
                              style={getFontStyle(fontTheme, "body1")}
                            >
                              Loading...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : icdCodes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-4 px-4 text-center text-gray-500"
                          style={getFontStyle(fontTheme, "body1")}
                        >
                          No ICD codes found
                        </td>
                      </tr>
                    ) : (
                      icdCodes.map((icd) => (
                        <tr
                          key={icd.code}
                          onClick={() => handleIcdCodeClick(icd)}
                          className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedIcdCode?.code === icd.code
                              ? "bg-blue-50 border-l-4"
                              : ""
                          }`}
                          style={
                            selectedIcdCode?.code === icd.code
                              ? { borderColor: customTheme.primaryColor }
                              : {}
                          }
                        >
                          <td
                            className="py-2 px-4 border-b font-medium"
                            style={getFontStyle(fontTheme, "body1")}
                          >
                            {icd.code}
                          </td>
                          <td
                            className="py-2 px-4 border-b"
                            style={getFontStyle(fontTheme, "body2")}
                          >
                            {icd.description}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!icdLoading &&
                icdCodes.length > 0 &&
                (icdPagination.next || icdPagination.previous) && (
                  <div className="flex justify-between items-center mt-4 px-4 py-3 border-t">
                    <div
                      className="flex items-center text-sm"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <span>
                        Page {getIcdCurrentPageInfo().current} of{" "}
                        {getIcdCurrentPageInfo().total}
                      </span>
                      <span className="ml-4">
                        Total: {icdPagination.count} items
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleIcdPreviousPage}
                        disabled={!icdPagination.previous}
                        style={getButtonStyle(false)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        <span
                          className="material-icons text-sm mr-1"
                          style={getIconStyle()}
                        >
                          chevron_left
                        </span>
                        Previous
                      </button>
                      <button
                        onClick={handleIcdNextPage}
                        disabled={!icdPagination.next}
                        style={getButtonStyle(false)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        Next
                        <span
                          className="material-icons text-sm ml-1"
                          style={getIconStyle()}
                        >
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-white min-h-[200px] rounded-[20px] shadow-lg mb-4">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                CPT Codes
              </h2>
              {selectedIcdCode && (
                <span
                  className="text-sm"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  For ICD: {selectedIcdCode.code} | {cptPagination.count} codes
                </span>
              )}
            </div>
            <div className="relative px-4">
              <div className="mb-3">
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="Search by CPT Codes"
                    value={cptSearch}
                    onChange={(e) => setCptSearch(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "cpt")}
                    disabled={!selectedIcdCode}
                    className="w-full rounded-full pe-4 ps-10 py-3 border border-grey bg-grey focus:outline-grey2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={getFontStyle(fontTheme, "body1")}
                  />
                  <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    search
                  </span>
                  <button
                    onClick={handleCptSearch}
                    disabled={!selectedIcdCode}
                    style={getButtonStyle(true)}
                    className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Search
                  </button>
                </div>
              </div>

              {cptError && (
                <div
                  className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded"
                  style={getFontStyle(fontTheme, "body2")}
                >
                  {cptError}
                </div>
              )}

              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-left mt-4">
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th
                        className="py-2 px-4 border-b-2"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        CPT Code
                      </th>
                      <th
                        className="py-2 px-4 border-b-2"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!selectedIcdCode ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-8 px-4 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <span className="material-icons text-4xl mb-2 text-gray-300">
                              info
                            </span>
                            <span style={getFontStyle(fontTheme, "body1")}>
                              Select an ICD code to view related CPT codes
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : cptLoading ? (
                      <tr>
                        <td colSpan="2" className="py-4 px-4 text-center">
                          <div className="flex justify-center items-center">
                            <div
                              className="animate-spin rounded-full h-6 w-6 border-b-2"
                              style={{ borderColor: customTheme.primaryColor }}
                            ></div>
                            <span
                              className="ml-2"
                              style={getFontStyle(fontTheme, "body1")}
                            >
                              Loading CPT codes...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : cptCodes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="2"
                          className="py-4 px-4 text-center text-gray-500"
                          style={getFontStyle(fontTheme, "body1")}
                        >
                          No CPT codes found for the selected ICD code
                        </td>
                      </tr>
                    ) : (
                      cptCodes.map((cpt, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td
                            className="py-2 px-4 border-b font-medium"
                            style={getFontStyle(fontTheme, "body1")}
                          >
                            {cpt.code}
                          </td>
                          <td
                            className="py-2 px-4 border-b"
                            style={getFontStyle(fontTheme, "body2")}
                          >
                            {cpt.description || "No description available"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!cptLoading &&
                cptCodes.length > 0 &&
                (cptPagination.next || cptPagination.previous) && (
                  <div className="flex justify-between items-center mt-4 px-4 py-3 border-t">
                    <div
                      className="flex items-center text-sm"
                      style={getFontStyle(fontTheme, "body2")}
                    >
                      <span>
                        Page {getCptCurrentPageInfo().current} of{" "}
                        {getCptCurrentPageInfo().total}
                      </span>
                      <span className="ml-4">
                        Total: {cptPagination.count} items
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCptPreviousPage}
                        disabled={!cptPagination.previous}
                        style={getButtonStyle(false)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        <span
                          className="material-icons text-sm mr-1"
                          style={getIconStyle()}
                        >
                          chevron_left
                        </span>
                        Previous
                      </button>
                      <button
                        onClick={handleCptNextPage}
                        disabled={!cptPagination.next}
                        style={getButtonStyle(false)}
                        className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        Next
                        <span
                          className="material-icons text-sm ml-1"
                          style={getIconStyle()}
                        >
                          chevron_right
                        </span>
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperBillsPage;
