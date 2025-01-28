import './App.css';
import Minesweeper from "./components/Minesweeper/Minesweeper.tsx";
import { Analytics } from "@vercel/analytics/react"

function App() {
    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                <Minesweeper></Minesweeper>
                <Analytics></Analytics>
            </div>

        </div>
    );
}

export default App;
