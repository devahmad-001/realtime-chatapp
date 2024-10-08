"use client";
import styled from "@emotion/styled";
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "./Context/ChatContext";

const Chatbox = styled.div`
  flex: 2;
`;
const ChatInfo = styled.div`
  height: 50px;
  background-color: #5d5b8d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  color: lightgray;
`;
const Name = styled.span``;
const ChatIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Icon = styled.img`
  height: 27px;
  cursor: pointer;
`;
export default function Chat() {
  let { data }: any = useContext(ChatContext);

  return (
    <Chatbox>
      <ChatInfo>
        <Name>{data.user.name}</Name>
        <ChatIcons>
          <Icon src={"imgs/camera.png"} />
          <Icon
            style={{ width: "30px", height: "30px" }}
            src={"imgs/addfriend.png"}
          />
          <Icon src={"imgs/addmore.png"} />
        </ChatIcons>
      </ChatInfo>
      <Messages />
      <Input />
    </Chatbox>
  );
}
