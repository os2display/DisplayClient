import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createRemoteComponent,
  createRequires,
} from '@paciolan/remote-component';
import './slide.scss';
import { resolve } from './remote-component.config';
import ErrorBoundary from './error-boundary';

/**
 * Slide component.
 *
 * @param {object} props - Props.
 * @param {object} props.slide - The slide data.
 * @param {string} props.id - The unique slide id.
 * @param {boolean} props.run - Whether or not the slide should run.
 * @param {Function} props.slideDone - The function to call when the slide is done running.
 * @returns {object} - The component.
 */
function Slide({ slide, id, run, slideDone, forwardRef }) {
  const [remoteComponent, setRemoteComponent] = useState(null);

  useEffect(() => {
    const requires = createRequires(resolve);
    const RemoteComponent = createRemoteComponent({ requires });

    setRemoteComponent(
      <RemoteComponent
        url={slide.templateData.resources.component}
        slide={slide}
        content={slide.content}
        run={run}
        slideDone={slideDone}
      />
    );
  }, []);

  /**
   * Handle errors in ErrorBoundary.
   *
   * Call slideDone after a timeout to ensure progression.
   */
  function handleError() {
    setTimeout(() => {
      slideDone(slide);
    }, 5000);
  }

  return (
    <div id={id} className="Slide" ref={forwardRef}>
      {remoteComponent && (
        <ErrorBoundary errorHandler={handleError}>
          {remoteComponent}
        </ErrorBoundary>
      )}
    </div>
  );
}

Slide.propTypes = {
  id: PropTypes.string.isRequired,
  run: PropTypes.bool.isRequired,
  slideDone: PropTypes.func.isRequired,
  slide: PropTypes.shape({
    templateData: PropTypes.shape({
      resources: PropTypes.shape({ component: PropTypes.string.isRequired }),
    }).isRequired,
    duration: PropTypes.number.isRequired,
    instanceId: PropTypes.string.isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
  }).isRequired,
  forwardRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default Slide;
