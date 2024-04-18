"use client";
import { useLoadingOverlayStore } from "@/lib/load-overlay.store";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { PropsWithChildren } from "react";
import { MainHeader } from "./header/main.header";

export const BaseLayout = ({ children }: PropsWithChildren) => {
    const { isLoading } = useLoadingOverlayStore();
    return (
        <>
            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <AppShell
                header={{ height: 48, offset: true }}
                withBorder={false}
                transitionDuration={500}
                transitionTimingFunction="ease"
            >
                <MainHeader />
                <AppShell.Main className="w-full flex items-center gap-4 flex-col">
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    );
};
