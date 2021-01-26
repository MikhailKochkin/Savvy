import React from "react";
import { initGA, logPageView } from "../utils/analytics";
import { YMInitializer } from "react-yandex-metrika";

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div>
        <YMInitializer
          accounts={[52361302]}
          options={{ webvisor: true }}
          version="2"
        />
        {this.props.children}
      </div>
    );
  }
}
