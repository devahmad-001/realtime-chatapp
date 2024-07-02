"use client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import Picker, { Emoji } from "emoji-picker-react";

// Html

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

  const onEmojiClick = (event: any, emojiObject: any) => {
    setInputStr((prevInput) => prevInput + event.emoji);
    setShowPicker(false);
  };

  const handleChange = (e: any) => {
    setInputStr(e.target.value);
  };

  return (
    <InputBox>
      <TypeText>
        <Label>
          <IconEmoji
            src={"/imgs/emoji.png"}
            onClick={() => setShowPicker((val) => !val)}
          />
        </Label>
        {showPicker && (
          <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        )}
        <input
          className="Input"
          value={inputStr}
          onChange={handleChange}
          placeholder="Type something..."
        />
      </TypeText>
      <SendBox>
        <Icon src={"imgs/attach.png"} />
        <InputFile type="file" />
        <Label>
          <Icon src={"imgs/addimg.png"} />
        </Label>
        <Icon src={"imgs/send.png"} />
      </SendBox>
    </InputBox>
  );
}
