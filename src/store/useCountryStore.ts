import { create } from 'zustand'
import axios from 'axios'

export interface ExtendedCountryInfo {
  // из World Bank
  id: string
  name: string
  region: string
  capitalCity: string
  incomeLevel: string
  lendingType: string
  latitude?: number
  longitude?: number

  // из RestCountries
  population?: number
  area?: number
  borders?: string[]
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
  flag?: string
  coatOfArms?: string
  timezones?: string[]
  googleMaps?: string
  fifa?: string
  tld?: string[]
  demonyms?: Record<string, { f: string; m: string }>
  gini?: Record<string, number>
  startOfWeek?: string
}

interface CountryState {
  country: ExtendedCountryInfo | null
  loading: boolean
  error: string | null
  fetchCountry: (code: string) => void
}

export const useCountryStore = create<CountryState>((set) => ({
  country: null,
  loading: false,
  error: null,

fetchCountry: async (code: string) => {
  set({ loading: true, error: null })
  try {
    const [wbRes, restRes] = await Promise.all([
      axios.get(`https://api.worldbank.org/v2/country/${code}?format=json`),
      axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
    ])

    const wb = wbRes.data[1][0]
    const rest = restRes.data[0]
    const merged: ExtendedCountryInfo = {
      id: wb.id,
      name: wb.name,
      region: wb.region.value,
      capitalCity: wb.capitalCity,
      incomeLevel: wb.incomeLevel.value,
      lendingType: wb.lendingType.value,
      latitude: wb.latitude,
      longitude: wb.longitude,

      population: rest.population,
      area: rest.area,
      borders: rest.borders,
      languages: rest.languages,
      currencies: rest.currencies,
      flag: rest.flags?.svg,
      coatOfArms: rest.coatOfArms?.svg,
      timezones: rest.timezones,
      googleMaps: rest.maps?.googleMaps,
      fifa: rest.fifa,
      tld: rest.tld,
      demonyms: rest.demonyms,
      gini: rest.gini,
      startOfWeek: rest.startOfWeek
    }

    set({ country: merged, loading: false })
  } catch (error: any) {
    set({ error: error.message, loading: false })
  }
}

}))
