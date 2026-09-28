import { useState } from "react";
import type { CountryType } from "../../type";
import './Country.css';

export interface CountryProps {
    country: CountryType;
    visitedCountriesHandler: (country: CountryType) => void
    visitedFlagsHandler: (flag: string) => void
}

export default function Country({ country, visitedCountriesHandler, visitedFlagsHandler }: CountryProps) {

    const [visited, setVisited] = useState<boolean>(false)

    const buttonClickHandler = ()=>{
        setVisited(!visited);
        visitedCountriesHandler(country)
    }

    return (
        <div className={`country ${visited ? "country-visited": ""}`}>
            <h3>{country.name.common}</h3>
            <img src={country.flags.flags.png} alt={country.flags.flags.alt} />
            <h3>Population: {country.population.population} </h3>
            <h3>Capital: {country.capital.capital} </h3>
            <button className="visited" onClick={buttonClickHandler}>{visited ? "Visited" : "Mark as visited"}</button>
            <button onClick={()=> visitedFlagsHandler(country.flags.flags.png)}>Visited as Flags</button>
        </div>
    );
}