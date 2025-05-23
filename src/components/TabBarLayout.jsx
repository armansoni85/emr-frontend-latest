const TabBarLayout = ({ children, className = "", ...rest }) => {
    return (
        <div
            className={`flex gap-3 overflow-x-auto mb-4 text-nowrap pb-2 ${className}`}
            {...rest}>
            {children}
        </div>
    );
};

export default TabBarLayout;
