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
            const documents = response.data
            // Ensure we always have an array
            const documentsArray = Array.isArray(documents)
                ? documents
                : Array.isArray(documents?.results)
                    ? documents.results
                    : Array.isArray(documents?.data)
                        ? documents.data
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

    const renderFilePreview = (document) => {
        const fileUrl = document.file;
        const fileName = document.file_name;
        
        if (!fileUrl) {
            return (
                <div className="h-46 w-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <i className="material-icons text-4xl text-gray-400">description</i>
                </div>
            );
        }

        // Check if it's an image file
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        const isImage = imageExtensions.some(ext => 
            fileName?.toLowerCase().includes(ext) || 
            fileUrl.toLowerCase().includes(ext)
        );

        if (isImage) {
            return (
                <img
                    className="h-48 w-full object-cover rounded-lg"
                    src={fileUrl}
                    alt={fileName || "Document"}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
            );
        }

        // For PDF and other file types, show icon
        return (
            <div className="h-48 w-full bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <i className="material-icons text-4xl text-red-500 mb-2">
                    {fileName?.toLowerCase().includes('.pdf') ? 'picture_as_pdf' : 'description'}
                </i>
                <span className="text-sm text-gray-600 text-center px-2">
                    {fileName || "Document"}
                </span>
            </div>
        );
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
                                    <div className="p-0 relative">
                                        {renderFilePreview(document)}
                                        <div className="h-46 w-full bg-gray-200 rounded-lg flex-col items-center justify-center hidden">
                                            <i className="material-icons text-4xl text-gray-400">broken_image</i>
                                            <span className="text-sm text-gray-500 mt-2">Preview unavailable</span>
                                        </div>
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
                                        {document.note || document.description || "No description available."}
                                    </p>
                                    <div className="flex justify-end mt-2">
                                        <a 
                                            href={document.file}
                                            download={document.file_name}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-primary border border-primary text-white px-4 py-1 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150">
                                            Download
                                        </a>
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
