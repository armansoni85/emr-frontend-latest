import { STATUS_ID, STATUS_TEXT } from "@src/constant/appointments";

const StatusText = ({ status }) => {
    const statusText = (status) => {
        if (STATUS_ID.IN_PROGGESS == status) {
            return <span className="text-info">{STATUS_TEXT.IN_PROGGESS}</span>;
        } else if (STATUS_ID.PENDING == status) {
            return <span className="text-warning">{STATUS_TEXT.PENDING}</span>;
        } else if (STATUS_ID.REJECTED == status) {
            return <span className="text-danger">{STATUS_TEXT.REJECTED}</span>;
        } else if (STATUS_ID.DONE == status) {
            return <span className="text-success">{STATUS_TEXT.DONE}</span>;
        }
    };
    return statusText(status);
};

export default StatusText;
