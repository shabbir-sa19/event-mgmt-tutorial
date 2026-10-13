"use client"
import { useState } from 'react'
import Loading from '../loading';

type Props = {}

export default function page({ }: Props) {
  const [isloading, setIsloading] = useState(true);

  if (isloading) { return <Loading /> }

  return (
    <div className='flex flex-col flex-1 items-center justify-center'>page</div>
  )
}