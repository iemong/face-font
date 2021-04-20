import React from "../../../../_snowpack/pkg/react.js";
import styles from "./style.module.css.proxy.js";
export const Button = ({
  type = "primary",
  size = "medium",
  backgroundColor,
  label,
  ...props
}) => /* @__PURE__ */ React.createElement("button", {
  type: "button",
  className: `${styles.Button} inline-block font-bold cursor-pointer border-none	rounded-3xl leading-none`,
  style: {backgroundColor},
  "data-type": type,
  "data-size": size,
  ...props
}, label);
