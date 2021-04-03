import React from "react";
import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  Avatar
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSelector, logout } from "redux/slices/auth";
import { useSelector } from "react-redux";
import Styled from './index.styled';

const Navigation = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user, isAuthenticated, guestId } = useSelector(authSelector);

  const authNav = (
    <React.Fragment>
      {pathname !== "/" ? <Link to={`/`}>Podcasts</Link> : <NavLink to={`/`}>Podcasts</NavLink>}

      <NavLink to={`/guests/`}>Guests</NavLink>

      <Menu isLazy>
        {user && (
          <Styled.NavButton
            as={IconButton}
            aria-label="Options"
            icon={<Avatar size="md" name={user.name} src={user.avatar} />}
          />
          )}
        <MenuList>
          <NavLink to={`/dashboard/`}>
            <MenuItem>Dashboard</MenuItem>
          </NavLink>
          <NavLink to={`/guests/${guestId}`}>
            <MenuItem>Profile</MenuItem>
          </NavLink>
          <NavLink to={`/settings/`}>
            <MenuItem>Settings</MenuItem>
          </NavLink>
          <MenuDivider />
          <MenuItem>
            <Styled.SignOutLink href="#0" onClick={() => dispatch(logout())}>Sign Out</Styled.SignOutLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </React.Fragment>
  )

  const guestNav = (
    <React.Fragment>
      {pathname !== "/" ? <Link to={`/`}>Podcasts</Link> : <NavLink to={`/`}>Podcasts</NavLink>}

      {!['/auth/login/', '/auth/signup/'].includes(pathname) && (
        <NavLink to={`/guests/`}>Guests</NavLink>
      )}

      <NavLink to={{ pathname: "/auth/login/", state: { customPath: pathname } }}>Log in</NavLink>
    </React.Fragment>
  )

  return (
    <Styled.Nav>
      <Styled.LogoLink to="/">
        <span>Spread</span>
        <span>Vote</span>
      </Styled.LogoLink>
      <Box display="flex" justifyContent="end" alignItems="center">
        {isAuthenticated ? authNav : guestNav}
      </Box>
    </Styled.Nav>
  );
};

export default Navigation;
