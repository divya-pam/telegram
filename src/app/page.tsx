import LoginForm from "@/components/login";
import Image from "next/image";


export default function Home() {
  return (
    <div className=' bg-image h-screen flex items-center justify-center'>
      <div className=' bg-white w-1/2 rounded p-5'>
        <LoginForm />
      </div>
    </div>
  )
}

