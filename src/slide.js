import { React } from 'react';
import PropTypes from 'prop-types';
import TextBox from './templates/image-text/image-text';
import Slideshow from './templates/slideshow/slideshow';
import Calendar from './templates/calendar/calendar';
import BookReview from './templates/book-review/book-review';
import Quote from './templates/quote/quote';
import MeetingRoomSchedule from './templates/meeting-room-schedule/meeting-room-schedule';
import Poster from './templates/poster/poster';
import Sparkle from './templates/sparkle/sparkle';
import Transition from './transition';
import './slide.scss';

/**
 * Slide component.
 *
 * @param {object} props
 *   Props.
 * @param {object} props.slide
 *   The slide data.
 * @param {string} props.id
 *   The unique slide id.
 * @param {boolean} props.run
 *   Whether or not the slide should run.
 * @param {Function} props.slideDone
 *   The function to call when the slide is done running.
 * @param {boolean} props.isNextSlide
 *  A boolean indicating whether this is the next slide.
 * @param {number} props.prevSlideDuration
 *  The previous slide duration.
 * @returns {JSX.Element}
 *   The component.
 */
function Slide({ slide, id, run, slideDone, isNextSlide, prevSlideDuration }) {
  let slideComponent;

  if (slide.template === 'template-image-text') {
    slideComponent = <TextBox slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-slideshow') {
    slideComponent = <Slideshow slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-calendar') {
    slideComponent = <Calendar slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-book-review') {
    slideComponent = <BookReview slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-meeting-room-schedule') {
    slideComponent = <MeetingRoomSchedule slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-quote') {
    slideComponent = <Quote slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else if (slide.template === 'template-poster') {
    slideComponent = <Poster slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  }  else if (slide.template === 'template-sparkle') {
    slideComponent = <Sparkle slide={slide} content={slide.content} run={run} slideDone={slideDone} />;
  } else {
    slideComponent = <>Unknown template</>;
  }

  const styles = {};
  let classes = 'Slide';
  if (!run && !isNextSlide) {
    classes = `${classes} invisible`;
  }

  if (run) {
    styles.zIndex = 1;
  }

  // @TODO: Load template.
  return (
    <>
      {slideComponent && (
        <div id={id} style={styles} className={classes}>
          <Transition
            run={run}
            duration={slide.duration}
            prevSlideDuration={prevSlideDuration}
            isNextSlide={isNextSlide}
          >
            {slideComponent}
          </Transition>
        </div>
      )}
    </>
  );
}

Slide.propTypes = {
  id: PropTypes.string.isRequired,
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    template: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    instanceId: PropTypes.string.isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired
  }).isRequired,
  isNextSlide: PropTypes.bool.isRequired,
  prevSlideDuration: PropTypes.number.isRequired
};

export default Slide;
