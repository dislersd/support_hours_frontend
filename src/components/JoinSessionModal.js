import React from "react";
import { Button, Modal } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_SESSIONS_QUERY } from "../util/graphQL";

function JoinSessionModal({ open, close, id }) {
  const [joinSession] = useMutation(JOIN_SESSION, {
    variables: { sessionId: id },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_SESSIONS_QUERY
      });
      proxy.writeQuery({ query: FETCH_SESSIONS_QUERY, data });
    }
  });

  function joinSessionSubmit() {
    joinSession();
    close();
  }

  return (
    <div>
      <Modal open={open} onClose={close}>
        <Modal.Header>Join Session</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to join this session?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={joinSessionSubmit}
          />
          <Button onClick={close} negative>
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

const JOIN_SESSION = gql`
  mutation joinSession($sessionId: ID!) {
    joinSession(sessionId: $sessionId) {
      id
      date
      attendees
    }
  }
`;

export default JoinSessionModal;
