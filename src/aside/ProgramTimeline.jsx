
import './styles/programTimeline.css';

export const ProgramTimeline = ({ title, body, img }) => {
  return (
    <div className="programTimeline">
      <div className="entry-img" style={{ backgroundImage: `url(${img})` }}></div>
      <div className="entry-title">
        <span>{title}</span>
      </div>
      <div className="entry-body">
        <p>{body}</p>
      </div>
    </div>  
  )
}
