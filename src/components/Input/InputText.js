import PropTypes from 'prop-types';
import './inputText.css';

export default function InputText({onChange, placeholder}) {
    return (
        <div className='input-div'>
            <input className='input' onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

InputText.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};