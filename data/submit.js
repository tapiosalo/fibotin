function listenForClicks() {
  document.addEventListener("click", (e) => {
    console.log("listenForClicks: "+e.target.id);
    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function retracement(tabs) {
      chrome.tabs.insertCSS(null, {file: '/data/style.css'}, function() {
          window.close();
          browser.tabs.sendMessage(tabs[0].id, {
              command: "retracement"
          });
      });
    }

    function line(tabs) {
      chrome.tabs.insertCSS(null, {file: '/data/style.css'}, function() {
          window.close();
          browser.tabs.sendMessage(tabs[0].id, {
              command: "line"
          });
      });
    }

    function arcs(tabs) {
      chrome.tabs.insertCSS(null, {file: '/data/style.css'}, function() {
          window.close();
          browser.tabs.sendMessage(tabs[0].id, {
              command: "arcs"
          });
      });
    }

    function channel(tabs) {
      chrome.tabs.insertCSS(null, {file: '/data/style.css'}, function() {
          window.close();
          browser.tabs.sendMessage(tabs[0].id, {
              command: "channel"
          });
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
          command: "reset"
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Fibotin fails: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.id === "retracement" ) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(retracement)
        .catch(reportError);
    }
    if (e.target.id === "reset" ) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
    if (e.target.id === "line" ) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(line)
        .catch(reportError);
    }
    if (e.target.id === "arcs" ) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(arcs)
        .catch(reportError);
    }
    if (e.target.id === "channel" ) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(channel)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  console.error(`Failed to execute fibotin content script: ${error.message}`);
}


browser.tabs.executeScript({file: "/content-scripts/content.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);