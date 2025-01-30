import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  ActionButton,
  Row,
  Frame,
  MicroButton,
} from "../lesson/styles/DevPageStyles";
import { course_tags } from "../../config";

const SUBSCRIPTION_QUERY = gql`
  query SUBSCRIPTION_QUERY($userId: String!) {
    subscriptionsByUser(userId: $userId) {
      id
      isActive
      type
      term
      userId
      createdAt
    }
  }
`;

const ACTIVE_COURSES_QUERY = gql`
  query ACTIVE_COURSES_QUERY {
    coursePages(published: true, courseType: "FORMONEY") {
      id
      title
      tags
    }
  }
`;

const UPDATE_SUBSCRIPTION_MUTATION = gql`
  mutation UPDATE_SUBSCRIPTION_MUTATION(
    $id: String!
    $isActive: Boolean
    $type: String
    $term: String
  ) {
    updateSubscription(id: $id, isActive: $isActive, type: $type, term: $term) {
      id
      isActive
      type
      term
    }
  }
`;

const ENROLL_COURSE_MUTATION = gql`
  mutation ENROLL_COURSE_MUTATION($id: String!, $coursePageId: String) {
    enrollOnCourse(id: $id, coursePageId: $coursePageId) {
      id
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 50%;
  margin: 0 auto;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex: 85%;
  padding: 0;
  flex-direction: column;
  border: 1px solid #edefed;
  border-radius: 5px;
  input {
    height: 40px;
    width: 90%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 1%;
    margin-top: 10px;
    font-size: 1.4rem;
    outline: 0;
  }
  select {
    width: 90%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    font-family: Montserrat;
    padding: 0.6em 1.4em 0.5em 0.8em;
    max-width: 100%;
    box-sizing: border-box;
    margin-bottom: 0.5%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .checked {
    height: 20%;
    width: 30%;
    border: none;
    box-shadow: none;
  }
  .Title {
    background: #edefed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding-left: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 2%;
  }
`;

const Comment = styled.div`
  font-size: 1.4rem;
  color: #767676;
  margin-top: 1%;
  line-height: 1.2;
  width: 90%;
  margin-bottom: 2%;
  span {
    color: black;
  }
  a {
    color: #767676;
    border-bottom: 1px solid #767676;
    cursor: pointer;
  }
`;

const Container = styled.div`
  padding: 10px;
  .explainer_text {
    line-height: 1.4;
    font-size: 1.4rem;
  }
  .miniblock {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .main {
      margin-right: 10px;
      border: 1px solid lightgrey;
      width: 85%;
    }
    .second {
      width: 15%;
      border: 1px solid lightgrey;
    }
  }
`;
const Message = styled.div`
  background: #def2d6;
  color: #5a7052;
  font-size: 1.3rem;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px 0;
`;

