import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {

  useEffect(()=>{
    document.title = "Niepoprawny adres"
  })

  return (
    <div>
      <h1>Nie znaleziono strony o podanym adresie!</h1>
      <h3>
        {" "}
        <Link to="/"> &gt;Strona główna</Link>
      </h3>
    </div>
  )
}

export default PageNotFound