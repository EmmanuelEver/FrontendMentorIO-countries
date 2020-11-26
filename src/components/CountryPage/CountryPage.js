import React,{ useContext} from 'react';
import './CountryPage.css';
import { withRouter, Link } from 'react-router-dom';
import ArrowBackIcon from '../Icons/ArrowBackIcon';
import Spinner from '../Loading/Spinner/Spinner'
import {ThemeContext} from '../../contexts/ThemeContext/ThemeContext'

const CountryPage = ({match, history}) => {
	const [country, setCountry] = React.useState(null);
	const [borders, setBorders] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const {theme, setTheme} = useContext(ThemeContext)

	React.useEffect(() => {
		let countryName = match.params.country
		setLoading(true)
		fetchCountry(countryName)
		.then( country => {
			if(country){
				let newCountry = {...country}
				newCountry.name = countryName
				setCountry({...newCountry, data:{...country}})
			}else{
				setCountry({name: countryName, data:{...country}})
			}
			setLoading(false)
		})
		.catch(err => console.log(err))
	}, [country?.name])

	React.useEffect( () => {
		console.log("country", country);
		if(country && country.borders.length > 0){
			Promise.all(country.borders.map( code => {
				return fetchBorder(code);
			}))
			.then( responses => {
				let borderLists = []
				responses.forEach( response => borderLists.push(response))
				setBorders(borderLists)
				console.log(borderLists)
			})
			.catch(err => {
				console.log(err);
			})	
		}
	}, [country]);

	const fetchCountry = async (country) => {
		console.log(country);
		const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
		const countryData = await response.json();
		return {...countryData[0] }
	}

	const fetchBorder = async (code) => {
		const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name;alpha3Code`);
		const countryData = await response.json();
		return {...countryData}
	}

	const borderClicked = (code) => {
		let newCountry = {...country}
		newCountry.name = code
		setCountry({...newCountry})
		history.push(`/${code}`);
	}

	return(
		<React.Fragment>
			{	loading ?
					(<Spinner /> )
					:
					(<section className="countryPage">
						<div className="countryPage__back">
							<Link className="btn" to="/">
								<ArrowBackIcon height="20px" width="20px" fill={theme === "DARK" ? "#fff" : "hsl(200, 15%, 8%)"}  />
								<p>Back</p>
							</Link>
						</div>
						<div className="countryPage__country">
							<div className="countryPage__country__flag">
								<img src={country?.data?.flag} alt=""/>
							</div>
							<div className="countryPage__country__details">
								<h2>{country?.data?.name}</h2>
								<div className="countryPage__country__details__lists">
									<ul>
										<li>Native Name: <span>{country?.data?.nativeName}</span></li>
										<li>Population: <span>{country?.data?.population}</span></li>
										<li>Region: <span>{country?.data?.region}</span></li>
										<li>Sub Region: <span>{country?.data?.subregion}</span></li>
										<li>Capital: <span>{country?.data?.capital}</span></li>
									</ul>
									<ul>
										<li>Top Level Domain: <span>{country?.data?.topLevelDomain[0]}</span></li>
										<li>Currencies: {country?.data?.currencies?.map( currency => <span key={currency.code}>{currency.name}, </span>)}</li>
										<li>Languages: {country?.data?.languages?.map( language => <span key={language.code}>{language.name}, </span>)}</li>
									</ul>
								</div>
								<div className="countryPage__country__details__borders">
									<p> Border Countries: </p>
									{
										borders?.map( (country, index) => (
											<span onClick={() => borderClicked(country.name)} key={index} className="btn">{country.name}</span>
										))
																	
									}
								</div>
							</div>
						</div>
					</section>)}
		</React.Fragment>
	)
}

export default withRouter(CountryPage);