import React from 'react'
import PropTypes from 'prop-types'

import { ChainData } from '../../../../chainstrap'
import { ARBITRATOR_ADDRESS } from '../../../../bootstrap/dapp-api'
import { dateToString } from '../../../../utils/date'
import LabelValueGroup from '../../../../components/label-value-group'
import * as chainViewConstants from '../../../../constants/chain-view'

import './ruling.css'

const Ruling = ({ date, votesForPartyA, votesForPartyB, netPNK }) => {
  const inProgress = date === null
  const won = netPNK >= 0
  return (
    <div className="Ruling">
      <small>
        {inProgress
          ? 'In Progress'
          : dateToString(date, { withTime: false, numericMonth: false })}
      </small>
      <h4>Ruling</h4>
      {!inProgress && (
        <div className="Ruling-outcome">
          <div
            className={`Ruling-outcome-party Ruling-outcome-party--${
              won ? 'positive' : 'negative'
            }`}
          >
            <h4 className="Ruling-outcome-netPNK-label">
              Party {votesForPartyA > votesForPartyB ? 'A' : 'B'} Wins
            </h4>
          </div>
          <div className="Ruling-outcome-netPNK">
            <h5 className="Ruling-outcome-netPNK-label">
              {won ? 'Received ' : 'Lost '}
            </h5>
            <h4 className="Ruling-outcome-netPNK-label">{netPNK} PNK</h4>
          </div>
        </div>
      )}
      <LabelValueGroup
        items={[
          { label: 'Votes for Party A', value: votesForPartyA },
          { label: 'Votes for Party B', value: votesForPartyB },
          {
            label: 'PNK Redistribution',
            value: (
              <span
                className={`Ruling-netPNK Ruling-netPNK--${
                  won ? 'positive' : 'negative'
                }`}
              >
                {won ? '+' : '-'}
                {netPNK}
              </span>
            )
          }
        ]}
      />
      <hr />
    </div>
  )
}

Ruling.propTypes = {
  // State
  date: PropTypes.instanceOf(Date),
  votesForPartyA: PropTypes.number.isRequired,
  votesForPartyB: PropTypes.number.isRequired,
  netPNK: PropTypes.number.isRequired
}

Ruling.defaultProps = {
  // State
  date: null
}

export default Ruling
