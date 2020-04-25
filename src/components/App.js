import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from '../pages/Home';
import Current from '../pages/Current';
import Forecast from '../pages/Forecast';
import Prediction from '../pages/Prediction';
import ComparePrediction from '../pages/ComparePrediction';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/current" component={Current} />
          <Route exact path="/forecast" component={Forecast} />
          <Route exact path="/listpredictions" component={Prediction} />
          <Route exact path="/comparepredictions" component={ComparePrediction} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
