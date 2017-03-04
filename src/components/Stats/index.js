import React, { Component, PropTypes } from 'react';
import AnimatedNumber from 'react-animated-number';
import Paper from 'material-ui/Paper';
import api from '../../api';

const Nr = ({ value, stepPrecision = 0 }) => {
  if (stepPrecision) {
    value = parseFloat(value.toFixed(stepPrecision));
  }
  return (
    <AnimatedNumber value={value} stepPrecision={stepPrecision} formatValue={x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} />
  );
};

Nr.propTypes = {
  value: PropTypes.number.isRequired,
  stepPrecision: PropTypes.number,
};

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: false,
    };
    this.timer = false;
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.timer = true;
    this.refresh();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = false;
  }

  refresh() {
    fetch(`${api()}/stats`)
      .then(res => res.json())
      .then(({ stats }) => {
        if (this.timer) {
          this.setState({
            stats,
          });
        }
      })
      .catch()
      .then(() => {
        if (this.timer) this.timer = setTimeout(this.refresh, 500);
      });
  }

  render() {
    const paperStyle = {
      margin: '50px 10px',
      padding: '50px 10px',
    };

    const bigStyle = {
      fontSize: '35px',
      margin: '10px',
    };

    const stats = this.state.stats;

    if (!stats) return null;

    const oldestItemScan = new Date(
      new Date().getTime() - new Date(stats.worker.items.oldest_scan).getTime()
    );


    return (<div>
      {stats ? (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

          {stats.worker.comments.scannedVideos !== stats.items.count ? (
            <Paper style={paperStyle}>
              <div style={bigStyle}>
                <Nr
                  value={(stats.worker.comments.scannedVideos / stats.items.count) * 100}
                  stepPrecision={3}
                />
                %
              </div>
              <div>procent van alle comments opgehaald</div>
            </Paper>
          ) : null}

          <Paper style={paperStyle}>
            <div>
              Item-statistieken lopen
              tot <Nr value={oldestItemScan.getHours()} /> uur
              en <Nr value={oldestItemScan.getMinutes()} /> minuten achter.
            </div>
          </Paper>

          <Paper style={paperStyle}>
            <div style={bigStyle}><Nr value={stats.items.uploaded} /></div>
            <div>items geupload naar Dumpert</div>
          </Paper>

          <Paper style={paperStyle}>
            <div style={bigStyle}><Nr value={stats.items.count} /></div>
            <div>Dumpert items gepubliceerd</div>
          </Paper>
          <Paper style={paperStyle}>
            <div style={bigStyle}><Nr value={stats.items.views} /></div>
            <div>views op alle Dumpert items bij elkaar</div>
          </Paper>
          <Paper style={paperStyle}>
            <div style={bigStyle}><Nr value={stats.comments.count} /></div>
            <div>reaguursels op Dumpert geplaatst</div>
          </Paper>

          <Paper style={paperStyle}>
            <div>waarvan</div>
            <div style={bigStyle}><Nr value={stats.comments.deleted.count} /></div>
            <div>reaguursels zijn weggejorist</div>
            <div>
              (dat is dus&nbsp;
              <Nr
                value={(stats.comments.deleted.count / stats.comments.count) * 100}
                stepPrecision={3}
              />
              % van alle reaguursels)
            </div>
          </Paper>

          <Paper style={paperStyle}>
            <div>waarvan</div>
            <div style={bigStyle}><Nr value={stats.comments.deleted.newbie} /></div>
            <div>Zwitsal-reaguursels zijn weggejorist</div>
            <div>
              (dat is&nbsp;
              <Nr
                value={(stats.comments.deleted.newbie / stats.comments.count_since_newbies) * 100}
                stepPrecision={3}
              />
              % van alle weggejoriste reaguursels)
            </div>
          </Paper>

          <Paper style={paperStyle}>
            <div style={bigStyle}><Nr value={stats.comments.deleted.banned} /></div>
            <div>permabans uitgedeeld</div>
            <div>
              (dus&nbsp;
              <Nr
                value={(stats.comments.deleted.banned / stats.comments.deleted.count) * 100}
                stepPrecision={3}
              />
              % van alle weggejoriste reaguursels was een permaban)
            </div>
          </Paper>

        </div>
        ) : 'loading..'}
    </div>);
  }

}
