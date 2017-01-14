import React from 'react';
import styles from './styles.css';

export default function (comment) {
  return (<div className={styles.wrapper}>
    <div className={styles.content}>
      {comment.deleted ? comment.deleted.originalContent : comment.content}
    </div>
    <div className={styles.time}>{comment.published}</div>
    <div className={styles.user}>{comment.user}</div>
  </div>);
}
