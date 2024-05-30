"use client";

import LeftSideBar from "@/components/leftsidebar";
import RightSideBar from "@/components/rightsidebar";
import { socket } from "@/lib/utils";
import { globalStore } from "@/store/user";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type dummyDataTypes = {
  name: String;
  imageId: String;
  email: String;
  messages: {
    message: String;
    sender: String;
    receiver: String;
    time: Date;
  }[];
}[];

const ChatPage = () => {
  const searchparams = useSearchParams();
  const conversationId = searchparams.get("conversationId");
  const {
    user,
    allUsers,
    accessToken,
    allConversations,
    setAllUsers,
    setAllConversations,
    setActiveConversationData,
    activeConversationData,
  } = globalStore((s: any) => ({
    user: s.user,
    allUsers: s.allUsers,
    accessToken: s.user.accessToken,
    setAllUsers: s.setAllUsers,
    setActiveConversationData: s.setActiveConversationData,
    setAllConversations: s.setAllConversations,
    allConversations: s.allConversations,
    activeConversationData: s.activeConversationData,
  }));

  useEffect(() => {
    if (accessToken) {
      handleData();
    }
    handleAllUsers();
  }, [accessToken, activeConversationData]);

  useEffect(() => {
    if (conversationId && accessToken && conversationId != "new") {
      handleConversationMessages();
    }
  }, [conversationId, accessToken]);

  useEffect(() => {
    socket.on(`conversation-${conversationId}`, async (data: any) => {
      await setActiveConversationData(data);
    });
    socket.on(`conversations-${user._id}`, async (data: any) => {
      await setAllConversations(data);
    });
  }, [conversationId]);

  const handleAllUsers = async () => {
    const res = await axios.get("http://localhost:4000/user/getAllUsers", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setAllUsers(res.data);
  };

  const handleData = async () => {
    const res = await axios.get(
      "http://localhost:4000/user/getAllConversations",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    setAllConversations(res.data.Groups);
  };

  const handleConversationMessages = async () => {
    const conversationMessages = await axios.get(
      `http://localhost:4000/conversation/getById?conversationId=${conversationId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await setActiveConversationData(conversationMessages.data);
  };

  const newConvData =
    conversationId === "new"
      ? {
          _id: conversationId,
          members: [
            {
              _id: searchparams.get("id"),
              name: searchparams.get("name"),
              imageId: "1234",
            },
          ],
          messages: [],
        }
      : activeConversationData;

  console.log(newConvData);

  return (
    <div className='flex h-full'>
      <div className='w-1/4'>
        <LeftSideBar data={allConversations} />
      </div>
      <div className='flex flex-1'>
        {conversationId && Object.keys(newConvData).length > 0 ? (
          <RightSideBar data={newConvData} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
