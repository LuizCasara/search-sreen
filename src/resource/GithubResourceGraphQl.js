import { request, gql } from 'graphql-request'

const AUTH = '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';
const DEFAULT_URL = 'https://api.github.com/graphql';

const userQuery = (user) => gql`
  {
    user(login: "${user}") {
        id
        login
        name
        bio
        email
        company
        bioHTML
        createdAt
        followers{
          totalCount
        }
        following{
          totalCount      
        }
        repositories{
          totalCount
        }
    }
}
`

const headers = {
    "Authorization": `Bearer ${AUTH}`
}

export default function LoadingUserDataByGraphql(user) {
    return request(DEFAULT_URL, userQuery(user), null, headers)
        .then((response) => {
            if (response) {
                return response?.user;
            }
            return null;
        }).catch(error => {
            console.log(`Falha ao carregar ${user} - `, error);
        })
}