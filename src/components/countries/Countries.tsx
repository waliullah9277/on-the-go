import { use, useState } from "react"
import type { CountryType } from "../../type"
import Country from "../Country/Country";
import './Countries.css'

export interface CountriesProps {
    countriesPromise: Promise<CountryType[]>
}

export default function Countries({ countriesPromise }: CountriesProps) {

    const [visitedCountries, setVisitedCountries] = useState<CountryType[]>([])

    const [visitedFlags, setVisitedFlags] = useState<string[]>([])

    const countries = use(countriesPromise)
    // console.log(countries);   
    
    const visitedCountriesHandler =(country: CountryType): void=>{

        const exsit = visitedCountries.find(c => c.ccn3.ccn3 === country.ccn3.ccn3);
        if(exsit){
            const remainingCountries = visitedCountries.filter(f => f.ccn3.ccn3 !== country.ccn3.ccn3);
            setVisitedCountries(remainingCountries);
        }
        else{
            const newVisitedCountries = [...visitedCountries, country]
            setVisitedCountries(newVisitedCountries)
        }
    }

    const visitedFlagsHandler = (flag: string) : void =>{
        // console.log(flag);

        if(visitedFlags.includes(flag)){
            const remainingFlags = visitedFlags.filter(f => flag !== f)
            setVisitedFlags(remainingFlags)
        }else{
            const newVisitedFlags = [...visitedFlags, flag]
            setVisitedFlags(newVisitedFlags)
        }        
    }
    
    return (
        <div>
            <h2>Total Countries: {countries.length}</h2>
            <h2>Total Visited Countries: {visitedCountries.length}</h2>
            <h2>Total Visited Flags: {visitedFlags.length}</h2>
            <div className="visited-flags">
                {visitedFlags.map((flag, index) => <img key={index} src={flag} alt="Visited Flags" />)}
            </div>

            <div>
                <ul>
                    {visitedCountries.map(country => <li key={country.ccn3.ccn3}>{country.name.common}</li> )}
                </ul>
            </div>
            <div className="countries">
                {countries.map(country => <Country key={country.ccn3.ccn3} country={country} visitedCountriesHandler={visitedCountriesHandler} visitedFlagsHandler={visitedFlagsHandler}></Country>)}
            </div>
        </div>
    )
}