export { TranslateProvider } from "@denysvuika/preact-translate";
import { useContext } from "preact/hooks";
import { TranslateContext } from "@denysvuika/preact-translate";
export const useI18n = () => useContext(TranslateContext);
export const langRoot = "src/i18n/lang";
