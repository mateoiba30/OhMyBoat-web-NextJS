import CreateReviewComponent from "@/components/publicaciones/Reviews/CreateReview"
async function CreateReviewPage({params}) {
    const id = params.tradeId;
    console.log(id)
    return (
        <CreateReviewComponent tradeId={id}/>
    )
}

export default CreateReviewPage