import React, { VFC } from 'react'
import styles from './button.module.css'

type Props = {
    children: React.ReactNode
    onClick: () => void
}

const Button: VFC<Props> = ({ children, onClick }: Props) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
