import React from 'react'
import LoginButton from './LoginButton'
import SignUpButton from './SignOutButton'

const AuthenticationSheet = () => {
  return (
    <div className='flex justify-between w-2/3 p-2'>
      <LoginButton/>
      <SignUpButton/>
    </div>

  )
}

export default AuthenticationSheet