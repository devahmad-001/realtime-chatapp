"use client";
import styled from "@emotion/styled";
import React from "react";
export default function Chats() {
  const Chats = styled.div``;
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
  const DisplayName = styled.span`
    font-style: 18px;
    font-weight: 500;
  `;
  const LastMsg = styled.p`
    margin: 0;
    font-size: 14px;
    color: lightgray;
  `;

  return (
    <Chats>
      <Userchat>
        <UserImg src={"imgs/avatar.png"} />
        <UserChatInfo />
        <DisplayName>
          Jane
          <LastMsg>Hello!</LastMsg>
        </DisplayName>
      </Userchat>
    </Chats>
  );
}
