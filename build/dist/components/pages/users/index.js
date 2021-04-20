import React, {useState, useEffect} from "../../../../_snowpack/pkg/react.js";
import {Link} from "../../../../_snowpack/pkg/react-router-dom.js";
import logo from "../../../assets/images/logo.svg.proxy.js";
import styles from "./style.module.css.proxy.js";
const Users = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.Users
  }, /* @__PURE__ */ React.createElement("header", {
    className: styles.UsersHeader
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo,
    alt: "logo",
    className: styles.UsersLogo
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("p", null, "Page has been open for ", /* @__PURE__ */ React.createElement("code", null, count), " seconds."), /* @__PURE__ */ React.createElement("p", null, "this is users page")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Link, {
    to: "home"
  }, "home page")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Link, {
    to: "about"
  }, "about page"))));
};
export default Users;
