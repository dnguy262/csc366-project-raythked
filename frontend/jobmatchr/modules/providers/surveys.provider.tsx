import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { surveyApi } from "../surveys/api/survey.api";
import { Survey, SurveyData } from "../surveys/types/survey.interface";

type SurveyContextValues = {
  // TODO: typing once we have survey type
  getSurveys: (id?: string) => Survey | SurveyData;
};

export const SurveyContext = createContext<SurveyContextValues>({} as any);

export const SurveysProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: typing for surveys
  const [surveys, setSurveys] = useState<Survey>({});

  // this looks a little wonky but support for returning a single survey or all of them
  const getSurveys = useCallback(
    (id?: string) => (id ? surveys[id] as SurveyData : surveys),
    [surveys]
  );

  useEffect(() => {
    // initial api call for surveys data here
    surveyApi.getSurveys().then(surveys => {
        setSurveys(surveys);
    });
  }, []);

  const value: SurveyContextValues = useMemo(
    () => ({
      getSurveys,
    }),
    [surveys]
  );

  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
};
