import axios from "axios";
import { MicIcon, PlusIcon, SendHorizontal, SmileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { globalStore } from "./../store/user";
import { Input } from "./ui/input";

const FooterRightSide = () => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const {
    accessToken,
    setActiveConversationData,
    activeConversation,
    activeConversationData,
    setActiveConversation,
  } = globalStore((s: any) => ({
    accessToken: s.accessToken,
    setActiveConversationData: s.setActiveConversationData,
    activeConversationData: s.activeConversationData,
    activeConversation: s.activeConversation,
    setActiveConversation: s.setActiveConversation,
  }));

  const handleSendMessage = async () => {
    try {
      const url = window.location.href;
      const urlObj = new URL(url);
      const params = urlObj.searchParams;
      const conversationId = params.get("conversationId");
      const headers = { Authorization: `Bearer ${accessToken}` };
      if (conversationId === "new") {
        const req_data = {
          message: msg,
          members: [params.get("id")],
        };
        const data = await axios.post(
          "http://localhost:4000/conversation/create",
          req_data,
          { headers }
        );
        setActiveConversation(data.data._id);
        router.replace(`/chat?conversationId=${data.data._id}`);

        setMsg("");
        return;
      }

      const req_data = {
        message: msg,
        groupId: conversationId,
      };
      const data = await axios.post(
        "http://localhost:4000/message/send",
        req_data,
        { headers }
      );

      setActiveConversationData(data.data);
      setMsg("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='flex items-center p-3 bg-violet-100'>
      <PlusIcon />
      <div className='flex w-full items-center gap-2'>
        <SmileIcon />
        <Input
          className=''
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          placeholder='Type a message'
        />
        {msg ? <SendHorizontal onClick={handleSendMessage} /> : <></>}
      </div>

      <MicIcon />
    </div>
  );
};

export default FooterRightSide;
