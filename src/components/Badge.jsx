const Badge = ({ color = "", className = "", onlyText = false, children }) => {
    const enumColor = {
        info: "border-info text-info",
        danger: "border-danger text-danger",
        purple: "border-purple text-purple",
        warning: "border-warning text-warning",
        primary: "border-primary text-primary",
        success: "border-success text-success",
        darkBlue: "border-darkBlue text-darkBlue",
        black: "border-black text-black",
        muted: "border-muted text-muted",
        grey: "border-grey text-grey",
        grey2: "border-grey2 text-grey2",
        heading: "border-heading text-heading",
    };

    return (
        <>
            <span className={`px-2 py-1 border rounded-full ${enumColor[color]} ${className}`}>{children}</span>
        </>
    );
};

export default Badge;
