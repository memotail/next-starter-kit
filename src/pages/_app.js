import * as React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'theming'
import { Provider } from 'react-redux'
import withReduxSaga from '@/redux/withReduxSaga'

import '@/theme/index.css'
import defaultTheme from '@/theme/default'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    const server = !!ctx.req
    const props = {
      server
    }

    if (Component.getInitialProps) {
      return {
        ...props,
        pageProps: {
          ...await Component.getInitialProps(ctx)
        }
      }
    }

    return props
  }

  render () {
    const {
      store,
      Component,
      pageProps
    } = this.props

    return (
      <Container>
        <ThemeProvider theme={defaultTheme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withReduxSaga(MyApp)
