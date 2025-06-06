import React from 'react';
import styled from 'styled-components';

const Card = ({ children }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__header">
          <div className="card__status-indicators">
            <div className="indicator red" />
            <div className="indicator yellow" />
            <div className="indicator green" />
          </div>
          <p className="card__ai-label">AI Assistant</p>
        </div>
        <div className="card__body">
          {/* User prompt */}
          <div className="card__user-prompt">
            <span className="prompt-symbol">$</span>
            <span className="prompt-text">How can I help you today?</span>
          </div>
          {/* Bot response or quiz content */}
          {children ? (
            <div className="card__bot-response">
              <span className="response-symbol">&gt;</span>
              <div className="response-content">{children}</div>
            </div>
          ) : (
            <div className="card__bot-response">
              <span className="response-symbol">&gt;</span>
              <span className="response-placeholder">I'm your AI assistant. Ask me anything or try the quiz!</span>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    background-color: #111;
    color: #fff;
    padding: 24px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    font-family: 'Courier New', Courier, monospace;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 1px solid #333;
  }

  .card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card__status-indicators {
    display: flex;
    gap: 8px;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .red {
    background-color: #e63946;
  }

  .yellow {
    background-color: #f1faee;
  }

  .green {
    background-color: #2a9d8f;
  }

  .card__ai-label {
    font-size: 14px;
    color: #a8dadc;
  }

  .card__body {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card__user-prompt {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .prompt-symbol {
    color: #2a9d8f;
    user-select: none;
  }

  .prompt-text {
    color: #fff;
  }

  .card__bot-response {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .response-symbol {
    color: #457b9d;
    user-select: none;
  }

  .response-content {
    color: #fff;
    width: 100%;
  }

  .response-placeholder {
    color: #aaa;
  }
`;

export default Card;