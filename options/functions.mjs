export function getStoredOptions() {
    "use strict";
    return browser.storage.local.get([
        'sendnow',
        'sendlater',
        'compose',
        'debug'
    ]);
}

export function getOptions() {
    "use strict";
    return getStoredOptions().then((res) => {
        return applyDefaults(res);
    });
}

export function applyDefaults(options) {
    "use strict";
    if (!options.sendnow) {
        options.sendnow = {
            enabled: true,
            max_messages: 1
        };
    }
    if (!options.sendlater) {
        options.sendlater = {
            enabled: true,
            max_messages: 1
        };
    }
    if (!options.compose) {
        options.compose = {
            enabled: true,
            max_windows: 4
        };
    }
    if (!options.debug) {
        options.debug = {
            enabled: true,
            level: 1
        };
    }
    return options;
}

// vim: set expandtab tabstop=4 shiftwidth=4:
