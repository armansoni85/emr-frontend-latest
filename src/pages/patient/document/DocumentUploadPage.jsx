import { useTheme } from "@src/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createMedicalDocument } from "@src/services/documentService";
import { getUsers } from "@src/services/userService";
import { toast } from "react-toastify";

const DocumentUploadPage = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        file: null,
        belonging_department: "GENERAL",
        uploaded_to: "",
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [filePreview, setFilePreview] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoadingDoctors(true);
            const users = await getUsers({ role: 2 });
            const response = users.data
            // Ensure we always have an array
            
            const doctorsArray = Array.isArray(response)
                ? response
                : Array.isArray(response?.results)
                    ? response.results
                    : Array.isArray(response?.data)
                        ? response.data
                        : [];
            setDoctors(doctorsArray);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setDoctors([]);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const generateFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview({
                    type: 'image',
                    url: e.target.result,
                    name: file.name,
                    size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
                });
            };
            reader.readAsDataURL(file);
        } else if (file.type === 'application/pdf') {
            setFilePreview({
                type: 'pdf',
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
            });
        } else {
            setFilePreview({
                type: 'other',
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
            });
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                file: file,
                title: file.name
            }));
            generateFilePreview(file);
        }
    };

    const clearFile = () => {
        setFormData(prev => ({
            ...prev,
            file: null,
            title: ""
        }));
        setFilePreview(null);
        // Clear the file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.file) {
            toast.error("Please select a file to upload");
            return;
        }

        if (!formData.belonging_department) {
            toast.error("Please select a department");
            return;
        }

        if (!formData.uploaded_to) {
            toast.error("Please select a doctor");
            return;
        }

        try {
            setLoading(true);
            await createMedicalDocument(formData);
            toast.success("Document uploaded successfully!");
            navigate("/patient/documents/uploaded");
        } catch (error) {
            console.error("Error uploading document:", error);
            toast.error("Failed to upload document. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/patient/documents");
    };

    const handleGoBack = () => {
        navigate("/patient/documents");
    };

    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                    <div>
                        <div
                            className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                            onClick={handleGoBack}>
                            <i className="material-icons">chevron_left</i>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mb-4 gap-2">
                    <button
                        onClick={handleCancel}
                        className="px-8 py-1 text-sm bg-white border border-danger rounded-full text-danger hover:bg-danger hover:text-white transition-all duration-150">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-primary border border-primary text-white px-8 py-2 rounded-full text-sm font-light hover:bg-opacity-[0.9] transition-all duration-150 disabled:opacity-50">
                        {loading ? "Uploading..." : "Upload Document"}
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-3 my-3">
                <div id="dropzone">
                    <div className="border border-dashed rounded-xl flex justify-center" style={{ borderColor: theme.borderColor }}>
                        {!filePreview ? (
                            <div className="flex flex-col items-center gap-2 py-24">
                                <img
                                    className="w-12"
                                    src="../assets/icons/Upload.svg"
                                    alt=""
                                />
                                <div className="text-center">
                                    <span>Drag and Drop File Here or </span>
                                    <label htmlFor="file-upload" className="cursor-pointer">
                                        <u className="text-primary hover:text-primary-dark">
                                            Choose File
                                        </u>
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-8 px-4">
                                {filePreview.type === 'image' && (
                                    <img
                                        src={filePreview.url}
                                        alt="File preview"
                                        className="max-w-full max-h-32 object-contain rounded-lg border"
                                    />
                                )}
                                
                                {filePreview.type === 'pdf' && (
                                    <i className="material-icons text-red-500 text-5xl">picture_as_pdf</i>
                                )}
                                
                                {filePreview.type === 'other' && (
                                    <i className="material-icons text-gray-500 text-5xl">description</i>
                                )}
                                
                                <div className="text-center">
                                    <p className="font-medium text-gray-700">{filePreview.name}</p>
                                    <p className="text-sm text-gray-500">{filePreview.size}</p>
                                </div>
                                
                                <div className="flex gap-2">
                                    <label htmlFor="file-upload" className="cursor-pointer px-3 py-1 text-sm bg-primary text-white rounded-full hover:bg-opacity-90">
                                        Change File
                                    </label>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600">
                                        Remove
                                    </button>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between text-body py-2">
                        <span>Supported Files (PDF, JPG, PNG)</span>
                        <span>Maximum Size: 25MB</span>
                    </div>
                </div>

                <div className="grid w-full">
                    <div className="flex flex-col lg:flex-row w-full">
                        <div className="p-4 flex gap-2 w-full lg:flex-row flex-col">
                            <label
                                htmlFor="title"
                                className="block text-nowrap my-auto">
                                Document Title:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full"
                                    placeholder="Enter Document Title"
                                />
                            </div>
                        </div>
                        <div className="p-4 flex gap-2 w-full lg:flex-row flex-col">
                            <label
                                htmlFor="department"
                                className="block text-nowrap my-auto">
                                Department:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="department"
                                    value={formData.belonging_department}
                                    onChange={(e) => handleInputChange("belonging_department", e.target.value)}
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full">
                                    <option value="GENERAL">General Medicine</option>
                                    <option value="cardiology">Cardiology</option>
                                    <option value="dermatology">Dermatology</option>
                                    <option value="neurology">Neurology</option>
                                    <option value="orthopedics">Orthopedics</option>
                                    <option value="pediatrics">Pediatrics</option>
                                    <option value="radiology">Radiology</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 flex gap-2 w-full lg:flex-row flex-col">
                            <label
                                htmlFor="doctor"
                                className="block text-nowrap my-auto">
                                Doctor:
                            </label>
                            <div className="flex items-center w-full col-span-2">
                                <select
                                    id="doctor"
                                    value={formData.uploaded_to}
                                    onChange={(e) => handleInputChange("uploaded_to", e.target.value)}
                                    disabled={loadingDoctors}
                                    className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-full disabled:opacity-50">
                                    <option value="" disabled>
                                        {loadingDoctors ? "Loading doctors..." : "Select Doctor"}
                                    </option>
                                    {Array.isArray(doctors) && doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            Dr. {doctor.first_name} {doctor.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex gap-2 lg:flex-row flex-col col-span-2">
                        <label
                            htmlFor="description"
                            className="block text-nowrap mb-auto mt-2">
                            Description:
                        </label>
                        <div className="flex items-center w-full">
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="focus:outline-none w-full mt-1 px-5 py-3 bg-grey text-muted border rounded-2xl"
                                placeholder="Enter document description (optional)"
                                rows={4}
                                cols={30}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default DocumentUploadPage;
