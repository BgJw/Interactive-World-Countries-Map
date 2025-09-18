import { useCountryStore } from "../../store/useCountryStore";

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  const clearCountry = useCountryStore( state => state.clearCountry);
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={() => { onClose(); clearCountry(); }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={() => {onClose(); clearCountry();}}>Close</button>
      </div>
    </div>
  )
}
