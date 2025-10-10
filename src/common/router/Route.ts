type RoutePathname = string;

type GeneratePathParams<Params, QueryParams> = {
  params: Params;
  query?: QueryParams;
};

/**
 * @description path의 trailing slash 지우는 함수
 */
function removeTrailingSlash(path: string) {
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

/**
 * @description react-router의 generatePath를 구현해놓음 (의도적으로 hash는 지원하지 않음)
 */
function getRouteAsPath(
  pathname: string,
  query: Record<string, string | number | string[] | number[]>
) {
  const remainingQuery = { ...query };

  /* query에서 ...slugs 지우는 작업 */
  let asPath = pathname.replace(/\[{1,2}(.+?)]{1,2}/g, ($0, slug: string) => {
    if (slug.startsWith("...")) slug = slug.replace("...", "");

    const value = remainingQuery[slug]!;
    delete remainingQuery[slug];
    if (Array.isArray(value)) {
      return value.map((v) => encodeURIComponent(v)).join("/");
    }
    return value !== undefined ? encodeURIComponent(String(value)) : "";
  });

  /* trailing slash 제거 -> 만약 없으면 slug 관련 에러 남 */
  asPath = removeTrailingSlash(asPath);

  const record = Object.entries(remainingQuery).reduce<Record<string, string>>(
    (prev, [key, value]) => {
      prev[key] = [value].join("");
      return prev;
    },
    {}
  );

  /* params로 들어온것 외에는 query로 변환 */
  const qs = new URLSearchParams(record).toString();
  if (qs) asPath += `?${qs}`;
  return asPath;
}

/**
 * @description
 * 라우트 실수 방지를 위해 Route 객체로 전체적인 route 관리를 위한 객체
 * useRouter, usePathname, useSearchParams, useParams의 type safe 지원을 위해 사용
 * @example
 * const homeRoute = new Route<{ id: string }, { name: string }>('/[id]')
 */
export class Route<Params, QueryParams> {
  constructor(public readonly pathname: RoutePathname) {}

  toString({
    params,
    query,
  }: Partial<GeneratePathParams<Params, QueryParams>> = {}): RoutePathname {
    return getRouteAsPath(this.pathname, {
      ...(params ?? {}),
      ...(query ?? {}),
    });
  }
}
