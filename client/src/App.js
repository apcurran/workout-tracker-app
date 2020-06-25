import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WorkoutContextProvider from "./contexts/WorkoutContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Workouts from "./components/Workouts";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WorkoutsEditModal from './components/WorkoutsEditModal';

function App() {
  return (
    <Router>
      <div className="App">
        <WorkoutContextProvider>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user/workouts" exact component={Workouts} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/signup" exact component={Signup} />
          </Switch>
          <Footer />
          <WorkoutsEditModal />
        </WorkoutContextProvider>
      </div>
    </Router>
  );
}

export default App;
