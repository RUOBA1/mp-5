"use server"
import getCollection, {POSTS_COLLECTION} from "@/db";
import {PostProps} from "@/types/PostProps";

export default async function createNewPost(url:string, alias: string):Promise<PostProps> {
    const postsCollection = await getCollection(POSTS_COLLECTION);
    const existing = await postsCollection.findOne({ alias });
    if (existing) {
        throw new Error("Alias already taken");
    }

    const res = await postsCollection.insertOne({ url, alias });

    if(!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { id: res.insertedId.toHexString(), url, alias };
}