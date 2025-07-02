import { useEffect, useState } from "react";
import { NavLinkButton } from "@src/components";
import { getRoutePath } from "@src/utils/routeUtils";
import {
  getConsultations,
  sendConsultationEmail,
} from "@src/services/consultation.service";
import Moment from "react-moment";

const EMAIL_SENT_KEY = "sentEmailIds";

const EmailDeliveryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [document, setDocument] = useState(null);
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

  const getIconButtonStyle = () => ({
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
        document,
      });
      setSendResult({ success: true, message: "Email sent successfully!" });
      setRecipientEmail("");
      setRecipientName("");
      setSubject("");
      setCustomMessage("");
      setDocument(null);

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
        >
          eFax Delivery
        </NavLinkButton>
        <NavLinkButton
          to={getRoutePath("doctor.consultation.email")}
          color="primary"
          className={"px-5"}
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
              <h2 className="text-lg font-medium">History</h2>
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
                      <p className="leading-none">
                        Advanced Pharmacology and Drug Management
                      </p>
                      <span className="text-muted text-sm">Just Now</span>
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
            <h2 className="text-lg font-medium">Send Consultation Email</h2>
          </div>
          <form className="p-4" onSubmit={handleSendEmail}>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label htmlFor="recipientEmail" className="block my-auto">
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
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label htmlFor="recipientName" className="block my-auto">
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
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label htmlFor="subject" className="block my-auto">
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
                />
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label htmlFor="consultationDocument" className="block my-auto">
                Consultation Document:
              </label>
              <div className="flex items-center w-full col-span-4 relative">
                <input
                  id="consultationDocument"
                  type="file"
                  className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                  onChange={(e) => setDocument(e.target.files[0])}
                  required
                />
                <button
                  type="button"
                  style={getButtonStyle(false)}
                  className="px-4 py-2 rounded-full ml-2 absolute right-2"
                  onClick={() =>
                    document && window.open(URL.createObjectURL(document))
                  }
                >
                  Browse
                </button>
              </div>
            </div>
            <div className="p-4 grid lg:grid-cols-5 grid-cols-1">
              <label htmlFor="customMessage" className="block mb-auto mt-2">
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
                      setDocument(null);
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
