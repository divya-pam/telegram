"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { globalStore } from "./../store/user";

const SearchUsers = ({ key, item, setDialog }: any) => {
  const router = useRouter();
  const { accessToken, setActiveConversation } = globalStore((s: any) => ({
    accessToken: s.accessToken,
    setActiveConversation: s.setActiveConversation,
  }));

  const handleNewConversation = async (id: any, name: any) => {
    const query = {
      id: id,
      name: name,
      conversationId: "new",
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
    setDialog(false);
  };

  return (
    <div
      key={key}
      className='flex cursor-pointer p-3'
      onClick={() => handleNewConversation(item._id, item.name)}>
      <div>
        <Image
          src=''
          width={50}
          height={50}
          alt='img'
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between w-full'>
          <text>{item.name}</text>
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
