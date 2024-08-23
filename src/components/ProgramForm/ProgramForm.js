import "./ProgramForm.css"

function ProgramForm({ data, valid, onChange, onAdd }) {
  return (
    <div className="program-form">
      <input
        type="text"
        placeholder="jméno programátora"
        name="name"
        onChange={onChange}
        value={data.name}
      />
      <input
        type="radio"
        name="JuniorSenior"
        id="exp-junior"
        onChange={onChange}
        value="Junior"
        checked={data.JuniorSenior === "Junior"}
      />
      <label htmlFor="exp-junior">Junior</label>
      <input
        type="radio"
        name="JuniorSenior"
        id="exp-senior"
        onChange={onChange}
        value="Senior"
        checked={data.JuniorSenior === "Senior"}
      />
      <label htmlFor="exp-senior">Senior</label>
      <button className="btn-pridat" disabled={!valid} onClick={onAdd}>
        Přidat
      </button>
    </div>
  )
}

export default ProgramForm
