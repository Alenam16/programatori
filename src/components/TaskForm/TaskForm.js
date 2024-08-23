import "./TaskForm.css"

function TaskForm({ data, color, onChange }) {
  return (
    <div className="task-form">
      <legend className="legend">Počet řádků kódu:</legend>
      <input
        type="number"
        placeholder="Zadejte počet řádků kódu"
        name="rows"
        onChange={onChange}
        value={data.rows}
      />
      <br />
      <legend className="legend">Zadejte počet dnů:</legend>
      <input
        type="number"
        placeholder="Zadejte limit v počtu dnů"
        name="days"
        onChange={onChange}
        value={data.days}
      />
      <br />
      <button className={color}>Schválit</button>
    </div>
  )
}

export default TaskForm
