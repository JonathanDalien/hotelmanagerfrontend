import Image from 'next/image'
import { Inter } from 'next/font/google'
import logo from '../assets/exxellent nights.png'
import RootLayout from '@/layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <div className={`${inter.className} h-[calc(100vh-115px)] flex flex-col items-center gap-10 `}>
      <div className='flex items-center justify-center mt-10 '>
        <Image src={logo} alt="Vercel Logo" className='w-96' />
      </div>
      <div>
        <p className='text-center text-xl mb-4 font-bold -1.5 tracking-wider'>Willkommen!</p>
        <Link href='/hotelrooms'>
          <Button>Hotelzimmer anzeigen</Button>
        </Link>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className=''>
      <RootLayout>
        {page}
      </RootLayout>
    </div >
  )
}

