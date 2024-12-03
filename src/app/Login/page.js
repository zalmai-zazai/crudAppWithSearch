'use client';
import Link from 'next/link';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();
  const [user, setUser] = useState('');

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/login', { email, password });
      console.log(response.data.user);
      setUser(response.data.user);
      setResponse(response.data.message);
      if (response.data.message === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/posts');
      }
    } catch (error) {
      return NextResponse.json({ message: 'Can not find the route' });
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center gap-4 ">
      <h1 className="mt-4">Login</h1>
      <form onSubmit={handelSubmit} className="w-50 border p-4">
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            required
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            className="form-control"
            id="exampleFormControlInput2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <button className=" mx-2 btn btn-success">Login</button>
          <Link className="btn btn-primary" href={'/signup'}>
            {' '}
            Sign up
          </Link>
        </div>
        {response && <p className="text-danger">{response}!</p>}
      </form>
    </div>
  );
};

export default Login;
