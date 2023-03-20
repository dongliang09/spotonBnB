import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
// import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const { closeModal } = useModal();

  // if (sessionUser) return (
  //   <Redirect to="/" />
  // );
  // function checkInputLength() {
  //   if (credential.length > 3 && password.length > 5) setDisable(false);
  //   else setDisable(true);
  // }

  useEffect(()=> {
    if (credential.length > 3 && password.length > 5) setDisable(false);
    else setDisable(true);
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  }

  return (
    <div className='flx-col-center pad15'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="list-none">
          {errors.map((error, idx) => (
            <li key={idx} className='user-err'>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            className = 'dis-block'
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className = 'dis-block'
            required
          />
        </label>
        <div className='flx-center mrg15'>
          <button type="submit" disabled={disableBtn}>Log In</button>
        </div>
        <div className='flx-col-center mrg-t-15 gap10p'>
          <button onClick={()=>{
              setCredential("Demo-lition");
              setPassword("password");
            }}>
            Demo User
          </button>
          {/* <button onClick={()=>{
              setCredential("FakeUser1");
              setPassword("password2");
            }}>
            Demo User 2
          </button> */}
          {/* <button onClick={()=>{
              setCredential("aaaaaa");
              setPassword("aaaaaa");
            }}>
            Demo User 3
          </button> */}
        </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
