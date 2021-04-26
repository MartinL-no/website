import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

// Pages
import Map from "./pages/Map";
import Login from "./pages/Login";
import Thankyou from "./pages/Thankyou";
import ChainMemberList from "./pages/ChainMemberList";
import NewChainSignup from "./pages/NewChainSignup";
import ExistingChainSignup from "./pages/ExistingChainSignup";
import NewChainLocation from "./pages/NewChainLocation";
import UserEdit from "./pages/UserEdit";

// Components
import Navbar from "./components/Navbar";

const theme = createMuiTheme(themeFile);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Map} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={ExistingChainSignup} />
              <Route path="/thankyou" component={Thankyou} />
              <Route path="/chains/:chainId" component={ChainMemberList} />
              <Route path="/newchain" component={NewChainLocation} />
              <Route path="/users/:userId/edit" component={UserEdit} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
