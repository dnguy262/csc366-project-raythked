import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type SurveyContextValues = {
  // TODO: typing once we have survey type
  getSurveys: () => any;
};

const SurveyContext = createContext<SurveyContextValues>({} as any);

export const SurveysProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: typing for surveys
  const [surveys, setSurveys] = useState([]);

  // this looks a little wonky but support for returning a single survey or all of them
  const getSurveys = useCallback(
    (id?: number) => (id ? [surveys[id]] : surveys),
    [surveys]
  );

  useEffect(() => {
    // initial api call for surveys data here
  }, []);

  const value: SurveyContextValues = useMemo(
    () => ({
      getSurveys,
    }),
    []
  );

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
};
