import React from "react";
import { initGA, logPageView } from "../utils/analytics";
import { YMInitializer } from "react-yandex-metrika";
import { setCookie } from "cookies-next";

export default class Layout extends React.Component {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    // console.log("window.lo", window.location.href);
    // let url = new URL(window.location.href);
    // let search_params = url.searchParams;

    // // get value of "id" parameter
    // // "100"
    // console.log(search_params.get("utm_source"));
    // setCookie("marketing_source", search_params.get("utm_source"));
  }
  render() {
    return (
      <div>
        <YMInitializer
          accounts={[85932800]}
          options={{ webvisor: true }}
          version="2"
        />
        {this.props.children}
      </div>
    );
  }
}
