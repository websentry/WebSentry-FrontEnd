import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'


import CommonPage from './CommonPage';
import ConsoleSentryList from './Console/SentryList';


const Console = ({match}) => (
    <CommonPage pageType='Console'>

        <Route exact path={match.url} component={ConsoleSentryList}/>
    </CommonPage>
)



export default Console
