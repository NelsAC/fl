import './styles/progress.css';
import { Tooltip } from './Tooltip';

export const Porgress = () => {
  return (
    <div className="progress__container">
        <div className="progress__advance">
            29%
        </div>
        <div className="progress__figure">
            <div className="progress__figure--intern">
                <div className="progress__intern--perc">
                </div>
            </div>
        </div>
        <Tooltip />
    </div>
  )
}
