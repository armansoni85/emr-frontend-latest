const Th = ({ className = "", vAlign = "align-middle", hAlign = "text-start", children, ...rest }) => {
    return (
        <th
            className={`py-2 px-4 border-b font-medium ${className} ${vAlign} ${hAlign}`}
            {...rest}>
            {children}
        </th>
    );
};

export default Th;
