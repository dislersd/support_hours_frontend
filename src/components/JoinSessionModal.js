import React, { useState } from "react";
import { Button, Modal, TextArea, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_SESSIONS_QUERY } from "../util/graphQL";

function JoinSessionModal({ open, close, id }) {
  const [blockerOpen, setBlockerOpen] = useState(false);
  const [blocker, setBlocker] = useState("");

  const openBlocker = () => setBlockerOpen(true);
  const closeBlocker = () => setBlockerOpen(false);

  const [joinSession] = useMutation(JOIN_SESSION, {
    variables: { sessionId: id },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_SESSIONS_QUERY
      });
      proxy.writeQuery({ query: FETCH_SESSIONS_QUERY, data });
    }
  });

  const [createBlocker] = useMutation(CREATE_BLOCKER, {
    variables: {
      sessionId: id,
      body: blocker
    }
  });

  function joinSessionSubmit() {
    createBlocker();
    joinSession();
    close();
  }

  function handleChange(e) {
    setBlocker(e.target.value);
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
            onClick={openBlocker}
          />
          <Button onClick={close} negative>
            No
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal open={blockerOpen} onClose={closeBlocker}>
        <Modal.Header>Blockers</Modal.Header>
        <Modal.Content>
          <Form>
            <TextArea
              placeholder="What do you need help with?..."
              name="blocker"
              value={blocker}
              onChange={handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={joinSessionSubmit}>
            Submit
          </Button>
          <Button negative>Cancel</Button>
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

const CREATE_BLOCKER = gql`
  mutation createBlocker($sessionId: ID!, $body: String) {
    createBlocker(sessionId: $sessionId, body: $body) {
      username
      blockers {
        body
        forSession
      }
    }
  }
`;

export default JoinSessionModal;
