import { CreateComponent } from "@/components/WorkingComponent";
import { auth } from "../../../../../auth";
import { getAllPosts } from "../../../../../data/posts";
import { OwnPublicationsTable } from "@/components/publicaciones/publicationView/OwnPublicationsTable";
import { AdminPublicationsTable } from "@/components/publicaciones/publicationView/AdminPublicationsTable";
// {/* <CreateComponent titulo="Estamos trabajando para que puedas ver tus publicaciones 🌎" backLink={"/profile"}/> */}
async function ownPostsPage() {
    const session = await auth();
    const userId = session?.user.id;  
    const role = session?.user?.role;
    console.log(role)
    const posts = await getAllPosts()   
    console.log(posts)
    return (
        <div>
            <AdminPublicationsTable data={posts} user={role}/>
        </div>
    )
}

export default ownPostsPage;