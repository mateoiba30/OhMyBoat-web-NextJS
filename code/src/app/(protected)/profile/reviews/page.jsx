import { CreateComponent } from "@/components/WorkingComponent";
function reviewsPage() {
    return (
        <div>
            <CreateComponent titulo="Estamos trabajando para que puedas ver tus reseñas 🎖️" backLink={"/profile"} />
        </div>
    )
}

export default reviewsPage;