import React from 'react'

export default class Layout extends React.PureComponent {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
