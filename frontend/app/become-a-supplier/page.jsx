
import BusinessSection from "../../components/BusinessSection"
import Supplier from "../../components/Supplier"
import SupplierSection from "../../components/SupplierSection"
import PartnerSection from "../../components/PartnerSection"
import HowItWorks from "../../components/HowItWorks"
import Footer from "../../components/Footer"
import ProfileUser from "../../components/Profile"

export default function BecomeSupplier() {
    return (
        <div>
            <ProfileUser />
            <BusinessSection />
            <Supplier />
            <SupplierSection />
            <PartnerSection />
            <HowItWorks />
            <Footer />
        </div>
    )
}
