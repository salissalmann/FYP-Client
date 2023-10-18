import { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick?: () => void;
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    icon?: IconType,
}
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    outline = false,
    small = false,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        font-semibold
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-rose-500' : 'border-transparent'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        `}>
            {Icon &&
                <Icon size={24}
                    className={`absolute
                    left-4
                    ${small ? 'top-2' : 'top-3'}`}
                />
            }
            {label}
        </button>
    )
}

export default Button;