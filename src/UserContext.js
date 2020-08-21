import React from 'react';

export const UserContext = React.createContext({
  lang: navigator.language,
  isLoading: false,
  isLoggedIn: false,
  userEmail: '',
  toggleRefreash: () => {},
  switchLang: () => {},
});
