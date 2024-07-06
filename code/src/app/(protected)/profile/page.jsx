import { ProfileManager } from "@/components/profile/ProfileManager"
import { auth } from "../../../../auth"
import { getUserById } from "../../../../data/user"
export default async function profile() {
  const session = await auth()
  const userData = await getUserById(session.user.id)
  console.log(userData)

  return (
    <div>
      <ProfileManager userData={userData}/>
    </div>
  )
}

