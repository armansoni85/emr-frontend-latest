const Td = ({ className = "", vAlign = "align-middle", hAlign = "text-start", children, ...rest }) => {
    return (
        <td
            className={`py-2 px-4 border-b ${className} ${vAlign} ${hAlign}`}
            {...rest}>
            {children}
        </td>
    );
};

export default Td;
