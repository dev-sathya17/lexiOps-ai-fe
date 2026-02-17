import Modal from "./Modal";
import Button from "./Button";
import { AlertCircle } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

export default function Dialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: DialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="max-w-md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} className="font-semibold">
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="font-bold px-8"
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-2xl shrink-0 ${variant === "danger" ? "bg-red-500/10 text-red-500" : "bg-pink-500/10 text-pink-500"}`}
        >
          <AlertCircle size={24} />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
