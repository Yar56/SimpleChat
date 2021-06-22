import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const FeedsList = () => {
  const feeds = useSelector((state) => state.feeds);
  const activeFeed = useSelector((state) => state.currentChannelId);

  const renderedFeeds = feeds.map((feed) => {
    const style = classNames('w-100 px-4 rounded-0 text-start btn', {
      'btn-secondary': (feed.id === activeFeed),
    });
    return (
      <li className="nav-item" key={feed.id}>
        <button type="button" className={style}>
          <span className="me-1">#</span>
          {feed.name}
        </button>
      </li>
    );
  });

  return (
    <ul className="nav flex-column nav-pills nav-fill">
      {renderedFeeds}
    </ul>
  );
};

export default FeedsList;
