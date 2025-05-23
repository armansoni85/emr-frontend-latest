const Textarea = ({ id, label, placeholder, className, register, dirtyField = false, errors, rows = 6, cols = 30, ...rest }) => {
    return (
        <textarea
            id={id}
            className={`focus:outline-none w-full mt-1 px-5 py-3 border rounded-2xl ${className}
            ${errors ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
            placeholder={placeholder || "Enter " + label}
            rows={rows}
            cols={cols}
            {...register}
            {...rest}
        />
    );
};

export default Textarea;
