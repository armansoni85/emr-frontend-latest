const ChevronLeft = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        return window.history.back();
    };

    return (
        <div>
            <div
                className="bg-white rounded-full p-2 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={handleClick}>
                <i className="material-icons">chevron_left</i>
            </div>
        </div>
    );
};

export default ChevronLeft;
