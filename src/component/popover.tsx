import { ReactNode, useRef, useState, cloneElement } from "react";
import { usePopper } from "react-popper";

const invisibleTimeout = 300;

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  title?: ReactNode;
  options?: any;
}

const Popover = (props: PopoverProps) => {
  const { children, content, title, options = {} } = props;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef();

  return (
    <>
      {cloneElement(children, {
        ref: setReferenceElement,
        onMouseEnter: (e: Event) => {
          e.stopImmediatePropagation();
          clearTimeout(timeoutRef.current);
          setVisible(true);
        },
        onMouseLeave: (e: Event) => {
          e.stopImmediatePropagation();
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(
            () => setVisible(false),
            invisibleTimeout
          );
        },
      })}
      {visible && (
        <div
          class="shadow-lg bg-white px-4 py-4 text-center rounded"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          onMouseEnter={(e: Event) => {
            e.stopImmediatePropagation();
            clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={(e: Event) => {
            e.stopImmediatePropagation();
            setVisible(false);
          }}
        >
          {/* <div
            ref={setArrowElement}
            style={{ ...styles.arrow }}
            class="w-0 h-0 bg-white shadow border-4 border-red-400"
          /> */}
          {title && <div>{title}</div>}
          <div>{content}</div>
        </div>
      )}
    </>
  );
};

export default Popover;
