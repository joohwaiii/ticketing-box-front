import React, { ReactNode, useEffect } from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  toggle?: () => void;
  isTransparent?: boolean;
  overlayColor?: string;
  borderRadius?: number;
  isProgress?: boolean;
  children?: ReactNode;
}

const ModalLayout: React.FC<ModalProps> = (props) => {
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(calc(-50%), calc(-50%))",
      padding: "0px",
      borderRadius: props.borderRadius === undefined ? 10 : props.borderRadius,
      border: props.isProgress ? 0 : "1px solid var(--grey-00)",
      background: props.isProgress ? "transparent" : "var(--white)",
    },
    overlay: props.isTransparent
      ? { zIndex: 1000, backgroundColor: "transparent" }
      : {
          zIndex: 1000,
          backgroundColor: props.overlayColor || "rgba(0, 0, 0, 0.16)",
        },
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.toggle}
      contentLabel="Example Modal"
      style={customStyles}
    >
      {props.children}
    </Modal>
  );
};

export default ModalLayout;
