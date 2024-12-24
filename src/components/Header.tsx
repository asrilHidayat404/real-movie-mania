import React from 'react'

const Header = ({children}: {children: React.ReactNode}) => {
  return (
    <header className="m-10 font-bold text-2xl">
      {children}
    </header>
  )
}

export default Header
