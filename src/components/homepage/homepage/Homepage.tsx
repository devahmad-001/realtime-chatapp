"use client ";
import { AuthContext } from "@/components/Context/AuthContext";
import { Auth, db } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
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
import { ChatContext } from "@/components/Context/ChatContext";
export default function Homepage() {
  const [users, setusers] = useState<any[]>([]);
  const [username, setusername] = useState<string>("");
  const [Err, setErr] = useState<boolean>(false);
  const [chats, setchats] = useState([{}]);
  const [handleSelectedUser, sethandleSelectedUser] = useState([{}]);
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch, data }: any = useContext(ChatContext);
  const NevigateToLoginPage = useRouter();

  useEffect(() => {
    const GetChats = async () => {
      const unsubscribe = onSnapshot(
        doc(db, "chatroom", currentUser.uid),
        (snapshot) => {
          snapshot && console.log("Current data: ", snapshot.data());
          setchats(snapshot.data());
          // Update chats state with snapshot data
        }
      );
      return () => {
        unsubscribe(); // Unsubscribe from snapshot listener when component unmountsFFFF
      };
    };
    currentUser.uid && GetChats();
  }, [currentUser?.uid]); // Dependency array ensures useEffect runs when currentUser.uid changes
  const ConnectiveUserName = (evt: any) => {
    setusername(evt.target.value);
  };
  const handlekey = (evt: any) => {
    evt.code === "Enter" && HandleSearch();
  };
  const HandleSearch = async () => {
    try {
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("name", "==", username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        console.log("Searched User :", doc.data());
        users.push(doc.data());
      });
      setusers([...users]);
    } catch (error) {
      console.log("Error in the Handle Search Function :", error);
      setErr(true);
    }
  };
  const Logout = () => {
    signOut(Auth)
      .then(() => {
        NevigateToLoginPage.push("/login");
      })
      .catch((error) => {
        console.log(error, " : error is occured in the Logout function");
      });
  };
  const ConnectUser = async (userdetails: any, index: any) => {
    // for dispatch
    chats && handleSelect();
    // check whether the group (chat in firestore) exists
    // if not created
    const combinedID =
      currentUser.uid > userdetails.id
        ? currentUser.uid + userdetails.id
        : userdetails.id + currentUser.uid;
    try {
      const chatRef = doc(db, "chats", combinedID);
      const res = await getDoc(chatRef);
      console.log("Response from the chatRef  :", res);
      if (!res.exists()) {
        console.log(res, combinedID, "index of user :", index);
        // create new chatroom for users
        await setDoc(doc(db, "chats", combinedID), {
          messages: [],
        });
        // create chat here
        const chatroomRef = doc(db, "chatroom", userdetails.id);
        await updateDoc(chatroomRef, {
          [combinedID + "userinfo"]: {
            id: userdetails.id,
            name: userdetails.name,
            avatar: userdetails.avatar,
          },
          [combinedID + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    // users.splice(index, 1);
    // setusers([...users]);
  };

  // handleSelect function on the Object.entries.map > div

  const handleSelect = async () => {
    Object.entries(chats).map((chat: any) => {
      console.log(chat, "Handle Select users");
      sethandleSelectedUser(chat);
      console.log(chat);
    });
    console.log(chats);
    dispatch({ type: "CHANGE_USER", payload: handleSelectedUser });
    const providerdata = await data;
  };

  return (
    <>
      {!currentUser ? (
        NevigateToLoginPage.push("/login")
      ) : (
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>
              {/*Loged In User Details*/}
              <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="h-full w-full"
                  />
                </div>
                <div className="text-sm font-semibold mt-2">
                  {currentUser.displayName}
                </div>
                <div className="text-xs text-gray-500">{currentUser.email}</div>
                {/* logout btn */}
                <label className="switch m-3">
                  <input defaultChecked type="checkbox" onClick={Logout} />
                  <div title="Logout" className="slider">
                    <div className="circle">
                      <svg
                        className="cross"
                        xmlSpace="preserve"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        viewBox="0 0 365.696 365.696"
                        y={0}
                        x={0}
                        height={6}
                        width={6}
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path
                            data-original="#000000"
                            fill="currentColor"
                            d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                          />
                        </g>
                      </svg>
                      <svg
                        className="checkmark"
                        xmlSpace="preserve"
                        style={{ enableBackground: "new 0 0 512 512" }}
                        viewBox="0 0 24 24"
                        y={0}
                        x={0}
                        height={10}
                        width={10}
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path
                            className
                            data-original="#000000"
                            fill="currentColor"
                            d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </label>
              </div>
              {/* Search Box */}
              <div className="py-2 px-2 bg-grey-lightest">
                <input
                  onChange={ConnectiveUserName}
                  onKeyPress={handlekey}
                  type="text"
                  className="w-full border-0 border-b-2 px-2 py-2 text-sm"
                  placeholder="Search or start new chat"
                  value={username}
                />
              </div>
              {/* Conversations status */}
              <div className="flex flex-col mt-8">
                {/* Active conversations */}
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {1}
                  </span>
                </div>
                {Err && <span>User not Found!</span>}
                {/* Searched User */}
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  {users &&
                    users.map((userDetails, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            ConnectUser(userDetails, index);
                          }}
                          className="flex flex-row items-center  hover:bg-gray-100 rounded-xl p-2"
                        >
                          <div className="flex items-center justify-center overflow-hidden h-8 w-8 bg-purple-200 rounded-full">
                            <img src={userDetails.avatar} alt="" />
                          </div>
                          <div className="ml-2 text-sm font-semibold">
                            {userDetails.name}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
            {/* Chating Box */}
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    {/* {Object.entries(chats)?.map((chat, index) => { */}
                    {/* return ( */}
                    <div className="grid grid-cols-12 gap-y-2">
                      {/* <div className="grid grid-cols-12 gap-y-2" key={index}> */}
                      {/* Recieve Meg */}
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            F
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            {data.user?.name}
                          </div>
                        </div>
                      </div>
                      {/* Send Msg */}
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>I am ok what about you?</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* );
                    })} */}
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button
                      title="filebtn"
                      className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        title="text"
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button
                        title="filebtn"
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
