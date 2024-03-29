import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScreenHeader from "./screens/header/ScreenHeader";
import ScreenProducts from "./screens/products/ScreenProducts";
import ScreenProductDetails from "./screens/productDetails/ScreenProductDetails";
import ScreenSignin from "./screens/auth/ScreenSignin";
import ScreenSignup from "./screens/auth/ScreenSignup";
import ScreenCart from "./screens/cart/ScreenCart";
import NotFound from "./components/NotFound";
import MessageBox from "./components/messageBox/MessageBox";
import ScreenHistory from "./screens/history/ScreenHistory";
import ScreenHistoryDetails from "./screens/historyDetails/ScreenHistoryDetails";
import ScreenCategories from "./screens/categories/ScreenCategories";
import ScreenCreateProduct from "./screens/createProduct/ScreenCreateProduct";

import "./App.scss";

function App() {
  const { error, message, isLogged, isAdmin } = useSelector((state) => state);
  return (
    <BrowserRouter>
      <div className="App">
        <ScreenHeader />

        {error && <MessageBox message={error} variant="danger" type="ERROR" />}
        {message && (
          <MessageBox message={message} variant="info" type="MESSAGE" />
        )}

        <Switch>
          <Route path="/" exact component={ScreenProducts} />
          <Route
            path="/products/detail_product/:id"
            exact
            component={ScreenProductDetails}
          />
          <Route
            path="/signin"
            exact
            component={isLogged ? NotFound : ScreenSignin}
          />
          <Route
            path="/signup"
            exact
            component={isLogged ? NotFound : ScreenSignup}
          />
          <Route
            path="/category"
            exact
            component={isAdmin ? ScreenCategories : NotFound}
          />
          <Route
            path="/products/create_product"
            exact
            component={isAdmin ? ScreenCreateProduct : NotFound}
          />
          <Route
            path="/products/edit_product/:id"
            exact
            component={isAdmin ? ScreenCreateProduct : NotFound}
          />
          <Route
            path="/history"
            exact
            component={isLogged ? ScreenHistory : NotFound}
          />
          <Route
            path="/history/:id"
            exact
            component={isLogged ? ScreenHistoryDetails : NotFound}
          />
          <Route path="/cart" exact component={ScreenCart} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
