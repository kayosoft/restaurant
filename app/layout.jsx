'use client';
import "@styles/globals.css";

import Nav from "@components/Nav";
import AppProvider from "@components/AppProvider";
import { createContext, useState } from "react";

export const metadata = {
  title: "Restaurants",
  description: "Discover & Experience",
};

const RootLayout = ({ children }) => {
  const [appContext, setAppContext] = useState(localStorage.getItem("token"));
  return  (
  <html lang='en'>
    <body>
      <AppProvider.Provider value={{appContext, setAppContext}}>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </AppProvider.Provider>
    </body>
  </html>
  );
};

export default RootLayout;
