import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import SessionCard from "../components/SessionCard";
import { Link } from "react-router-dom";
import { FETCH_SESSIONS_QUERY } from "../util/graphQL";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_SESSIONS_QUERY);

  return <div>Admin Page</div>;
};

export default Admin;
