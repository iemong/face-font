import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '~/components/pages/home'
import Room from '~/components/pages/room'

const Router = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Room />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
