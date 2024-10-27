import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState({
    isOpen: false,
    initialData: {},
    contentType: "article",
    isEditMode: false,
  });

  const openModal = (data, type, isEdit) => {
    setModalContent({ isOpen: true, initialData: data, contentType: type, isEditMode: isEdit });
  };

  const closeModal = () => {
    setModalContent({ ...modalContent, isOpen: false });
  };

  return (
    <ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
