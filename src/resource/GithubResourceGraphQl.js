import { request, gql } from 'graphql-request'
import getRandomInt from '../helpers/utils';

const AUTH = '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';
const DEFAULT_URL = 'https://api.github.com/graphql';
const USERS_LOGIN = ["mojombo","defunkt","pjhyett","wycats","ezmobius","ivey","evanphx","vanpelt","wayneeseguin","brynary","kevinclark","technoweenie","macournoyer","takeo","caged","topfunky","anotherjesse","roland","lukas","fanvsfan","tomtt","railsjitsu","nitay","kevwil","Dave","jamesgolick","atmos","errfree","mojodna","bmizerany",];

const userRepositoryQuery = (user) => gql`
  {
    user(login: "${user}") {
      login
      name
      email
      company
      createdAt
      followers{
        totalCount
      }
      following{
        totalCount      
      }
      repositories(first: 10){
        totalCount
        totalDiskUsage
        nodes{
          url
          createdAt
          description
          updatedAt
          name
        }
      }
    }
}
`

const headers = {
    "Authorization": `Bearer ${AUTH}`
}

const getRandomLogin = () => {
  return USERS_LOGIN[getRandomInt(0,29)];
}

export default function LoadingUserDataByGraphql(userLogin) {
  let login = userLogin;
  if (login == null) {
    login = getRandomLogin();
  }
    return request(DEFAULT_URL, userRepositoryQuery(login), null, headers)
        .then((response) => {
            if (response) {
                return response?.user;
            }
            return null;
        }).catch(error => {
            console.log(`Falha ao carregar ${login} - `, error);
        })
}