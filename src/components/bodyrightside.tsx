import { cn } from "@/lib/utils";
import { globalStore } from "./../store/user";

const BodyRightSide = ({ data }: any) => {
  const { user } = globalStore((s: any) => ({ user: s.user.user }));
  return (
    <div className='flex flex-col gap-5 w-full'>
      {data.messages.map((item: any, i: any) => (
        <text
          key={item._id}
          className={`flex items-center ${
            item.sender === user._id ? "justify-end" : "justify-start"
          } `}>
          <div
            className={cn(
              `px-3 m-2 rounded-xl`,
              item.sender === user._id
                ? "bg-blue-100 rounded-br-none"
                : "bg-blue-400 rounded-bl-none"
            )}>
            {item.message}
          </div>
        </text>
      ))}
    </div>
  );
};

export default BodyRightSide;
