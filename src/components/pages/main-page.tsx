import { BannerSection } from "../banner-section";
import { ServiceSection } from "../service-section";
import { UserInfo } from "../user-info";

export default function MainPage() {
  return (
    <section className="grid gap-6">
      <UserInfo />
      <ServiceSection />
      <BannerSection />
    </section>
  )
}
