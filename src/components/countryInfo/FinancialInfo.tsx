import { ExtendedCountryInfo } from "../../store/useCountryStore";
import { explainGini, explainIncomeLevel, explainLendingType } from "../../utils/explainCountryInfo";

export const FinancialInfo = ({ country }: { country: ExtendedCountryInfo}) => (
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