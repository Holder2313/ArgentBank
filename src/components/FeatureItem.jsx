import React from 'react'

export default function FeatureItem({img, title, text}) {
  return (
    <div className="feature-item">
      <img src={img} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title} </h3>
      <p>
        {text}
      </p>
    </div>
  );
}
