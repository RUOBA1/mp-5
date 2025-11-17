"use client"
import { Button, TextField } from "@mui/material";
import { useState, FormEvent } from "react";
import createNewPost from "@/lib/createNewPost";
import { PostProps } from "@/types/PostProps"

export default function NewPostForm({append}:{append: (post: PostProps) => void}) {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const newPost = await createNewPost(url, alias);
            append(newPost);
            setShortUrl(`${window.location.origin}/${newPost.alias}`);
        } catch (err) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("Something went wrong");
            }
        }
    }

    return(
        <form
            className={"w-180 rounded-xl p-4 bg-sky-400"}
            onSubmit={handleSubmit}
        >
            <h1 className="text-black text-3xl text-center mb-4 font-bold">
                URL Shortener
            </h1>
            <TextField
                variant={"filled"}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    width: "100%",
                    "& .MuiFilledInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "white",
                        height: "50px",
                    }
                }}
                label={"Put your original url here"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px", alignItems: "center" }}>
                <span style={{fontSize: "18px"}}>Put your desired alias here: </span>
                <TextField
                    variant={"filled"}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        width: "100%",
                        "& .MuiFilledInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "white",
                            height: "50px",
                        }
                    }}
                    label={"alias-you-want"}
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
            </div>
            <div className={"w-full flex justify-center"}>
                <Button
                    variant="contained"
                    type={"submit"}
                >
                    Shorten
                </Button>
            </div>
            {shortUrl && (
                <div className="mt-4 flex gap-2 items-center">
                    <TextField value={shortUrl} InputProps={{ readOnly: true }} sx={{ flex: 1 }} />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (navigator.clipboard) {
                                navigator.clipboard.writeText(shortUrl);
                                alert("Copied to clipboard!");
                            } else {
                                alert("Clipboard API not supported");
                            }
                        }}
                    >
                        Copy
                    </Button>
                </div>
            )}
            {!shortUrl && errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
        </form>
    )
}
