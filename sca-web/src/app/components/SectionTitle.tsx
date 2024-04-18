import { TitleProps, Title } from "@mantine/core"

type SectionTitleProps = TitleProps & {
    textValue: string
}

export const SectionTitle = ({ textValue, ...rest }: SectionTitleProps) => {
    return <Title className="text-gray-50" {...rest}>{textValue}</Title>

}
