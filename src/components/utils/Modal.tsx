import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const Modal = ({ show, onClose, message }: ModalProps) => {
  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ошибка</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
