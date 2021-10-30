import { HTMLProps } from "preact";

const CheckBox = (
  props: HTMLProps<HTMLInputElement> & {
    label: string;
  }
) => {
  const { label = "", ...restProps } = props;
  return (
    <label class="flex items-center justify-center cursor-pointer">
      <input type="checkbox" class="cursor-pointer" {...restProps} />
      <span class="mx-4">{label}</span>
    </label>
  );
};

export default CheckBox;
