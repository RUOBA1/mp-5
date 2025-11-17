"use client"
import NewPostForm from "./NewPostForm";
import { PostProps } from "@/types/PostProps";
import{ useState } from "react";

export default function PostsDisplay() {
    const [posts, setPosts] = useState<PostProps[]>([]);

    return(
        <div className="flex flex-col items-center">
            <NewPostForm
                append={(newPost: PostProps) => {
                    setPosts([...posts, newPost]);
                }}
            />
        </div>
    );
}