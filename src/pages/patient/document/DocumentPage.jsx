import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMedicalDocuments } from "@src/services/documentService";

const DocumentPage = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await getMedicalDocuments();
            console.log("API Response:", response); // Debug log
            // Ensure we always have an array
            const documentsArray = Array.isArray(response)
                ? response
                : Array.isArray(response?.results)
                    ? response.results
                    : Array.isArray(response?.data)
                        ? response.data
                        : [];
            console.log("Documents Array:", documentsArray); // Debug log
            setDocuments(documentsArray);
        } catch (error) {
            console.error("Error fetching documents:", error);
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadClick = () => {
        navigate("/patient/documents/upload");
    };

    const handleUploadedClick = () => {
        navigate("/patient/documents/uploaded");
    };

    return (
        <>
            <div className="flex justify-between md:flex-row flex-col">
                <div className="flex gap-3 overflow-x-auto mb-4 text-nowrap">
                    <button
                        onClick={() => navigate("/patient/documents")}
                        className="bg-primary px-5 py-2 text-white rounded-full font-light">
                        Received Documents
                    </button>
                    <button
                        onClick={handleUploadedClick}
                        className="bg-white px-5 py-2 text-primary rounded-full font-light transition-all duration-150 hover:bg-primary hover:text-white">
                        Upload Documents
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleUploadClick}
                        className="px-8 py-3 flex gap-1 text-sm bg-white border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-150">
                        <i className="material-icons">upload</i>
                        Upload
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-3 my-3">
                <div className="flex justify-end text-primary mb-2">
                    <a
                        href=""
                        className="text-primary flex">
                        Recents <i className="material-icons">expand_more</i>
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-primary">Loading documents...</div>
                    </div>
                ) : !Array.isArray(documents) || documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4">
                            <i className="material-icons text-6xl text-gray-300">inbox</i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Received Documents</h3>
                        <p className="text-gray-500 mb-6">You haven't received any documents from your healthcare providers yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-2">
                            {Array.isArray(documents) && documents.map((document) => (
                                <div key={document.id} className="bg-white rounded-[20px] shadow-lg p-3 space-y-1">
                                    <div className="p-0">
                                        <img
                                            className="h-46 w-full object-cover rounded-lg"
                                            src={document.file_url || "../assets/images/image 1 (4).png"}
                                            alt={document.title || "Document"}
                                        />
                                    </div>
                                    <div className="flex justify-between text-muted text-xs">
                                        <span className="text-xs">Sent by: {document.uploaded_by || "Healthcare Provider"}</span>
                                        <span className="text-xs">
                                            {document.created_at ? new Date(document.created_at).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold 2xl:text-xl text-lg">
                                        {document.title || document.file_name || "Untitled Document"}
                                    </h3>
                                    <p className="text-body">
                                        {document.description || "No description available."}
                                    </p>
                                    <div className="flex justify-end mt-2">
                                        <button className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {documents.length > 8 && (
                            <div className="flex justify-center py-3 gap-2">
                                <span className="text-primary">View More</span>
                                <span className="material-icons">expand_more</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default DocumentPage;
