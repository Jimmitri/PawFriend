import React from "react";
import {Header} from './componentes/Header';
import { BrowserRouter as Route} from "react-router-dom";
import { Paginas } from './componentes/Paginas';
import { Barra } from "./componentes/Barra";
import { DataProvider} from './context/Dataprovider';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Route>
          <Header />
          <Paginas />
          <Barra />
        </Route>
      </div>
    </DataProvider>
  );
}

export default App;
