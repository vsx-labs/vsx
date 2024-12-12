import { createLazyFileRoute } from '@tanstack/react-router'
import { EpochPane } from '../EpochPane'

export const Route = createLazyFileRoute('/epoch')({
    component: Epoch,
})

function Epoch() {
    return <EpochPane />
}
