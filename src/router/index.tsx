import preact from "preact";
import Router, { RouterProps } from "preact-router";
import AsyncRoute from "preact-async-route";
import { createHashHistory } from "history";
import { HomePage, RecorderPage, RecordingPage } from "@/page";

type AnyComponent<Props> =
  | preact.FunctionalComponent<Props>
  | preact.ComponentConstructor<Props, any>;

type RouterConfigProps = RouterProps & {
  /** @desc 子路由，子路由副路由使用通配符 :rest* */
  children?: RouterConfigProps[];
  /** @desc normal loading component */
  component?: preact.FunctionalComponent;
  /** @desc lazy loading component, given component path, import dynamically */
  componentPath?: string;
};

const appRouters: RouterConfigProps[] = [
  {
    path: "/",
    component: HomePage,
  },
  // Recorder
  {
    path: "/recorder",
    component: RecorderPage,
  },
  {
    path: "/recorder/recording",
    component: RecordingPage,
  },
];

const commonRouterProps: RouterProps = {
  // use hash history
  history: createHashHistory(),
};

const renderRouters = (routers: RouterConfigProps[] = appRouters) => (
  <Router {...commonRouterProps}>
    {routers.map((router: RouterConfigProps) => {
      const {
        children,
        component: SyncRoute,
        componentPath,
        ...restRouteProps
      } = router;
      const isAsyncComponent = !!componentPath;
      const RouteComponent = isAsyncComponent ? AsyncRoute : SyncRoute;
      const asyncRouteProps = isAsyncComponent
        ? {
            getComponent: () =>
              import(/* @vite-ignore */ componentPath).then(
                (module) => module.default
              ),
          }
        : {};

      return (
        <RouteComponent
          {...asyncRouteProps}
          {...restRouteProps}
          children={children?.length ? renderRouters(children) : undefined}
        />
      );
    })}
  </Router>
);
export { renderRouters };

export default appRouters;
