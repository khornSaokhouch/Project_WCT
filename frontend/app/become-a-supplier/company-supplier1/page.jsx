import Footer from "../../../components/Footer";
import ProfileUser from "../../../components/Profile";
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