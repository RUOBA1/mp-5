import getCollection, { POSTS_COLLECTION} from "@/db";
import Redirect from "@/components/Redirect";

type PostDoc = {
    url: string;
    alias: string;
};

export default async function AliasPage({ params }: { params:Promise <{ alias: string }>}) {
    const {alias} = await params;
    const postsCollection = await getCollection(POSTS_COLLECTION);
    const post = await postsCollection.findOne<PostDoc>({ alias });

    if(!post) {
        return (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                Error: Alias not found
            </div>
        );
    }

    return <Redirect url = {post.url} />
}