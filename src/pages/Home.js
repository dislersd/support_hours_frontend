import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import SessionCard from "../components/SessionCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_SESSIONS_QUERY);

  if (data) {
    console.log(data.getSessions);
  }

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h2>Support Hour Sessions</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading Sessions...</h1>
        ) : (
          data &&
          data.getSessions.map(session => (
            <Grid.Column key={session.id} style={{ marginBottom: 20 }}>
              <SessionCard session={session} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
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
