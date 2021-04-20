import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "~/assets/images/logo.svg"
import styles from "./style.module.css"

const About = (): JSX.Element => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  }, [count, setCount])

  return (
    <div className={styles.About}>
      <header className={styles.AboutHeader}>
        <img src={logo} alt="logo" className={styles.AboutLogo} />
        <div className="flex">
          <p>
            Page has been open for <code>{count}</code> seconds.
          </p>
          <p>this is about page</p>
        </div>
        <div>
          <Link to="home">home page</Link>
        </div>
        <div>
          <Link to="users">users page</Link>
        </div>
      </header>
    </div>
  )
}

export default About
