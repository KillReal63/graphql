import { HTMLProps } from "react";

type OverlayProps = HTMLProps<HTMLDivElement>;

const ModalOverlay = (props: OverlayProps) => {
  return <div className="fixed inset-0 bg-modal_overlay z-[999]" {...props} />;
};

export default ModalOverlay;
