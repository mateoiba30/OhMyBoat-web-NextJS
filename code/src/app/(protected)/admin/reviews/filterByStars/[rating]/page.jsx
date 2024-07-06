import { ReviewsTable } from "@/components/publicaciones/Reviews/ViewReviews";
import { getUserReviewsByStars } from "../../../../../../../actions/reviewActions";

async function ViewReviewsPageAdmin({params}) {
    console.log(params.rating);
    const rating = parseInt(params.rating);
    const reviews = await getUserReviewsByStars({stars: rating});
    console.log(reviews);
    return (
        <div>
            <ReviewsTable data={reviews} user={"ADMIN"} stars={rating}/>
        </div>
    );
}

export default ViewReviewsPageAdmin;