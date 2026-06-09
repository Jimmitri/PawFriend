import { Header } from './componentes/Header';
import { BrowserRouter as Route, useLocation } from "react-router-dom";
import { Paginas } from './componentes/Paginas';
import { Barra } from "./componentes/Barra";
import { DataProvider } from './context/Dataprovider';

function AppContent() {
  const location = useLocation();

  const esAdmin =
    location.pathname === "/Administrar" ||
    location.pathname.startsWith("/panel-admin");

  return (
    <>
      {!esAdmin && <Header />}

      <Paginas />

      {!esAdmin && <Barra />}
    </>
  );
}

function App() {
  return (
    <DataProvider>
      <Route>
        <AppContent />
      </Route>
    </DataProvider>
  );
}

export default App;