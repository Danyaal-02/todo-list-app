import React from 'react'
import { AuthForm } from '../components'

const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 animate-fadeIn'>
      <div className='card bg-gray-800 shadow-2xl p-8 rounded-lg max-w-md w-full'>
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Sign Up</h2>
        <AuthForm formType={"signup"} />
      </div>
    </div>
  )
}

export default Signup