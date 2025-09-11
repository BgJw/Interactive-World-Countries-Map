import { CountryInfo } from './components/CountryInfo'
import { WorldMap } from './components/WorldMap'
import './App.scss'

function App() {

  return (
    <div className="app">
      <h1 className='main-title'>Interactive World Countries Map 🌍</h1>
      <WorldMap />
      <CountryInfo />
    </div>
  )
}

export default App
