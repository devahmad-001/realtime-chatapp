"use client";
import React from "react";
import Sidebar from "../Sidebar";
import Chat from "../Chat";
import styled from "@emotion/styled";
export default function HomePage() {
  const HomePage = styled.div`
    background-color: rgb(167, 188, 255);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-wrap: wrap; */
  `;
  const Container = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    width: 75%;
    height: 90%;
    display: flex;
    overflow: hidden;
  `;
  return (
    <HomePage>
      <Container>
        <Sidebar />
        <Chat />
      </Container>
    </HomePage>
  );
}
