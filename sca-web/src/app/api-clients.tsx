"use client";
import { initialize } from "@/lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { http, reactQuery } from "@/lib/clients";
import {
    createContext,
    useContext,
    useMemo,
    type PropsWithChildren,
} from "react";

export type ApiClients = {
    http: ReturnType<typeof axios.create>;
    reactQuery: ReturnType<typeof initialize>;
};

const apiClientContext = createContext({} as ApiClients);

type ApiClientsProviderProps = PropsWithChildren;

export function ApiClientsProvider({ children }: ApiClientsProviderProps) {
    const queryClient = useMemo(() => new QueryClient(), []);
    return (
        <QueryClientProvider client={queryClient}>
            <apiClientContext.Provider
                value={{
                    http,
                    reactQuery,
                }}
            >
                {children}
            </apiClientContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export const useApiClients = () => useContext(apiClientContext);
