import useSwr from "swr";

export const baseURL = "https://hacker-news.firebaseio.com/v0";

const useRequest = <T extends any>(...args: (string | number)[]) => {
  const path = args.length ? `/${args.join("/")}.json` : "";
  const { data, error } = useSwr<T>(`${baseURL}${path}`);
  const isError = Boolean(error);
  const isLoading = !data && !isError;

  return {
    data,
    error,
    isLoading,
    isError,
  };
};

export default useRequest;
