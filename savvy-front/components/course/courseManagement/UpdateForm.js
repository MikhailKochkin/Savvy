import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import DeleteSingleCoursePage from "./DeleteSingleCoursePage";
import {
  Row,
  ActionButton,
  SecondaryButton,
  MicroButton,
  Buttons,
} from "../../lesson/styles/DevPageStyles";

const UPDATE_COURSEPAGE_MUTATION = gql`
  mutation UPDATE_COURSEPAGE_MUTATION(
    $id: String!
    $title: String
    $news: String
    $description: String
    $audience: String
    $result: String
    $tariffs: String
    $methods: String
    $nextStart: DateTime
    $price: Int
    $prices: Prices
    $modules: Modules
    $discountPrice: Int
    $goals: [String]
    $header: [String]
    $subheader: [String]
    $image: String
    $video: String # $banner: String
    $reviews: ReviewsList
  ) {
    updateCoursePage(
      id: $id
      news: $news
      title: $title
      description: $description
      audience: $audience
      result: $result
      tariffs: $tariffs
      methods: $methods
      discountPrice: $discountPrice
      nextStart: $nextStart
      price: $price
      prices: $prices
      modules: $modules
      goals: $goals
      header: $header
      subheader: $subheader
      image: $image
      video: $video #   banner: $banner
      reviews: $reviews
    ) {
      id
      title
      description
      image
    }
  }
`;

const ADD_USER_TO_COURSE_MUTATION = gql`
  mutation ADD_USER_TO_COURSE_MUTATION($email: String!, $coursePageId: String) {
    addUserToCourse(email: $email, coursePageId: $coursePageId) {
      id
    }
  }
`;

const ADD_COAUTHOR_MUTATION = gql`
  mutation ADD_COAUTHOR_MUTATION($email: String!, $coursePageId: String) {
    addCoAuthor(email: $email, coursePageId: $coursePageId) {
      id
    }
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 2% 2% 0 2%;
  margin: 0 auto;
  font-size: 1.6rem;
  border-radius: 10px;
  margin: 2% 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;

  select {
    width: 30%;
    font-size: 1.6rem;
  }
  input {
    height: 60%;
    width: 100%;
    margin-bottom: 5px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  textarea {
    height: 300px;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e5e5;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
    font-family: Montserrat;
  }
  .upload {
    border: 1px dashed #e5e5e5;
    padding: 1% 2%;
    border-radius: 3.5px;
    cursor: pointer;
    &:hover {
      border: 1px dashed #112a62;
    }
  }
  .open_landing {
    cursor: pointer;
    font-weight: bold;
    color: #112a62;
  }
`;

const Title = styled.div`
  margin: 25px 0;
  font-size: 2.2rem;
  font-weight: 600;
`;

const Img = styled.img`
  height: 200px;
  object-fit: cover;
  margin: 3% 0;
`;

