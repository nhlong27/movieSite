import React from 'react';

function Modal({
  children,
  open,
  onRequestClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onRequestClose: () => void;
}) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    const dialogNode = dialogRef.current!;
    if (open) {
      dialogNode.showModal();
    } else {
      dialogNode.close();
    }
  }, [open]);

  React.useEffect(() => {
    const dialogNode = dialogRef.current!;
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onRequestClose();
    };
    dialogNode.addEventListener('cancel', handleCancel);
    return () => {
      dialogNode.removeEventListener('cancel', handleCancel);
    };
  }, [onRequestClose]);

  // const lastActiveElement = React.useRef(null)

  // React.useEffect(() => {
  //   const node = ref.current
  //   if (open) {
  //     lastActiveElement.current = document.activeElement
  //     node.showModal()
  //   } else {
  //     node.close()
  //     lastActiveElement.current.focus()
  //   }
  // }, [open])

  return (
    <dialog aria-labelledby='modal-title' role='dialog' aria-modal='true' ref={dialogRef}>
      {children}
    </dialog>
  );
}

export default Modal;
