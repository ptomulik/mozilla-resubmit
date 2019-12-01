/**
 * @file Functions for accessing extension's configuration options.
 * @author Paweł Tomulik
 */

/**
 * Get options as they were persisted in local storage.
 *
 * @returns {Promise} A Promise that will be fullfiled with a **results**
 * object containing configuration options as follows
 * ```
 *  {
 *      sendnow:    { enabled: true, max_messages: 1 },
 *      sendlater:  { enabled: true, max_messages: 1 },
 *      compose:    { enabled: true, max_windows: 4 },
 *      debug:      { enabled: true, level: 3 },
 *  }
 * ```
 * If (some) options were not persisted into storage, the corresponding key is
 * missing.
 *
 * @example
 * getStoredOptions().then((results) => {
 *      console.log("options: " + results);
 * });
 */
export function getStoredOptions() {
    "use strict";
    return browser.storage.local.get([
        'sendnow',
        'sendlater',
        'compose',
        'debug'
    ]);
}

/**
 * Get options from local storage or default values.
 *
 * @returns {Promise} A Promise that will be fullfiled with a **results**
 * object containing configuration options (see {@link getStoredOptions}).
 * If (some) options were not persisted into storage, the default values will
 * be returned.
 *
 * @example
 * getStoredOptions().then((results) => {
 *      console.log("options: " + results);
 * });
 */
export function getOptions() {
    "use strict";
    return getStoredOptions().then((res) => {
        return applyDefaults(res);
    });
}

/**
 * Set default values to options.
 *
 * @param {Object} options The object containing options to be modified.
 *
 * @returns {Object} options
 */
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
