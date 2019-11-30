import { getOptions, getStoredOptions, applyDefaults } from "./functions.mjs";

const inputSendNowEnabled = document.querySelector("#inputSendNowEnabled");
const inputSendNowMaxMessages = document.querySelector("#inputSendNowMaxMessages");

const inputSendLaterEnabled = document.querySelector("#inputSendLaterEnabled");
const inputSendLaterMaxMessages = document.querySelector("#inputSendLaterMaxMessages");

const inputComposeEnabled = document.querySelector("#inputComposeEnabled");
const inputComposeMaxWindows = document.querySelector("#inputComposeMaxWindows");

const inputDebugEnabled = document.querySelector("#inputDebugEnabled");
const inputDebugLevel = document.querySelector("#inputDebugLevel");

function storeOptions(e) {
    "use strict";
    browser.storage.local.set(parseFormInputs());
    e.preventDefault();
}

function restoreOptions() {
    "use strict";
    getOptions().then((res) => {
        setupFormInputs(res);
    });
}

function setupFormInputs(options) {
    "use strict";
    inputSendNowEnabled.checked = options.sendnow.enabled;
    inputSendNowMaxMessages.value = options.sendnow.max_messages;

    inputSendLaterEnabled.checked = options.sendlater.enabled;
    inputSendLaterMaxMessages.value = options.sendlater.max_messages;

    inputComposeEnabled.checked = options.compose.enabled;
    inputComposeMaxWindows.value = options.compose.max_windows;

    inputDebugEnabled.checked = options.debug.enabled;
    inputDebugLevel.value = options.debug.level;
}

function parseFormInputs() {
    "use strict";
    return {
        sendnow: {
          enabled: inputSendNowEnabled.checked,
          max_messages: inputSendNowMaxMessages.value
        },
        sendlater: {
          enabled: inputSendLaterEnabled.checked,
          max_messages: inputSendLaterMaxMessages.value
        },
        compose: {
          enabled: inputComposeEnabled.checked,
          max_windows: inputComposeMaxWindows.value
        },
        debug: {
          enabled: inputDebugEnabled.checked,
          level: inputDebugLevel.value
        }
    };
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#options-form").addEventListener("submit", storeOptions);

// vim: set expandtab tabstop=4 shiftwidth=4:
