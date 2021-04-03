import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { MenuButton } from "@chakra-ui/react";

const Nav = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;
margin: 0 auto;
max-width: 1280px;
background: ${({ theme }) => theme.colors.white};
height: 72px;
padding: 0 32px;

& > div {
  position: relative;
}

& > div > a, & > div > button {
  color: ${({ theme }) => theme.colors.black.soft};
  padding: 0 8px;
  position: relative;
}

& > div > a:hover {
  color: ${({ theme }) => theme.colors.black.semiSoft};
}

& > div > a:hover::after,
& > div > a.active::after {
  content: "";
  position: absolute;
  background: ${({ theme }) => theme.colors.red.customRed};
  width: 100%;
  height: 2px;
  bottom: -28px;
  left: 0;
}
`

const LogoLink = styled(NavLink)`
&:hover {
  color: initial;
}

& a:hover::after {
  display: none;
}

span {
  font-size: 30px;
  font-weight: 500;
}

span:first-of-type {
  color: ${({ theme }) => theme.colors.green.brand};
}

span:last-of-type {
  color: #011627;
}
`

const NavButton = styled(MenuButton)`
outline: 0;
min-width: 30px;
width: 30px;
height: 30px;
padding: 0;
margin-left: 2.5rem;

&:focus {
  box-shadow: none;
}
`

const SignOutLink = styled.a`
  color: ${({ theme }) => theme.colors.red.customRed};
`

const Styles = { Nav, LogoLink, NavButton, SignOutLink }

export default Styles