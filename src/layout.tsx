import React from 'react'
import Navbar from './components/layout/Navbar'

type Props = {
    children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
    return (
        <div className=''>
            <Navbar />
            {children}
        </div >
    )
}

export default RootLayout