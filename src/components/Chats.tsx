"use client";
import { db } from "@/firebase";
import styled from "@emotion/styled";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
export default function Chats() {
  let { currentUser }: any = useContext(AuthContext);

  const [chats, setchats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log("Chats data: ", doc.data());
        // @ts-ignore
        setchats(doc.data());
        return () => {
          unsub();
        };
      });
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

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
    <>
      {Object.entries(chats).map((chat) => {
        // console.log(chat[1].userInfo);
        <Chats key={chat[0]}>
          <Userchat>
              {/* @ts-ignore */}
            <UserImg src={chat[1].userInfo.avatar} />
            <UserChatInfo />
            <DisplayName>
              {/* @ts-ignore */}
              {chat[1].userInfo.name}
              {/* @ts-ignore */}
              <LastMsg>Hello!</LastMsg>
            </DisplayName>
          </Userchat>
        </Chats>;
      })}
    </>
  );
}
