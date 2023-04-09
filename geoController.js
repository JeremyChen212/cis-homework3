let geoController = (function () {
  let position = null;
  let lastMessage = null;
  let lastError = null;
  let successCallback = null;
  let errorCallback = null;

  let options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  };

  function getCurrentPosition(success, error, posOptions) {
    // Callbacks
    successCallback = success;
    errorCallback = error;
    if (posOptions) {
      options = posOptions;
    }

    // Reset variables
    position = null;
    lastError = null;
    lastMessage = null;

    // if location allowed, set current position.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setPosition, handleError, options);
    }
    else {
      callError("Update your browser to use Geolocation.");
    }
  }

//   Function for setting position
  function setPosition(pos) {
    position = pos;

    if (successCallback) {
      successCallback(position);
    }
  }

//   Error Handler
  function handleError(error) {
    lastError = error;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        lastMessage = "User does not want to display their location."
        break;
      case error.POSITION_UNAVAILABLE:
        lastMessage = "Can't determine user's location."
        break;
      case error.TIMEOUT:
        lastMessage = "The request for geolocation information timed out."
        break;
      case error.UNKNOWN_ERROR:
        lastMessage = "An unknown error occurred."
        break;
    }

    callError(lastMessage);
  }

  function callError(msg) {
    lastMessage = msg;
    console.log(msg);
    if (errorCallback) {
      errorCallback(lastMessage);
    }
  }

  // *****************************
  // Public Functions
  // *****************************
  return {
    "getCurrentPosition": function (success, error, posOptions) {
      getCurrentPosition(success, error, posOptions);
    },
    "getPosition": function () {
      return position;
    },
    "getLastError": function () {
      return lastError;
    },
    "getLastMessage": function () {
      return lastMessage;
    },
    "getOptions": function () {
      return options;
    }
  }
})();