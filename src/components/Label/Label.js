import PropTypes from 'prop-types';
import './label.css';

export default function Label({id, field, value}) {
    if (field == null || value == null) {
        return <></>
    }
    
    return (
        <div id={id} className="label">
            <a className="label-field">{field}:</a>
            <br/>
            <a className="label-value">{value}</a>
        </div>
    );
}

Label.propTypes = {
    id: PropTypes.string,
    field: PropTypes.string,
    value: PropTypes.string,
};