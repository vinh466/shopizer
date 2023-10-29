export const createQueryString = (
  params: {
    name: string;
    value: string;
  }[],
  searchParams?: URLSearchParams | undefined,
) => {
  const searchParam = new URLSearchParams(searchParams);
  params?.forEach((param) => {
    searchParam.set(param.name, param.value);
  });
  return searchParam.toString();
};
