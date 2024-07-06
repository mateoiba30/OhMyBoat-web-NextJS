"use client"
import NotisMenu from "./HeaderComponents/NotisMenu"
import ProfileMenu from "./HeaderComponents/ProfileMenu"
import AddPublicationMenu from "./HeaderComponents/AddPublicationMenu"
import SpecialActionsMenu from "./HeaderComponents/SpecialActionMenu"
import ManagerActions from "./HeaderComponents/ManagerActions"
import { useEffect } from "react"
export default function BasicMenuCallback({role,notis,userId,unseenNotisNumber}) {
console.log(role)
console.log(notis);

    return (
        <div className="flex items-center space-x-2">
            {role === "ADMIN" && (
                <SpecialActionsMenu/>
            )}
            
            {role === "USER" && (
                <>
                <NotisMenu notificacionesArray={notis} userId={userId} unseenNotisNumber={unseenNotisNumber}/>
                <AddPublicationMenu/>

                </>
            )}
            {role === "MANAGER" && (
                <>
                <ManagerActions/>
                </>
            
            )}
            <ProfileMenu userId={userId}/>
        </div>
    );
}