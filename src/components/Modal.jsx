import React, { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import ArticleForm from "../pages/ArticleForm";
import axios from "axios";

const Modal = () => {
  const { modalContent, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!modalContent.isOpen) return null;

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (modalContent.isEditMode) {
        await axios.patch(
          `https://newsly-piuq.onrender.com/api/articles/${modalContent.initialData.article_id}`,
          formData
        );
      } else {
        await axios.post(
          `https://newsly-piuq.onrender.com/api/articles`,
          formData
        );
      }
      
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error("Error submitting article:", err);
      setError(
        err.response?.data?.message || 
        "Failed to submit article. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "100vw", 
          height: "100vh", 
          backgroundColor: "rgba(0, 0, 0, 1)", 
          zIndex: 1040 
        }}
        onClick={closeModal}
      ></div>
      
      <div className="modal fade show" style={{ display: "block", zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
                      <div className="modal-header">
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger mb-3">
                  <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                </div>
              )}
              
              <ArticleForm
                initialData={modalContent.initialData}
                onSubmit={handleSubmit}
                isEditMode={modalContent.isEditMode}
                contentType={modalContent.contentType}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
