import { ExtendedCountryInfo } from "../../store/useCountryStore";
import { explainPopulationDensity } from "../../utils/explainCountryInfo";

export const GeneralInfo = ({ country }: { country: ExtendedCountryInfo }) => (
  <div className="general-info">
    <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
    <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
    {country.population && country.area && (
      <p>
        <strong>Density:</strong>
        {explainPopulationDensity(country.population / country.area)}
      </p>
    )}
    {country.languages && (
      <p><strong>Main languages:</strong> {Object.values(country.languages).join(', ')}</p>
    )}
    {country.currencies && (
      <p><strong>Currencies: </strong> 
        {Object.values(country.currencies).map(cur => `${cur.name} (${cur.symbol})`).join(', ')}
      </p>
    )}
    {country.borders && country.borders.length > 0 && (
      <p><strong>Borders:</strong> {country.borders.join(', ')}</p>
    )}
    {country.timezones && (
      <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
    )}
    {country.googleMaps && (
      <p>
        <strong>Map:</strong> <a href={country.googleMaps} target="_blank" rel="noreferrer">Google Maps</a>
      </p>
    )}
  </div>
)