"use client";
import React from "react";
import styled from "@emotion/styled";
export default function Message() {
  const MessageBox = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: center;

    & {
      flex-direction: row-reverse;
    }
  `;
  const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 300;
    color: gray;
    align-items: center;
    align-self: flex-start;
  `;
  const Img = styled.img`
    height: 33px;
    width: 33px;
    border-radius: 33px;
    object-fit: cover;
  `;
  const TimeLine = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: grey;
    max-width: max-content;
    text-align: center;
  `;
  const MessagesContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  `;
  const Message = styled.p`
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
    & {
      border-radius: 10px 0px 10px 10px;
      background-color: #8da4f1;
      color: white;
    }
  `;
  const MessageImg = styled.img`
    width: 50%;
    justify-self: flex-start;
  `;

  return (
    <MessageBox>
      <MessageInfo>
        <Img src={"imgs/avatar.png"} />
        <TimeLine>Just Now</TimeLine>
      </MessageInfo>
      <MessagesContent>
        <Message>Hello Janu</Message>
        {/* <MessageImg src={"imgs/avatar.png"}/> */}
      </MessagesContent>
    </MessageBox>
  );
}
