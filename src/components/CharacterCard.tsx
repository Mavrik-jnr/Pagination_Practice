import Image from 'next/image'
import React from 'react'

export type CHARACTER = {
    image:string,
    name: string,
    status:string,
}

function CharacterCard({image,name, status}: CHARACTER) {
  return (
    <article className=' w-fit max-w-[300px] bg-gray-500 rounded-xl p-4'>
        <Image  className="rounded-t-xl" width={200} height={200} src={image} alt='character image'></Image>

        <div>
            <h2 className=''>{name}</h2>
            <p>Status: {status}</p>
        </div>
    </article>
  )
}

export default CharacterCard