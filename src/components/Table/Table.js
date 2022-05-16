import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import InputText from '../Input/InputText';
import './table.css';
import { userTrs, tableHeaderUser } from './templates/UserTable';
import { userRepositoryTrs, tableHeaderUserRepository, renderUserIdentification } from './templates/UserRepositoryTable';
import { SEARCH_TYPE } from '../../helpers/constants';

export default function Table({ id, data, type }) {
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);


    const handleChangeFilter = (input) => {
        const value = input.target.value;

        if (Array.isArray(data) && value !== null) {
            const newData = data.filter(item =>
                item.login?.toUpperCase().includes(value.toUpperCase()) ||
                item.id?.toString().toUpperCase().includes(value.toUpperCase()) ||
                item.description?.toString().toUpperCase().includes(value.toUpperCase()) ||
                item.name?.toString().toUpperCase().includes(value.toUpperCase()));
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    }

    const getHeaders = () => {
        const mountTrs = (list) => {
            return (
                <thead>
                    <tr className='tr'>
                        {list.map(header => {
                            return <th key={`th-key-${header}`}>{header}</th>
                        })}
                    </tr>
                </thead>
            )
        }

        if (type === SEARCH_TYPE.USER) {
            return mountTrs(tableHeaderUser);
        }
        return mountTrs(tableHeaderUserRepository);
    }

    const mountAndRenderTrs = (filteredData) => {
        if (type === SEARCH_TYPE.USER) {
            return userTrs(filteredData);
        }
        return userRepositoryTrs(filteredData);
    }

    if (filteredData == null || type == null) {
        return <></>
    }

    return (
        <>
            {type === SEARCH_TYPE.USER && <InputText id="input-filter" placeholder="Filtrar" onChange={handleChangeFilter} />}
            <div id={id} className='table-div'>
                {renderUserIdentification(type, filteredData)}
                <table className='table'>
                    {getHeaders()}
                    {mountAndRenderTrs(filteredData)}
                </table>
            </div>
        </>
    )
}

Table.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.object || PropTypes.array,
};