import React, { Fragment, Component } from "react";
import "../stylesheets/App.css";
import { getDataFromServer } from "../data/service";
import Filters from "./Filters";
import List from "./List";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        data: [],
        isFetching: true
      },
      filters: {
        genders: [], //usamos array porq podemos tener varios inputs checkeados, si fuera radio-button con una cadena vacia valdría. Guardamos los checkbox gender que estén checkeados.
        cities: [],
        allCities: []
      }
    };
    this.getUser = this.getUser.bind(this);
    //this.handleCities = this.handleCities.bind(this);
    this.handleGenderFilter = this.handleGenderFilter.bind(this);
    this.handleCityFilter = this.handleCityFilter.bind(this);

    this.getUser();
  }
  getUser() {
    getDataFromServer().then(data => {
      this.setState(prevState => {
        return {
          users: {
            data: data.results,
            isFetching: false
          },
          filters: {
            ...prevState.filters,
            allCities: data.results
              .map(item => item.location.city)
              .filter((item, ind, arr) => arr.indexOf(item) === ind)
          }
        };
      });
    });
  }
  /*   handleCities(ev) {
    debugger;
    const value = ev.target.value;
    this.setState({
      cities: value
    });
  }
 */
  handleGenderFilter(event) {
    const { value, checked } = event.target;
    console.log(checked);

    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          //si está checkeado checkeo sino, descheckeo.
          genders: checked
            ? prevState.filters.genders.concat(value)
            : prevState.filters.genders.filter(item => item !== value)
        }
      };
    });
  }

  handleCityFilter(event) {
    const { value } = event.target;
    console.log(value);
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          //si el value está en el array lo quito de la array. Si no está en la array lo añado.
          cities: prevState.filters.cities.find(item => item === value)
            ? prevState.filters.cities.filter(item => item !== value)
            : prevState.filters.cities.concat(value)
        }
      };
    });
  }

  render() {
    const { isFetching, data } = this.state.users;
    const { genders, allCities, cities } = this.state.filters;

    return (
      <div className="App">
        <header>
          <h1 className="title">People Directory</h1>
        </header>
        {this.state.users.isFetching ? (
          <p>Loading....</p>
        ) : (
          <Fragment>
            <Filters
              onGenderChanges={this.handleGenderFilter}
              genders={genders} //inputs de género
              allCities={allCities}
              onCityChanges={this.handleCityFilter}
              cities={cities}
            />
            <List
              users={data
                .filter(
                  user => !genders.length || genders.includes(user.gender)
                )
                .filter(
                  user => !cities.length || cities.includes(user.location.city)
                )}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

/* <label className="cities" htmlFor="cities">
Location
</label>
<input
id="cities"
type="text"
value={this.state.cities}
onChange={this.handleCities}
></input> */

export default App;