const Frame = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin: 0.8%;
    margin-left: 0.6%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateForm = (props) => {
  const [upload, setUpload] = useState(false);
  const [bannerUpload, setBannerUpload] = useState(false);
  const [image, setImage] = useState(props.coursePage.image);
  const [title, setTitle] = useState(props.coursePage.title);
  const [description, setDescription] = useState(props.coursePage.description);
  const [banner, setBanner] = useState(props.coursePage.banner);
  const [audience, setAudience] = useState(props.coursePage.audience);
  const [result, setResult] = useState(props.coursePage.result);
  const [tariffs, setTariffs] = useState(props.coursePage.tariffs);
  const [methods, setMethods] = useState(props.coursePage.methods);
  const [video, setVideo] = useState(props.coursePage.video);
  const [price, setPrice] = useState(props.coursePage.price);
  const [prices, setPrices] = useState(
    props.coursePage.prices ? [...props.coursePage.prices.prices] : []
  );
  const [discountPrice, setDiscountPrice] = useState(
    props.coursePage.discountPrice
  );
  const [modules, setModules] = useState(
    props.coursePage.modules && props.coursePage.modules.modules
      ? props.coursePage.modules.modules
      : []
  );
  const [availableLessons, setAvailableLessons] = useState(
    props.coursePage.lessons
  );
  const [chosenLesson, setChosenLesson] = useState();
  const [email, setEmail] = useState("");

  const [news, setNews] = useState(props.coursePage.news);
  const [goals, setGoals] = useState(
    props.coursePage.goals.length > 0 ? props.coursePage.goals : [""]
  );
  const [header, setHeader] = useState(
    props.coursePage.header.length > 0 ? props.coursePage.header : [""]
  );
  const [subheader, setSubheader] = useState(
    props.coursePage.subheader.length > 0 ? props.coursePage.subheader : [""]
  );
  const [reviews, setReviews] = useState(
    props.coursePage.reviews ? props.coursePage.reviews.reviews : []
  );
  const [startDate, setStartDate] = useState(props.coursePage.nextStart);

  const [updateCoursePage, { data, loading }] = useMutation(
    UPDATE_COURSEPAGE_MUTATION
  );

  const [addUserToCourse] = useMutation(ADD_USER_TO_COURSE_MUTATION);
  const [addCoAuthor] = useMutation(ADD_COAUTHOR_MUTATION);

  const { t } = useTranslation("coursePage");

  const uploadFile = async (e) => {
    setUpload(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setUpload(false);
  };

  const addReview = () => {
    setReviews([...reviews, { name: "", text: "", source: "" }]);
  };

  const updateReview = (index, name, text, source, image) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { name, text, source, image };
    setReviews(updatedReviews);
  };

  const removeReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  const myCallbackGoal = (res, name, i) => {
    let new_goals = [...goals];
    new_goals[i] = res;
    setGoals([...new_goals]);
  };

  const myCallbackHeader = (res, name, i) => {
    let new_g = [...header];
    new_g[i] = res;
    setHeader([...new_g]);
  };

  const myCallbackSubheader = (res, name, i) => {
    let new_g = [...subheader];
    new_g[i] = res;
    setSubheader([...new_g]);
  };

  const myCallback = (dataFromChild, name) => {
    let st = name;
    if (st === "audience") {
      setAudience(dataFromChild);
    } else if (st === "methods") {
      setMethods(dataFromChild);
    } else if (st === "result") {
      setResult(dataFromChild);
    } else if (st === "tariffs") {
      setTariffs(dataFromChild);
    }
  };
  const { coursePage, me } = props;
  return (
    <Form>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <Row>
        <div className="description">Description</div>
        <div className="action_area">
          <input
            type="text"
            id="description"
            name="description"
            required
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">
          {" "}
          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              alert("Added");
              return addUserToCourse({
                variables: {
                  coursePageId: props.coursePage.id,
                  email,
                },
              });
            }}
          >
            Add student{" "}
          </SecondaryButton>
        </div>
        <div className="action_area">
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>
      </Row>
      <Row>
        <div className="description">
          {" "}
          <SecondaryButton
            onClick={async (e) => {
              e.preventDefault();
              await addCoAuthor({
                variables: {
                  coursePageId: props.coursePage.id,
                  email,
                },
              });
              alert("Added");
            }}
          >
            Add Author{" "}
          </SecondaryButton>
        </div>
        <div className="action_area">
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>
      </Row>
      <Row>
        <div className="description">Course Image</div>

        <div className="action_area">
          <input
            // style={{ display: "none" }}
            className="second"
            type="file"
            id="file"
            name="file"
            onChange={uploadFile}
          />{" "}
        </div>
      </Row>
      {upload && t("uploading")}
      {image && (
        <Img src={image ? image : coursePage.image} alt="Upload Preview" />
      )}

      <Title>Landing Page information</Title>
      <Row>
        <div className="description">Header</div>
        <div className="action_area">
          {header.map((g, i) => (
            <input
              index={i}
              name="goal"
              onChange={(e) =>
                myCallbackHeader(e.target.value, e.target.name, parseInt(i))
              }
              defaultValue={g}
            />
          ))}
        </div>
      </Row>
      <Row>
        <div className="description">Subheader</div>
        <div className="action_area">
          {subheader.map((g, i) => (
            <>
              <Frame>
                <DynamicLoadedEditor
                  index={i}
                  name="goal"
                  getEditorText={myCallbackSubheader}
                  value={g}
                />
              </Frame>
            </>
          ))}
        </div>
      </Row>
      <Row>
        <div className="description">Before / After</div>
        <div className="action_area">
          {goals.map((g, i) => (
            <textarea
              value={g}
              onChange={(e) => myCallbackGoal(e.target.value, "goal", i)}
            />
          ))}
        </div>
      </Row>
      <Buttons>
        <MicroButton
          onClick={(e) => {
            e.preventDefault();
            let new_goals = [...goals];
            new_goals.pop();
            setGoals([...new_goals]);
          }}
        >
          -1
        </MicroButton>
        <MicroButton
          onClick={(e) => {
            setGoals([...goals, ""]);
            e.preventDefault();
          }}
        >
          +1
        </MicroButton>
      </Buttons>
      <Row>
        <div className="description">Course Video</div>
        <div className="action_area">
          <input
            className="second"
            type="text"
            id="video"
            name="video"
            required
            defaultValue={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Course News</div>
        <div className="action_area">
          <textarea
            type="text"
            id="news"
            name="news"
            defaultValue={news}
            onChange={(e) => setNews(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Course Format</div>
        <div className="action_area">
          <textarea
            value={methods}
            onChange={(e) => setMethods(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Course Target Audience</div>
        <div className="action_area">
          <textarea
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Expected Results</div>
        <div className="action_area">
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div className="description">
          <DeleteSingleCoursePage coursePageId={props.coursePage.id} />
        </div>
        <div className="action_area">
          Danger zone. Avoid deleting the simulator unless you are 100% sure.
        </div>
      </Row>
      {/* <Explainer>Reviews</Explainer>
        {reviews.map((review, index) => (
          <div key={index}>
            <input
              value={review.name}
              onChange={(e) =>
                updateReview(
                  index,
                  e.target.value,
                  review.text,
                  review.source,
                  review.image
                )
              }
              placeholder="Reviewer Name"
            />
            <input
              value={review.text}
              onChange={(e) =>
                updateReview(
                  index,
                  review.name,
                  e.target.value,
                  review.source,
                  review.image
                )
              }
              placeholder="Review Text"
            />
            <input
              value={review.source}
              onChange={(e) =>
                updateReview(
                  index,
                  review.name,
                  review.text,
                  e.target.value,
                  review.image
                )
              }
              placeholder="Review Source"
            />
            <input
              value={review.image}
              onChange={(e) => {
                updateReview(
                  index,
                  review.name,
                  review.text,
                  review.source,
                  e.target.value
                );
              }}
              placeholder="Image URL"
            />
            <button onClick={() => removeReview(index)}>Remove</button>
          </div>
        ))} 
        <Button onClick={addReview}>+ Add Review</Button>*/}
      <Buttons>
        <ActionButton
          onClick={(e) => {
            e.preventDefault();
            return updateCoursePage({
              variables: {
                id: props.coursePage.id,
                prices: { prices: prices },
                modules: { modules: modules },
                title,
                news,
                description: description,
                audience,
                goals,
                price,
                discountPrice,
                header,
                nextStart: startDate,
                subheader,
                result,
                tariffs,
                methods,
                image,
                video,
                reviews: { reviews },
              },
            });
          }}
        >
          {loading ? "..." : "Update"}
        </ActionButton>
      </Buttons>
    </Form>
  );
};

export default UpdateForm;
