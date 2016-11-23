import React, {Component} from 'react'
import './assets/index.less'

export default class App extends Component {
  render() {
    return <div>
      <h1>Hello
        <span className="highLight"> {this.props.name}</span>
        </h1>
      <img src={require('./assets/images/ffan.jpg')} alt="飞凡"/>
    </div>
  }
}
