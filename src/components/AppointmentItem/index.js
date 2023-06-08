import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {title, date, isFavorite, id} = appointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <p>{title}</p>
        <p>{formattedDate}</p>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <button
            className=""
            type="button"
            data-testid="star"
            onClick={onClickFavoriteIcon}
          >
            <img src={starImgUrl} alt="star" className="star" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
