"use client";
import styled from "@emotion/styled";
import React from "react";
export default function Search() {
  const SearchContainer = styled.div`
    border-bottom: 1px solid gray;
  `;
  const SearchForm = styled.div``;
  const Searchinput = styled.input`
    background-color: transparent;
    padding: 10px;
    border: none;
    color: white;
    outline: none;
    ::placeholder {
      color: lightgray;
    }
  `;
  const Userchat = styled.div`
    display: flex;
    gap: 7px;
    align-items: center;
    padding: 10px;
    color: white;
    cursor: pointer;
    :hover {
      background-color: #2f2d52;
    }
  `;
  const UserImg = styled.img`
    background-color: #ddddf7;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    object-fit: cover;
  `;
  const UserChatInfo = styled.div``;
  const DisplayName = styled.span``;
  return (
    <SearchContainer>
      <SearchForm>
        <Searchinput placeholder="Find a User" />
      </SearchForm>
      <Userchat>
        <UserImg src={"imgs/avatar.png"} />
        <UserChatInfo />
        <DisplayName>Jane</DisplayName>
      </Userchat>
    </SearchContainer>
  );
}
