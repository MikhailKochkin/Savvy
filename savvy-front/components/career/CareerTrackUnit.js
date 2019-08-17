import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Link from "next/link";

const Title = styled.div`
  font-size: 1.7rem;
`;

const Info = styled.div`
  border-bottom: 1px solid #edeef0;
  margin-bottom: 4%;
  padding-left: 3%;
`;

const Resources = styled.div`
  border-bottom: 1px solid #edeef0;
  padding-left: 3%;
  ul {
    margin: 0;
  }
`;

const Button = styled.div`
  background: none;
  text-align: center;
  padding-bottom: 10px;
  cursor: pointer;
  margin: 4% 0;
  border-bottom: ${props =>
    props.secret ? "1px solid #112a62" : "1px solid #edeef0"};
  &:hover {
    border-bottom: 1px solid #112a62;
    color: #112a62;
  }
`;

class CareerTrackUnit extends Component {
  state = {
    secret: false
  };
  show = () => {
    this.setState(prevState => ({
      secret: !prevState.secret
    }));
  };

  render() {
    const { unit, index } = this.props;
    return (
      <div>
        <Button onClick={this.show} secret={this.state.secret}>
          {index}. {unit.title}
        </Button>
        {this.state.secret && (
          <>
            <Info>
              <Title>Темы</Title>
              <ul>
                {unit.topics.map((topic, index) => (
                  <li>
                    {index + 1}. {topic}
                  </li>
                ))}
              </ul>
            </Info>
            <Info>
              <Title>Знания</Title>
              <ul>
                {unit.articles.map((article, index) => (
                  <li>
                    {index + 1}. {renderHTML(article)}
                  </li>
                ))}
              </ul>
            </Info>

            <Resources>
              <Title>Навыки</Title>
              <ul>
                {unit.coursePages.map((course, index) => (
                  <li>
                    <Link
                      href={{
                        pathname: "/coursePage",
                        query: { id: course.id }
                      }}
                    >
                      <a>
                        <div>
                          {index + 1}. {course.title}
                        </div>
                        <div>{course.user.name}</div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Resources>
          </>
        )}
      </div>
    );
  }
}

export default CareerTrackUnit;
