import { headers } from "next/headers"
import Header from "./header"
import { tt } from "./api"


export default function Layout({ children }: { children: React.ReactNode }) {
    const headersList = tt()
    console.log('headersList', headersList)
    return <div className="mx-auto max-w-700">
        <Header />
        {children}
    </div>
}