const Account = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("regular");
  const [subscriptionLength, setSubscriptionLength] = useState("monthly");
  const [isSpecialOfferShown, setIsSpecialOfferShown] = useState(false);
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);
  const [newSubscribedCourses, setNewSubscribedCourses] = useState([]);
  const router = useRouter();
  const { t } = useTranslation("account");

  const {
    data: subsData,
    loading: loadingSubscriptions,
    error: errorSubscriptions,
  } = useQuery(SUBSCRIPTION_QUERY, {
    variables: {
      userId: props.me.id,
    },
  });

  const {
    loading: loading5,
    error: error5,
    data: data5,
  } = useQuery(ACTIVE_COURSES_QUERY);

  const subscription = subsData?.subscriptionsByUser[0] || null;
  const available_courses = data5?.coursePages || []; // Available courses

  useEffect(() => {
    if (
      subsData?.subscriptionsByUser &&
      subsData?.subscriptionsByUser.length > 0
    ) {
      const subscription = subsData.subscriptionsByUser[0];
      setIsActive(subscription?.isActive || false);
      setSubscriptionType(subscription?.type || "regular");
      setSubscriptionLength(subscription?.term || "monthly");
    }
  }, [subsData]);

  const [updateSubscription, { error: subscriptionError }] = useMutation(
    UPDATE_SUBSCRIPTION_MUTATION
  );

  const [
    enrollOnCourse,
    { data: enroll_data, loading: enroll_loading, error: enroll_error },
  ] = useMutation(ENROLL_COURSE_MUTATION);

  if (errorSubscriptions) return <p>Error: {errorSubscriptions.message}</p>;
  if (loadingSubscriptions) return <p>Loading...</p>;

  const handleUpdateSubscription = async (e) => {
    e.preventDefault();
    if (
      subsData?.subscriptionsByUser &&
      subsData?.subscriptionsByUser.length > 0 &&
      subsData?.subscriptionsByUser[0]?.id
    ) {
      await updateSubscription({
        variables: {
          id: subsData.subscriptionsByUser[0].id,
          isActive: isActive,
          type: subscriptionType,
          term: subscriptionLength,
        },
      });
      alert("Subscription updated");
      window.location.reload(); // Reloads the page
    } else {
      router.push("/subscription", {
        locale: "ru",
      });
    }
  };

  const calculateAvailableCourses = (subscription) => {
    const { createdAt, type, isActive, term } = subscription;

    // If the subscription is inactive, return 0
    if (!isActive) {
      return {
        months: 0,
        availableCoursesNum: 0,
      };
    }

    // Parse createdAt and calculate the difference
    const start = new Date(createdAt);
    const today = new Date();

    // Calculate year and month difference
    let monthsElapsed =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());

    // Account for partial months
    if (today.getDate() >= start.getDate()) {
      monthsElapsed += 1;
    }

    // If term is annually or biannually, set availableCoursesNum to 40
    if (term === "annually" || term === "biannually") {
      return {
        months: monthsElapsed,
        availableCoursesNum: 40,
      };
    }

    // Determine multiplier based on type
    const multiplier = type === "mini" ? 1 : type === "regular" ? 3 : 0;

    return {
      months: monthsElapsed,
      availableCoursesNum: monthsElapsed * multiplier,
    };
  };

  const groupCoursesByTags = (courses, allowedTags) => {
    const grouped = { other: [] }; // "other" group for unmatched courses
    const tagSet = new Set(allowedTags);
    const assignedCourses = new Set(); // Track assigned courses

    courses.forEach((course) => {
      if (
        !course.tags ||
        !Array.isArray(course.tags) ||
        course.tags.length === 0
      ) {
        grouped.other.push(course); // No tags at all? Add to "other"
        return;
      }

      // Find the first tag that is in the allowedTags list
      const firstValidTag = course.tags.find((tag) => tagSet.has(tag));

      if (firstValidTag && !assignedCourses.has(course.id)) {
        if (!grouped[firstValidTag]) {
          grouped[firstValidTag] = [];
        }
        grouped[firstValidTag].push(course);
        assignedCourses.add(course.id); // Mark as assigned
      } else if (!firstValidTag && !assignedCourses.has(course.id)) {
        grouped.other.push(course); // No valid tag? Add to "other"
        assignedCourses.add(course.id);
      }
    });

    return grouped;
  };

  const { me } = props;

  return (
    <Form>
      <Fieldset>
        <div className="Title">{t("subscription_settings")}</div>
        <Container>
          {subscription ? (
            <>
              <Row>
                <div className="description">Available courses: </div>
                <div className="action_area">
                  <div className="element_info">
                    {
                      calculateAvailableCourses(subscription)
                        ?.availableCoursesNum
                    }
                  </div>
                </div>
              </Row>
              <Row>
                <div className="description">Enrolled courses: </div>
                <div className="action_area">
                  {" "}
                  <div className="element_info">
                    {me.new_subjects.length}{" "}
                  </div>{" "}
                </div>
              </Row>
            </>
          ) : null}
          <Row>
            <div className="description">{t("isActive")}</div>
            <div className="action_area">
              <select
                value={isActive}
                onChange={(e) => {
                  if (isSpecialOfferShown) {
                    setIsActive(e.target.value === "true" ? true : false);
                  }
                  if (e.target.value !== "true") {
                    setIsSpecialOfferShown(true);
                    setSubscriptionType("special");
                  }
                }}
              >
                <option value={true}>{t("active")}</option>
                <option value={false}>{t("inactive")}</option>
              </select>
              {isSpecialOfferShown ? (
                <Message>
                  Продлите подписку на специальных условиях.
                  <br /> Всего за 990 рублей сохраните доступ ко всем курсам еще
                  на 1 месяц.
                  <br />
                  Нажмите на кнопку ниже, чтобы воспользоваться специальным
                  предложением.
                </Message>
              ) : null}
            </div>
          </Row>
          <Row>
            <div className="description">{t("choose_subscription_type")}</div>
            <div className="action_area">
              <select
                value={subscriptionType}
                onChange={(e) => setSubscriptionType(e.target.value)}
              >
                <option value="mini">{t("mini")}</option>
                <option value="regular">{t("regular")}</option>
                <option value="team">{t("team")}</option>
                <option value="special">Специальный тариф – 990 / мес</option>
              </select>
            </div>
          </Row>
          <Row>
            <div className="description">{t("choose_subscription_length")}</div>
            <div className="action_area">
              <select
                value={subscriptionLength}
                onChange={(e) => setSubscriptionLength(e.target.value)}
              >
                <option value="monthly">{t("monthly")}</option>
                <option value="annually">{t("annually")}</option>
                <option value="biannually">{t("biannually")}</option>
              </select>
            </div>
          </Row>
          <ActionButton onClick={handleUpdateSubscription}>
            {t("update_subscription")}
          </ActionButton>
          <br />
          {subscription &&
          calculateAvailableCourses(subscription)?.availableCoursesNum >
            me.new_subjects.length ? (
            <>
              <div>Choose one more course</div>

              <div>
                {[...available_courses]
                  .sort((a, b) =>
                    a.title.localeCompare(b.title, "ru", {
                      sensitivity: "base",
                    })
                  )
                  .map((c) => {
                    const ids = me.new_subjects.map((course) => course.id);
                    return (
                      <div className="miniblock" key={c.id}>
                        <div className="main">
                          {c.title}
                          <br />
                          {
                            calculateAvailableCourses(subscription)
                              ?.availableCoursesNum.length
                          }
                          {ids.includes(c.id) || !areButtonsVisible ? null : (
                            <button
                              onClick={async (e) => {
                                e.preventDefault();
                                let enroll = await enrollOnCourse({
                                  variables: {
                                    id: me.id,
                                    coursePageId: c.id,
                                  },
                                });
                                if (
                                  me.new_subjects.length +
                                    newSubscribedCourses.length >=
                                  calculateAvailableCourses(subscription)
                                    ?.availableCoursesNum -
                                    1
                                ) {
                                  setAreButtonsVisible(false);
                                }
                                setNewSubscribedCourses([
                                  ...newSubscribedCourses,
                                  c.id,
                                ]);
                                alert("Открыли доступ!");
                              }}
                            >
                              Открыть
                            </button>
                          )}
                        </div>
                        <div className="second">
                          <div className="enrollment-status">
                            <input
                              checked={
                                ids.includes(c.id) ||
                                newSubscribedCourses.includes(c.id)
                              }
                              type="checkbox"
                              id={`enrolled-${c.id}`}
                              className="checkbox"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : null}
        </Container>
      </Fieldset>
    </Form>
  );
};

export default Account;
