"use client";
import styled from "@emotion/styled";
import React from "react";
import Message from "./Message";
export default function Messages() {
  const Messages = styled.div`
    background-color:#fffffffa;
    padding: 10px;
    height: calc(100% - 110px);
  `;
  return (
    <Messages>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Messages>
  );
}
