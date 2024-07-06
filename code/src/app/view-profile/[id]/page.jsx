import { getUserById } from "../../../../data/user"
import {ViewProfileComponentInfa} from "@/components/profile/ViewProfileComponent"
import { CreateComponent } from "@/components/WorkingComponent"
import { UserRatingProm, getUserReviewsByUserId } from "../../../../actions/reviewActions"
async function viewPage ({params}) { 
    console.log(params)
    const userData = await getUserById(params.id)
    const stars = await UserRatingProm(params.id);
    const reviews = (await getUserReviewsByUserId(params.id))
    .filter(review => review.stars === 4 || review.stars === 5)
    .slice(0, 5);
    console.log(reviews.length)
    console.log(stars)
    console.log(userData)

    return (
        <div>
        {userData ? (
            <ViewProfileComponentInfa firstname={userData.firstname} lastname={userData.lastname} birthday={userData.birthday}  email={userData.email} role={userData.role} id={userData.id} estrellas={stars} reviews={reviews}/>
        ) : (
            <CreateComponent titulo="No pudimos encontrar el perfil vuelve más tarde 😔 " backLink={"/"}/>
        )}

        </div>
    )
}

export default viewPage


