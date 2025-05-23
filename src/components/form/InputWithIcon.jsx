const InputWithIcon = ({
    icon,
    onClickIcon,
    placeholder,
    type = "text",
    value,
    onChange,
    id = null,
    register,
    dirtyField = false,
    errors,
    ...rest
}) => {
    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10 pl-4 ${
                        // dirtyField ? 
                        (errors ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500")
                        //  : ""
                    }`}
                    {...(register ? register : {})}
                    {...rest}
                />
                <span
                    className={`material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
                        ${onClickIcon ? "cursor-pointer" : ""}`}
                    onClick={onClickIcon}>
                    {icon}
                </span>
            </div>
            {/* dirtyField &&  */errors && <span className="text-red-500 text-sm">{errors.message}</span>}
        </div>
    );
};

export default InputWithIcon;
