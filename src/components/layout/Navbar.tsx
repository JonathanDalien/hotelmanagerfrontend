import React from 'react'
import Image from 'next/image'
import exxellentnighttext from '@/assets/exxellent nights text.png'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className='bg-gray-800 p-4 flex gap-10 items-center'>
            <Link href={"/"}>
                <Image src={exxellentnighttext} alt="" width={150} />
            </Link >
            <div>
                <ul className='flex gap-10'>
                    <li className=''>
                        <Link className='font-bold text-white  p-2 rounded-md hover:bg-gray-700 transition-all' href="/">Dashboard</Link>
                    </li>
                    <li className=''>
                        <Link className='font-bold text-white  p-2 rounded-md hover:bg-gray-700 transition-all' href="/hotelrooms">Hotelzimmer</Link>
                    </li>
                    <li className=''>
                        <Link className='font-bold text-white  p-2 rounded-md hover:bg-gray-700 transition-all' href="#">Statistiken</Link>
                    </li>
                    <li className=''>
                        <Link className='font-bold text-white  p-2 rounded-md hover:bg-gray-700 transition-all' href="#">Kunden</Link>
                    </li>
                    <li className=''>
                        <Link className='font-bold text-white  p-2 rounded-md hover:bg-gray-700 transition-all' href="#">Rechnungen</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar