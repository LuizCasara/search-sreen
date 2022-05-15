import PropTypes from 'prop-types';
import logo from '../../assets/dock-logo.png';
import './loading.css';

export default function Loading({loading}) {
    return (
        <>
            {loading && 
                <header className="loading-header">
                    <img src={logo} className='App-logo-loading' alt="dock loading logo" />
                    <p className="loading-label">Loading...</p>
                </header>
            }
        </>
    )
}

Loading.propTypes = {
    loading: PropTypes.bool,
};