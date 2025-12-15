import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/mix.css"

const Error = () => {
  return (
    <section>
      <div className="form_data" style={{textAlign: 'center'}}>
        <div className="form_heading">
          <h1 style={{fontSize: '4rem', margin: '1rem 0'}}>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        </div>
        <div style={{marginTop: '2rem'}}>
          <Link to="/dashboard" className="btn" style={{textDecoration: 'none', display: 'inline-block'}}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Error