import React from "react";
import { initGA, logPageView } from "../../utils/analytics";
import { YMInitializer } from "react-yandex-metrika";
import { setCookie, getCookie } from "cookies-next";
import { GoogleAnalytics } from "@next/third-parties/google";

export default class Layout extends React.Component {
  componentDidMount() {
    // if (!window.GA_INITIALIZED) {
    //   initGA();
    //   window.GA_INITIALIZED = true;
    // }
    // logPageView();
    let url = new URL(window.location.href);
    let search_params;

    let old_cookie = getCookie("traffic_source");

    let should_change_cookie;

    // if (old_cookie == null) {
    //   should_change_cookie == true;
    // } else {
    //   should_change_cookie == false;
    // }

    if (url.searchParams) {
      search_params = url.searchParams;
    } else {
      search_params = null;
    }

    // console.log(search_params.get("utm_source"));
    // if (should_change_cookie) {
    setCookie("traffic_source", search_params.get("utm_source"));
    setCookie("traffic_medium", search_params.get("utm_medium"));
    setCookie("traffic_campaign", search_params.get("utm_campaign"));

    // }
  }
  render() {
    return (
      <div>
        <YMInitializer
          accounts={[85932800]}
          options={{ webvisor: true }}
          version="2"
        />
        <GoogleAnalytics gaId="G-YH6N45QPFR" />
        {this.props.children}
      </div>
    );
  }
}
