"use client";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
export default function Input() {
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + event.emoji);
    console.log("🚀  onEmojiClick  emojiObject.emoji:", event.emoji);
    setShowEmojiPicker(false);
  };
  const InputBox = styled.div`
    height: 60px;
    background-color: #f5f5f5de;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const TypeText = styled.div`
    display: flex;
    align-items: center;
  `;
  const SendBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  const Icon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
  `;
  const InputFile = styled.input`
    display: none;
  `;
  const Label = styled.label``;

  return (
    <InputBox>
      <TypeText>
        <Label>
          <Icon
            className="emoji-icon"
            src={"/imgs/emogi.png"}
            onClick={() => setShowPicker((val) => !val)}
          />
          {showPicker && (
            <Picker
              pickerStyle={{ width: "100%" }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </Label>
        <input
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
          className="Input"
          placeholder="Type something..."
        />
      </TypeText>
      <SendBox>
        <Icon src={"imgs/attach.png"} />
        <InputFile type="file" />
        <Label>
          <Icon src={"imgs/inputimg.png"} />
        </Label>
        <Icon src={"imgs/send.png"} />
      </SendBox>
    </InputBox>
  );
}
