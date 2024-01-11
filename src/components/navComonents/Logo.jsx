import React from 'react'
import { NavLink } from 'react-router-dom'

function Logo() {
  return (
    <div className="inline-flex items-center space-x-2">
<NavLink to={'/'}>
          <span className="font-bold text-white">
            App
          </span>

</NavLink>
        </div>
  )
}

export default Logo