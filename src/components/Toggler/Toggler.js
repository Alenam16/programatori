import "./Toggler.css"

function Toggler({ onChoose }) {
  const handleClick = (e) => {
    onChoose(e.target.name)
  }

  return (
    <div className="page-toggler">
      <button
        className="toggler-btn col"
        name="list-of-program"
        onClick={handleClick}
      >
        Seznam programátorů
      </button>
      <button className="toggler-btn col" name="tasks" onClick={handleClick}>
        Úkol
      </button>
    </div>
  )
}

export default Toggler
