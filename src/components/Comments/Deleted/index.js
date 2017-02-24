import React from 'react';
import Comments from '../index';

export default function () {
  return (
    <Comments
      query="/comments?banned=false"
    />
  );
}
