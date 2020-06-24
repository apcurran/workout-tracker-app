import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Workouts from "./components/Workouts";
import Footer from "./components/Footer";
import WorkoutContextProvider from "./contexts/WorkoutContext";

function App() {
  return (
    <Router>
      <div className="App">
        <WorkoutContextProvider>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/workouts" exact component={Workouts} />
          </Switch>
          <Footer />
        </WorkoutContextProvider>
      </div>
    </Router>
  );
}

export default App;
