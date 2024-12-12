import { createLazyFileRoute } from '@tanstack/react-router'
import { ValidatorsPane } from '../ValidatorsPane'

export const Route = createLazyFileRoute('/validators')({
    component: Validators,
})

function Validators() {
    return <ValidatorsPane />

}
