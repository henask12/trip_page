import BackgroundSection from "@/components/BackgroundSection";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import { StayDataType, TaxonomyType } from "@/data/types";
import SectionHero from "./SectionHero";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import BackgroundSection2 from "@/components/BackgroundSection2";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import SectionDowloadApp from "@/components/SectionDowloadApp";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "#",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "#",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "6",
    href: "#",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/9828170/pexels-photo-9828170.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    id: "7",
    href: "#",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

export default function Home() {
  return (
    <main className=" overflow-hidden">
      <div className=" relative  mb-24  lg:mb-28  inset-0 main-bg bg-center  z-0">
        <div className="relative z-10 flex items-center justify-center">
          <SectionHero className="pt-10 lg:pt-16 lg:pb-4" />
        </div>
        <div className=" relative py-16">
          {" "}
          {/* removed this class name z-10  */}
          <BackgroundSection className="bg-white rounded-lg dark:bg-black/20" />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={3}
            heading=""
            subHeading=""
            sliderStyle="style2"
          />
          <div className="relative container py-16">
            <BackgroundSection2 className="bg-slate-50 dark:bg-black dark:bg-opacity-20 mt-8" />
            <div className="px-4 md:px-8">
              <SectionGridFeaturePlaces stayListings={DEMO_DATA} />
            </div>
          </div>
          <div className="relative container py-16">
            <BackgroundSection2 className="bg-indigo-50 dark:bg-black dark:bg-opacity-20 mt-8" />
            <div className="px-4 md:px-8">
              <SectionGridFeaturePlaces
                tabs={["Addis Ababa", "Bahirdar", "ArbaMinch"]}
                heading={"Popular Attractions"}
                subHeading={""}
                stayListings={DEMO_DATA}
              />
            </div>
          </div>
        </div>
        <div className="container relative">
          <SectionDowloadApp />
        </div>
      </div>
    </main>
  );
}
