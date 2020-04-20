import React, { Component } from "react";
import Search from "./Search";
import Landing from "./Landing";
import Contact from "../Contact";
import Tech from "../Tech";
import Ad from "../Ad";
import Reviews from "./Reviews";
import Enrolled from "./Enrolled";
import User from "../User";

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Landing />
            <Search me={me} />
            {me && me.new_subjects.length > 0 && <Enrolled me={me} />}
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
