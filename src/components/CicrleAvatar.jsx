const CircleAvatar = ({ src = "/assets/images/profile.png", alt = "", height = "h-10", width = "w-10", className = "" }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`w-10 ${height} ${width} rounded-full ${className}`}
            onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src = "/assets/images/profile.png"; // fallback image
            }}
            loading="lazy"
        />
    );
};

export default CircleAvatar;
