// const URL = 'https://api.github.com/users/{userName}/repos?per_page=50';
const DEFAULT_URL = 'https://api.github.com';
const AUTH = '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';

const headers = new Headers({
    auth: AUTH,
});

const requestProps = {
    headers,
};

export default async function getUsers(user) {
    let getResource = DEFAULT_URL + '/users';

    if (user) {
        getResource = `${URL}/${user}`;
    }

    return await fetch(getResource)
        .then(response => {
            return response.json();
        });
}
