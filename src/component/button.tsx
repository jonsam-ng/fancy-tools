import { HTMLProps } from "preact";

const Button = (props: HTMLProps<HTMLButtonElement>) => (
  <button class="bg-red-500 text-white rounded-2xl px-4 py-2" {...props}>
    {props.children}
  </button>
);

const CircleButton = (props: HTMLProps<HTMLButtonElement>) => (
  <button
    class="bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-2 border-4 border-red-500 hover:border-red-600 w-24 h-24"
    style={{ backgroundClip: "content-box" }}
    {...props}
  />
);

const SquareButton = (props: HTMLProps<HTMLButtonElement>) => (
  <div
    class=" text-white rounded-full px-2 py-2 border-4 border-red-500 hover:border-red-600 w-24 h-24 cursor-pointer flex justify-center items-center"
    {...props}
  >
    <div class="w-11 h-11 bg-red-500 hover:bg-red-600 box-border rounded"></div>
  </div>
);

export { CircleButton, Button, SquareButton };
