import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import { Layout } from "antd";
function App() {
  return (
    <>
      <Layout>
        <AppHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <AppFooter />
      </Layout>
    </>
  );
}

export default App;
