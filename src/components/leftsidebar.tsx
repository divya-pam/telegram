"use client";

import { dummyDataTypes } from "@/app/chat/page";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { globalStore } from "./../store/user";
import SearchUsers from "./searchusers";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UserInfo from "./userinfo";

type LeftSideBarTypes = {
  data: dummyDataTypes;
};

const LeftSideBar = ({ data }: LeftSideBarTypes) => {
  const { user, allUsers, allConversations } = globalStore((s: any) => ({
    user: s.user,
    allUsers: s.allUsers,
    allConversations: s.allConversations,
  }));
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [userSearchText, setUserSearchText] = useState("");
  const [dialog, setDialog] = useState(false);

  return (
    <div className='flex flex-col h-full bg-zinc-100'>
      <div className='flex items-center justify-between p-3'>
        <div className='flex'>
          <h1>Chats</h1>
        </div>
        <div className='flex gap-2'>
          <div onClick={() => setDialog(true)}>+</div>
          {dialog && (
            <div className=' backdrop-blur-sm absolute z-50 w-full left-0 top-0  right-0 h-screen flex items-center justify-center'>
              <div className='overflow-y-scroll flex flex-col gap-2 w-1/2 p-3 h-1/2 shadow-lg rounded-lg'>
                <div className=' flex flex-row gap-2'>
                  <Input
                    placeholder='search'
                    value={userSearchText}
                    onChange={(e) => setUserSearchText(e.target.value)}
                  />
                  <Button
                    variant='ghost'
                    onClick={() => setDialog((prev) => !prev)}>
                    <XCircleIcon />
                  </Button>
                </div>
                <div className=' flex flex-col'>
                  {allUsers
                    .filter((users: any) => {
                      let isPresent = false;
                      if (users._id === user.user._id) {
                        isPresent = true;
                      }
                      allConversations.forEach((chat: any) => {
                        if (chat.members[0]._id == users._id) {
                          isPresent = true;
                        }
                      });
                      return !isPresent;
                    })
                    .map((item: any, i: any) => (
                      <SearchUsers key={i} item={item} setDialog={setDialog} />
                    ))}
                </div>
              </div>
            </div>
          )}
          <div>:</div>
        </div>
      </div>
      <div className='flex flex-1 flex-col relative gap-2.5 overflow-hidden scrollbar-hide overflow-y-scroll'>
        <div className='sticky w-full top-0 right-0 left-0 p-2'>
          <Input
            placeholder='search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          {data
            .filter((item: any, i) =>
              item?.members[0]?.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((item, i) => (
              <UserInfo key={i} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
