import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveCurrentTime = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);
};

player.on('timeupdate', throttle(saveCurrentTime, 1000));

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);

player
  .setCurrentTime(savedTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
