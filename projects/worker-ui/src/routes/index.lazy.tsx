import { createLazyFileRoute } from '@tanstack/react-router'
import { Scene } from '../ui/components/r3f-forcegraph'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                VSX Labs
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 pb-6 width-500" >
                VSX Labs aims to provide best-in-class Solana cluster data and analytics to empower your transaction decision making.
            </p>
            <Scene />
        </div>
    )
}
