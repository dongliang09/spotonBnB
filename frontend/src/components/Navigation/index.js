import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
// import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='width98vw'>
      <ul className=' flx-center-space  list-none'>
        <li className='logo-font font25 txt-decor-none'>
          <NavLink exact to="/" className={"txt-decor-none"}>
            <i className="fas fa-building"></i> SpotOnBnB
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ul className='flx list-none'>
              {sessionUser&& (<li className='mrg-t-b-auto-r-15'>
                <NavLink exact to="/spots/new">
                  <button className='bg-white pad5 bor-rad-5 width200p bg-lgcoral color-white bor-0p pad-t-b-10p font-weight600'>
                    Create a New Spot
                  </button>
                </NavLink>
              </li>)}
              <li className='pos-rel'>
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
