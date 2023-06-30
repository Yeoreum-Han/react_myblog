import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import routes from "./routes";
import Bottom from "./components/Bottom";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="d-flex comps">
          <SideBar/>
          <Switch>
            {routes.map((route) => {
              if(route.auth){
                return (
                  <ProtectedRoute
                  exact
                  key={route.path}
                  path={route.path}
                  component={route.component}   
                  />             
                  );
              }
              return (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </div>
        <Bottom />
      </div>
    </BrowserRouter>
  );
}

export default App;
