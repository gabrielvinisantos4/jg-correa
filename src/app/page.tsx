import { Hero } from "@/components/home/Hero";
import { Featured } from "@/components/home/Featured";
import { Categories } from "@/components/home/Categories";
import { VideoTours } from "@/components/home/VideoTours";
import { About } from "@/components/home/About";
import { Announce } from "@/components/home/Announce";
import { InstagramBand } from "@/components/home/InstagramBand";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Categories />
      <VideoTours />
      <About />
      <Announce />
      <InstagramBand />
      <Contact />
    </>
  );
}
