import { toFirstLetterUpperCase } from "./index";

/** @desc 创建 logger，打印日志 */
const createLogger =
  (name: string) =>
  (
    assert: boolean,
    message: string,
    type?: "info" | "error" | "table" | "log" = "info",
    ...args
  ) =>
    !assert &&
    console[type](
      `${toFirstLetterUpperCase(type)} from ${name}: ${message}.`,
      ...args
    );

export { createLogger };
