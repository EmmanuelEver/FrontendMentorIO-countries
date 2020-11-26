import React from 'react';
import './Countries.css';
import Country from '../Country/Country';
import Spinner from '../Loading/Spinner/Spinner'


const Countries = ({query, region}) => {
	const [countryData, setCountryData] = React.useState([]);
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		console.log(region)
		setLoading(true)
		fetchCountry(query)
		.then( data => {
			if(region){
				setCountryData(data.filter((country) => country.region = region))
			}else{
				setCountryData(data)
			}
			setLoading(false)
		})
		.catch( err => {
			console.error(err)
			setLoading(false)
		})
		console.log(countryData)
	}, [query])

	const fetchCountry = async (query) => {
	  console.log(query);
	  const response = await fetch(`https://restcountries.eu/rest/v2/name/${query}`);
	  const data = response.json();
	  return data;
	 }

	return(
		<section className="countries">
		{loading && <Spinner />}
			{	countryData.length > 0 &&
				countryData?.map( (country, index) => (
					<Country 
						key={index}
						name={country.name}
						population={country.population}
						region={country.region}
						capital={country.capital}
						flagUrl={country.flag}
						/>
				))
			}
			<i aria-hidden="true"></i>
			<i aria-hidden="true"></i>
			<i aria-hidden="true"></i>
			<i aria-hidden="true"></i>
		</section>
	)
}

export default Countries;