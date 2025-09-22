import { useCountryStore } from "../../store/useCountryStore"
import { useState, useEffect } from "react"
import Spinner from "../Spinner/Spinner"
import { Modal } from "../modal/Modal"
import { ErrorModal } from "../modal/ErrorModal"
import { FinancialInfo } from "./FinancialInfo"
import { GeneralInfo } from "./GeneralInfo"
import { Header } from "./Header"
import "./CountryInfo.module.css";


export const CountryInfo = () => {
  const { country, loading, error } = useCountryStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (country || error) setOpen(true)
  }, [country, error])

  if (loading) return <Spinner />
  if (!open) return null

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      {
        error && <ErrorModal error={error} />
      }
      {
        country && (
          <>
            <Header flag={country.flag} name={country.name} coatOfArms={country.coatOfArms} />
            <FinancialInfo country={country} />
            <GeneralInfo country={country} />
          </>
        )
      }
     
    </Modal>
  )
}

