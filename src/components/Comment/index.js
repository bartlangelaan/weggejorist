import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

const months = ['januari', 'februari', 'maart',
'april', 'mei', 'juni', 'juli', 'augustus', 'september',
'oktober', 'november', 'december'];

export default function (comment) {
  const date = new Date(comment.published);
  const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  const dateString = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  return (<div style={{ margin: 20, wordWrap: 'break-word' }}><Card>
    <CardHeader
      title={comment.user}
      subtitle={`Geplaatst ${dateString} ${timeString} op ${comment.videoId.title}`}
      avatar={<Avatar>{comment.user.substr(0, 1).toUpperCase()}</Avatar>}
    />
    <CardText>
      <div>
        {comment.content}
      </div>
    </CardText>
  </Card></div>);
}
