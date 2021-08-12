import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import localeDa from 'dayjs/locale/da';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import './rss.scss';

/**
 * RSS component.
 * @param {object} props
 *   Props.
 * @param {object} props.slideExecution
 *   The slide.
 * @param {object} props.content
 *   The slide content.
 * @param {boolean} props.run
 *   Whether or not the slide should start running.
 * @returns {object}
 *   The component.
 */
function RSS({ slideExecution, content, run }) {
  const { source, rssDuration, rssNumber, fontSize, media } = content;
  // @TODO: theme the color of the below
  const rootStyle = {
    backgroundColor: 'aliceblue',
    color: 'navy',
    backgroundImage: `url("${media?.url}")`,
  };
  const [currentRSS, setCurrentRSS] = useState([]);
  const [feed, setFeed] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [index, setIndex] = useState(1);
  const [feedTitle, setFeedTitle] = useState('');

  /**
   * Capitalize the datestring, as it starts with the weekday.
   *
   * @param {string} s
   *    The string to capitalize.
   * @returns {string}
   *    The capitalized string.
   */
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  /**
   * Fetch data.
   */
  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((jsonData) => {
        setFeed(jsonData.feed.slice(0, rssNumber));
        setFeedTitle(jsonData.feedTitle);
        const [first] = jsonData.feed;
        setDataLoaded(true);
        setCurrentRSS(first);
      });
  }, []);

  /**
   * Sets localized formats (dayjs)
   */
  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  /**
   * Setup slide run function.
   */
  useEffect(() => {
    if (run) {
      slideExecution.start();
    } else {
      slideExecution.stop();
    }
  }, [run]);

  useEffect(() => {
    let timer;
    if (dataLoaded) {
      timer = setTimeout(() => {
        const currentIndex = feed.indexOf(currentRSS);
        const nextIndex = (currentIndex + 1) % feed.length;
        setIndex(nextIndex + 1);
        setCurrentRSS(feed[nextIndex]);
      }, rssDuration * 1000);
    }

    return function cleanup() {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [currentRSS]);

  const { title, date, description } = currentRSS;

  return (
    <div className={`rss-slide ${fontSize}`} style={rootStyle}>
      <div className="progress">
        {feedTitle} {index} / {feed.length}
      </div>
      <div className="title">{title}</div>
      {date && (
        <div className="date">
          {capitalize(dayjs(date).locale(localeDa).format('LLLL'))}
        </div>
      )}
      <div className="description">{description}</div>
    </div>
  );
}

RSS.propTypes = {
  run: PropTypes.bool.isRequired,
  slideExecution: PropTypes.shape({
    duration: PropTypes.number,
    slideDone: PropTypes.func,
  }).isRequired,
  content: PropTypes.shape({
    source: PropTypes.string.isRequired,
    rssDuration: PropTypes.number,
    rssNumber: PropTypes.number,
    fontSize: PropTypes.string,
    media: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

export default RSS;
