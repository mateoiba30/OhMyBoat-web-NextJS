import { CreateComponent } from "@/components/WorkingComponent";
import { NotisDisplay } from "@/components/profile/notis/NotisDisplay";
import { getAllNotis, seeNotis } from "../../../../../actions/notifications";
import { auth } from "../../../../../auth";
async function notificationsPage() {
    const session = await auth();
    const notis = await getAllNotis(session.user?.id);
    const seeAllNotis = await seeNotis(session.user?.id);
    console.log(notis.length);
    return (
        <div className="bg-white">
            <NotisDisplay notificacionesArray={notis}/>
        </div>
    )
}

export default notificationsPage;