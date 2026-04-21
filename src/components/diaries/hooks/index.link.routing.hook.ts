import { useRouter } from "next/navigation";

import { getDiaryDetailPath } from "@/commons/constants/url";

export function useDiariesLinkRouting() {
  const router = useRouter();

  const handleCardClick = (id: string | number) => {
    const path = getDiaryDetailPath(id);
    router.push(path);
  };

  return {
    handleCardClick,
  };
}
