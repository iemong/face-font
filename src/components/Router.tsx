import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '~/components/pages/home'
import About from '~/components/pages/about'

const Router = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
