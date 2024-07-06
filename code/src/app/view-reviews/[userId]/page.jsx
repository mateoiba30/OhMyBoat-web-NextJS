import { CreateComponent } from "@/components/WorkingComponent";
import { ReviewsTable } from "@/components/publicaciones/Reviews/ViewReviews";
import { getUserReviewsByUserId } from "../../../../actions/reviewActions";

async function ViewReviewsPage({params}) {
    const reviews = await getUserReviewsByUserId(params.userId);
    console.log(reviews);
    console.log(params.userId)
    return (
        <div>
            <ReviewsTable data={reviews} userId={params.userId}/>
        </div>
    );
}

export default ViewReviewsPage;