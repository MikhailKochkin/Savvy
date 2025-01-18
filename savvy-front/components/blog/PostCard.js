import styled from "styled-components";
import Link from "next/link";
import dayjs from "dayjs";

const Styles = styled.div`
  width: 46%;
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  @media (max-width: 900px) {
    width: 100%;
  }
  .image-container {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    height: 350px;
  }
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
  .text-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 25px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100px;
  }

  .text-overlay p {
    margin: 0;
  }
  .title {
    font-size: 2.2rem;
    font-weight: 600;
    line-height: 1.4;
    text-align: left;
    width: 100%;
    margin-bottom: 0px;
    margin-top: 30px;
    cursor: pointer;
    a {
      cursor: pointer;
      transition: 0.15s ease-in;

      &:hover {
        color: #4679d8;
      }
    }
  }
  .description {
    text-align: left;
    width: 90%;
    margin: 10px 0;
    color: #6b7280;
    line-height: 1.7;
    cursor: pointer;
  }
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.7rem;
    margin-top: 20px;
    color: #252f3f;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50px;
      margin-right: 20px;
    }
  }
  .read_post {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    button {
      background: none;
      color: #6b7280;
      font-size: 1.7rem;
      font-weight: 600;
      padding: 0;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      font-family: Montserrat;
    }
  }
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const PostCard = (props) => {
  const { author, id, title, summary, image, createdAt, tags } = props;
  return (
    <Styles>
      <div>
        <div class="image-container">
          <img src={image} alt="Example Image" class="background-image" />
          <div class="text-overlay">
            <div>
              {" "}
              <p>
                {author.name} {author.surname}
              </p>
              <p>{dayjs(createdAt).format("DD MMM YYYY")}</p>
            </div>
            <div>
              {" "}
              <p>{tags.join(", ")}</p>
            </div>
          </div>
        </div>

        <h2 className="title">
          <Link
            legacyBehavior
            href={{
              pathname: "/post",
              query: {
                id: id,
              },
            }}
          >
            <a>{title}</a>
          </Link>
        </h2>
        <Link
          legacyBehavior
          href={{
            pathname: "/post",
            query: {
              id: id,
            },
          }}
        >
          <div className="description">{summary}</div>
        </Link>
      </div>
      <div className="read_post">
        <button>
          <Link
            legacyBehavior
            href={{
              pathname: "/post",
              query: {
                id: id,
              },
            }}
          >
            Read post ↗
          </Link>
        </button>
      </div>
    </Styles>
  );
};

export default PostCard;
