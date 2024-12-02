import React from 'react';
import '../index.css';
import '../css/modal.css'
import closeIcon from '../assets/close.png';

const Modal = ({
  visible, 
  title, 
  message = null,
  afterMessageContent = null,
  primaryButtonLabel = null,
  primaryButtonCallback = null,
  secondaryButtonLabel = null,
  secondaryButtonCallback = null,
  closeButtonCallback = null,
}) => {
  return (
    <>
      {visible && (
        <div class='modal-background centered'>
          <div class='modal-container centered border-base border-red'>
            <div>
              <h1>{title}</h1>
              <div style={{marginBottom: '15px'}}>{message}</div>
              {afterMessageContent && (
                <div>{afterMessageContent}</div>
              )}
              {(primaryButtonLabel || secondaryButtonLabel) && (
                <div class='centered'>
                  {secondaryButtonLabel && (
                    <div 
                      onClick={() => {
                        if (secondaryButtonCallback) {
                          secondaryButtonCallback();
                        }
                      }} 
                      class='modal-button secondary-button border-red'
                    >
                      {secondaryButtonLabel}
                    </div>
                  )}
                  {primaryButtonLabel && (
                    <div 
                      onClick={() => {
                        if (primaryButtonCallback) {
                          primaryButtonCallback();
                        }
                      }} 
                      class='modal-button primary-button border-red'
                    >
                      {primaryButtonLabel}
                    </div>
                  )}
              </div>
              )}
              {closeButtonCallback && (
                <img 
                  src={closeIcon} 
                  class="close"
                  alt="close" 
                  onClick={() => closeButtonCallback()}
                />
              )}
            </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Modal;