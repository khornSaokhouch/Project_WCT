import Footer from "../../../components/Footer";
<<<<<<< Updated upstream
import ProfileUser from "../../../components/Profile";
=======
import Header from "../../../components/user-navbar";
>>>>>>> Stashed changes
import CompanySuppplierForm from "./components/CompanySupplierForm";


export default function CompanySuppplierPage () {
    return (
        <div>
            <ProfileUser />
            <div className="py-5">
            <CompanySuppplierForm />
            </div>
            <Footer />
        </div>
    )
}