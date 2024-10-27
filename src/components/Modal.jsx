import React from "react";
import { useModal } from "../contexts/ModalContext";
import ArticleForm from "./ArticleForm"; 

const Modal = () => {
  const { modalContent, closeModal } = useModal();

  if (!modalContent.isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modalContent.isEditMode ? "Edit Article" : "Create Article"}</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <ArticleForm
              initialData={modalContent.initialData}
              onSubmit={async (formData) => {
                // Handle submit logic here (create/edit)
                closeModal();
              }}
              isEditMode={modalContent.isEditMode}
              contentType={modalContent.contentType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
