import PropTypes from 'prop-types';
import moment from 'moment';
import { useEffect, useState } from 'react';
import InputText from '../Input/InputText';
import './table.css';

const tableHeader = [
    "Avatar",
    "Login",
    "Name",
    "Email",
    "Company",
    "Type",
    "Admin",
    "Followers",
    "Following",
    "Repositories",
    "Created At",
    "Url",
]

export default function Table({id, data, headers = tableHeader}) {
    const [filteredData, setFilteredData] = useState(data);

    useEffect(()=>{
        setFilteredData(data);
    }, [data]);

    const renderAvatar = (id, url) => {
        return (
            <img src={url} className='avatar' alt={`User Avatar - ${id}`} />
        )
    }

    const renderUrl = (url) => {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">bio link</a>
        )
    }

    const renderIsAdmin = (isAdmin) => {
        return (
            <>
                {isAdmin ? '🟢' : '🔴'}
            </>
        )
    }

    const handleChangeFilter = (value) => {
        if (Array.isArray(data) && value !== null) {
            const newData = data.filter(item => 
                item.login.toUpperCase().includes(value.target.value.toUpperCase()) ||
                item.id.toString().toUpperCase().includes(value.target.value.toUpperCase()));
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    }

    const mountAndRenderTrs = (data) => {
        if (!Array.isArray(data)) {
            return <></>;
        }

        const trList = [];
        data.forEach((user, idx) => {
            trList.push(
                <tbody key={`tbody-key-${idx}`} >
                    <tr key={`tr-key-${idx}`} className={idx % 2 === 1 ? 'active-row' : ''}>
                        <td>{renderAvatar(user.id, user.avatar_url)}</td>
                        <td className='login'>{user.login}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.company}</td>
                        <td>{user.type}</td>
                        <td>{renderIsAdmin(user.site_admin)}</td>
                        <td>{user.followers?.totalCount}</td>
                        <td>{user.following?.totalCount}</td>
                        <td>{user.repositories?.totalCount}</td>
                        <td>{moment(user.CreatedAt).format('MMMM Do YYYY')}</td>
                        <td>{renderUrl(user.html_url)}</td>
                    </tr>
                </tbody>
            );
        });

        return trList;
    }

    if (!Array.isArray(data)) {
        return <></>;
    }

    return (
        <>
            <InputText id="input-filter" placeholder="Filtrar" onChange={handleChangeFilter}/>
            <div id={id} className='table-div'>
                <table className='table'>
                    <thead>
                        <tr className='tr'>
                            {headers.map(header => {
                                return <th key={`th-key-${header}`}>{header}</th>
                            })}
                        </tr>
                    </thead>
                    {mountAndRenderTrs(filteredData)}
                </table>
            </div>
        </>
    )
}

Table.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array,
    headers: PropTypes.array,
};