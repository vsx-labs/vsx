import { Spinner, Stack } from '@primer/react'

export const Loading = () => {
    return (
        <Stack direction="horizontal" align="center">
            <Stack.Item>
                <Spinner sx={{ marginTop: '5px' }} />
            </Stack.Item>
        </Stack>
    )
}
