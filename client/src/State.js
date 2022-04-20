// @Author: Rahul Kherajani
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
const StateContext = createContext();

const State = (props) => {
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem('cartList') || '[]')
  );

  const [siteAuth, setSiteAuth] = useState(
    JSON.parse(localStorage.getItem('siteAuth') || '{}')
  );

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem('siteAuth', JSON.stringify(siteAuth));
  }, [siteAuth]);

  const modifySiteAuth = (key, value) => {
    setSiteAuth(prevValue => ({ ...prevValue, [key]: value }))
  }

  return (
    <StateContext.Provider value={{ cartList, setCartList, siteAuth, modifySiteAuth }}>
      {props.children}
    </StateContext.Provider>
  );
};

export { State, StateContext };
