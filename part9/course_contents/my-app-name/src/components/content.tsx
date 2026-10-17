interface ContentProps {
    name: string
    count: number
}

export const Content = ({name, count}: ContentProps) => {
    return (<p>{name} {count}</p>)
}