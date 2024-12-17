import { createLazyFileRoute } from '@tanstack/react-router'
import { DataTableDemo } from '../ValidatorsDataTable'

export const Route = createLazyFileRoute('/validators')({
    component: Validators,
})

function Validators() {
    // return <ValidatorsPane />
    return <DataTableDemo />
}
