import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { getAllPostsByUser } from "../../../../../data/posts";
import { OwnPublicationsTable } from "@/components/publicaciones/publicationView/OwnPublicationsTable";
// {/* <CreateComponent titulo="Estamos trabajando para que puedas ver tus publicaciones 🌎" backLink={"/profile"}/> */}
async function ownPostsPage() {
    const session = await auth();
    const userId = session?.user.id;
    const posts = await getAllPostsByUser({userId: userId});
    console.log(posts)
    return (
        <div>
            <OwnPublicationsTable data={posts}/>
        </div>
    )
}

export default ownPostsPage;