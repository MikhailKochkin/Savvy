import React, { Component } from "react";
import Search from "./Search";
import Landing from "./Landing";
import Contact from "../Contact";
import Tech from "../Tech";
import Ad from "../Ad";
import Reviews from "./Reviews";
import User from "../User";

class Courses extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Landing />
            <Search me={me} />
            <Reviews />
            <Tech />
            <Contact />
            <Ad />
          </>
        )}
      </User>
    );
  }
}

export default Courses;
