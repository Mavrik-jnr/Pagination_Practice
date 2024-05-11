"use client"
import { InputGroup, Input, InputRightElement, SimpleGrid } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import CharacterCard, { CHARACTER } from "@/components/CharacterCard";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

import React, { useEffect, useState } from 'react'
import { GET_CHARACTERS } from '../page';
import { Pagination, Box } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';

type Props = {}

function Searchpage({}: Props) {
    const [searchVal, setSearchVal] = useState<string>("")
    const [resultsFound, setResultsFound] = useState<number>(0)
    const [pageCount, setPageCount] = useState<number>(0)
    const [activePage, setActivePage] = useState<number>(1)
    const [ListOfCharacters, setListOfCharacters] = useState<CHARACTER[]>([])

    const [filterCharacters, {loading, error, data}] = useLazyQuery(GET_CHARACTERS, {onCompleted:()=>{setListOfCharacters(data.characters.results); setResultsFound(data.characters.info.count); setPageCount(data.characters.info.pages)}})

    //cool feature allows us handle search only after user's done typing after a sec
    const debounce = useDebouncedCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
  
            setSearchVal(e.target.value)
            filterCharacters({variables: {nameSearch: e.target.value}})
           
            if (!e.target.value){
                setListOfCharacters([])
            }
        
    }, 1000)
    
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setActivePage(value);
        filterCharacters({variables: {nameSearch: searchVal, page:value}})
      };


  return (
    <>
    <div className='flex gap-4'>

    <Link href="/" className='text-blue-200 mb-24'>Go Back</Link>
    <Link href="/table" className='text-blue-200 mb-24'>Table</Link>
    </div>
    
    <h1 className='text-2xl mt-10 mb-8'>Searchpage</h1>
    <InputGroup size='md' flex="initial" alignItems="center" color="black" >
    <Input  p='1rem'
width="100%"
    onChange={(e)=>debounce(e)}
      placeholder='Search for a character'
    />
    <InputRightElement width='4.5rem' height="100%">
      <Image height="24" width="24" src="/images/icons/RocketLaunchCta.svg" alt='Search Icon'>

      </Image>
    </InputRightElement>
  </InputGroup>

  {error && <p>ERror .... {error.message}</p>}
  <p className='mt-10 mb-8'>{resultsFound} results found</p>

{
loading? <p>Loading ....</p> :
<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="40px">

<SimpleGrid className='mt-10' columns={4} columnGap={3} rowGap={25} width="100%" >
 {
   
  ListOfCharacters.map((character:CHARACTER)=>{
      return(
  
  <CharacterCard key={character.name} image={character.image} status={character.status} name={character.name}/>
      )
    }
   )

 
 }


</SimpleGrid>

<Pagination count={pageCount} page={activePage} onChange={handlePageChange}  color="primary"  sx={{
    ".MuiPaginationItem-root":{
        // display: "none"
        background:"#ffffffac",
        color:"black"
    },
    ".MuiPaginationItem-root:hover":{
        background:"#ffffffd1"
    },
    ".Mui-Selected":{
        background:"#f11ddcd1 !important"
    }
}} />
</Box>
}
  </>
)

  
}

export default Searchpage