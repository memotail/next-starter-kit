import React from 'react'
import { connect } from 'react-redux'
import { withTheme } from 'theming'
import cls from 'classnames'

import Layout from '@/components/Layout'
import Typed from 'typed.js'
import { searchArea } from '@/redux/search/actions'

class Index extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      keyword: '',
      hasKeyword: false
    }
  }

  componentDidMount () {
    const options = {
      strings: ['广东', '深圳', '湖'],
      typeSpeed: 150,
      backSpeed: 70,
      loop: true
    }

    this.typed = new Typed(this.typedEl, options)
  }

  componentWillUnmount () {
    this.typed.destroy()
  }

  onFocus = () => {
    this.setState({
      hasKeyword: true
    })
  }

  onBlur = () => {
    this.setState({
      hasKeyword: !!this.state.keyword
    })
  }

  onChange = (e) => {
    const keyword = e.target.value.trim()

    this.props.dispatch(searchArea(keyword))

    this.setState({
      keyword
    })
  }

  render () {
    return (
      <Layout>
        <div className="root">
          <section className="logo">
            <img src={ require('@/static/logo.png') } />
            <h1>Memotail</h1>
          </section>

          <section className="search">
            <input
              value={ this.state.keyword }
              onChange={ this.onChange }
              onFocus={ this.onFocus }
              onBlur={ this.onBlur }
            />
            <div className={ cls({
              typed: true,
              'typed-hide': this.state.hasKeyword
            }) }>
              <span
                className="typed-inner"
                ref={(typed) => { this.typedEl = typed }}
              ></span>
            </div>
          </section>
        </div>

        <style jsx>{`
          .root {
            width: 480px;
            margin: 100px auto;
            text-align: center;
          }
          .logo {
            margin: 0 auto;
          }
          .logo img {
            width: 100px;
            height: 100px;
            border-radius: 100%;
          }
          .search {
            position: relative;
            margin: 30px auto;
          }
          .search input {
            display: block;
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            font-size: 24px;
            color: #4a4a4a;
            border-radius: 4px;
            border: none;
            outline: none;
            padding: 0 15px;
            font-weight: lighter;
            background: #fff;
            text-align: center;
            box-shadow: 2px 2px 4px 0 rgba(0,0,0,.12);
          }

          .typed {
            position: absolute;
            top: 0;
            left: 50%;
            height: 100%;
            line-height: 48px;
            transform: translateX(-50%);
          }
          .typed :global(.typed-cursor) {
            color: #999;
          }
          .typed-inner {
            color: #ccc;
            font-style: italic;
            font-size: 13px;
          }
          .typed-hide {
            visibility: hidden;
          }
        `}</style>
      </Layout>
    )
  }
}

export default withTheme(
  connect((state) => {
    return state.search
  })(Index)
)
// export default connect()(withTheme(Index))
