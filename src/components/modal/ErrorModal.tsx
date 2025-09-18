
interface ErrorModalProps {
  error: string | null
}

export const ErrorModal = ({ error }: ErrorModalProps) => {
  if (!error) return null

  return (
    <>
      <h2 style={{ color: 'red' }}>Error</h2>
      <p>{error}</p>
    </>
  )
}
