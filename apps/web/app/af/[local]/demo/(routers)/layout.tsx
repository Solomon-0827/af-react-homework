import React from 'react'

export default ({children}: {children: React.ReactNode}) => {
  return (
    <div style={{width: '55%', height: '400px', border: '1px solid black'}}>{children}</div>
  )
}