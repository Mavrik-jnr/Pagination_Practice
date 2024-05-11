"use client"
import CharacterCard, { CHARACTER } from "@/components/CharacterCard";
import { GET_CHARACTERS } from "@/graphql/queries/GetCharacters";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



 



export default function Home() {
  
  
  const [ListOfCharacters, setListOfCharacters] = useState<any>([])
  const [pageCount, setPageCount]  = useState<number>(1)
  const [getCharacters,{loading , error, data}] = useLazyQuery(GET_CHARACTERS, {variables:{page:pageCount} ,onCompleted: (data)=> pageCount < data.characters.info.pages? setListOfCharacters(ListOfCharacters.concat(data.characters.results)):console.log("OMO")})

  const handleLoadMore = ()=>{
    
    setPageCount(count => count +1)
    // const {loading , error, data} = useQuery(GET_CHARACTERS, {
     
    //   onCompleted: (data)=> pageCount < data.characters.info.pages? setListOfCharacters(ListOfCharacters.concat(data.characters.results)):console.log("OMO")})
  }
  useEffect(()=>{
getCharacters()
  }, [pageCount])


  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-row items-center justify-center gap-9 w-full mb-20">

     <h1 className=" text-center">Characters</h1>
     <Link href="/search" className="underline">Search</Link>
      </div>
     
     {error && <p>ERror .... {error.message}</p>}

     {
     loading? <p>Loading ....</p> :
     
     <SimpleGrid columns={4} columnGap={3} rowGap={25}>
      {
       ListOfCharacters.map((character:any)=>{
           return(
       
       <CharacterCard key={character.name} image={character.image} status={character.status} name={character.name}/>
           )
         }
        )
      }
     </SimpleGrid>

        
     }


     


     <button onClick={()=>handleLoadMore()}>Load More</button>
    </main>
  );
}
