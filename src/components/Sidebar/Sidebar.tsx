"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useState } from "react";
import { FaTelegramPlane, FaEnvelope, FaUsers, FaCog } from "react-icons/fa";
import { MessageSquareText, UsersRound, MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [active, setActive] = useState("Campaign");

  return (
    <aside className="w-72 h-screen flex flex-col justify-between border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="px-6 py-4">
        <Link href={"/leads"}><Image src="/Screenshot 2024-08-21 183809.png" alt="Shoden Logo" width={122} height={40} /></Link>
      </div>

      <Separator className="my-4" />

      {/* Menu Items */}
      <nav className="flex-1 px-6">
        <p className="text-gray-500 mb-2 text-sm">MAIN</p>
        <ul>
          <li
            className={`flex items-center p-2 cursor-pointer ${
              active === "Chat With Nezumi" ? "text-[#8C57EA]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive("Chat With Nezumi")}
          >
            <Link href="/chat" className="flex items-center w-full">
              <MessageSquareText className="mr-3" />
              Chat With Nezumi
            </Link>
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer ${
              active === "Campaign" ? "text-[#8C57EA]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive("Campaign")}
          >
            <Link href="/campaign" className="flex items-center w-full">
              <FaTelegramPlane className="mr-3" />
              Campaign
            </Link>
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer ${
              active === "Mail" ? "text-[#8C57EA]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive("Mail")}
          >
            <Link href="/mail" className="flex items-center w-full">
              <FaEnvelope className="mr-3" />
              Mail
            </Link>
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer ${
              active === "Leads" ? "text-[#8C57EA]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive("Leads")}
          >
            <Link href="/leads" className="flex items-center w-full">
              <UsersRound className="mr-3" />
              Leads
            </Link>
          </li>
          <li
            className={`flex items-center p-2 cursor-pointer ${
              active === "Settings" ? "text-[#8C57EA]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActive("Settings")}
          >
            <Link href="/settings" className="flex items-center w-full">
              <FaCog className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      <Separator className="my-4" />

      {/* Footer Section */}
      <div className="px-6">
        <Link href="#" target="_blank" className="flex items-center mb-4 text-gray-700 hover:underline content-center">
          <Avatar className="w-10 h-10 rounded-full mr-3 content-center">
            <AvatarImage
              src="https://th.bing.com/th/id/OIP.wm3r8I6tFttVkUPo-qjkwwHaEK?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="slack"
            />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
          Join our community <MoveUpRight />
        </Link>
        <Separator className="mb-4" />
        <div className="flex p-3 items-center mb-7 border-2 rounded-full border-[#E2E8F0]">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage
              src="https://th.bing.com/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="John Doe"
              className="rounded-3xl"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">johndoe@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
