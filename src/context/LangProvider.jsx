import { useState, useEffect } from "react";
import langContext from "./lang";
import en from "../lang/en.json";
import es from "../lang/es.json";

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const [langData, setLangData] = useState(en);

  const translations = { en, es };

  useEffect(() => {
    setLangData(translations[lang]);
  }, [lang]);

  return <langContext.Provider value={{ lang, setLang, langData }}>{children}</langContext.Provider>;
};

export default LangProvider;
