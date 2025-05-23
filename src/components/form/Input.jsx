const Input = ({ id, label, type, placeholder, className = "", register, dirtyField = false, errors, prependInput, appendInput, ...rest }) => {
    return (
        <div className="relative flex items-center w-full">
            {prependInput && <span className="mr-2">{prependInput}</span>}
            <input
                id={id}
                type={type}
                className={`focus:outline-none w-full mt-1 px-5 py-3 border rounded-full ${className}
                ${errors ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                placeholder={placeholder || "Enter " + label}
                {...(register ? register : {})}
                {...rest}
            />
            {appendInput && <span className="ml-2">{appendInput}</span>}
        </div>
    );
};

export default Input;
