import '../css/preview.css'

const Preview = ({ eventDetails }) => {
  return (
    <div className="preview-container">
      <h3 className="preview-header">{eventDetails.name || 'Event Name'}</h3>
      <p className="preview-duration">
        {eventDetails.duration ? `${eventDetails.duration} minutes` : 'Duration'}
      </p>
      <p className="preview-location">
        {eventDetails.location || 'Event Location'}
      </p>
      <p className="preview-description">
        {eventDetails.description || ''}
      </p>
    </div>
  )
}

export default Preview
