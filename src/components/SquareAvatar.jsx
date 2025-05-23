const SquareAvatar = ({ src = "/assets/images/johnson.png", alt = "", height = "h-20", className = "" }) => {
    return (
        <img
            src={src}
            className={`rounded-xl ${height} ${className}`}
            onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src = "/assets/images/johnson.png"; // default image
            }}
            alt={alt}
        />
    );
};

export default SquareAvatar;
