import react, { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading.js';
import Button from '../components/Button/Button.js';
import logo from '../assets/dock-logo.png';
import Table from '../components/Table/Table.js';
import getUsers from '../resource/GithubResource.js';
import LoadingUserDataByGraphql from '../resource/GithubResourceGraphQl.js';
import './home.css';
import '../resource/GithubResourceGraphQl.js'
import { SEARCH_TYPE } from '../helpers/constants.js';

const TIME_WAITING_LOADING = '1000';

export default function Home() {
    const [firstLoading, setFirstLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [usersList, setUsersList] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
        // timer para simular um loading da tela principal
        setTimeout(() => {
            setFirstLoading(false);
        }, TIME_WAITING_LOADING);
    }, []);

    const loadUsers = async () => {
        handleClearUsers();
        setLoading(true);
        setType(SEARCH_TYPE.USER);
        const users = await getUsers();
        setUsersList(users);
        setLoading(false);
        // a tela é renderizada com as informações base, mas vai buscar mais dados por user
        // comentado pois estava estourando o limite de requests com a chave publica
        // loadMoreDataByUser(users);
    }

    const loadRandomUser = async () => {
        handleClearUsers();
        setLoading(true);
        setType(SEARCH_TYPE.USER_REPOSITORY);
        const users = await LoadingUserDataByGraphql();
        setUsersList(users);
        setLoading(false);
    }

    const loadMoreDataByUser = async (users) => {
        const promisesList = [];
        // monta a lista de promises
        users.forEach(user => {
            promisesList.push(LoadingUserDataByGraphql(user.login));
        });

        // executa todas as promise de uma vez
        const moreUserData = await Promise.all(promisesList)
            .then((userData) => {
                return userData;
            });

        addAdditionalData(users, moreUserData);
    }

    const addAdditionalData = (users, moreUserData) => {
        // adicionada os dados novos ao objeto, atualizando a tela
        const newUsers = [];
        users.forEach(user => {
            newUsers.push({ ...user, ...moreUserData.find(item => item?.login === user?.login) });
        })

        setUsersList(newUsers);
    }

    const handleClearUsers = () => {
        setUsersList(null);
        setType(null);
    }

    function renderButtons() {
        return (
            <div className='button-div'>
                <Button id="btn-load-data" handleClick={loadUsers} label="Carregar usuários" />
                <Button id="btn-load-data" handleClick={loadRandomUser} label="Carregar usuário aleatório" />
                <Button id="btn-clear-data" handleClick={handleClearUsers} label="Limpar dados" disabled={usersList == null} />
            </div>
        )
    }

    return (
        <div className="main-div">
            <div className="container">
                <Loading loading={firstLoading} />
                {!firstLoading &&
                    <>
                        <img src={logo} className='App-logo' alt="dock loading logo" />
                        {renderButtons()}
                        <Loading loading={loading} />
                        <Table id="table-data" data={usersList} type={type} />
                    </>
                }
            </div>
        </div>
    )
}