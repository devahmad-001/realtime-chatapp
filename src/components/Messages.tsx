"use client";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "./Context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
export default function Messages() {
  const [messages, setmessages] = useState([]);

  let { data }: any = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      // @ts-ignore
      doc.exists() && setmessages(doc.data().messages);
    //  console.log(doc.data().messages);
           
    });
    return () => {
      unsub();
    };
  }, [data.chatID]);

  const Messages = styled.div`
    background-color: #e4e4e4fa;
    padding: 10px;
    height: calc(100% - 110px);
    overflow: scroll;
  `;
  return (
    <Messages>
      {messages.map((msg: any, index: number) => {
        // @ts-ignore
        return <Message message={msg} key={msg.id} />;
      })}
    </Messages>
  );
}
