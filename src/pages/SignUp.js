import React from 'react'
import Header from '../components/Header';
import SignupSignin from '../components/SignupSignin';

function SignUp() {
  return (
    <div>
      <Header />
      <div className='wrapper'>
          <SignupSignin/>
      </div>
    </div>
  )
}

export default SignUp;