import type { Metadata } from "next";;
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { ApiClientsProvider } from "./api-clients";
import { MantineThemeProvider } from "./mantine";
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
      </head>
      <body className={"w-full max-h-screen bg-gray-900"}>
        <MantineThemeProvider>
          <ApiClientsProvider>
            {children}
          </ApiClientsProvider>
        </MantineThemeProvider>
      </body>
    </html>
  );
}
