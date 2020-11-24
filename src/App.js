import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScreenHeader from "./screens/header/ScreenHeader";
import "./App.scss";
import ScreenProducts from "./screens/products/ScreenProducts";
import ScreenProductDetails from "./screens/productDetails/ScreenProductDetails";
import ScreenSignin from "./screens/users/ScreenSignin";
import ScreenSignup from "./screens/users/ScreenSignup";
import ScreenCart from "./screens/cart/ScreenCart";
import NotFound from "./components/NotFound";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <ScreenHeader />
                <Switch>
                    <Route path="/" exact component={ScreenProducts} />
                    <Route
                        path="/detail/:id"
                        exact
                        component={ScreenProductDetails}
                    />
                    <Route path="/signin" exact component={ScreenSignin} />
                    <Route path="/signup" exact component={ScreenSignup} />
                    <Route path="/cart" exact component={ScreenCart} />
                    <Route path="*" exact component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
