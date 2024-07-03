"use client";
import { db } from "@/firebase";
import styled from "@emotion/styled";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { ChatContext } from "./Context/ChatContext";

const ChatContainer = styled.div``;
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

export default function Chats() {
  let { currentUser }: any = useContext(AuthContext);
  let { dispatch }: any = useContext(ChatContext);
  const [chats, setchats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log("Searched Chat data __Chats.tsx: ", doc.data());
        // @ts-ignore
        setchats(doc.data());
        return () => {
          unsub();
        };
      });
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(
  //       doc(db, "userChats", currentUser.uid),
  //       (snapshot) => {
  //         const chatsData = snapshot.data();
  //         if (chatsData) {
  //           const chatsArray = Object.keys(chatsData).map((key) => ({
  //             id: key,
  //             userInfo: chatsData[key].userInfo,
  //           }));
  //           // @ts-ignore
  //           setchats(chatsArray);
  //           // console.log(chats);
  //         }
  //       }
  //     );
  //     return () => unsub();
  //   };

  //   if (currentUser.uid) {
  //     getChats();
  //   }
  // }, [currentUser.uid]);
  // console.log(Object.entries(chats));

  const handleSelect = (user: any) => {
    console.log(user);
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <>
      <ChatContainer>
        {/* @ts-ignore */}
        {Object.entries(chats).sort((a,b)=>b[1].date-a[1].date).map((chat) => {
          return (
            //  @ts-ignore
            <Userchat key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
              {/* @ts-ignore */}
              <UserImg src={chat[1].userInfo.avatar} />
              <UserChatInfo />
              <DisplayName>
                {/* @ts-ignore */}
                {chat[1].userInfo.name}
                {/* @ts-ignore */}
                <LastMsg>{chat[1].lastMessage.text}</LastMsg>
              </DisplayName>
            </Userchat>
          );
        })}
      </ChatContainer>
    </>
  );
}
