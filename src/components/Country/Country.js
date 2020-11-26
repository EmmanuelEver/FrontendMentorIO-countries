import React from 'react';
import './Country.css';
import {Link} from 'react-router-dom';

const Country = ({name, population, region, capital, flagUrl}) => {
	return(
		<div className="country">
			<Link to={`/${name}`}>
				<div className="country__flag">
					<img src={flagUrl} alt="" />
				</div>
				<div className="country__details">
					<h4>{name}</h4>
					<p>Population: <span>{population}</span> </p>
					<p>Region: <span>{region}</span> </p>
					<p>Capital: <span>{capital}</span> </p>
				</div>
			</Link>
		</div>
	)
}

export default Country;