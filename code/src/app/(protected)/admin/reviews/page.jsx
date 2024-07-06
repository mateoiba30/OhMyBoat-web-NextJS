import { CreateComponent } from "@/components/WorkingComponent";
import { ReviewsTable } from "@/components/publicaciones/Reviews/ViewReviews";
import { getAllReviews } from "../../../../../actions/reviewActions";

async function ViewReviewsPageAdmin() {
    const reviews = await getAllReviews();
    console.log(reviews);
    return (
        <div>
            <ReviewsTable data={reviews} user={"ADMIN"}/>
        </div>
    );
}

export default ViewReviewsPageAdmin;