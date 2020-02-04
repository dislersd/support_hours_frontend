import React, { useState } from "react";
import { Card, Dimmer, Button, Header } from "semantic-ui-react";
import JoinSessionModule from "./JoinSessionModule";

const SessionCard = ({ session: { id, date, attendees } }) => {
  const [active, setActive] = useState();
  const [open, setOpen] = useState(false);

  const handleShow = () => setActive(true);

  const handleHide = () => setActive(false);

  const show = () => setOpen(true);
  const close = () => setOpen(false);

  const content = (
    <div>
      <Header as="h2" inverted>
        Join Session?
      </Header>

      <Button onClick={show} color="green">
        Join
      </Button>
    </div>
  );

  const cardContent = (
    <Card fluid>
      <Card.Content>
        <Card.Header>{date}</Card.Header>
      </Card.Content>
      <Card.Content>
        {attendees.map(a => (
          <div>{a}</div>
        ))}
      </Card.Content>
    </Card>
  );

  return (
    <>
      <Dimmer.Dimmable
        dimmed={active}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
      >
        {cardContent}
        <Dimmer active={active}>{content}</Dimmer>
      </Dimmer.Dimmable>
      <JoinSessionModule open={open} close={close} />
    </>
  );
};

export default SessionCard;
