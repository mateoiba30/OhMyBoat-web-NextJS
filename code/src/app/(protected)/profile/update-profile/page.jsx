import { UpdateProfileManager } from "@/components/profile/updateProfile/UpdateProfileManager"
import { getUserById } from "../../../../../data/user"
import { auth } from "../../../../../auth"

export default async function updateProfile() {
  const session = await auth()
  const userData = await getUserById(session.user.id)
  console.log(userData)

  return (
    <div>
      <UpdateProfileManager userData={userData}/>
    </div>
  )
}



