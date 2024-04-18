import type { Metadata } from "next";;
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { ApiClientsProvider } from "./api-clients";

export const metadata: Metadata = {
  title: "SCA Natan Borges",
  description: "Sistema de Controle Acadêmico ",
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link href="/dist/main.css" rel="stylesheet"></link>
      </head>
      <body className={"w-full max-h-screen bg-gray-900"}>
        <MantineProvider>
          <ApiClientsProvider>
            {children}
          </ApiClientsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
