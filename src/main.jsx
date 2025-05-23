import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "./redux/store.js";

import AppRoutes from "./AppRoutes.jsx";
import ModalComponent from "./components/ModalComponent";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                    <ToastContainer position="bottom-right" />
                    <ModalComponent />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
