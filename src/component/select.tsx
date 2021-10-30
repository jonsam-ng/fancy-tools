import { HTMLProps } from "preact";

const Select = (props: HTMLProps<HTMLSelectElement>) => {
  return (
    <select
      class="w-96 border h-10 rounded outline-none cursor-pointer px-4 bg-gray-100 appearance-none shadow mx-5"
      {...props}
    />
  );
};

const Option = (props) => (
  <option class="bg-white appearance-none" {...props} />
);

export default Object.assign(Select, { Option });
