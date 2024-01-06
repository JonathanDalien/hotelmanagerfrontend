import RootLayout from '@/layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {



  const getLayout = Component.getLayout || ((page: React.ReactElement) => page)
  return (<>
    <Toaster />
    <Provider store={store}>
      {getLayout(<>
        <Component {...pageProps} />
      </>
      )}
    </Provider>
  </>
  )
}
