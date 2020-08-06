import React, { Component } from "react";
import dynamic from "next/dynamic";
import Search from "./Search";
import Landing from "./Landing";
import Contact from "../Contact";
import Tech from "../Tech";
import Ad from "../Ad";
import Reviews from "./Reviews";
import Media from "./Media";
import Enrolled from "./Enrolled";
import User from "../User";

const DynamicMedia = dynamic(import("./Media"), {
  ssr: false,
});

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Landing />
            <Search me={me} />
            <Media />
            {/* {me && me.new_subjects.length > 0 && <Enrolled me={me} />} */}
            <Reviews />
            <Tech />
            <Contact />
            {/* <Ad /> */}
          </>
        )}
      </User>
    );
  }
}

export default Courses;
