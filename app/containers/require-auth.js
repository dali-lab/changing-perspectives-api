import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent) {
  class RequireAuth extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => (
    { authenticated: state.auth.authenticated }
  );

  return connect(mapStateToProps, null)(RequireAuth);
}
