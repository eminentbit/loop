import PropTypes from "prop-types";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmationModal = ({ open, file, onCancel, onSend }) => {
  const getFilePreview = () => {
    if (!file) return null;

    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="max-h-64 rounded-lg"
        />
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <video controls className="max-h-64 rounded-lg">
          <source src={URL.createObjectURL(file)} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <div className="text-center p-4">
        <p className="text-lg font-medium">{file.name}</p>
        <p className="text-sm text-gray-500">
          {fileType || "Unknown file type"}
        </p>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Preview & Confirm</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center">
          {getFilePreview()}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSend}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  type: PropTypes.string.isRequired,
  file: PropTypes.object,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func,
  setFile: PropTypes.func,
  setType: PropTypes.func,
  setContent: PropTypes.func,
  setPreview: PropTypes.func,
  onSend: PropTypes.func.isRequired,
  content: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
