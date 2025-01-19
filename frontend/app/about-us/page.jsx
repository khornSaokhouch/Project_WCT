
import ProfileUser from "../../components/Profile"
import Footer from "../../components/Footer"
import TeamSection from "./components/TeamSection"
import MissionVisionSection from "./components/MissionVisionSection"



export default function AboutUsPage () {
    return(
    <div>
        <ProfileUser />
        <TeamSection />
        <MissionVisionSection />
        <Footer />
    </div>
    )
}