import { ExtendedCountryInfo, useCountryStore } from "../store/useCountryStore"
import { explainGini, explainIncomeLevel, explainLendingType } from "../utils/explainCountryInfo"
import { useState, useEffect } from "react"

const FinancialInfo = ({ country }: { country: ExtendedCountryInfo}) => (
  <div className="financial-info">
    <p><strong>Region:</strong> {country.region}</p>
    <p><strong>Capital:</strong> {country.capitalCity}</p>
    <p><strong>Income level:</strong> {country.incomeLevel}</p>
    <p>{explainIncomeLevel(country.incomeLevel)}</p>
    <p><strong>Lending type:</strong> {country.lendingType}</p>
    <p>{explainLendingType(country.lendingType)}</p>
    {country.gini && (
      <p><strong>Gini (income inequality):</strong> {explainGini(Object.values(country.gini)[0])}</p>
    )}
  </div>
)

const GeneralInfo = ({ country }: { country: ExtendedCountryInfo }) => (
  <div className="general-info">
    <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
    <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
    {country.languages && (
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
    )}
    {country.currencies && (
      <p><strong>Currencies:</strong> 
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

export const CountryInfo = () => {
  const { country, loading, error } = useCountryStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (country) setOpen(true)
  }, [country])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!country || !open) return null

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="countryInfo" onClick={(e) => e.stopPropagation()}>
        {/* Название страны с флагом и гербом */}
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {country.flag && <img src={country.flag} alt={`${country.name} flag`} style={{ width: '50px' }} />}
          {country.coatOfArms && <img src={country.coatOfArms} alt={`${country.name} coat of arms`} style={{ width: '50px' }} />}
          {country.name}
        </h2>

        {/* Финансовая информация */}
        <FinancialInfo country={country} />

        {/* Остальная информация */}
        <GeneralInfo country={country} />

        <button onClick={() => setOpen(false)}>Close</button>
      </div>
    </div>
  )
}
