import { blockEn } from "./components/block";
import { blockIndexEn } from "./components/blockIndex";
import { datapairsEn } from "./components/datapairs";
import { headerCardsEn } from "./components/headerCards";
import { leavesEn } from "./components/leaves";
import { labelsEn } from "./labels/labels";
import { searchBarEn } from "./ui/searchBar";
import { selectEn } from "./ui/select";
import { sidebarEn } from "./ui/sidebar";
import { tableEn } from "./ui/table";

const resources = {
  en: {
    components: {
      ...blockEn,
      ...leavesEn,
      ...blockIndexEn,
      ...datapairsEn,
      ...headerCardsEn,
    },
    ui: {
      ...tableEn,
      ...sidebarEn,
      ...searchBarEn,
      ...selectEn,
    },
    ...labelsEn,
  },
};

export default resources;
