import { useState, useEffect } from "react";
import langContext from "./lang";
import en from "../lang/en.json";
import es from "../lang/es.json";
import pr from "../lang/pr.json";
import de from "../lang/de.json";

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const [langData, setLangData] = useState(en);

  const translations = { en, es, de, pr };

  useEffect(() => {
    setLangData(translations[lang]);
  }, [lang]);

  return <langContext.Provider value={{ lang, setLang, langData, translations }}>{children}</langContext.Provider>;
};

export default LangProvider;
