import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Home = () => {
  const { loading, data } = useQuery(FETCH_SESSIONS_QUERY);

  if (data) {
    console.log(data);
  }

  return <div>Home Page</div>;
};

const FETCH_SESSIONS_QUERY = gql`
  {
    getSessions {
      id
      date
      attendees
    }
  }
`;

export default Home;
