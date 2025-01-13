import { gql, useQuery } from "@apollo/client";

const LESSON_RATINGS_QUERY = gql`
  query LESSON_RATINGS_QUERY($forumId: String!) {
    ratings(forumId: $forumId) {
      id
      rating
      user {
        id
      }
    }
  }
`;

const AvgRating = ({ lesson, type }) => {
  const {
    loading: loadingRatings,
    error: errorRatings,
    data: dataRatings,
  } = useQuery(LESSON_RATINGS_QUERY, {
    variables: {
      forumId: lesson.forum.id,
    },
  });
  if (loadingRatings) return <div></div>;

  const ratings = dataRatings ? dataRatings.ratings : [];

  if (ratings.length === 0) return <div>0</div>;
  const getUniqueRatingsWithHighestValues = (ratings) => {
    const userRatings = {};

    ratings.forEach((rating) => {
      const userId = rating.user.id;
      const currentRating = rating.rating;

      if (!userRatings[userId] || currentRating > userRatings[userId].rating) {
        userRatings[userId] = rating;
      }
    });

    return Object.values(userRatings);
  };

  const uniqueRatings = getUniqueRatingsWithHighestValues(ratings);

  const calculateMode = (ratings) => {
    const frequency = {};

    // Count the frequency of each rating
    ratings.forEach((rating) => {
      const value = rating.rating;
      if (frequency[value]) {
        frequency[value]++;
      } else {
        frequency[value] = 1;
      }
    });

    // Find the rating with the highest frequency
    let mode = null;
    let maxFrequency = 0;

    for (const [value, count] of Object.entries(frequency)) {
      if (count > maxFrequency) {
        mode = value;
        maxFrequency = count;
      }
    }

    return mode;
  };

  const sum = uniqueRatings.reduce((acc, rating) => acc + rating.rating, 0);
  const avg = sum / uniqueRatings.length;
  return (
    <div>{type === "mean" ? avg.toFixed(1) : calculateMode(uniqueRatings)}</div>
  );
};

export default AvgRating;
