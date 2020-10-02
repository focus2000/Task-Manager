import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Headers from "./components/layouts/Headers";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PrivateRoute from './components/routes/privateRoute'
import AuthState from "./context/authContext/AuthState";
import setToken from "./utils/setToken";
import TaskState from "./context/taskContext/TaskState";
import EditTask from "./components/pages/EditTask";
import AddTask from "./components/pages/AddTask";
import Forgotten from "./components/pages/Forgotten";
import ResetPassword from "./components/pages/ResetPassword";



if(localStorage.token){
  setToken(localStorage.token)
}
function App() {
  return (
    <AuthState>
      <TaskState>
        <Router>
          <div>
            <Headers />

            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/add" component={AddTask} />
              <Route path="/edit/:id" component={EditTask} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgottenpassword" component={Forgotten} />
              <Route path="/resetpassword" component={ResetPassword} />
            </Switch>
          </div>
        </Router>
      </TaskState>
    </AuthState>
  );
}

export default App;
