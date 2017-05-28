import React from "react";
import {Route} from 'react-router-dom'
import Counter from './Counter'

export default class HelloPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {match} = this.props;
    return (
        <div>
          <p>Hello World</p>
          <Route path={`${match.url}/one`} component={Counter}/>
          <Route path={`${match.url}/two`}/>
        </div>
    )
  }
}