import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navContainer1'>
      <ul className=' flx-center-space mrg15 navContainer'>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ul className='flx list-none'>
              {sessionUser&& (<li className='mrg-t-b-auto-r-15'>
                <NavLink exact to="/spots/new">Create a New Spot</NavLink>
              </li>)}
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
