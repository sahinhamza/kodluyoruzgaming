import { Layout } from "../layout/layout"
import { Routes, Route } from "react-router-dom"
import { Home } from "../home/home"
import { About } from "../about/about"
import { Contact } from "../contact/contact"
import { Tictactoe } from "../tictactoe/tictactoe"
import { Simon } from "../simon/simon"
import { Memorygame } from "../memorygame/memorygame"
import { Nomatch } from "../nomatch/nomatch"
import { MineSweeper } from "../minesweeper/minesweeper"


export function Main() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='about' element={<About />}></Route>
                    <Route path='contact' element={<Contact />}></Route>
                    <Route path='tictactoe' element={<Tictactoe />}></Route>
                    <Route path='simon' element={<Simon />}></Route>
                    <Route path="memorygame" element={<Memorygame />}></Route>
                    <Route path="minesweeper" element={<MineSweeper />}></Route>
                    <Route path='*' element={<Nomatch />}></Route>
                </Routes>
            </Layout>
        </>
    )
}