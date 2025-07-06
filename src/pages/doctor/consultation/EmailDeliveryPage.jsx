import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import {
  getConsultations,
  sendConsultationEmail,
} from "@src/services/consultation.service";
import Moment from "react-moment";

const EMAIL_SENT_KEY = "sentEmailIds";
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

const EmailDeliveryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [sentEmailIds, setSentEmailIds] = useState(() => {
    try {
      const stored = localStorage.getItem(EMAIL_SENT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
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

  const getButtonStyle = (filled = true) => ({
    backgroundColor: filled ? fontTheme.primaryColor : "#fff",
    color: filled ? "#fff" : fontTheme.primaryColor,
    border: `1.5px solid ${fontTheme.primaryColor}`,
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
    fontSize: fontTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconButtonStyle = () => ({
    backgroundColor: "#fff",
    color: fontTheme.primaryColor,
    border: `1.5px solid ${fontTheme.primaryColor}`,
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
    fontSize: fontTheme.fontSize || "16px",
    transition: "all 0.15s",
  });

  const getIconStyle = () => ({
    color: fontTheme.primaryColor,
    fontSize: fontTheme.fontSize || "20px",
    fontFamily: fontTheme.fontFamily || "inherit",
    fontWeight: fontTheme.fontWeight || 400,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const data = await getConsultations({});
        setHistory(data.results || []);
      } catch (e) {
        setHistory([]);
      }
      setIsLoading(false);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem(EMAIL_SENT_KEY, JSON.stringify(sentEmailIds));
  }, [sentEmailIds]);

  useEffect(() => {
    if (sendResult) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [sendResult]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendResult(null);
    try {
      await sendConsultationEmail({
        recipient_email: recipientEmail,
        recipient_name: recipientName,
        subject,
        custom_message: customMessage,
        document: documentFile,
      });
      setSendResult({ success: true, message: "Email sent successfully!" });
      setRecipientEmail("");
      setRecipientName("");
      setSubject("");
      setCustomMessage("");
      setDocumentFile(null);

      if (selectedId && !sentEmailIds.includes(selectedId)) {
        setSentEmailIds((prev) => [...prev, selectedId]);
      }
    } catch (error) {
      setSendResult({ success: false, message: "Failed to send email." });
    }
    setSending(false);
  };

  return (
    <>
      {/* Popup Message */}
      {showPopup && sendResult && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white font-semibold ${
              sendResult.success ? "bg-green-600" : "bg-red-600"
            }`}
            style={getFontStyle(fontTheme, "body2")}
          >
            {sendResult.message}
          </div>
        </div>
      )}

      <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
        <NavLinkButton
          to={getRoutePath("doctor.consultation.efax")}
          color="primary"
          className={"px-5"}
          style={{
            ...getFontStyle(fontTheme, "main"),
            border: `1.5px solid ${fontTheme.primaryColor}`,
          }}
        >
          eFax Delivery
        </NavLinkButton>
        <NavLinkButton
          to={getRoutePath("doctor.consultation.email")}
          color="primary"
          className={"px-5"}
          style={{
            ...getFontStyle(fontTheme, "main"),
            backgroundColor: fontTheme.primaryColor,
            color: "#fff",
            border: `1.5px solid ${fontTheme.primaryColor}`,
          }}
        >
          Email Delivery
        </NavLinkButton>
      </div>
      <div className="grid md:gap-4 md:grid-cols-3 grid-cols-1">
        {/* History */}
        <div className="bg-white rounded-[20px] shadow-lg mb-4 flex flex-col">
          {/* Recordings */}
          <div className=" h-full">
            <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
              <h2
                className="text-lg font-medium"
                style={getFontStyle(fontTheme, "subHeading")}
              >
                History
              </h2>
            </div>
            <div className="relative">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-content-between border-b px-3 pt-4 pb-2 cursor-pointer hover:bg-black hover:bg-opacity-[0.1]"
                >
                  <div className="flex gap-2 w-full">
                    <span
                      className="inline-block bg-danger text-primary bg-grey rounded-full p-1 px-2 h-8 w-8 flex items-center justify-center"
                      style={getIconButtonStyle()}
                    >
                      <i className="material-icons text-sm">chat</i>
                    </span>
                    <div className="text-medium text-start">
                      <p
                        className="leading-none"
                        style={getFontStyle(fontTheme, "body1")}
                      >
                        Advanced Pharmacology and Drug Management
                      </p>
                      <span
                        className="text-muted text-sm"
                        style={getFontStyle(fontTheme, "body2")}
                      >
                        Just Now
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Email Sending Output */}
        <div className="bg-white rounded-[20px] shadow-lg mb-4 col-span-2">
          <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4]">
            <h2
              className="text-lg font-medium"
              style={getFontStyle(fontTheme, "subHeading")}
            >
              Send Consultation Email
            </h2>
          </div>
          <form className="p-4" onSubmit={handleSendEmail}>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="recipientEmail"
                className="block my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Recipient Email:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="recipientEmail"
                  type="email"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter Email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                  style={getFontStyle(fontTheme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="recipientName"
                className="block my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Recipient Name:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="recipientName"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter Recipient Name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                  style={getFontStyle(fontTheme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="subject"
                className="block my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Subject:
              </label>
              <div className="flex items-center w-full col-span-4">
                <input
                  id="subject"
                  type="text"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  placeholder="Enter Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  style={getFontStyle(fontTheme, "body2")}
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="consultationDocument"
                className="block my-auto"
                style={getFontStyle(fontTheme, "body1")}
              >
                Consultation Document:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <input
                  id="consultationDocument"
                  type="file"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  onChange={(e) => setDocumentFile(e.target.files[0])}
                  required
                  style={getFontStyle(fontTheme, "body2")}
                />
                <button
                  type="button"
                  style={getButtonStyle(false)}
                  className="px-4 py-2 rounded-full ml-2 absolute right-2"
                  onClick={() =>
                    documentFile &&
                    window.open(URL.createObjectURL(documentFile))
                  }
                >
                  Browse
                </button>
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label
                htmlFor="customMessage"
                className="block mb-auto mt-2"
                style={getFontStyle(fontTheme, "body1")}
              >
                Custom Message:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <textarea
                  id="customMessage"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                  placeholder="Type your message here..."
                  rows={10}
                  cols={30}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  required
                  style={getFontStyle(fontTheme, "body2")}
                />
                <div className="flex absolute bottom-0 p-2 gap-2">
                  <button
                    type="submit"
                    style={getButtonStyle(true)}
                    className="w-full px-8 py-2 rounded-full text-sm font-light"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                  <button
                    type="button"
                    style={getIconButtonStyle()}
                    className="rounded-full p-2 pb-1 transform rotate-45"
                  >
                    <i className="material-icons">attach_file</i>
                  </button>
                </div>
                <div className="flex absolute bottom-0 right-0 p-2 gap-2">
                  <button
                    type="button"
                    style={getIconButtonStyle()}
                    className="rounded-full p-2 pb-1 transform"
                    onClick={() => {
                      setRecipientEmail("");
                      setRecipientName("");
                      setSubject("");
                      setCustomMessage("");
                      setDocumentFile(null);
                      setSendResult(null);
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailDeliveryPage;
