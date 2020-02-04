import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function JoinSessionModal({ open, close }) {
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
  mutation joinSession($sessionId: String!) {
    joinSession(sessionId: $sessionId)
  }
`;

export default JoinSessionModal;
