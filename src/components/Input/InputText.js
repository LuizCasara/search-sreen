import PropTypes from 'prop-types';
import './inputText.css';

export default function InputText({id, onChange, placeholder}) {
    return (
        <div className='input-div'>
            <input id={id} className='input' onChange={onChange} placeholder={placeholder} />
        </div>
    )
}

InputText.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};