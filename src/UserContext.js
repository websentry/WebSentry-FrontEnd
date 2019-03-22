import React from 'react';

export const UserContext = React.createContext({
    isLoading: false,
    isLoggedIn: false,
    userEmail: "",
    toggleRefreash: () => {},
  });