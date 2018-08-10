import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'


import CommonPage from './CommonPage';
import ConsoleSentryList from './Console/SentryList';
import ConsoleSentryCreate from './Console/SentryCreate';


const Console = ({match}) => (
    <CommonPage pageType='Console'>

        <Route exact path='/console/' component={ConsoleSentryList}/>
        <Route path='/console/sentry/create' component={ConsoleSentryCreate}/>
    </CommonPage>
)



export default Console
