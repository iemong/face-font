import React, {useState, useEffect} from "../../../_snowpack/pkg/react.js";
import {BrowserRouter as Router, Switch, Route} from "../../../_snowpack/pkg/react-router-dom.js";
import Home from "../pages/home/index.js";
import About from "../pages/about/index.js";
import Users from "../pages/users/index.js";
const App = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/about"
  }, /* @__PURE__ */ React.createElement(About, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/users"
  }, /* @__PURE__ */ React.createElement(Users, null)), /* @__PURE__ */ React.createElement(Route, {
    path: "/"
  }, /* @__PURE__ */ React.createElement(Home, null))));
};
export default App;
