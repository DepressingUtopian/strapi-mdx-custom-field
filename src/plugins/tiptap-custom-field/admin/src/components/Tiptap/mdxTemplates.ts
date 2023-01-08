export const Templates = [
    {
        label: 'H1',
        construct: (wrappedText: string) => `<Text variant='h1'>${wrappedText}</Text>`,
    },
    {
        label: 'H2',
        construct: (wrappedText: string) => `<Text variant='h2'>${wrappedText}</Text>`,
    },
    {
        label: 'H3',
        construct: (wrappedText: string) => `<Text variant='h3'>${wrappedText}</Text>`,
    },
    {
        label: 'bold',
        construct: (wrappedText: string) => `<Text textStyle='bold'>${wrappedText}</Text>`,
    },
]