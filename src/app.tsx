import { renderRouters } from "@/router";
import { TranslateProvider, langRoot } from "@/i18n";
import { PageHeader } from "@/widget";

export function App(props) {
  return (
    <TranslateProvider root={langRoot}>
      <PageHeader /> {renderRouters()}
    </TranslateProvider>
  );
}
