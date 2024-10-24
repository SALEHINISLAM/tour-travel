import React from 'react'

export default function Heading({title,subTitle}) {
  return (
    <div className='container mx-auto py-5 mt-8 mb-5 text-center flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-semibold'>{title}</h1>
        <p className='text-lg font-light'>{subTitle}</p>
    </div>
  )
}
