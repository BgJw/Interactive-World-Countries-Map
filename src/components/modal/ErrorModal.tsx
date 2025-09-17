import { Modal } from "./Modal"

interface ErrorModalProps {
  error: string | null
  open: boolean
  onClose: () => void
}

export const ErrorModal = ({ error, open, onClose }: ErrorModalProps) => {
  if (!error) return null

  return (
    <Modal open={open} onClose={onClose}>
      <h2 style={{ color: 'red' }}>Error</h2>
      <p>{error}</p>
    </Modal>
  )
}
