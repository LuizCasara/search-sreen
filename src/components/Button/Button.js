import PropTypes from 'prop-types';
import './button.css';

export default function Button({id, handleClick, label, disabled}) {
    return (
        <button id={id} className='button' onClick={handleClick} disabled={disabled}>
            {label}
        </button>
    )
}

Button.propTypes = {
    id: PropTypes.string,
    handleClick: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};