import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "txt-center bg-white white-space-nowrap right15 z-idx-99 mrg-t-5 pad15 pos-abs list-none boxShadow-0-1-5-1-gray bor-rad-10" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className='font15 bor-rad-20 pad15 pos-rel mrg-r-15 boxShadow-0-1-5-1-gray bor-0p bg-white'>
        <i className="fas fa-bars mrg-r-5"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <li className="mrg-b-5">Hello, {user.firstName}</li>
            <li className="mrg-b-5">{user.email}</li>
            <li className="mrg-b-5"><Link to="/spots/current" className="txt-decor-none">Manage Spots</Link></li>
            <li className="mrg-b-5">
              <button onClick={logout} className="bg-lgcoral color-white">Log Out</button>
            </li>
          </div>
        ) : (
          <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
