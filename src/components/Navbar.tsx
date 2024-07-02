"use client";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "./Context/AuthContext";
export default function Navbar() {
  const { currentUser }:any = useContext(AuthContext);

  const NevigateToLoginPage = useRouter();

  const Navbar = styled.div`
    display: flex;
    align-items: center;
    background-color: #2f2d52;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #ddddf7;
  `;
  const Logo = styled.span`
    font-weight: bold;
    @media screen and (max-width: 768px) {
      display: none;
    }
  `;
  const User = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
  `;
  const Img = styled.img`
    background-color: #ddddf7;
    height: 30px;
    width: 30px;
    border-radius: 50px;
    object-fit: cover;
  `;
  const Name = styled.span``;

  const Logout = () => {
    signOut(Auth)
      .then(() => {
        NevigateToLoginPage.push("/login");
      })
      .catch((error) => {
        console.log(error, " : error is occured in the Logout function");
      });
  };

  return (
    <Navbar>
      <Logo>Lama chat</Logo>
      <User>
        <Img src={currentUser.photoURL} />
        <Name>{currentUser.displayName}</Name>
        {/* Logout Btn */}
        <label className="switch" onClick={Logout}>
          <input defaultChecked type="checkbox" />
          <div className="slider">
            <div className="circle">
              <svg
                className="cross"
                xmlSpace="preserve"
                style={{ enableBackground: "new 0 0 512 512" }}
                viewBox="0 0 365.696 365.696"
                y={0}
                x={0}
                height={6}
                width={6}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    data-original="#000000"
                    fill="currentColor"
                    d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                  />
                </g>
              </svg>
              <svg
                className="checkmark"
                xmlSpace="preserve"
                style={{ enableBackground: "new 0 0 512 512" }}
                viewBox="0 0 24 24"
                y={0}
                x={0}
                height={10}
                width={10}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    className
                    data-original="#000000"
                    fill="currentColor"
                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </label>
      </User>
    </Navbar>
  );
}
