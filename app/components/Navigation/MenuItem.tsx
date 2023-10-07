import React from 'react';

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="
                    font-semibold
                    py-3
                    px-4
                    hover:bg-gray-100
                    transition
                    cursor-pointer">
            {label}
        </div>
    );
};

export default MenuItem;
