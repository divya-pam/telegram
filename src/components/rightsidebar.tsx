import BodyRightSide from "./bodyrightside";
import FooterRightSide from "./footerrightside";
import HeaderRightSide from "./headerrightside";

const RightSideBar = ({ data }: any) => {
  return (
    <div className='flex flex-col relative w-full'>
      <div className='flex sticky top-0 left-0 right-0 border-y-2'>
        <HeaderRightSide data={data} />
      </div>
      <div className='flex flex-1 overflow-hidden scrollbar-hide overflow-y-scroll'>
        <BodyRightSide data={data} />
      </div>
      <div className='sticky right-0 left-0 bottom-0'>
        <FooterRightSide />
      </div>
    </div>
  );
};

export default RightSideBar;
