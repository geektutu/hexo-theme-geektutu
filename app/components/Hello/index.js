import React from "react";
import {Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

export default class HelloPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {match, route} = this.props;
    return (
        <div>
          <h2>Links</h2>
          <ul>
            <li>
              <Link to={`${match.url}/three`}>
                Hello
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/four`}>
                Counter
              </Link>
            </li>
          </ul>
          {renderRoutes(route.routes)}
        </div>
    )
  }
}