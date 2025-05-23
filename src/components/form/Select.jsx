const Select = ({ id, children, className, register, dirtyField = false, errors, ...rest }) => {
    return (
        <select
            id={id}
            className={`focus:outline-none w-full mt-1 px-5 py-3 border rounded-full ${className}`}
            {...rest}>
            <option
                value=""
                disabled>
                .......
            </option>
            {children}
        </select>
    );
};

export default Select;
