import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Link } from "react-router-dom";
function Header() {
  return (
    <Nav>
      <a href='/dashboard'>
      <Logo src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACLklEQVRoge2ZsWoVQRSG/7kBjaCFYiGSyxVsFMXKxhAbwcZOLARJJ6S1CL6CnYLGQoOPIFhFwcZKJC9gZSFuQCXBQoiimHwWe4TFTNg7u3N3di/7w8Kye+Y/52NmdnZ2pV7tkgOuSXoqaS51MRW1IWnJAZm6C/FPmQNIXUUMDVIXEEtTAyL8mk9d134CFnwFe+eIc86lKHJc+WqemqHVg7RNPUgsASPgSF2fpCDAYUlrkt4BozpeqXvkmaRzdv6tlpNvcald3nh5ly3dd+BsYNu9NacAAeaB38AucKNC+/ggwCXgTED8SeCLpboXCmEecUGA08CWHaXvZ8AB4K2leQ3MtAXkEPDCmv0ArpfEr1jsR+B4FYiJgJjpDPDYmu4Cd/eJu2UxP4GLVSEmBlIwvwPsmMVDYFC4dwHYtnu360BMHMQSLAK/zOY5MAscBT7YtSd1IRoBsSRXydcGgDfASztfBw52BsQSnQeyguUWcCoGhPk3A2LJRsB74A9wJYZnwbs5EEt4DLgZy6/gu0f9nr1t6kHaJi8IsNB0IeMKuOy73n/Ebpu6ArKm/B/OUNIrX0BXhtbQObchScBQ0qf/A7rSI6XqCsgqMGe9seoL6MrQKtVA+V/RrisbSFqSlKWupIYy5QzToaiv66HzLeZ2IfipRf5BYQXYrLsh8+yPNoFHwGyoV7CAB74dWmTdD60ruGuBz5JOhLYL1FfnXFCOKiCNrDuh86crK3uppgbkL7eiIuNC6ezcAAAAAElFTkSuQmCC" />
      </a>
      
      <span>Easy To Check</span>
      <NavMenu>
        <a>
          {/* <img src="/image/logo.png" /> */}
          <span> About Us</span>
        </a>
      </NavMenu>
      {localStorage.getItem("authentication") === "true" ? (
        <LoginContainer>
          <Login href="/">Logout</Login>
        </LoginContainer>
      ) : (
        <></>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background-color: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
  span {
    color: white;
    font-size: 20px;
    letter-spacing: 1.32px;
    margin-left: 12px;
    font-weight: 500;
    flex: 1;
    text-transform: uppercase;
  }
`;

const Logo = styled.img`
  width: 35px;
  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  flex: ;
  margin-right: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  // position: relative;
`;
const Logout = styled.a`
  position: relative;
  display: inline-block;
  span {
    // visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    opacity: 0.5;
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
  }

  &:hover {
    visibility: visible;
  }
`;
const Login = styled.a`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: white;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
    text-decoration: none;
  }
`;

const LoginContainer = styled.div`
  // flex:1;
  display: flex;
  justify-content: flex-end;
`;
// {localStorage.getItem("authentication") === "true" ? (
//                       <a href="/" onClick={this.logout}>
//                         Logout
//                       </a>
//                     ) : (
//                       ""
//                     )}
