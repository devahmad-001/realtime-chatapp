"use client";
import React, { useContext, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { ChatContext } from "./Context/ChatContext";
import { AuthContext } from "./Context/AuthContext";

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
const Msg = styled.p`
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
export default function Message({ message }: any) {
  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    // @ts-ignore
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <MessageBox
      // @ts-ignore
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <MessageInfo>
        <Img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoUrl
              : data.user.avatar
          }
        />
        <TimeLine>Just Now</TimeLine>
      </MessageInfo>
      <MessagesContent>
        <Msg>{message.text}</Msg>
        {message.img && <MessageImg src={message.img} />}
      </MessagesContent>
    </MessageBox>
  );
}
