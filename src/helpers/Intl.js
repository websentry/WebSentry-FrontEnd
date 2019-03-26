import React from 'react';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from '../locale/lang/zh_CN.js';
import en_US from '../locale/lang/en_US.js';


const chooseLocale = () => {
    switch(navigator.language.split('_')[0]){
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return en_US;
    }
};

const Intl = ({childern}) => {
  addLocaleData([...en, ...zh]);
  return (
    <IntlProvider locale={navigator.language} messages={chooseLocale}>
      {childern}
    </IntlProvider>
  );
};

export default Intl;
