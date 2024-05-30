// src/components/ConfirmModal/ConfirmModal.tsx
import React from 'react';

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="bg-red-500 text-white p-2 mr-2">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-green-500 text-white p-2">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
