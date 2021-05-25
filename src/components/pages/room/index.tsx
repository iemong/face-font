import React from 'react'
import { Link } from 'react-router-dom'

const About = (): JSX.Element => {
    return (
        <>
            <p>About</p>
            <p>
                <Link to="/">Home Page</Link>
            </p>
        </>
    )
}

export default About
