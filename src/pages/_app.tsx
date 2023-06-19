import { useState, createContext, useEffect } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AppContext from '../context/appContext'
import { getEstaciones } from '@/services'

export default function App({ Component, pageProps }: AppProps) {
  const [stationLenght, setStationLenght] = useState([{}]);

  useEffect(() => {
    getEstaciones()
      .then(response => {
        const data = response;
        setStationLenght(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <AppContext.Provider value={{ stationLenght, setStationLenght }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
