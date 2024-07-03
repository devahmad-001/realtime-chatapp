"use client";
import { db } from "@/firebase";
import styled from "@emotion/styled";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";

// Html
const SearchContainer = styled.div`
  border-bottom: 1px solid gray;
`;
const SearchForm = styled.div``;
const Searchinput = styled.input`
  background-color: transparent;
  padding: 10px;
  border: none;
  color: white;
  outline: none;
  ::placeholder {
    color: lightgray;
  }
`;
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
const DisplayName = styled.span``;

// Component
function Search() {
  let { currentUser }: any = useContext(AuthContext);

  const [userName, setuserName] = useState("");
  const [user, setuser] = useState(null);
  const [err, seterr] = useState(false);

  const handleSearch = async () => {
    try {
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("name", "==", userName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("Searched User HandleSearch Search.tsx :", doc.data());
        // @ts-ignore
        setuser({ ...doc.data() });
      });
    } catch (error) {
      seterr(true);
    }
  };

  const handleKey = (key: any) => {
    key.code === "Enter" && handleSearch();
  };

  const handleChange = (e: any) => {
    setuserName(e.target.value);
  };

  const handleSelect = async (searcheduser: any) => {
    // check whether the group (chat in firestore) exists
    // if not created
    const combinedID =
      currentUser.uid > searcheduser.id
        ? currentUser.uid + searcheduser.id
        : searcheduser.id + currentUser.uid;
    try {
      const chatRef = doc(db, "chats", combinedID);
      const res = await getDoc(chatRef);
      // console.log("Response from the chatRef  :", res);
      if (!res.exists()) {
        // create new chatroom for users
        await setDoc(doc(db, "chats", combinedID), {
          messages: [],
        });
        // create userchats here
        const chatCurrentUser = doc(db, "userChats", currentUser.uid);
        await updateDoc(chatCurrentUser, {
          [combinedID + ".userInfo"]: {
            id: searcheduser.id,
            name: searcheduser.name,
            avatar: searcheduser.avatar,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
        const chatSearchedUser = doc(db, "userChats", searcheduser.id);
        await updateDoc(chatSearchedUser, {
          [combinedID + ".userInfo"]: {
            id: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setuser(null);
    setuserName("");
  };

  return (
    <SearchContainer>
      <SearchForm>
        <Searchinput
          type="text"
          placeholder="Find a User"
          onKeyDown={handleKey}
          value={userName}
          onChange={handleChange}
        />
      </SearchForm>
      {err && <span>User not found</span>}
      {user && (
        // @ts-ignore
        <Userchat
          onClick={() => {
            handleSelect(user);
          }}
        >
          {/* @ts-ignore */}
          <UserImg src={user?.avatar} alt="User Profile" />
          <UserChatInfo>
            {/* @ts-ignore */}
            <DisplayName>{user?.name}</DisplayName>
          </UserChatInfo>
        </Userchat>
      )}
    </SearchContainer>
  );
}

export default Search;
