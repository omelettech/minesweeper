import './App.css';
import Minesweeper from "./components/Minesweeper/Minesweeper.tsx";

function App() {
    return (
        <div className="App">
            <h1>Minesweeper</h1>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                <Minesweeper></Minesweeper>
            </div>
        </div>
    );
}

export default App;
