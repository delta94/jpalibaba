import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { roleSelector, tokenSelector } from "selectors/authentication";

function RouteWithAuth({ path, component, token }) {
  if (!token) return null;
  return <Route path={path} component={component} />;
}

const mapStateToProps = state => ({
  role: roleSelector(state),
  token: tokenSelector(state)
});

export default connect(
  mapStateToProps,
  null
)(RouteWithAuth);
