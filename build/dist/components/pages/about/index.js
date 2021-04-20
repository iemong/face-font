import React, {useState, useEffect} from "../../../../_snowpack/pkg/react.js";
import {Link} from "../../../../_snowpack/pkg/react-router-dom.js";
import logo from "../../../assets/images/logo.svg.proxy.js";
import styles from "./style.module.css.proxy.js";
const About = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.About
  }, /* @__PURE__ */ React.createElement("header", {
    className: styles.AboutHeader
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo,
    alt: "logo",
    className: styles.AboutLogo
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex"
  }, /* @__PURE__ */ React.createElement("p", null, "Page has been open for ", /* @__PURE__ */ React.createElement("code", null, count), " seconds."), /* @__PURE__ */ React.createElement("p", null, "this is about page")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Link, {
    to: "home"
  }, "home page")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Link, {
    to: "users"
  }, "users page"))));
};
export default About;
