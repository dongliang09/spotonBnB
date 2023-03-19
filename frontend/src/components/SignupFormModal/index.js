import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disableBtn, setDisable] = useState(true);
  const { closeModal } = useModal();

  useEffect(()=> {
    if (email && username && firstName && lastName&& password && confirmPassword &&
        username.length > 3 && password.length > 5 && (password === confirmPassword))
        setDisable(false);
    else setDisable(true);
  }, [email, username, firstName, lastName, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='flx-col-center pad15 pad-l-r-3rem'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul className="list-none">
          {errors.map((error, idx) => <li key={idx} className='user-err'>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text" className = 'dis-block'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text" className = 'dis-block'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text" className = 'dis-block'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text" className = 'dis-block'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password" className = 'dis-block'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password" className = 'dis-block'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className='flx-col-center mrg-t-15'>
          <button type="submit" disabled={disableBtn}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
