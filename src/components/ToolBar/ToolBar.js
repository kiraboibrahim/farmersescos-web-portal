import {
  Button,
  DialogTitle,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateFarmerForm from "../CreateFarmerForm/CreateFarmerForm";
import CreateEscoForm from "../CreateEscoForm/CreateEscoForm";
import CreateGroupForm from "../CreateGroupForm/CreateGroupForm";

export default function ToolBar({ sx = [] }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isEscoModalOpen, setIsEscoModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  return (
    <>
      <Stack sx={[...(Array.isArray(sx) ? sx : [sx])]} direction="row">
        <Stack
          direction="row"
          sx={{
            transform: isCollapsed ? "scale(1)" : "scale(0)",
            transition: "transform 0.5s",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&": {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            },
            alignItems: "center",
          }}
        >
          <Button
            size="sm"
            color="success"
            sx={{
              marginRight: 1,
              borderRadius: 60,
              flex: "1 0 auto",
              opacity: 1,
            }}
            onClick={() => setIsEscoModalOpen(true)}
          >
            Create Esco
          </Button>
          <Button
            size="sm"
            color="success"
            sx={{ marginRight: 1, borderRadius: 60, flex: "1 0 auto" }}
            onClick={() => setIsFarmerModalOpen(true)}
          >
            Create Farmer
          </Button>
          <Button
            size="sm"
            color="success"
            sx={{ marginRight: 1, borderRadius: 60, flex: "1 0 auto" }}
            onClick={() => setIsGroupModalOpen(true)}
          >
            Create Group
          </Button>
          <Button
            size="sm"
            color="success"
            sx={{ marginRight: 1, borderRadius: 60, flex: "1 0 auto" }}
          >
            Create Agro Processor
          </Button>
        </Stack>
        <IconButton
          size="lg"
          variant="solid"
          color="success"
          sx={{ borderRadius: "50%" }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <AddIcon
            size="lg"
            sx={{
              transition: "transform, 0.3s",
              transform: isCollapsed ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
        </IconButton>
      </Stack>
      <CreateFarmerModal
        isOpen={isFarmerModalOpen}
        onClose={() => setIsFarmerModalOpen(false)}
      />
      <CreateEscoModal
        isOpen={isEscoModalOpen}
        onClose={() => setIsEscoModalOpen(false)}
      />
      <CreateGroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />
    </>
  );
}

function CreateFarmerModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <ModalOverflow>
        <ModalDialog sx={{ width: 500, maxWidth: "95vw" }}>
          <ModalClose />
          <DialogTitle>Create Farmer</DialogTitle>
          <CreateFarmerForm />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

function CreateEscoModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <ModalOverflow>
        <ModalDialog sx={{ width: 500, maxWidth: "95vw" }}>
          <ModalClose />
          <DialogTitle>Create Esco</DialogTitle>
          <CreateEscoForm />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}

function CreateGroupModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <ModalOverflow>
        <ModalDialog sx={{ width: 500, maxWidth: "95vw" }}>
          <ModalClose />
          <DialogTitle>Create Group</DialogTitle>
          <CreateGroupForm />
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
