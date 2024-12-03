'use client';
import Link from 'next/link';
import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('api/signup', { name, email, password });
    console.log(response);
    // const response = { name, email, password };
    // console.log(response);
  };

  return (
    <div className="container d-flex flex-column align-items-center gap-4 ">
      <h1 className="mt-4">Signup</h1>
      <form onSubmit={handelSubmit} className="w-50 border p-4">
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput0" className="form-label">
            Name
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="exampleFormControlInput0"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
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
          <button className=" mx-2 btn btn-success"> Create </button>
          <Link className="btn btn-primary" href={'/'}>
            {' '}
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
