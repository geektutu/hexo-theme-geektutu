import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment, decrement} from '../actions'
import {bindActionCreators} from 'redux';

const Counter = ({count, actions}) => (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={actions.increment}>增加一个~</button>
      <button onClick={actions.decrement}>减少一个~</button>
    </div>
)

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {count: state.count}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      increment: increment,
      decrement: decrement
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)