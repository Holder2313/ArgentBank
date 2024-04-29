import React from 'react'
import PropTypes from 'prop-types'

export default function FeatureItem({img, title, text}) {
  return (
    <article className="feature-item">
      <img src={img} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title} </h3>
      <p>
        {text}
      </p>
    </article>
  );
}

FeatureItem.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}