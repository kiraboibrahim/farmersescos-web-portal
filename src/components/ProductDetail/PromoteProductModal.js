import {
  Modal,
  ModalClose,
  ModalDialog,
  DialogTitle,
  ModalOverflow,
} from "@mui/joy";
import PromoteProductForm from "../PromoteProductForm/PromoteProductForm";

export default function PromoteProductModal({ isOpen, onClose, product }) {
  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <ModalOverflow>
        <ModalDialog sx={{ width: 500, maxWidth: "95vw" }}>
          <ModalClose />
          <DialogTitle>Promote Prouct</DialogTitle>
          <PromoteProductForm product={product} />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
