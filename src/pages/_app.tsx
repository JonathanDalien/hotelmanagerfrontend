import RootLayout from '@/layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

//Inter font
const inter = Inter({ subsets: ['latin'] })


export default function App({ Component, pageProps }: AppPropsWithLayout) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page: React.ReactElement) => page)

  return (<div className={`${inter.className}`}>
    <Toaster />
    <Provider store={store}>
      {getLayout(<>
        <Component {...pageProps} />
      </>
      )}
    </Provider>
  </div>
  )
}
