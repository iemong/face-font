import React from "react"
import styles from "./style.module.css"

export type Props = {
  type: "primary" | "secondary"
  backgroundColor?: string
  size?: "small" | "medium" | "large"
  label: string
  onClick?: () => void
}

export const Button: React.FC<Props> = ({
  type = "primary",
  size = "medium",
  backgroundColor,
  label,
  ...props
}: Props) => (
  <button
    type="button"
    className={`${styles.Button} inline-block font-bold cursor-pointer border-none	rounded-3xl leading-none`}
    style={{ backgroundColor }}
    data-type={type}
    data-size={size}
    {...props}
  >
    {label}
  </button>
)
