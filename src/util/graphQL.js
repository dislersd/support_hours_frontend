import gql from "graphql-tag";

export const FETCH_SESSIONS_QUERY = gql`
  {
    getSessions {
      id
      date
      attendees
    }
  }
`;
