import __taxonomies from "./jsons/__taxonomies.json";
import __stayTaxonomies from "./jsons/__stayTaxonomies.json";
import { TaxonomyType } from "./types";
import { Route } from "@/routers/types";


const DEMO_STAY_CATEGORIES: TaxonomyType[] = __stayTaxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
  listingType: "stay",
  href: item.href as Route,
}));


export {
  DEMO_STAY_CATEGORIES,
};
