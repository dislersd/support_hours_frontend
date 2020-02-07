import React, { useState, useContext } from "react";
import { Card, Dimmer, Button, Header } from "semantic-ui-react";
import JoinSessionModal from "./JoinSessionModal";
import LeaveSessionModal from "./LeaveSessionModal";
import { AuthContext } from "../context/auth";

const SessionCard = ({ session: { id, date, attendees } }) => {
  const { user } = useContext(AuthContext);

  const [active, setActive] = useState();

  const [joinOpen, setJoinOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);

  const joinShow = () => setJoinOpen(true);
  const joinClose = () => setJoinOpen(false);

  const leaveShow = () => setLeaveOpen(true);
  const leaveClose = () => setLeaveOpen(false);

  const userNotPresentContent = (
    <div>
      <Header as="h2" inverted>
        Join Session?
      </Header>

      <Button onClick={joinShow} color="green">
        Join
      </Button>
    </div>
  );

  const userPresentContent = (
    <div>
      <Header as="h2" inverted>
        Leave Session?
      </Header>

      <Button onClick={leaveShow} color="red">
        Leave
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
          <div key={a}>{a}</div>
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
        <Dimmer active={active}>
          {attendees.includes(user.username)
            ? userPresentContent
            : userNotPresentContent}
        </Dimmer>
      </Dimmer.Dimmable>
      <JoinSessionModal open={joinOpen} close={joinClose} id={id} />
      <LeaveSessionModal open={leaveOpen} close={leaveClose} id={id} />
    </>
  );
};

export default SessionCard;
