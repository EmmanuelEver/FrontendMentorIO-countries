import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar';
import Countries from './components/Countries/Countries';
import CountryPage from './components/CountryPage/CountryPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from './contexts/ThemeContext/ThemeContext'

const App = () => {
  const [country, setCountry] = React.useState("");
  const [filter, setFilter] = React.useState(null);
  const [query, setQuery] = React.useState(null)

  const countryChangeHandler = (e) => setCountry(e.target.value);
  const filterHandler = (val) => setFilter(val);
  const formSubmitHandler = (e) => {
		e.preventDefault();
		setQuery(country);
		console.log(filter);
	}

  return (
  	<ThemeProvider>
  	<Router>
	    <div className="app">
	    	<Navbar />
	    	<main className="app__main">
	    		<Switch>
	    			<Route path="/" exact>
			    		<SearchBar 
				    		countryChangeHandler={countryChangeHandler}
				    		country={country} 
				    		filterHandler={filterHandler}
				    		filter={filter}
				    		formSubmitHandler={formSubmitHandler}
				    		/>
				    	<Countries query={query} region={filter}/>
				    </Route>
	    			<Route path="/:country" component={CountryPage}/>
				</Switch>
	    	</main>
	    </div>
	</Router>
	</ThemeProvider>
  );
}

export default App;
