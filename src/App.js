import React from "react";
import { observer } from "mobx-react-lite";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

export const App = observer(() => {
  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  );
});
