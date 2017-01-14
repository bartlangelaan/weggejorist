import React, {Component} from 'react';
import Comment from '../Comment';
import Waypoint from 'react-waypoint';
import styles from './styles.css';

export default class CommentWidget extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: false,
      more: true
    }

    this.loadNew = this.loadNew.bind(this);
  }

  componentDidMount() {
    this.loadNew();
  }

  loadNew() {
    if(this.state.loading) return;

    this.setState({loading: true});

    const latest = this.state.posts[this.state.posts.length - 1];
    fetch('https://weggejorist.herokuapp.com' + this.props.query + (latest ? '&before=' + latest.commentId : ''))
      .then(res => res.json())
      .then(res => {
        this.setState({
          posts: [...this.state.posts, ...res],
          loading: false,
          more: res.length ? true : false
        })
      })
  }

  render() {
    console.log('styles:', styles);
    return <section className={styles.widget}>
      <h2 className={styles.title}>{this.props.title}</h2>
      <div className={styles.scrollable}>

        {this.state.posts.map(post => <Comment key={post._id} {...post} />)}

        <Waypoint
          onEnter={this.loadNew}
        />

        <div className={styles.status}>
          {this.state.more ? 'Aan het laden..' : 'Geen reaguursels meer..'}
        </div>

      </div>
    </section>
  }

}
