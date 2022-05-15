import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InputText from '../Input/InputText';
import './table.css';

const tableHeader = [
    "Id",
    "Avatar",
    "Login",
    "Type",
    "Admin",
    "Url",
    // "Followers",
    // "Following",
    // "Repos",
]

export default function Table({data, headers = tableHeader}) {
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
                item.login.includes(value.target.value) ||
                item.id.toString().includes(value.target.value));
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    }

    const renderCount = (url) => { 
        return fetch(url)
            .then(response => {
                return response.json();
            })
    }

    const mountAndRenderTrs = (data) => {
        if (!Array.isArray(data)) {
            return <></>;
        }

        const trList = [];
        data.forEach((user, idx) => {
            // return Promise.all([
            //     renderCount(user.followers_url),
            //     renderCount(user.following_url),
            //     renderCount(user.repos_url),
            // ]).then(([followersCount, followingCount, reposCount]) => {
            // });
            trList.push(
                <tbody key={`tbody-key-${idx}`} >
                    <tr key={`tr-key-${idx}`} className={idx % 2 === 1 ? 'active-row' : ''}>
                        <td>{user.id}</td>
                        <td>{renderAvatar(user.id, user.avatar_url)}</td>
                        <td className='login'>{user.login}</td>
                        <td>{user.type}</td>
                        <td>{renderIsAdmin(user.site_admin)}</td>
                        <td>{renderUrl(user.html_url)}</td>
                        {/* <td>{user.followers}</td>
                        <td>{user.following}</td>
                        <td>{user.public_repos}</td> */}
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
            <InputText placeholder="Filtrar" onChange={handleChangeFilter}/>
            <div className='table-div'>
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
    data: PropTypes.array,
    headers: PropTypes.array,
};