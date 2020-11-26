import React,{useContext} from 'react';
import './SearchBar.css';
import SearchIcon from '../Icons/SearchIcon';
import SeeMoreIcon from '../Icons/SeeMoreIcon';
import {ThemeContext} from '../../contexts/ThemeContext/ThemeContext'

const SearchBar = ({countryChangeHandler, filterHandler, formSubmitHandler, country, filter}) => {
	const [showFilters, setShowFilters] = React.useState(false)
	const {theme,setTheme} = useContext(ThemeContext)

	const showFiltersHandler = e => setShowFilters(!showFilters);

	return(
		<section className="searchBar">
			<form onSubmit={formSubmitHandler} className="searchBar__input">
				<SearchIcon height="25px" width="25px" fill={theme === "DARK" ? "#fff" : "var(--input)"} />
				<input type="text" value={country} onChange={countryChangeHandler} placeholder="Search for a country..." />
			</form>
			<div onClick={showFiltersHandler} className="searchBar__filter">
				<p>{filter ? filter : "Filter by Region"}</p>
				<SeeMoreIcon fill={theme === "DARK" ? "#fff" : "hsl(200, 15%, 8%)"}/>
				{ 
				showFilters &&
				<div className="searchBar__filter__items">
					<div onClick={() => filterHandler("Africa")} className="searchBar__filter__items__item">
						Africa
					</div>
					<div onClick={() => filterHandler("America")} className="searchBar__filter__items__item">
						America
					</div>
					<div onClick={() => filterHandler("Asia")} className="searchBar__filter__items__item">
						Asia
					</div>
					<div onClick={() => filterHandler("Europe")} className="searchBar__filter__items__item">
						Europe
					</div>
					<div onClick={() => filterHandler("Oceania")} className="searchBar__filter__items__item">
						Oceania
					</div>
				</div>
				}
			</div>
		</section>
	)
}

export default SearchBar;