import React from "react";
import { Card, Icon, Label, Feed } from "semantic-ui-react";
import moment from "moment";

const SessionCard = ({ session: { date, attendees } }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{moment(date).format("dddd LL")}</Card.Header>
      </Card.Content>
      <Card.Content>{attendees}</Card.Content>
    </Card>
  );
};

export default SessionCard;
