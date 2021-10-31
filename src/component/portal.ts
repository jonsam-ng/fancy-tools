import { createPortal } from "preact/compat";
import { VNode } from "preact";

interface PortalProps {
  children?: VNode;
  into?: string;
}

const findNode = (node: string) =>
  typeof node === "string" ? document.querySelector(node) : node;

const Portal = (props: PortalProps) =>
  createPortal(props.children || null, findNode(props.into));

export default Portal;
