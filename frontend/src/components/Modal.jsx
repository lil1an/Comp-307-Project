// Lian Lambert
import React from 'react'
import '../index.css'
import '../css/modal.css'
import { IoIosClose } from 'react-icons/io'

/* Example Usage
  <Modal
    visible='true'
    title='Office Hours Created'
    message='For more information about office hours, please email the professor'
    afterMessageContent={<button> click me </button>}
    primaryButtonLabel='Confirm'
    primaryButtonCallback={() => console.log('primary button clicked')}
    secondaryButtonLabel='Cancel'
    secondaryButtonCallback={() => console.log('secondary button clicked')}
    closeButtonCallback={() => console.log('close button clicked')}
  />
*/

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
        <div id="modal-background" className="centered">
          <div id="modal-container" className="centered border-base border-red">
            <div>
              <h1>{title}</h1>
              <div style={{ marginBottom: '15px' }}>{message}</div>
              {afterMessageContent && <div>{afterMessageContent}</div>}
              {(primaryButtonLabel || secondaryButtonLabel) && (
                <div className="centered">
                  {secondaryButtonLabel && (
                    <div
                      onClick={() => {
                        if (secondaryButtonCallback) {
                          secondaryButtonCallback()
                        }
                      }}
                      className="modal-button secondary-button border-red"
                    >
                      {secondaryButtonLabel}
                    </div>
                  )}
                  {primaryButtonLabel && (
                    <div
                      onClick={() => {
                        if (primaryButtonCallback) {
                          primaryButtonCallback()
                        }
                      }}
                      className="modal-button primary-button border-red"
                    >
                      {primaryButtonLabel}
                    </div>
                  )}
                </div>
              )}
              {closeButtonCallback && (
                <IoIosClose
                  onClick={() => closeButtonCallback()}
                  className="close"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
