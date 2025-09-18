
interface HeaderProps {
  flag?: string
  name: string
  coatOfArms?: string
}
export const Header = ({name, coatOfArms, flag}: HeaderProps) => {
return (
        <h2
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
        }}
        >
        {flag && (
            <img
            src={flag}
            alt={`${name} flag`}
            style={{ width: '50px', border: '1px solid black' }}
            />
        )}
        {name}
        {coatOfArms && (
            <img
            src={coatOfArms}
            alt={`${name} coat of arms`}
            style={{ width: '50px' }}
            />
        )}
        </h2>
)}