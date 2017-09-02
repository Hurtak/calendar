import React from 'react'
import propTypes from 'prop-types'
import './year-progress.css'

export default class YearProgress extends React.Component {
  static propTypes = {
    decimalPlaces: propTypes.number.isRequired
  }

  render () {
    const progress = getYearProgress(this.props.time)

    return (
      <div className='YearProgress'>
        <div
          className='YearProgress-bar'
          style={{
            width: progress * 100 + '%'
          }}
        />
        <p className='YearProgress-text'>
          {(progress * 100).toFixed(this.props.decimalPlaces)}%
        </p>
      </div>
    )
  }
}

export function getYearProgress (timestamp) {
  const now = new Date(timestamp)
  const year = now.getFullYear()
  const tsNow = now.getTime()
  const tsYearStart = new Date(year, 0, 1, 0, 0, 0, 0).getTime()
  const tsYearEnd = new Date(year + 1, 0).getTime() - 1000

  return (tsNow - tsYearStart) / (tsYearEnd - tsYearStart)
}
