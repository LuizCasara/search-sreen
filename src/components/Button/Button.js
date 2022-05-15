import PropTypes from 'prop-types';
import './button.css';

export default function Button({handleClick, label, disabled}) {
    return (
        <button className='button' onClick={handleClick} disabled={disabled}>
            {label}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};