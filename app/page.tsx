import AdmissionMarkets from "./components/admission-markets";
import Channels, { channels } from "./components/channels";
import Clients from "./components/clients";
import Faq, { faqs } from "./components/faq";
import Hero from "./components/hero";
import JsonLd from "./components/json-ld";
import Metrics from "./components/metrics";
import Process from "./components/process";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import StudyAreas from "./components/study-areas";
import VisionMission from "./components/vision-mission";
import WhyChooseUs from "./components/why-choose-us";
import { homeGraph } from "./lib/structured-data";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Metrics />
        <VisionMission />
        <Clients />
        <Channels />
        <StudyAreas />
        <Process />
        <AdmissionMarkets />
        <WhyChooseUs />
        <Faq />
      </main>

      {/* FAQ + channel catalog, built from the same data the page renders. */}
      <JsonLd data={homeGraph({ faqs, services: channels })} />

      <SiteFooter />
    </>
  );
}
