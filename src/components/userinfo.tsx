"use client";

import { getTime } from "@/lib/utils";
import { globalStore } from "@/store/user";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

type UserInfoProps = {
  key: string | number;
  item: any;
};

const UserInfo = ({ key, item }: UserInfoProps) => {
  const router = useRouter();
  const lastMessage = item.lastMessage;
  const searchparams = useSearchParams();
  const conversationId = searchparams.get("conversationId");

  const setActiveConversation = globalStore(
    (s: any) => s.setActiveConversation
  );

  const renderChats = () => {
    const query = { conversationId: item._id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );
    setActiveConversation(item._id);
    router.push(url);
  };

  return (
    <div
      key={key}
      className={`flex cursor-pointer p-3 gap-3 ${
        conversationId === item._id ? "bg-blue-200" : "none"
      }`}
      onClick={renderChats}>
      <div className='flex items-center justify-center rounded-full w-12 h-12 aspect-square bg-violet-200'>
        {item?.members[0].name[0].toUpperCase()}
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between w-full'>
          <text>{item?.members[0].name}</text>
          <text>{getTime(lastMessage[0].createdAt)}</text>
        </div>
        <text>{lastMessage[0].message}</text>
      </div>
    </div>
  );
};

export default UserInfo;
