import react, { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading.js';
import Button from '../components/Button/Button';
import getUsers from '../resource/GithubResource';
import logo from '../assets/dock-logo.png';
import Table from '../components/Table/Table.js';
import './home.css';

const TIME_WAITING_LOADING = '1000';

export default function Home() {
    const [firstLoading, setFirstLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [usersList, setUsersList] = useState(null);

    useEffect(() => {
        // timer para simular um loading da tela principal ;P 
        setTimeout(() => {
            setFirstLoading(false);
        }, TIME_WAITING_LOADING);
    }, []);

    const loadingInitialData = async () => {
        setLoading(true);
        const users = await getUsers();

        if (users != null) {
            setUsersList(users);
        }
        setLoading(false);
    }

    const handleLoadUsers = () => {
        loadingInitialData();
    }

    const handleClearUsers = () => {
        setUsersList(null);
    }

    function renderButtons() {
        return(
            <div className='flex'>
                <Button handleClick={handleLoadUsers} label="Carregar dados"/>
                <Button handleClick={handleClearUsers} label="Limpar dados" disabled={usersList == null}/>
            </div>
        )
    }

    return (
        <div className="main-div">
            <Loading loading={firstLoading} />
            {!firstLoading &&
                <>
                    <img src={logo} className='App-logo' alt="dock loading logo" />
                    {renderButtons()}
                    <Loading loading={loading} />
                    <Table data={usersList} />
                </>
            }
        </div>
    )
}