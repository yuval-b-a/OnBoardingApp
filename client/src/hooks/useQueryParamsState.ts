import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

type UseQueryParamsStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export const useQueryParamsState = <T>(param: string, initialState: T): UseQueryParamsStateReturnType<T> => {
  const location = useLocation();

  const [queryParameterValue, setQueryParameterValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialState;

    // Get query parameter value from the URL
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const paramValue = searchParams.get(param);

    return paramValue ? JSON.parse(paramValue) as T : initialState;
  });

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(window.location.search);

    if (queryParameterValue) {
      currentSearchParams.set(param, JSON.stringify(queryParameterValue));
    } else {
      currentSearchParams.delete(param);
    }

    const newUrl = 
    [window.location.pathname, currentSearchParams.toString()]
      .filter(Boolean)
      .join("?");

    window.history.replaceState(window.history.state, "", newUrl);
  }, [param, queryParameterValue, location.pathname]);

  return [queryParameterValue, setQueryParameterValue];
};