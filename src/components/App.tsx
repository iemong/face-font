import React from 'react'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from '~/recoil/DebugObserver'
import Router from '~/components/Router'

const App = (): JSX.Element => {
    return (
        <RecoilRoot>
            <DebugObserver />
            <Router />
        </RecoilRoot>
    )
}

export default App
