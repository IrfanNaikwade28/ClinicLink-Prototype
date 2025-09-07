// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";

// Start MSW in development to mock backend APIs (blocking until ready, but fail-open)
if (import.meta.env.DEV && !import.meta.env.VITE_DISABLE_MSW) {
  try {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      serviceWorker: { url: '/mockServiceWorker.js' },
      onUnhandledRequest: 'bypass',
    })
  // expose a simple flag so code can know mocks are active
  window.__MSW_ENABLED__ = true
  } catch (err) {
    console.warn('MSW failed to start, continuing without mocks:', err)
  }
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
