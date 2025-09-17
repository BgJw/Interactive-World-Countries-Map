interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
