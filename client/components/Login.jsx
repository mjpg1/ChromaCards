import React, { useState } from 'react';

const Login = (props) => {
  return (
    <div className='modal'>
      <form>
        <input value={props.username} placeholder='username' onChange={props.updateUsername} />
        <input
          type='password'
          value={props.password}
          placeholder='password'
          onChange={props.updatePassword}
        />
        <div style={{ display: 'flex', width: '220px', gap: '10px' }}>
          <button
            onClick={props.handleSubmit}
            style={{ backgroundColor: 'rgb(150, 150, 150)' }}
            onSubmit={props.handleSubmit}
          >
            Submit
          </button>
          <button onClick={props.handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
};

export default Login;