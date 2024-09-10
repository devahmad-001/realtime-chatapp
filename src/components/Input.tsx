"use client";
import styled from "@emotion/styled";
import React, { useContext, useEffect, useState } from "react";
import Picker, { Emoji } from "emoji-picker-react";
import { AuthContext } from "./Context/AuthContext";
import { ChatContext } from "./Context/ChatContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { v4 as uuidv4, v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
// Html
const InputBox = styled.div`
  height: 60px;
  background-color: #f5f5f5de;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const InputText = styled.input`
  justify-self: flex-start;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 10px;
`;
const TextFeild = styled.div`
  display: flex;
  align-items: center;
`;
const SendBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconEmoji = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  cursor: pointer;
  @media screen and (max-width: 780px) {
  }
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  @media screen and (max-width: 780px) {
    display: none;
  }
`;
const InputFile = styled.input`
  display: none;
`;
const Label = styled.label``;

// Component
export default function Input() {
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);
  const [clockformat, setclockFormat] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const { currentUser }: any = useContext(AuthContext);
  const { data }: any = useContext(ChatContext);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setText(event.emoji);
    setInputStr((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const handleChange = (e: any) => {
    let input = e.target.value;
    setInputStr(input);
    setText(input);
  };

  const handleSend = async () => {
    if (img) {
      const res = ref(storage, uuidv4());
      //  @ts-ignore
      const uploadTask = uploadBytesResumable(res, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          // Handle errors
          console.error(
            "Error in uploadimg handleSend function Input.tsx :",
            error
          );
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              const washingtonRef = doc(db, "chats", data.chatID);
              await updateDoc(washingtonRef, {
                messages: arrayUnion({
                  senderID: currentUser.uid,
                  text,
                  date: Timestamp.now(),
                  id: uuidv4(),
                  img: downloadURL,
                }),
              });
            })
            .catch((error) => {
              console.error(
                "Error getting download URL  handleSend function Input.tsx ::",
                error
              );
              setErr(true);
            });
        }
      );
    } else if (text) {
      const washingtonRef = doc(db, "chats", data.chatID);
      await updateDoc(washingtonRef, {
        messages: arrayUnion({
          senderID: currentUser.uid,
          text,
          date: Timestamp.now(),
          id: uuidv4(),
        }),
      });

      // update last message in userChats for current user and chatID
      const docRefCurrentUser = doc(db, "userChats", currentUser.uid);
      await updateDoc(docRefCurrentUser, {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });

      const docRefConnectedUser = doc(db, "userChats", data.user.id);
      await updateDoc(docRefConnectedUser, {
        [data.chatID + ".lastMessage"]: {
          text,
          time: new Date(),
        },
        [data.chatID + ".date"]: serverTimestamp(),
      });
    } else if (!text || img) {
      alert("Type somthing...");
    }

    // @ts-ignore
    setImg(null);
    setText("");
    setInputStr("");
    time();
  };

  const handleKey = (key: any) => {
    key.code === "Enter" && handleSend();
  };


  return (
    <InputBox>
      <TextFeild>
        <InputText
          className="Input"
          value={inputStr}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder="Type something..."
        />
      </TextFeild>
      <SendBox>
        {/* Emogi */}
        <Label>
          <IconEmoji
            src={"/imgs/emoji.png"}
            onClick={() => setShowPicker((val) => !val)}
          />
        </Label>
        {showPicker && (
          <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
        {/* Files */}
        <Label>
          <InputFile
            type="file"
            onChange={(evt: any) => {
              console.log(evt.target.files[0], "File");
              setImg(evt.target.files[0]);
            }}
          />
          <Icon src={"imgs/attach.png"} />
        </Label>
        {/* Img */}
        {/* <Label>
          <InputFile
            type="file"
            onChange={(evt: any) => {
              setImg(evt.target.files[0]);
            }}
          />
          <Icon src={"imgs/addimg.png"} />
        </Label> */}
        <Icon src={"imgs/send.png"} onClick={handleSend} />
      </SendBox>
    </InputBox>
  );
}
