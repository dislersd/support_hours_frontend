import React from "react";
import { Button, Modal } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_SESSIONS_QUERY } from "../util/graphQL";

function LeaveSessionModal({ open, close, id }) {
  const [leaveSession] = useMutation(LEAVE_SESSION, {
    variables: { sessionId: id },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_SESSIONS_QUERY
      });
      proxy.writeQuery({ query: FETCH_SESSIONS_QUERY, data });
    }
  });

  function leaveSessionSubmit() {
    leaveSession();
    close();
  }

  return (
    <div>
      <Modal open={open} onClose={close}>
        <Modal.Header>Leave Session</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to leave this session?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            icon="checkmark"
            labelPosition="right"
            content="Leave"
            onClick={leaveSessionSubmit}
          />
          <Button onClick={close}>
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

const LEAVE_SESSION = gql`
  mutation leaveSession($sessionId: ID!) {
    leaveSession(sessionId: $sessionId) {
      id
      date
      attendees
    }
  }
`;

export default LeaveSessionModal;
