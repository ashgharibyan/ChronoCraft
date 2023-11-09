import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-auto">
				{/* Modal header */}
				<div className="px-6 py-4 border-b border-indigo-500">
					<h3 className="text-lg font-medium text-gray-900">
						Confirm Deletion
					</h3>
				</div>
				{/* Modal body */}
				<div className="p-6">
					<p>Are you sure you want to delete your account?</p>
				</div>
				{/* Modal footer */}
				<div className="px-6 py-4 border-t border-indigo-500 text-right">
					<button
						onClick={onClose}
						className="bg-indigo-500 text-white rounded px-4 py-2 mr-2"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="bg-red-600 text-white rounded px-4 py-2"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
