const LabelInput = ({ id, label, className }) => {
    return (
        <label
            htmlFor={id}
            className={`block text-nowrap ${className}`}>
            {label}
        </label>
    );
};

export default LabelInput;
