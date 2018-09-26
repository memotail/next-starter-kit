import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'theming'

class Layout extends React.PureComponent {
  render () {
    // const {
    //   theme
    // } = this.props

    return (
      <div className="layout">
        {this.props.children}
        <style jsx>{`
          .layout {
            display: flex;
          }
        `}</style>
      </div>
    )
  }
}

Layout.propTypes = {
  theme: PropTypes.object
}

export default withTheme(Layout)
