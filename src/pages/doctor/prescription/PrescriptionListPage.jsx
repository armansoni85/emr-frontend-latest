import { useEffect, useState } from 'react';
import { getPrescriptions } from "@src/services/prescriptionService";
import { getUsers } from "@src/services/userService";

const PrescriptionListPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [prescData, usersData] = await Promise.all([
                    getPrescriptions(),
                    getUsers()
                ]);
                
                // Handle prescriptions data - based on your API response structure
                setPrescriptions(prescData?.results || []);
                
                // Create user map for quick lookup - based on your user API response structure
                const userMap = {};
                const userData = usersData?.data?.results || [];
                userData.forEach(user => {
                    userMap[user.id] = user;
                });

                // console.log('User Map:', userMap);
                setUsers(userMap);
                
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit' 
            };
            return new Date(dateString).toLocaleDateString('en-US', options);
        } catch (error) {
            return 'Invalid Date';
        }
    };

    const getRefillDays = (items) => {
        if (!items || items.length === 0) return 'N/A';
        const thresholds = items
            .map(item => item.refill_threshold_days)
            .filter(threshold => threshold != null && !isNaN(threshold));
        
        return thresholds.length > 0 ? Math.min(...thresholds) : 'N/A';
    };

    const getUserName = (prescription) => {
        const patientId = prescription.patient;
        const user = users[patientId];

        console.log('User:', patientId);
        console.log('User:', users);

        if (!user) return 'Unknown Patient';
        
        const firstName = user.first_name?.trim() || '';
        const lastName = user.last_name?.trim() || '';
        const fullName = `${firstName} ${lastName}`.trim();
        
        return fullName || user.email || 'Unknown Patient';
    };

    const getUserProfilePicture = (prescription) => {
        const patientId = prescription.patient;
        const user = users[patientId];
        return user?.profile_picture || "https://avatar.iran.liara.run/public/16";
    };

    const getUserDateOfBirth = (prescription) => {
        const patientId = prescription.patient;
        const user = users[patientId];
        return user?.date_of_birth || 'N/A';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading prescriptions...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
                <div className="text-red-800">Error: {error}</div>
            </div>
        );
    }

    if (!prescriptions || prescriptions.length === 0) {
        return (
            <div className="bg-white shadow-md rounded-2xl p-8 text-center">
                <div className="text-gray-500">No prescriptions found</div>
            </div>
        );
    }

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
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
                        <button className="absolute right-2 top-[6px] px-5 2xl:py-2 py-1 text-sm rounded-full text-white bg-primary ">Search</button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Disease or Allergy</label>
                    <div className="relative mt-2 text-muted">
                        <select className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2 appearance-none">
                            <option
                                value=""
                                disabled=""
                                selected="">
                                Search by Disease
                            </option>
                            {/* Add options here */}
                        </select>
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">arrow_drop_down</i>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="search">Date</label>
                    <div className="relative mt-2 text-muted">
                        <input
                            type="date"
                            className="w-full rounded-full px-4 py-3 border-grey focus:outline-grey2"
                        />
                        <i className="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">calendar_today</i>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-2xl pb-4">
                <div className="flex justify-between items-center p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b">
                    <h2 className="text-lg font-medium">All Prescriptions</h2>
                    <div className="text-sm text-gray-600">
                        {prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white overflow-x-auto text-nowrap">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-start font-medium">
                                    Patient Name <i className="material-icons align-middle">arrow_drop_down</i>
                                </th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date of Birth</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Disease</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Date &amp; Time</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Refill in</th>
                                <th className="py-2 px-4 border-b text-start font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-body">
                            {prescriptions.map(prescription => (
                                <tr key={prescription.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex items-center cursor-pointer">
                                            <img
                                                src={getUserProfilePicture(prescription)}
                                                alt="profile"
                                                className="w-10 h-10 rounded-full mr-3 object-cover"
                                                onError={(e) => {
                                                    e.target.src = "assets/images/profile.png";
                                                }}
                                            />
                                            <span className="font-medium">{getUserName(prescription)}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {getUserDateOfBirth(prescription)}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className="px-2 py-1 border rounded-full border-warning text-warning bg-warning bg-opacity-10">
                                            {prescription.disease || 'Not specified'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {formatDateTime(prescription.created_at)}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <span className="font-medium">
                                            {getRefillDays(prescription.items)} days
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="flex justify-end space-x-1">
                                            <button 
                                                className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                                                title="Download"
                                            >
                                                <i className="material-icons text-gray-600">file_download</i>
                                            </button>
                                            <button 
                                                className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                                                title="Print"
                                            >
                                                <i className="material-icons text-gray-600">print</i>
                                            </button>
                                            <button 
                                                className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
                                                title="More options"
                                            >
                                                <i className="material-icons text-gray-600">more_vert</i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PrescriptionListPage;