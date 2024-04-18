"use client";
import { MantineProvider, createTheme, Button, Title } from '@mantine/core';
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";

export const MantineThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            theme={createTheme({
                fontFamily: 'Work Sans, sans-serif',
                headings: { fontFamily: 'Work Sans, sans-serif' },
                defaultRadius: "lg",
                breakpoints: {
                    xs: "22em",
                    sm: "36em",
                    md: "60em",
                    lg: "70em",
                    xl: "120em",
                },
            })}
        >
            <Notifications
                position="top-right"
                zIndex={2000}
                limit={1}
                autoClose={3000}
            />
            {children}
        </MantineProvider>
    );
};
