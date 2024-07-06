"use client"
import { useEffect } from "react"
import { getUserById } from "../../../data/user";
import { useState } from "react";
import ProfileComponentInfa from "./ProfileComponentInfa";
export function ProfileManager ({userData}) {
    console.log("La Data",userData)
    return (
        <div>
            {userData ? (
                <div>
                <ProfileComponentInfa firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday} cellphone={userData.cellphone} email={userData.email} password={userData.password} role={userData.role} userId={userData.id}/>
                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )
}