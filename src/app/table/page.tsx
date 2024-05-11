"use client";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

function Page({}: Props) {
  const [data, setData] = useState<any[]>([]);
  const [LocationHeaders, setLocationHeaders] = useState<any>([]);
  const [LocationValues, setLocationValues] = useState<any>([]);
  const [activeSort, setActiveSort] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [searchVal, setSearchVal]= useState<string>("")
  const [cache, setCache] = useState<any[]> ([])
  const searchKeys = ["street name", "street number", "city", "state", "country", "postcode", "latitude", "longitude", "offset", "description"]


  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
    console.log("the cache")
    const filteredQueries = cache.filter((item)=>{
      return searchKeys.some((header)=>{
        if (header === "city" || header === "state" || header === "country"){
         return item.location[header].toLowerCase().includes(e.target.value.toLowerCase())
        }
        if (header === "street name"){
         return item.location.street.name.toLowerCase().includes(e.target.value.toLowerCase())
        }
        if (header === "street number"){
         return item.location.street.number.toString().includes(e.target.value.toLowerCase())
        }
        if (header === "postcode"){
         return item.location.postcode.toString().includes(e.target.value.toLowerCase())
        }
        if (header === "longitude" || header === "latitude"){
         return item.location.coordinates[header].toString().includes(e.target.value.toLowerCase())
        }
        if (header ==="offset"){
         return item.location.timezone[header].toString().includes(e.target.value.toLowerCase())
        }
        if (header ==="description"){
         return item.location.timezone[header].toLowerCase().includes(e.target.value.toLowerCase())
        }
        
      })
      
      
     
    })
    setData(filteredQueries)

  }
  //this flattens all location values to match the harcoded headers
  const flatner = (values: any[]): any[] => {
    const flattened = [];
    for (let item of values) {
      if (typeof item === "object") {
        for (let childItems of Object.values(item)) {
          flattened.push(childItems);
        }
      } else {
        // console.log("an item", item)
        flattened.push(item);
      }
    }
    return flattened;

    // flattened;
  };

  //This returns a boolean on whether to toggle the ascending or descending order for the sort algorithm
  const flipper = (header: string) => {
    if (activeSort === header) {
      setActiveSort("");
      return true;
    } else {
      setActiveSort(header);
      return false;
    }
  };
  const fetchPeople = async () => {
    const response = await fetch("https://randomuser.me/api/?results=20");
    const data = await response.json();
    return data.results;
  };

  const handleSort = (header: string) => {
    //Sort data

    if (header === "StreetName") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.street.name < b.location.street.name) {
          return flipper(header) ? 1 : -1;
        }
        if (a.location.street.name > b.location.street.name) {
          return flipper(header) ? -1 : 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }
    if (header === "StreetNumber") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.street.number < b.location.street.number) {
          return -1;
        }
        if (a.location.street.number > b.location.street.number) {
          return 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }
    if (header === "City") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.city < b.location.city) {
          return -1;
        }
        if (a.location.city > b.location.city) {
          return 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }
    if (header === "Country") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.country < b.location.country) {
          return -1;
        }
        if (a.location.country > b.location.country) {
          return 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }
    if (header === "Postcode") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.postcode < b.location.postcode) {
          return -1;
        }
        if (a.location.postcode > b.location.postcode) {
          return 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }
    if (header === "Latitude") {
      const sortedStreets = data.sort((a: any, b: any) => {
        return flipper(header)
          ? parseInt(a.location.coordinates.latitude) -
              parseInt(b.location.coordinates.latitude)
          : parseInt(b.location.coordinates.latitude) -
              parseInt(a.location.coordinates.latitude);
      });

      setData([...sortedStreets]);
    }
    if (header === "Longtitude") {
      const sortedStreets = data.sort((a: any, b: any) => {
        return (
          parseInt(a.location.coordinates.longitude) -
          parseInt(b.location.coordinates.longitude)
        );
      });

      setData([...sortedStreets]);
    }
    if (header === "Offset") {
      const sortedStreets = data.sort((a: any, b: any) => {
        return (
          parseInt(a.location.timezone.offset) -
          parseInt(b.location.timezone.offset)
        );
        // if (a.location.timezone.offset < b.location.timezone.offset){
        //   return -1
        // }
        // if (a.location.timezone.offset > b.location.timezone.offset){
        //   return 1
        // }
        // else{
        //   return 0
        // }
      });

      setData([...sortedStreets]);
    }
    if (header === "Description") {
      const sortedStreets = data.sort((a: any, b: any) => {
        if (a.location.timezone.description < b.location.timezone.description) {
          return -1;
        }
        if (a.location.timezone.description > b.location.timezone.description) {
          return 1;
        } else {
          return 0;
        }
      });

      setData([...sortedStreets]);
    }

    // data.
  };
  useEffect(() => {
    fetchPeople()
      .then((data) => {
        console.log("the Headers", data[0].location);
        console.log("the Values", flatner(Object.values(data[0].location)));
        // setLocationHeaders(Object.keys(data[0].location))
        // setLocationValues(Object.values(data[0].location))
        setCache(data)
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // SORTING ALGORITHM SIDE MISSION
    // const spiceGirls = [
    //   {nom:'ginger', age: 37},
    //   {nom: "sporty", age:30},
    //   {nom: "baby", age:19},
    //   {nom: "posh", age:20},
    // ]

    // console.log("Sorted Spice Girls by name", spiceGirls.sort((a, b)=> {
    //   if (a.nom<b.nom){
    //     return 1
    //   }
    //   if (a.nom>b.nom){
    //     return -1
    //   }
    //   else{
    //     return 0
    //   }
    // }))
    // console.log("Sorted Spice Girls by age", spiceGirls.sort((a, b)=> a.age-b.age))

    // https://randomuser.me/api/?results=20
  }, []);
  return (
    <>
      <h1 className="text-center text-2xl mb-8">
        People Table (click on a title to sort in ASC/DSC order)
      </h1>

      <InputGroup size="md" flex="initial" alignItems="center" color="black" className="mb-8">
        <Input
          p="1rem"
          width="100%"
          onChange={(e) => handleSearch(e)}
          placeholder="Search for a character"
        />
        <InputRightElement width="4.5rem" height="100%">
          <Image
            height="24"
            width="24"
            src="/images/icons/RocketLaunchCta.svg"
            alt="Search Icon"
          ></Image>
        </InputRightElement>
      </InputGroup>

      <table className="border-collapse">
        <thead className="flex justify-around w-full gap-10">
          <th
            className="text-center"
            onClick={() => handleSort("StreetNumber")}
          >
            Street Number
          </th>
          <th className="text-center" onClick={() => handleSort("StreetName")}>
            Street Name
          </th>
          <th onClick={() => handleSort("City")}>City</th>
          <th onClick={() => handleSort("State")}>State</th>
          <th onClick={() => handleSort("Country")}>Country</th>
          <th onClick={() => handleSort("Postcode")}>Postcode</th>
          <th onClick={() => handleSort("Latitude")}>Latitude</th>
          <th onClick={() => handleSort("Longtitude")}>Longtitude</th>
          <th onClick={() => handleSort("Offset")}>Offset</th>
          <th onClick={() => handleSort("Description")}>Description</th>
        </thead>
        {data.map((item: any) => {
          return (
            <>
              <tbody className="flex w-full justify-around  gap-10">
                {flatner(Object.values(item.location)).map(
                  (locationsDat: any, idx: number) => {
                    return (
                      <tr key={idx}>
                        <td key={idx} className="text-left">
                          {locationsDat}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
}

export default Page;
