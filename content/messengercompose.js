/*jslint browser: true, unparam: true */
function ResubmitComposeListener (aCompletionFun) {
  "use strict";
  this.name = ResubmitComposeListener;
  this.notifyComplete = function () { aCompletionFun(); };
}

ResubmitComposeListener.prototype = {
    onWindowInit: function (e) {
        "use strict";
        log("debug: ResubmitComposeListener.onWindowInit(): called with (" + e + ")", 5);
        gMsgCompose.RegisterStateListener(this);
    },
    onWindowClose: function (e) {
        "use strict";
        log("debug: ResubmitComposeListener.onWindowClose(): called with (" + e + ")", 5);
        log("debug: ResubmitComposeListener.onWindowClose(): invoking this.notifyComplete()", 6);
        this.notifyComplete();
        log("debug: ResubmitComposeListener.onWindowClose(): returned from this.notifyComplete()", 7);
    },
    onSendMessage: function (e) {
        "use strict";
        log("debug: ResubmitComposeListener.onSendMessage(): called with (" + e + ")", 5);
        log("debug: ResubmitComposeListener.onSendMessage(): invoking this.notifyComplete()", 6);
        this.notifyComplete();
        log("debug: ResubmitComposeListener.onSendMessage(): returned from this.notifyComplete()", 7);
    },
    NotifyComposeFieldsReady: function () {
        "use strict";
        log("debug: ResubmitComposeListener.NotifyComposeFieldsReady(): called with ()", 5);
    },
    NotifyComposeBodyReady: function () {
        "use strict";
        log("debug: ResubmitComposeListener.NotifyComposeBodyReady(): called with ()", 5);
    },
    ComposeProcessDone: function (aResult) {
        "use strict";
        log("debug: ResubmitComposeListener.ComposeProcessDone(): called with (" + aResult + ")", 5);
        log("debug: ResubmitComposeListener.ComposeProcessDone(): invoking this.notifyComplete()", 6);
        this.notifyComplete();
        log("debug: ResubmitComposeListener.ComposeProcessDone(): returned from this.notifyComplete()", 7);
    },
    SaveInFolderDone: function (aResult) {
        "use strict";
        log("debug: ResubmitComposeListener.SaveInFolderDone(): called with (" + aResult + ")", 5);
    }
};

(function () {
    "use strict";
//    var Cc = Components.classes,
//        Ci = Components.interfaces,
//        msgComposeSvc = Cc["@mozilla.org/messengercompose;1"]
//            .getService(Ci.nsIMsgComposeService),
    var stateListener = new ResubmitComposeListener(window.arguments[1]);
//        msgCompose; // = msgComposeSvc.getMsgComposeForWindow(window);

     
//  window.addEventListener('compose-window-init', function (e) {
//      //msgCompose = msgComposeSvc.getMsgComposeForWindow(window);
//      gMsgCompose.RegisterStateListener(stateListener);
//  }, true);
  window.addEventListener('compose-window-init', function (e) { stateListener.onWindowInit(e); }, true);
  window.addEventListener('close', function (e) { stateListener.onWindowClose(e); }, true);
//  window.addEventListener('compose-send-message', function (e) { stateListener.onSendMessage(e); }, true);
}());

// vim: set expandtab tabstop=4 shiftwidth=4:
