import { TextInput, TextInputProps } from "@mantine/core"

export const TextInputForm = ({ ...rest }: TextInputProps) => {
    return <TextInput styles={{ label: { color: 'white' } }} variant="filled" size="md" radius={"lg"} {...rest} />
}