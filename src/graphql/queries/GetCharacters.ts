import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query GetCharacters ($page:Int, $nameSearch: String){
  characters (page:$page, filter:{name:$nameSearch}){
    info{
      pages,
      count
    },
    results{
      image, 
      name, 
      status
    }
  }
}
`