import { Box, Title } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
type MainHeaderLinkProsp = {
    title: string;
    url: string;
    logo?: ReactNode;
};
export const MainHeaderLink = ({
    url = "/",
    title,
    logo,
}: MainHeaderLinkProsp) => {
    return (
        <Link
            className="w-fit inline-flex justify-start items-center gap-1 font-normal text-sm"
            href={url}
        >
            {logo}
            {title}
        </Link>
    );
};
const LeftMainHeader = () => {

    return (
        <Box className="w-full justify-start items-center gap-4 flex">
            <Link href="/" className="min-w-15">
                <Title order={2} className="font-medium">Sistema Academico NB</Title>
            </Link>
            <MainHeaderLink title="Estudantes" url="/marketplace/auction" />
            <MainHeaderLink title="Professores" url="/professor" />
            <MainHeaderLink title="Matérias" url="/" />
        </Box>
    );
};
export const MainHeader = () => {
    return (
        <Box className="h-[76px] bg-yellow-500 p-4 justify-center items-center flex">
            <Box className="w-full justify-between items-center flex">
                <LeftMainHeader />
            </Box>
        </Box>
    );
};