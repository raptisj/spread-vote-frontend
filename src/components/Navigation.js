import React from "react";
import { Box } from "@chakra-ui/core";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { authSelector, logout } from "../redux/slices/auth";
import { useSelector } from "react-redux";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1280px;
  background: ${(props) => props.theme.colors.white};
  height: 72px;
  padding: 0 32px;

  & > div {
    position: relative;
  }

  & > div > a {
    color: ${(props) => props.theme.colors.black.soft};
    padding: 0 8px;
    position: relative;
  }

  & > div > a:hover {
    color: ${(props) => props.theme.colors.black.semiSoft};
  }

  & > div > a:hover::after,
  & > div > a.active::after {
    content: "";
    position: absolute;
    background: ${(props) => props.theme.colors.red.customRed};
    width: 100%;
    height: 2px;
    bottom: -28px;
    left: 0;
  }
`;

const LogoLink = styled(NavLink)`
  &:hover {
    color: initial;
  }

  & a:hover::after {
    display: none;
  }

  span {
    font-size: 30px;
    font-weight: 700;
  }

  span:first-of-type {
    color: ${(props) => props.theme.colors.green.brand};
  }

  span:last-of-type {
    color: #011627;
  }
`;

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);
  const { pathname } = useLocation();

  // grab podcast id from url
  const podId = pathname.split("/")[2];

  return (
    <Nav>
      <LogoLink to="/">
        <span>Spread</span>
        <span>Vote</span>
      </LogoLink>
      <Box display="flex" justifyContent="end">
        {isAuthenticated ? (
          <React.Fragment>
            {pathname !== "/" ? (
              <Link to={`/`}>Podcasts</Link>
            ) : (
              <NavLink to={`/`}>Podcasts</NavLink>
            )}

            {pathname !== "/" && (
              <NavLink to={`/podcasts/${podId}/dash/`}>Dashboard</NavLink>
            )}

            {pathname !== "/" && (
              <NavLink to={`/podcasts/${podId}/guests/`}>Guests</NavLink>
            )}

            <a href="#0" onClick={() => dispatch(logout())}>
              Log out
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {pathname !== "/" ? (
              <Link to={`/`}>Podcasts</Link>
            ) : (
              <NavLink to={`/`}>Podcasts</NavLink>
            )}

            {pathname !== "/" && (
              <NavLink to={`/podcasts/${podId}/guests/`}>Guests</NavLink>
            )}

            <NavLink to="/auth/login">Log in</NavLink>
            <NavLink to="/auth/signup">Sign up</NavLink>
          </React.Fragment>
        )}
      </Box>
    </Nav>
  );
};

export default Navigation;
