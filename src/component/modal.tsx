import { ReactNode, ComponentProps } from "preact";
import { Button, Portal } from "@/component";
import { useI18n } from "@/i18n";

interface ModalProps {
  visible: boolean;
  title?: ReactNode;
  children?: ReactNode;
  width?: number;
  afterClose?: () => void;
  bodyStyle?: CSSProperty;
  maskStyle?: CSSProperty;
  cancelButtonProps?: Partial<ComponentProps<typeof Button>>;
  cancelText?: ReactNode;
  okButtonProps?: Partial<ComponentProps<typeof Button>>;
  okText?: ReactNode;
  closable?: boolean;
  closeIcon?: ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  wrapClassName?: string;
  onCancel?: (e: Event) => void;
  onOk?: (e: Event) => void;
  afterClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const { t } = useI18n();
  const {
    visible = false,
    children,
    width = 500,
    title,
    bodyStyle = {},
    cancelButtonProps = {},
    cancelText = t("cancel"),
    okButtonProps = {},
    okText = t("ok"),
    closable = true,
    closeIcon = "X",
    mask = true,
    maskClosable = true,
    maskStyle = {},
    wrapClassName = "",
    onCancel,
    onOk,
  } = props;

  return visible ? (
    <Portal into="body">
      <div id="modal" role="document">
        {mask && (
          <div
            class="fixed w-screen h-screen z-40 top-0 left-0 right-0 bottom-0 transition-all"
            style={{ backgroundColor: "#00000073", ...maskStyle }}
            onClick={(e: Event) => maskClosable && onCancel(e)}
          />
        )}
        <div
          class="fixed z-50 flex justify-center items-center w-screen h-screen top-0 bottom-0"
          role="dialog"
          style={{ pointerEvents: "none" }}
        >
          <div
            class={`shadow bg-white rounded px-5 py-2 ${wrapClassName}`}
            style={{ width, ...bodyStyle, pointerEvents: "all" }}
          >
            {title && (
              <div class="border-b py-4 text-lg font-bold flex justify-between items-center">
                {title}{" "}
                {closable && (
                  <span
                    class="text-base text-gray-500 cursor-pointer"
                    onClick={onCancel}
                  >
                    {closeIcon}
                  </span>
                )}
              </div>
            )}
            <div class="py-6">{children}</div>
            <div class="border-t py-4 flex justify-end items-center">
              <Button {...cancelButtonProps} onClick={onCancel}>
                {cancelText}
              </Button>
              <Button {...okButtonProps} onClick={onOk}>
                {okText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
