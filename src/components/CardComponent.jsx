const CardComponent = ({ children, className = "" }) => {
    return <div className={`bg-white rounded-2xl p-3 ${className}`}>{children}</div>;
};

export default CardComponent;
