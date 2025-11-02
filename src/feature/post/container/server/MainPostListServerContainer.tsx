import { getQueryClient } from "@/common";
import { getMainPostListOptions } from "@/common/services/post";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MainPostListClientContainer from "../client/MainPostListClientContainer";

const MainPostListServerContainer = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(
    getMainPostListOptions({ page: 1, size: 10, sort: [] })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPostListClientContainer />
    </HydrationBoundary>
  );
};

export default MainPostListServerContainer;
