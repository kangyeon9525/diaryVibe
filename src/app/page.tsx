import { redirect } from "next/navigation";

import { staticPaths } from "@/commons/constants/url";

export default function Home() {
  redirect(staticPaths.diaries);
}
