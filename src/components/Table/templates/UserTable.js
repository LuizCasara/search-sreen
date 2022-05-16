import moment from "moment";
import { renderAvatar, renderIsAdmin, renderUrl } from "./TableTemplates";

export const userTrs = (data) => {
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

export const tableHeaderUser = [
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