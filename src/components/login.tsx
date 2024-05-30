"use client";

import { globalStore } from "@/store/user";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const { accessToken } = globalStore((s: any) => ({
    accessToken: s?.user?.accessToken,
  }));
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const setUser = globalStore((s: any) => s.setUser);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (accessToken != undefined) {
      console.log("accessToken", accessToken);
      router.push("/chat");
    }
  }, [accessToken]);

  const handleSubmit = async () => {
    try {
      const req_data = {
        name: formData.username,
        imageId: "1234",
        email: formData.email,
      };

      const data = await axios.post(
        "http://localhost:4000/user/auth",
        req_data
      );
      const { user, accessToken } = data.data;
      setUser(data.data);
      if (accessToken) {
        router.push("/chat");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className=' flex gap-2 flex-col'>
      <div className=' flex justify-center items-center'>
        <Image
          src={`https://robohash.org/1`}
          alt='Image'
          width={100}
          height={100}
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <text>Name</text>
        <input
          type='text'
          className=' w-full input input-bordered'
          placeholder='Name'
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
        />
      </div>
      <div className=' flex flex-col gap-2'>
        <text>Email</text>
        <input
          type='email'
          className=' w-full input input-bordered'
          placeholder='Name'
          onChange={(e) => {
            setFormData((pd) => ({
              ...pd,
              email: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LoginForm;
