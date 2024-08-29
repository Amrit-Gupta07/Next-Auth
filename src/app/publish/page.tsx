"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Tiro_Bangla } from "next/font/google";
import React, { useState } from "react";

const Publish = () => {
    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePublish = async () => {
    
    try{
        const response = await axios.post("/api/publish",{
            title : title,
            content : description,
        })

        if(!response.data.success){
            return toast({
                title : "Post not Published",
                description: response.data.message,
                variant:"destructive",
            })
        }
        console.log(response);
        console.log(response.data.data);
        return toast({
            title : "Post  Published",
        })

    }catch(error){
        return toast({
            title : "Something Went Wrong",
            variant:"destructive",
        })
    }

  };

  return (
    <div className="flex flex-col w-[50%] gap-3 mx-auto justify-center h-screen">
      <h1 className="font-bold text-2xl"> What's On Your Mind ?</h1>
      <Input
        type="text"
        placeholder="Tittle"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Type your message here."
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handlePublish}>Publish</Button>
    </div>
  );
};

export default Publish;
