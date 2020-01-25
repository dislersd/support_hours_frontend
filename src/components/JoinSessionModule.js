import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class JoinSessionModule extends Component {
  render() {
    const { open, close } = this.props;

    return (
      <div>
        <Modal open={open} onClose={close}>
          <Modal.Header>Join Session</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to join this session?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={close} negative>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default JoinSessionModule;
