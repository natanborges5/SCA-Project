import { Box, BoxProps } from "@mantine/core";
import { PropsWithChildren } from "react";

export const EdgeBox = ({
    children,
    className = "mx-auto my-5 w-full max-w-8xl 3xl:max-w-11xl px-8 3xl:px-4 gap-4 justify-center items-center flex-col",
    ...boxProps
}: PropsWithChildren<BoxProps>) => (
    <Box className="w-full flex-col justify-center items-center" bg={boxProps.bg}>
        <Box className={className} {...boxProps}>
            {children}
        </Box>
    </Box>
);
