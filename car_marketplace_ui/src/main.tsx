import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
    ClientSideRowModelModule,
    CustomFilterModule,
    DateFilterModule,
    ModuleRegistry,
    NumberFilterModule,
    TextFilterModule,
    ValidationModule,
    ColumnAutoSizeModule
} from "ag-grid-community";
ModuleRegistry.registerModules([
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule,
    ClientSideRowModelModule,
    ValidationModule,
    ColumnAutoSizeModule
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
