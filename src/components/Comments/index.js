import React, { Component, PropTypes } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Waypoint from 'react-waypoint';
import Comment from '../Comment';
import Banned from './Banned';
import Deleted from './Deleted';

import api from '../../api';

export default class Comments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false,
      more: true,
    };

    this.loadNew = this.loadNew.bind(this);
  }

  componentDidMount() {
    this.loadNew();
  }

  loadNew() {
    if (this.state.loading) return;

    this.setState({ loading: true });

    const latest = this.state.posts[this.state.posts.length - 1];
    fetch(`${api()}${this.props.query + (latest ? `&before=${latest.commentId}` : '')}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          posts: [...this.state.posts, ...res],
          loading: false,
          more: res.length > 0,
        });
      });
  }

  render() {
    return (<section>
      <div>

        {this.state.posts.map(post => <Comment key={post._id} {...post} />)}

        <Waypoint
          onEnter={this.loadNew}
        />

        {this.state.more ? <div style={{ position: 'relative' }}>
          <RefreshIndicator
            size={50}
            left={0}
            top={30}
            status="loading"
            style={{
              display: 'inline-block',
              position: 'relative',
              marginLeft: '50%',
              marginBottom: '50px',
            }}
          />
        </div> : null}

      </div>
    </section>);
  }

}

Comments.propTypes = {
  query: PropTypes.string.isRequired,
};


export { Banned, Deleted };
