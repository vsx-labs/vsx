import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/api')({
    component: ApiDocs,
})

function ApiDocs() {
    return <div className='p-2'>(Placeholder - Protobuf/gRPC API documentation will live here)</div>
}
