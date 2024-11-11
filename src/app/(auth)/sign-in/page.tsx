'use client';
import LoginForm from '@/modules/auth/signin'
import { signOut } from 'next-auth/react';
import React from 'react'
const LoginPage = () => {
  return (
    <LoginForm />
  )
}

export default LoginPage