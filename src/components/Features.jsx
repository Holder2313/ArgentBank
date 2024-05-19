import React from "react";
import FeatureItem from "./FeatureItem";
import iconChat from "../img/icon-chat.webp";
import iconMoney from "../img/icon-money.webp";
import iconSecurity from "../img/icon-security.webp";

export default function Features() {
  // Création d'un tableau d'objets pour chaque FeatureItem
  const featuresData = [
    {
      img: iconChat,
      title: "You are our #1 priority",
      text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      img: iconMoney,
      title: "More savings means higher rates",
      text: "The more you save with us, the higher your interest rate will be!",
    },
    {
      img: iconSecurity,
      title: "Security you can trust",
      text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <section className="features-container">
      {featuresData.map((feature, index) => (
        <FeatureItem
          key={index}
          img={feature.img}
          title={feature.title}
          text={feature.text}
        />
      ))}
    </section>
  );
}
