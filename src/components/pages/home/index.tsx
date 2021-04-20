import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logo from "~/assets/images/logo.svg"
import { Button } from "~/components/atoms/button"
import styles from "./style.module.css"

const Home = (): JSX.Element => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer)
  }, [count, setCount])

  return (
    <div className={styles.Home}>
      <header className={styles.HomeHeader}>
        <img src={logo} alt="logo" className={styles.HomeLogo} />
        <div className="flex">
          <p>
            Page has been open for <code>{count}</code> seconds.
          </p>
          <p>this is home page</p>
        </div>
        <div>
          <Link to="users">users page</Link>
        </div>
        <div>
          <Link to="about">about page</Link>
        </div>
        <Button type={'primary'} label={'button'}/>
      </header>
    </div>
  )
}

export default Home
