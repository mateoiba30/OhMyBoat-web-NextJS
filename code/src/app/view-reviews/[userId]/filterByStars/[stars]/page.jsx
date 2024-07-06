import { ReviewsTable } from "@/components/publicaciones/Reviews/ViewReviews";
import { getUserReviewsByUserIdAndStars } from "../../../../../../actions/reviewActions";

async function ViewReviewsPage({params}) {
    const stars = parseInt(params.stars);
    console.log(stars);
    const reviews = await getUserReviewsByUserIdAndStars({id: params.userId, stars: stars});
    console.log(reviews);
    console.log(params.userId)
    return (
        <div>
            <ReviewsTable data={reviews} userId={params.userId} stars={params.stars}/>
        </div>
    );
}

export default ViewReviewsPage;