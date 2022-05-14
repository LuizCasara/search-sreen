import react, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import logo from '../assets/dock-logo.png';
import './home.css';

const TIME_WAITING_LOADING = '2000';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // timer para simular um loading da tela principal ;P 
        setTimeout(() => {
            setLoading(false);
        }, TIME_WAITING_LOADING);
    }, []);

    return (
        <div className="main-div">
            <Loading loading={loading} />
            {!loading && 
                <>
                    <img src={logo} className='App-logo' alt="dock loading logo" />

                    <div className="div">
                        teste
                    </div>
                </>
            }
        </div>
    )
}