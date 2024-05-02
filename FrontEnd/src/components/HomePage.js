import React from "react";
import "../style/HomePage.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <h2 className="homepage-title">{t("Welcome")}</h2>
      <p className="homepage-content">{t("Main_Text")}</p>
    </div>
  );
};

export default HomePage;
