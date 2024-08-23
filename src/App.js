import { useEffect, useState } from "react"
// import "./App.css"
import programatori from "./programatori.json"
import PageContainer from "./components/PageContainer/PageContainer"
import ProgramList from "./components/ProgramList/ProgramList"
import ProgramForm from "./components/ProgramForm/ProgramForm"
import Toggler from "./components/Toggler/Toggler"
import TaskForm from "./components/TaskForm/TaskForm"

function App() {
  const [listOfProgram, setListOfProgram] = useState(programatori.programatori)
  const [valid, setValid] = useState(false)
  const [newProgram, setNewProgram] = useState({
    id:
      listOfProgram.length > 0
        ? Math.max(...listOfProgram.map((programatori) => programatori.id)) + 1
        : 1,
    name: "",
    JuniorSenior: "",
  })

  const [rowsOfCode, setRowsOfCode] = useState(0)
  const [color, setColor] = useState("red")
  const [rowsOfCodeRequest, setRowsOfCodeRequest] = useState({
    rows: 0,
    days: 0,
  })

  const validateData = (programatori) => {
    console.log(programatori.JuniorSenior)
    if (
      programatori.name.trim().length === 0 ||
      programatori.name === "" ||
      programatori.JuniorSenior === "" ||
      programatori.JuniorSenior === undefined
    ) {
      setValid(false)
    } else setValid(true)
  }

  const [activeTab, setActiveTab] = useState(1)

  const handleChange = (e) => {
    const source = e.target.name
    let updatedProgram = {
      id: 0,
      name: "",
      JuniorSenior: "",
    }

    let rowsPerDay = {
      rows: 0,
      days: 0,
    }

    switch (source) {
      case "name": {
        updatedProgram = { ...newProgram, name: e.target.value }
        break
      }
      case "JuniorSenior": {
        updatedProgram = { ...newProgram, JuniorSenior: e.target.value }
        break
      }
      case "rows": {
        rowsPerDay = { ...rowsOfCodeRequest, rows: e.target.value }
        setRowsOfCodeRequest(rowsPerDay)
        break
      }
      case "days": {
        rowsPerDay = { ...rowsOfCodeRequest, days: e.target.value }
        setRowsOfCodeRequest(rowsPerDay)
        break
      }
      default:
        break
    }
    setNewProgram(updatedProgram)
    validateData(updatedProgram)
  }

  const handleAdd = () => {
    setListOfProgram((listOfProgram) => {
      return [...listOfProgram, newProgram]
    })
    const updateProgram = {
      id: newProgram.id + 1,
      name: "",
      SeniorJunior: "",
    }
    setNewProgram(updateProgram)
    validateData(updateProgram)
  }
  const handleDelete = (idToDel) => {
    const temp = listOfProgram.filter(
      (programatori) => programatori.id !== idToDel
    )
    setListOfProgram(temp)
  }

  const handleChoose = (name) => {
    switch (name) {
      case "list-of-program": {
        setActiveTab(1)
        break
      }
      case "tasks": {
        setActiveTab(2)
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    let rows = 0
    listOfProgram.map((programatori) => {
      rows += programatori.JuniorSenior === "Junior" ? 100 : 200
    })
    setRowsOfCode(rows)

    return () => setRowsOfCode(0)
  }, [listOfProgram])

  useEffect(() => {
    if (rowsOfCode >= rowsOfCodeRequest.rows / rowsOfCodeRequest.days)
      setColor("green")
    else setColor("red")

    return () => setColor("")
  })

  return (
    <PageContainer className="vw-100 vh-100">
      <div className="container-fluid">
        <div className="row-2">
          <div className="col-12">
            <h1 className="headline">Programátoři</h1>
            <Toggler onChoose={handleChoose} active={activeTab} />
            {activeTab === 1 && (
              <>
                <h3 className="ukol">Seznam programátorů:</h3>
                <ProgramList data={listOfProgram} onDelete={handleDelete} />
                <ProgramForm
                  data={newProgram}
                  valid={valid}
                  onChange={handleChange}
                  onAdd={handleAdd}
                />
              </>
            )}
            {activeTab === 2 && (
              <>
                <h3 className="ukol">Úkol:</h3>
                <TaskForm
                  data={rowsOfCodeRequest}
                  color={color}
                  onChange={handleChange}
                ></TaskForm>
              </>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default App
