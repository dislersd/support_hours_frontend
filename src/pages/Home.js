import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import SessionCard from "../components/SessionCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_SESSIONS_QUERY);

  const home = user ? (
    <Grid columns={3}>
      <Grid.Row className="page-title">
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
  ) : (
    <Grid centered>
      <Grid.Row className="page-title">
        <h2>
          {" "}
          Welcome to Support Hours signup! <br />
          Please login or register to see sessions{" "}
        </h2>
      </Grid.Row>
      <Grid.Row>
        <Button as={Link} to="/login" primary>
          Login
        </Button>
        <Button as={Link} to="/register" primary>
          Register
        </Button>
      </Grid.Row>
    </Grid>
  );

  return home;
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
