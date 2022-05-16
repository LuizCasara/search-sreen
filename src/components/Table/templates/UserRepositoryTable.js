import moment from "moment";
import { SEARCH_TYPE } from "../../../helpers/constants";
import { renderUrl } from "./TableTemplates";
import Label from "../../Label/Label.js";
import "../table.css";

export const userRepositoryTrs = (data) => {
    if (data === null || !Array.isArray(data?.repositories?.nodes)) {
        return <></>;
    }

    const trList = [];
    data.repositories.nodes.forEach((node, idx) => {
        trList.push(
            <tbody key={`tbody-key-${idx}`} >
                <tr key={`tr-key-${idx}`} className={idx % 2 === 1 ? 'active-row' : ''}>
                    <td>{node.name}</td>
                    <td>{node.description}</td>
                    <td>{moment(node.createdAt).format('MMMM Do YYYY')}</td>
                    <td>{moment(node.updatedAt).format('MMMM Do YYYY')}</td>
                    <td>{renderUrl(node.url)}</td>
                </tr>
            </tbody>
        );
    });

    return trList;
}

export const renderUserIdentification = (type, user) => {
    if (user == null && type !== SEARCH_TYPE.USER_REPOSITORY) {
        return null;
    }
    return(
        <div className="label-div">
            <Label field="Login" value={user?.login}/>
            <Label field="Name" value={user?.name}/>
            <Label field="Followers" value={user?.followers?.totalCount}/>
            <Label field="Following" value={user?.following?.totalCount}/>
            <Label field="Repositories" value={user?.repositories?.totalCount}/>
        </div>
    )
}

export const tableHeaderUserRepository = [
    "Name",
    "Description",
    "CreatedAt",
    "UpdatedAt",
    "Url",
]