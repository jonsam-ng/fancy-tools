import { HTMLProps } from "preact";

const Input = (
  props: HTMLProps<HTMLInputElement> & {
    label?: string;
  }
) => {
  const { label, ...restProps } = props;
  return (
    <div class="inline-flex justify-start items-center w-max">
      <span class="mr-2 text-gray-600 hover:text-gray-800">{label}:</span>{" "}
      <input
        type="text"
        {...restProps}
        class="border rounded ring-red-400 h-8 px-2 outline-none focus:border-red-400 hover:border-red-400 flex-1 w-72"
      ></input>
    </div>
  );
};

export default Input;
