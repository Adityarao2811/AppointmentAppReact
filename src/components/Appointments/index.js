// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem/index'

import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    initialAppointmentsListNoFilter: initialAppointmentsList,
    AppointmentsList: initialAppointmentsList,
    title: '',
    date: null,
    starred: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      initialAppointmentsListNoFilter: [
        ...prevState.initialAppointmentsListNoFilter,
        newAppointment,
      ],
      AppointmentsList: [...prevState.AppointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangedate = event => {
    const dateInput = event.target.value
    this.setState({
      date: dateInput,
    })
  }

  onChangetitle = event => {
    this.setState({title: event.target.value})
  }

  onStarred = () => {
    const {
      AppointmentsList,
      starred,
      initialAppointmentsListNoFilter,
    } = this.state
    const filteredUsersStarredData = AppointmentsList.filter(
      each => each.isFavorite === true,
    )
    if (starred === false) {
      this.setState({
        AppointmentsList: filteredUsersStarredData,
        starred: true,
      })
    } else {
      this.setState({
        AppointmentsList: initialAppointmentsListNoFilter,
        starred: false,
      })
    }
  }

  render() {
    const {title, date, AppointmentsList, starred} = this.state
    const starredStyle = starred ? 'selectedStarred' : 'notSelectedStarred'
    return (
      <div className="app-container">
        <div className="Appointments-container">
          <h1 className="app-heading">Add Appointment</h1>
          <p className="form-description">
            Say something about 4.0 technologies
          </p>
          <div className="Appointments-inputs">
            <form className="form" onSubmit={this.onAddAppointment}>
              <label htmlFor="titleInput">TITLE</label>
              <input
                id="titleInput"
                value={title}
                onChange={this.onChangetitle}
                className="title-input"
                placeholder="Your title"
              />
              <label htmlFor="dateInput">DATE</label>
              <input
                type="date"
                id="dateInput"
                className="date-input"
                value={date}
                onChange={this.onChangedate}
                placeholder="dd-mm-yyyy"
                name="date"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <h1>Appointments</h1>
          <button
            type="button"
            className={starredStyle}
            onClick={this.onStarred}
          >
            Starred
          </button>

          <ul className="Appointments-list">
            {AppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
