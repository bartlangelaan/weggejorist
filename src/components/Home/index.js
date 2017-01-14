
import React from 'react';
import CommentWidget from '../CommentWidget';

function Home() {
  return (
    <div>
      <CommentWidget
        title="Laatste reacties"
        query="/comments?sort=defualt"
      />
      <CommentWidget
        title="Laatste weggejorist"
        query="/comments?deleted=true&sort=deleted"
      />
      <CommentWidget
        title="Laatste opgerot"
        query="/comments?banned=true&sort=deleted"
      />
    </div>
  );
}

export default Home;
