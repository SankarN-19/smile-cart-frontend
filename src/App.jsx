import { Route, NavLink } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";

const App = () => (
  <>
    <div className="flex space-x-2">
      {/* <Link to="/">Home</Link>
      <Link to="/product">Product</Link> */}
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>

      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>

    <Switch>
      <Route exact component={Product} path="/product" />

      <Route exact component={Home} path="/" />

      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
