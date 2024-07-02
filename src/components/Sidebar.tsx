"use client";
import styled from "@emotion/styled";
import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

export default function Sidebar() {
  const Sidebar = styled.div`
    flex: 1;
    border-right: 1px solid #3e3c61;
    background-color: #3e3c61;
  `;
  return (
    <Sidebar>
      <Navbar />
      <Search/>
      <Chats/>
    </Sidebar>
  );
}
