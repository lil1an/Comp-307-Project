// Lilan Forsyth
import '../css/save-cancel-buttons.css'

const SaveCancelButtons = ({ onSave, onCancel }) => {
  return (
    <div className="button-group">
      <button className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
      <button className="save-button" onClick={onSave}>
        Save
      </button>
    </div>
  )
}

export default SaveCancelButtons
