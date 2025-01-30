import styled from "styled-components";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { throttle } from "lodash";

const Head = styled.div`
  position: ${(props) => (props.issticky === "true" ? "fixed" : "absolute")};
  top: ${(props) => {
    const isStory = props.story === "true";
    const isSticky = props.issticky === "true";
    if (isStory && isSticky) return "40px";
    if (isStory && !isSticky) return "0px";
    if (!isStory && !isSticky) return "80px";
    return "20px";
  }};
  z-index: 9;
  pointer-events: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  min-height: 10vh;
  color: #dfe1ec;
  width: 100%;
  font-size: 2rem;
  padding: 0 20px;
  background: transparent;
  transition: top 1s ease, position 0.3s ease;
  #change_page {
    font-size: 1.7rem;
  }
  span {
    color: #55534e;
  }
  .block {
    font-size: 1.7rem;
    margin-left: 10px;
    margin-top: 5px;
    img {
      width: 25px;
    }
  }
  #back {
    &:hover {
      color: #e4e4e4;
    }
    cursor: pointer;
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    justify-content: space-between;
    align-items: center;
    margin: 0 1%;
  }
`;

const Left = styled.div`
  padding: 20px 0;
  pointer-events: auto;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  pointer-events: auto;
  #my-tooltip {
    font-family: Montserrat;
    font-size: 1.2rem;
    color: #e4e4e4;
    padding: 5px 10px;
    background-color: #0f0f0f;
    border-radius: 5px;
  }
  button {
    margin: 0 10px;
    background: #fcc419;
    color: #000;
    border: 1px solid #fcc419;
    border-radius: 5px;
    min-width: 130px;
    font-family: Montserrat;
    font-size: 1.2rem;
    font-weight: 400;
    height: 25px;
    opacity: 1;
    text-align: center;
    cursor: pointer;
    z-index: 4;
    transition: ease-in 0.2s;
    a {
      font-family: Montserrat;
      color: #000;
    }
    &:hover {
      background-color: #dea702;
      border: 1px solid #dea702;
    }
  }
`;

const Navigation = (props) => {
  const { lesson, i_am_author, me } = props;
  const { t } = useTranslation("lesson");

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsSticky(window.scrollY > 120);
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Head
      issticky={isSticky ? "true" : undefined}
      story={props.story ? "true" : undefined}
    >
      <Left>
        {props.page !== "demo" && (
          <div className="block">
            <Link
              href={{
                pathname: "/course",
                query: {
                  id: props.coursePageId,
                },
              }}
            >
              <img
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Back to course page"
                src="/static/arrow_left.svg"
              />
            </Link>
          </div>
        )}
        {props.passMenuChange && (
          <div className="block">
            <img
              data-tooltip-id="my-tooltip"
              data-tooltip-content={t("lesson_menu")}
              src="/static/sidebar.svg"
              onClick={(e) => props.passMenuChange()}
            />
          </div>
        )}
      </Left>
      <Right>
        <div className="block">
          {props.page !== "simulator" &&
            me &&
            (lesson.user.id === me.id ||
              i_am_author ||
              me.permissions.includes("ADMIN")) && (
              <Link
                href={{
                  pathname: "/lesson",
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={"Open simulator page"}
                  src="/static/blocks.svg"
                />
              </Link>
            )}
        </div>
        <div className="block">
          {props.page !== "development" &&
            me &&
            (lesson?.user?.id === me.id ||
              i_am_author ||
              me.permissions.includes("ADMIN")) && (
              <Link
                href={{
                  pathname: "/dev",
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t("open_development_page")}
                  src="/static/change.svg"
                />
              </Link>
            )}
        </div>
        <div className="block">
          {props.page !== "analytics" &&
            me &&
            (lesson?.user?.id === me.id ||
              i_am_author ||
              me.permissions.includes("ADMIN")) && (
              <Link
                href={{
                  pathname: "/analytics",
                  query: {
                    id: lesson.id,
                  },
                }}
              >
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={"Open analytics page"}
                  src="/static/stats_circle.svg"
                />
              </Link>
            )}
        </div>
        <Tooltip id="my-tooltip" />
      </Right>
    </Head>
  );
};

export default Navigation;
