import React, { useState } from "react";
import { Card, Dimmer, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SessionCard = ({ session: { id, date, attendees } }) => {
  const [active, setActive] = useState();

  const handleShow = () => setActive(true);

  const handleHide = () => setActive(false);

  const content = (
    <div>
      <Header as="h2" inverted>
        Join Session?
      </Header>

      <Button color="green">Join</Button>
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
    <Dimmer.Dimmable
      dimmed={active}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
    >
      {cardContent}
      <Dimmer active={active}>{content}</Dimmer>
    </Dimmer.Dimmable>
  );
};

export default SessionCard;
