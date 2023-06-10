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

    let SignupErrors = []
    if (password.length < 6) {
      SignupErrors.push(["Password must be 6 or more characters"])
    }
    if (password !== confirmPassword) {
      SignupErrors.push(["Confirm Password field must be the same as the Password field"])
    }
    setErrors(SignupErrors)

    if (errors.length === 0 && password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return
  };

  return (
    <div className='flx-col-center pad15 pad-l-r-3rem'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>* required fields</div>
        <ul className="width250p">
          {errors.map((error, idx) => <li key={idx} className='user-err '>{error}</li>)}
        </ul>
        <label>
          Email*
          <input
            type="text" className = 'dis-block width100 pad5 bor-rad-5'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username*
          <input
            type="text" className = 'dis-block width100 pad5 bor-rad-5'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name*
          <input
            type="text" className = 'dis-block width100 pad5 bor-rad-5'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name*
          <input
            type="text" className = 'dis-block width100 pad5 bor-rad-5'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password* (6 or more characters)
          <input
            type="password" className = 'dis-block width100 pad5 bor-rad-5'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password* (6 or more characters)
          <input
            type="password" className = 'dis-block width100 pad5 bor-rad-5'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className='flx-col-center mrg-t-15'>
          <button type="submit" className="bg-white pad5 bor-rad-5 width200p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
