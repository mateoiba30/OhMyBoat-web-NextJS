"use client"
import { useEffect } from "react"
import { useState } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
export function UpdateProfileManager ({userData}) {
    console.log("La Data",userData);
    return (
        <div>
            {userData ? (
                <div>
                <UpdateProfileForm firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday} cellphone={userData.cellphone} email={userData.email} password={userData.password} role={userData.role}/>
                </div>
            ) : (
                <h1>loading...</h1>
            )}

        </div>
    )
}