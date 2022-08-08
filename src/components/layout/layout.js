import { Header } from "../header/header"
import { Footer } from "../footer/footer"

export function Layout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}