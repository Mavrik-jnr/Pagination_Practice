"use client";
import {
  ApolloClient,
  gql,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useEffect } from "react";

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });
  const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql/",
  });
  const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    // client
    //   .query({
    //     query: gql`
    //       query GetCharacters {
    //         characters(filter:{name:"ab"}) {
    //           info {
    //             pages
    //             count
    //           }
    //           results {
    //             name
    //             status
    //           }
    //         }
    //       }
    //     `
    //   }, )
    //   .then((result) => {
    //     console.log(result.data);
    //   });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
