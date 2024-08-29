"use client";

import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Assuming you're using a button component from Shadcn

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-slate-950 h-[65px] flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <p className="text-white font-md font-bold">Blogs</p>
        {/* Add more links here if needed */}
      </div>
      <div className="text-white flex items-center space-x-4">
        {session ? (
          <>
            <p className="mr-4">Welcome, {session.user?.name}</p>
            <Button 
              variant="outline" 
              className="text-white bg-black border-white hover:bg-white hover:text-black"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button 
            variant="default" 
            className="text-white"
            onClick={() => signIn()}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
