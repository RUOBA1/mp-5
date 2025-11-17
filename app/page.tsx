import PostDisplay from "@/components/PostsDisplay";


export default function Home() {
    return (
        <div className={"flex flex-col items-center bg-blue-200 p-4"}>
            <PostDisplay />
        </div>
    );
}
