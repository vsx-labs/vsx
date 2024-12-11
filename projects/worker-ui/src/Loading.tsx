import { Box, Spinner, Stack } from '@primer/react'

export const Loading = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'pageHeaderBg',
                padding: '10px',
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: '6px',
            }}
        >
            <Stack direction="horizontal" align="center">
                <Stack.Item>
                    <Spinner sx={{ marginTop: '5px' }} />
                </Stack.Item>
            </Stack>
        </Box>
    )
}
