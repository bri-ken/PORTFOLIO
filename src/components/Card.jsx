import React from 'react';
import styled from 'styled-components';

const Card = ({ title, description, imageUrl, techStack }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <img src={imageUrl} alt={title} className="card__image" />
        <div className="card__content">
          <p className="card__title">{title}</p>
          <p className="card__description">{description}</p>
          <div className="card__tech-stack">
            {techStack.map((tech, index) => (
              <img 
                key={index}
                src={`/assets/skills/${tech}.svg`}
                alt={tech}
                className="tech-icon"
              />
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    height: 200px;
    background-color: #f2f2f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 5px #ffffff80;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: rgba(242, 242, 242, 0.9);
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-weight: 700;
  }

  .card:hover .card__image {
    scale: 0.8;
  }

  .card__description {
    margin: 10px 0 0;
    font-size: 14px;
    color: #777;
    line-height: 1.4;
    flex-grow: 1;
  }

  .card__tech-stack {
    display: flex;
    gap: 12px;
    margin-top: 12px;
    justify-content: center;
    align-items: center;
  }

  .tech-icon {
    width: 28px;
    height: 28px;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .tech-icon:hover {
    opacity: 1;
    transform: scale(1.1);
  }`;

export default Card; 