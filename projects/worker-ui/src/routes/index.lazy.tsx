import { createLazyFileRoute } from '@tanstack/react-router'
import { Scene } from '../ui/components/r3f-forcegraph'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <Scene />
        </div>
    )
}
