import { EllipsisVerticalIcon, SearchIcon, VideoIcon } from "lucide-react";

const HeaderRightSide = ({ data }: any) => {
  console.log("header ", data);

  return (
    <div className='flex items-center justify-between w-full p-3'>
      <div className='flex items-center justify-center rounded-full w-12 h-12 aspect-square bg-violet-200'>
        {data?.members[0].name[0].toUpperCase()}
      </div>
      <div className='flex flex-col'>
        <text>{data?.members[0].name} </text>
      </div>
      <div className='flex gap-2'>
        <VideoIcon />
        <SearchIcon />
        <EllipsisVerticalIcon />
      </div>
    </div>
  );
};

export default HeaderRightSide;
