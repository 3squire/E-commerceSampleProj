import './Spinner.css'

function Spinner({ label = 'Loading…' }) {
  return (
    <div className="spinner-overlay" role="status" aria-live="polite">
      <div className="spinner-wheel" />
      <span className="spinner-label">{label}</span>
    </div>
  )
}

export default Spinner
