import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { httpLink } from '../dataProvider';

export const login = async (username: string, password: string): Promise<{ token: string }> => {
    const {
        data: { login },
    } = await new ApolloClient({ link: httpLink, cache: new InMemoryCache() }).query({
        query: gql`{
  login(username: "${username}", password: "${password}") {
      token
  }
}`,
    });
    return login;
};
