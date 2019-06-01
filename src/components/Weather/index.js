import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import List from './List';
import TodayWeather from './TodayWeather';
import './weather.css';

const API_CITIES = 'http://127.0.0.1:8080/weather-crawler/available-cities';

class Weather extends React.Component {
  state = {
    cities: []
  };

  async componentDidMount() {
    const cities = await fetch(API_CITIES)
      .then(res => res.json())
      .then(data => data);

    // Now I can use data as sync!
    // console.warn('FETCHED CITIES', cities);

    this.setState({
      cities
    });
  }

  render() {
    const { match } = this.props;
    const { cities } = this.state;

    return (
      <div className="weather">
        <Switch>
          <Route path={`${match.path}/:cityId`} component={TodayWeather} />
          <Route exact path={match.path} render={() => <List cities={cities} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Weather);
