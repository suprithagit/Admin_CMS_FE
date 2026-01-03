(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/AdminCMS/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/AdminCMS/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/AdminCMS/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time truthy", 1) {
    (function() {
        'use strict';
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
            var index = heap.length;
            heap.push(node);
            siftUp(heap, node, index);
        }
        function peek(heap) {
            return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
            if (heap.length === 0) {
                return null;
            }
            var first = heap[0];
            var last = heap.pop();
            if (last !== first) {
                heap[0] = last;
                siftDown(heap, last, 0);
            }
            return first;
        }
        function siftUp(heap, node, i) {
            var index = i;
            while(index > 0){
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];
                if (compare(parent, node) > 0) {
                    // The parent is larger. Swap positions.
                    heap[parentIndex] = node;
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    // The parent is smaller. Exit.
                    return;
                }
            }
        }
        function siftDown(heap, node, i) {
            var index = i;
            var length = heap.length;
            var halfLength = length >>> 1;
            while(index < halfLength){
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.
                if (compare(left, node) < 0) {
                    if (rightIndex < length && compare(right, left) < 0) {
                        heap[index] = right;
                        heap[rightIndex] = node;
                        index = rightIndex;
                    } else {
                        heap[index] = left;
                        heap[leftIndex] = node;
                        index = leftIndex;
                    }
                } else if (rightIndex < length && compare(right, node) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                } else {
                    // Neither child is smaller. Exit.
                    return;
                }
            }
        }
        function compare(a, b) {
            // Compare sort index first, then task id.
            var diff = a.sortIndex - b.sortIndex;
            return diff !== 0 ? diff : a.id - b.id;
        }
        // TODO: Use symbols?
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {}
        /* eslint-disable no-var */ var hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
        if (hasPerformanceNow) {
            var localPerformance = performance;
            exports.unstable_now = function() {
                return localPerformance.now();
            };
        } else {
            var localDate = Date;
            var initialTime = localDate.now();
            exports.unstable_now = function() {
                return localDate.now() - initialTime;
            };
        } // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
        // Math.pow(2, 30) - 1
        // 0b111111111111111111111111111111
        var maxSigned31BitInt = 1073741823; // Times out immediately
        var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5000;
        var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
        var taskQueue = [];
        var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
        var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
        var currentTask = null;
        var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.
        var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom
        var isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
            // Check for tasks that are no longer delayed and add them to the queue.
            var timer = peek(timerQueue);
            while(timer !== null){
                if (timer.callback === null) {
                    // Timer was cancelled.
                    pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                    // Timer fired. Transfer to the task queue.
                    pop(timerQueue);
                    timer.sortIndex = timer.expirationTime;
                    push(taskQueue, timer);
                } else {
                    // Remaining timers are pending.
                    return;
                }
                timer = peek(timerQueue);
            }
        }
        function handleTimeout(currentTime) {
            isHostTimeoutScheduled = false;
            advanceTimers(currentTime);
            if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                } else {
                    var firstTimer = peek(timerQueue);
                    if (firstTimer !== null) {
                        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                    }
                }
            }
        }
        function flushWork(hasTimeRemaining, initialTime) {
            isHostCallbackScheduled = false;
            if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
            }
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                {
                    var currentTime;
                } else {
                    // No catch in prod code path.
                    return workLoop(hasTimeRemaining, initialTime);
                }
            } finally{
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
            }
        }
        function workLoop(hasTimeRemaining, initialTime) {
            var currentTime = initialTime;
            advanceTimers(currentTime);
            currentTask = peek(taskQueue);
            while(currentTask !== null && !enableSchedulerDebugging){
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
                    break;
                }
                var callback = currentTask.callback;
                if (typeof callback === 'function') {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
                    var continuationCallback = callback(didUserCallbackTimeout);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === 'function') {
                        currentTask.callback = continuationCallback;
                    } else {
                        if (currentTask === peek(taskQueue)) {
                            pop(taskQueue);
                        }
                    }
                    advanceTimers(currentTime);
                } else {
                    pop(taskQueue);
                }
                currentTask = peek(taskQueue);
            } // Return whether there's additional work
            if (currentTask !== null) {
                return true;
            } else {
                var firstTimer = peek(timerQueue);
                if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }
                return false;
            }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
            switch(priorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                    break;
                default:
                    priorityLevel = NormalPriority;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_next(eventHandler) {
            var priorityLevel;
            switch(currentPriorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                    // Shift down to normal priority
                    priorityLevel = NormalPriority;
                    break;
                default:
                    // Anything lower than normal priority should remain at the current level.
                    priorityLevel = currentPriorityLevel;
                    break;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_wrapCallback(callback) {
            var parentPriorityLevel = currentPriorityLevel;
            return function() {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;
                try {
                    return callback.apply(this, arguments);
                } finally{
                    currentPriorityLevel = previousPriorityLevel;
                }
            };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
            var currentTime = exports.unstable_now();
            var startTime;
            if (typeof options === 'object' && options !== null) {
                var delay = options.delay;
                if (typeof delay === 'number' && delay > 0) {
                    startTime = currentTime + delay;
                } else {
                    startTime = currentTime;
                }
            } else {
                startTime = currentTime;
            }
            var timeout;
            switch(priorityLevel){
                case ImmediatePriority:
                    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                    break;
                case UserBlockingPriority:
                    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                    break;
                case IdlePriority:
                    timeout = IDLE_PRIORITY_TIMEOUT;
                    break;
                case LowPriority:
                    timeout = LOW_PRIORITY_TIMEOUT;
                    break;
                case NormalPriority:
                default:
                    timeout = NORMAL_PRIORITY_TIMEOUT;
                    break;
            }
            var expirationTime = startTime + timeout;
            var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
            };
            if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);
                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                    // All tasks are delayed, and this is the task with the earliest delay.
                    if (isHostTimeoutScheduled) {
                        // Cancel an existing timeout.
                        cancelHostTimeout();
                    } else {
                        isHostTimeoutScheduled = true;
                    } // Schedule a timeout.
                    requestHostTimeout(handleTimeout, startTime - currentTime);
                }
            } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.
                if (!isHostCallbackScheduled && !isPerformingWork) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                }
            }
            return newTask;
        }
        function unstable_pauseExecution() {}
        function unstable_continueExecution() {
            if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
            }
        }
        function unstable_getFirstCallbackNode() {
            return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
            // remove from the queue because you can't remove arbitrary nodes from an
            // array based heap, only the first one.)
            task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
            return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
            var timeElapsed = exports.unstable_now() - startTime;
            if (timeElapsed < frameInterval) {
                // The main thread has only been blocked for a really short amount of time;
                // smaller than a single frame. Don't yield yet.
                return false;
            } // The main thread has been blocked for a non-negligible amount of time. We
            return true;
        }
        function requestPaint() {}
        function forceFrameRate(fps) {
            if (fps < 0 || fps > 125) {
                // Using console['error'] to evade Babel and ESLint
                console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                return;
            }
            if (fps > 0) {
                frameInterval = Math.floor(1000 / fps);
            } else {
                // reset the framerate
                frameInterval = frameYieldMs;
            }
        }
        var performWorkUntilDeadline = function() {
            if (scheduledHostCallback !== null) {
                var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread
                // has been blocked.
                startTime = currentTime;
                var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the
                // error can be observed.
                //
                // Intentionally not using a try-catch, since that makes some debugging
                // techniques harder. Instead, if `scheduledHostCallback` errors, then
                // `hasMoreWork` will remain true, and we'll continue the work loop.
                var hasMoreWork = true;
                try {
                    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                } finally{
                    if (hasMoreWork) {
                        // If there's more work, schedule the next message event at the end
                        // of the preceding one.
                        schedulePerformWorkUntilDeadline();
                    } else {
                        isMessageLoopRunning = false;
                        scheduledHostCallback = null;
                    }
                }
            } else {
                isMessageLoopRunning = false;
            } // Yielding to the browser will give it a chance to paint, so we can
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === 'function') {
            // Node.js and old IE.
            // There's a few reasons for why we prefer setImmediate.
            //
            // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
            // (Even though this is a DOM fork of the Scheduler, you could get here
            // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
            // https://github.com/facebook/react/issues/20756
            //
            // But also, it runs earlier which is the semantic we want.
            // If other browsers ever implement it, it's better to use it.
            // Although both of these would be inferior to native scheduling.
            schedulePerformWorkUntilDeadline = function() {
                localSetImmediate(performWorkUntilDeadline);
            };
        } else if (typeof MessageChannel !== 'undefined') {
            // DOM and Worker environments.
            // We prefer MessageChannel because of the 4ms setTimeout clamping.
            var channel = new MessageChannel();
            var port = channel.port2;
            channel.port1.onmessage = performWorkUntilDeadline;
            schedulePerformWorkUntilDeadline = function() {
                port.postMessage(null);
            };
        } else {
            // We should only fallback here in non-browser environments.
            schedulePerformWorkUntilDeadline = function() {
                localSetTimeout(performWorkUntilDeadline, 0);
            };
        }
        function requestHostCallback(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
                isMessageLoopRunning = true;
                schedulePerformWorkUntilDeadline();
            }
        }
        function requestHostTimeout(callback, ms) {
            taskTimeoutID = localSetTimeout(function() {
                callback(exports.unstable_now());
            }, ms);
        }
        function cancelHostTimeout() {
            localClearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
    })();
}
}),
"[project]/AdminCMS/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/AdminCMS/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/AdminCMS/node_modules/zustand/esm/vanilla.mjs [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore,
    "default",
    ()=>vanilla
]);
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("AdminCMS/node_modules/zustand/esm/vanilla.mjs")}`;
    }
};
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const destroy = ()=>{
        if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") {
            console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
        }
        listeners.clear();
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe,
        destroy
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
var vanilla = (createState)=>{
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") {
        console.warn("[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'.");
    }
    return createStore(createState);
};
;
}),
"[project]/AdminCMS/node_modules/zustand/esm/index.mjs [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "default",
    ()=>react,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/zustand/esm/vanilla.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/use-sync-external-store/shim/with-selector.js [client] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("AdminCMS/node_modules/zustand/esm/index.mjs")}`;
    }
};
;
;
;
;
const { useDebugValue } = __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"];
const { useSyncExternalStoreWithSelector } = __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$shim$2f$with$2d$selector$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"];
let didWarnAboutEqualityFn = false;
const identity = (arg)=>arg;
function useStore(api, selector = identity, equalityFn) {
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
        console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937");
        didWarnAboutEqualityFn = true;
    }
    const slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getInitialState, selector, equalityFn);
    useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && typeof createState !== "function") {
        console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
    }
    const api = typeof createState === "function" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["createStore"])(createState) : createState;
    const useBoundStore = (selector, equalityFn)=>useStore(api, selector, equalityFn);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
var react = (createState)=>{
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") {
        console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.");
    }
    return create(createState);
};
;
}),
"[project]/AdminCMS/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
        didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
        var value = getSnapshot();
        if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
        }
        cachedValue = useState({
            inst: {
                value: value,
                getSnapshot: getSnapshot
            }
        });
        var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
        useLayoutEffect({
            "useSyncExternalStore$2.useLayoutEffect": function() {
                inst.value = value;
                inst.getSnapshot = getSnapshot;
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
            }
        }["useSyncExternalStore$2.useLayoutEffect"], [
            subscribe,
            value,
            getSnapshot
        ]);
        useEffect({
            "useSyncExternalStore$2.useEffect": function() {
                checkIfSnapshotChanged(inst) && forceUpdate({
                    inst: inst
                });
                return subscribe({
                    "useSyncExternalStore$2.useEffect": function() {
                        checkIfSnapshotChanged(inst) && forceUpdate({
                            inst: inst
                        });
                    }
                }["useSyncExternalStore$2.useEffect"]);
            }
        }["useSyncExternalStore$2.useEffect"], [
            subscribe
        ]);
        useDebugValue(value);
        return value;
    }
    function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
        } catch (error) {
            return !0;
        }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
        return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/AdminCMS/node_modules/use-sync-external-store/shim/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/AdminCMS/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js [client] (ecmascript)");
}
}),
"[project]/AdminCMS/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __turbopack_context__.r("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)"), shim = __turbopack_context__.r("[project]/AdminCMS/node_modules/use-sync-external-store/shim/index.js [client] (ecmascript)"), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
        var instRef = useRef(null);
        if (null === instRef.current) {
            var inst = {
                hasValue: !1,
                value: null
            };
            instRef.current = inst;
        } else inst = instRef.current;
        instRef = useMemo(function() {
            function memoizedSelector(nextSnapshot) {
                if (!hasMemo) {
                    hasMemo = !0;
                    memoizedSnapshot = nextSnapshot;
                    nextSnapshot = selector(nextSnapshot);
                    if (void 0 !== isEqual && inst.hasValue) {
                        var currentSelection = inst.value;
                        if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
                    }
                    return memoizedSelection = nextSnapshot;
                }
                currentSelection = memoizedSelection;
                if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
                var nextSelection = selector(nextSnapshot);
                if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
                memoizedSnapshot = nextSnapshot;
                return memoizedSelection = nextSelection;
            }
            var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
            return [
                function() {
                    return memoizedSelector(getSnapshot());
                },
                null === maybeGetServerSnapshot ? void 0 : function() {
                    return memoizedSelector(maybeGetServerSnapshot());
                }
            ];
        }, [
            getSnapshot,
            getServerSnapshot,
            selector,
            isEqual
        ]);
        var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
        useEffect(function() {
            inst.hasValue = !0;
            inst.value = value;
        }, [
            value
        ]);
        useDebugValue(value);
        return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/AdminCMS/node_modules/use-sync-external-store/shim/with-selector.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/AdminCMS/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js [client] (ecmascript)");
}
}),
"[project]/AdminCMS/node_modules/react-toastify/node_modules/clsx/dist/clsx.m.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) for(t = 0; t < e.length; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    else for(t in e)e[t] && (n && (n += " "), n += t);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = ""; f < arguments.length;)(e = arguments[f++]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/AdminCMS/node_modules/react-toastify/dist/react-toastify.esm.mjs [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bounce",
    ()=>R,
    "Flip",
    ()=>$,
    "Icons",
    ()=>E,
    "Slide",
    ()=>w,
    "ToastContainer",
    ()=>k,
    "Zoom",
    ()=>x,
    "collapseToast",
    ()=>g,
    "cssTransition",
    ()=>h,
    "toast",
    ()=>Q,
    "useToast",
    ()=>_,
    "useToastContainer",
    ()=>C
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-toastify/node_modules/clsx/dist/clsx.m.js [client] (ecmascript)");
'use client';
;
;
const u = (t)=>"number" == typeof t && !isNaN(t), d = (t)=>"string" == typeof t, p = (t)=>"function" == typeof t, m = (t)=>d(t) || p(t) ? t : null, f = (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(t) || d(t) || p(t) || u(t);
function g(t, e, n) {
    void 0 === n && (n = 300);
    const { scrollHeight: o, style: s } = t;
    requestAnimationFrame(()=>{
        s.minHeight = "initial", s.height = o + "px", s.transition = `all ${n}ms`, requestAnimationFrame(()=>{
            s.height = "0", s.padding = "0", s.margin = "0", setTimeout(e, n);
        });
    });
}
function h(e) {
    let { enter: a, exit: r, appendPosition: i = !1, collapse: l = !0, collapseDuration: c = 300 } = e;
    return function(e) {
        let { children: u, position: d, preventExitTransition: p, done: m, nodeRef: f, isIn: h } = e;
        const y = i ? `${a}--${d}` : a, v = i ? `${r}--${d}` : r, T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(0);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])(()=>{
            const t = f.current, e = y.split(" "), n = (o)=>{
                o.target === f.current && (t.dispatchEvent(new Event("d")), t.removeEventListener("animationend", n), t.removeEventListener("animationcancel", n), 0 === T.current && "animationcancel" !== o.type && t.classList.remove(...e));
            };
            t.classList.add(...e), t.addEventListener("animationend", n), t.addEventListener("animationcancel", n);
        }, []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            const t = f.current, e = ()=>{
                t.removeEventListener("animationend", e), l ? g(t, m, c) : m();
            };
            h || (p ? e() : (T.current = 1, t.className += ` ${v}`, t.addEventListener("animationend", e)));
        }, [
            h
        ]), __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Fragment, null, u);
    };
}
function y(t, e) {
    return null != t ? {
        content: t.content,
        containerId: t.props.containerId,
        id: t.props.toastId,
        theme: t.props.theme,
        type: t.props.type,
        data: t.props.data || {},
        isLoading: t.props.isLoading,
        icon: t.props.icon,
        status: e
    } : {};
}
const v = {
    list: new Map,
    emitQueue: new Map,
    on (t, e) {
        return this.list.has(t) || this.list.set(t, []), this.list.get(t).push(e), this;
    },
    off (t, e) {
        if (e) {
            const n = this.list.get(t).filter((t)=>t !== e);
            return this.list.set(t, n), this;
        }
        return this.list.delete(t), this;
    },
    cancelEmit (t) {
        const e = this.emitQueue.get(t);
        return e && (e.forEach(clearTimeout), this.emitQueue.delete(t)), this;
    },
    emit (t) {
        this.list.has(t) && this.list.get(t).forEach((e)=>{
            const n = setTimeout(()=>{
                e(...[].slice.call(arguments, 1));
            }, 0);
            this.emitQueue.has(t) || this.emitQueue.set(t, []), this.emitQueue.get(t).push(n);
        });
    }
}, T = (e)=>{
    let { theme: n, type: o, ...s } = e;
    return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        viewBox: "0 0 24 24",
        width: "100%",
        height: "100%",
        fill: "colored" === n ? "currentColor" : `var(--toastify-icon-color-${o})`,
        ...s
    });
}, E = {
    info: function(e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(T, {
            ...e
        }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
        }));
    },
    warning: function(e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(T, {
            ...e
        }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
        }));
    },
    success: function(e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(T, {
            ...e
        }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
        }));
    },
    error: function(e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(T, {
            ...e
        }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
            d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
        }));
    },
    spinner: function() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            className: "Toastify__spinner"
        });
    }
};
function C(t) {
    const [, o] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useReducer"])((t)=>t + 1, 0), [l, c] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Map).current, T = (t)=>-1 !== l.indexOf(t), C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        toastKey: 1,
        displayedToast: 0,
        count: 0,
        queue: [],
        props: t,
        containerId: null,
        isToastActive: T,
        getToast: (t)=>h.get(t)
    }).current;
    function b(t) {
        let { containerId: e } = t;
        const { limit: n } = C.props;
        !n || e && C.containerId !== e || (C.count -= C.queue.length, C.queue = []);
    }
    function I(t) {
        c((e)=>null == t ? [] : e.filter((e)=>e !== t));
    }
    function _() {
        const { toastContent: t, toastProps: e, staleId: n } = C.queue.shift();
        O(t, e, n);
    }
    function L(t, n) {
        let { delay: s, staleId: r, ...i } = n;
        if (!f(t) || function(t) {
            return !g.current || C.props.enableMultiContainer && t.containerId !== C.props.containerId || h.has(t.toastId) && null == t.updateId;
        }(i)) return;
        const { toastId: l, updateId: c, data: T } = i, { props: b } = C, L = ()=>I(l), N = null == c;
        N && C.count++;
        const M = {
            ...b,
            style: b.toastStyle,
            key: C.toastKey++,
            ...Object.fromEntries(Object.entries(i).filter((t)=>{
                let [e, n] = t;
                return null != n;
            })),
            toastId: l,
            updateId: c,
            data: T,
            closeToast: L,
            isIn: !1,
            className: m(i.className || b.toastClassName),
            bodyClassName: m(i.bodyClassName || b.bodyClassName),
            progressClassName: m(i.progressClassName || b.progressClassName),
            autoClose: !i.isLoading && (R = i.autoClose, w = b.autoClose, !1 === R || u(R) && R > 0 ? R : w),
            deleteToast () {
                const t = y(h.get(l), "removed");
                h.delete(l), v.emit(4, t);
                const e = C.queue.length;
                if (C.count = null == l ? C.count - C.displayedToast : C.count - 1, C.count < 0 && (C.count = 0), e > 0) {
                    const t = null == l ? C.props.limit : 1;
                    if (1 === e || 1 === t) C.displayedToast++, _();
                    else {
                        const n = t > e ? e : t;
                        C.displayedToast = n;
                        for(let t = 0; t < n; t++)_();
                    }
                } else o();
            }
        };
        var R, w;
        M.iconOut = function(t) {
            let { theme: n, type: o, isLoading: s, icon: r } = t, i = null;
            const l = {
                theme: n,
                type: o
            };
            return !1 === r || (p(r) ? i = r(l) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(r) ? i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cloneElement"])(r, l) : d(r) || u(r) ? i = r : s ? i = E.spinner() : ((t)=>t in E)(o) && (i = E[o](l))), i;
        }(M), p(i.onOpen) && (M.onOpen = i.onOpen), p(i.onClose) && (M.onClose = i.onClose), M.closeButton = b.closeButton, !1 === i.closeButton || f(i.closeButton) ? M.closeButton = i.closeButton : !0 === i.closeButton && (M.closeButton = !f(b.closeButton) || b.closeButton);
        let x = t;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(t) && !d(t.type) ? x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cloneElement"])(t, {
            closeToast: L,
            toastProps: M,
            data: T
        }) : p(t) && (x = t({
            closeToast: L,
            toastProps: M,
            data: T
        })), b.limit && b.limit > 0 && C.count > b.limit && N ? C.queue.push({
            toastContent: x,
            toastProps: M,
            staleId: r
        }) : u(s) ? setTimeout(()=>{
            O(x, M, r);
        }, s) : O(x, M, r);
    }
    function O(t, e, n) {
        const { toastId: o } = e;
        n && h.delete(n);
        const s = {
            content: t,
            props: e
        };
        h.set(o, s), c((t)=>[
                ...t,
                o
            ].filter((t)=>t !== n)), v.emit(4, y(s, null == s.props.updateId ? "added" : "updated"));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(C.containerId = t.containerId, v.cancelEmit(3).on(0, L).on(1, (t)=>g.current && I(t)).on(5, b).emit(2, C), ()=>{
            h.clear(), v.emit(3, C);
        }), []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        C.props = t, C.isToastActive = T, C.displayedToast = l.length;
    }), {
        getToastToRender: function(e) {
            const n = new Map, o = Array.from(h.values());
            return t.newestOnTop && o.reverse(), o.forEach((t)=>{
                const { position: e } = t.props;
                n.has(e) || n.set(e, []), n.get(e).push(t);
            }), Array.from(n, (t)=>e(t[0], t[1]));
        },
        containerRef: g,
        isToastActive: T
    };
}
function b(t) {
    return t.targetTouches && t.targetTouches.length >= 1 ? t.targetTouches[0].clientX : t.clientX;
}
function I(t) {
    return t.targetTouches && t.targetTouches.length >= 1 ? t.targetTouches[0].clientY : t.clientY;
}
function _(t) {
    const [o, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(!1), [r, l] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(!1), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({
        start: 0,
        x: 0,
        y: 0,
        delta: 0,
        removalDistance: 0,
        canCloseOnClick: !0,
        canDrag: !1,
        boundingRect: null,
        didMove: !1
    }).current, d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(t), { autoClose: m, pauseOnHover: f, closeToast: g, onClick: h, closeOnClick: y } = t;
    function v(e) {
        if (t.draggable) {
            "touchstart" === e.nativeEvent.type && e.nativeEvent.preventDefault(), u.didMove = !1, document.addEventListener("mousemove", _), document.addEventListener("mouseup", L), document.addEventListener("touchmove", _), document.addEventListener("touchend", L);
            const n = c.current;
            u.canCloseOnClick = !0, u.canDrag = !0, u.boundingRect = n.getBoundingClientRect(), n.style.transition = "", u.x = b(e.nativeEvent), u.y = I(e.nativeEvent), "x" === t.draggableDirection ? (u.start = u.x, u.removalDistance = n.offsetWidth * (t.draggablePercent / 100)) : (u.start = u.y, u.removalDistance = n.offsetHeight * (80 === t.draggablePercent ? 1.5 * t.draggablePercent : t.draggablePercent / 100));
        }
    }
    function T(e) {
        if (u.boundingRect) {
            const { top: n, bottom: o, left: s, right: a } = u.boundingRect;
            "touchend" !== e.nativeEvent.type && t.pauseOnHover && u.x >= s && u.x <= a && u.y >= n && u.y <= o ? C() : E();
        }
    }
    function E() {
        a(!0);
    }
    function C() {
        a(!1);
    }
    function _(e) {
        const n = c.current;
        u.canDrag && n && (u.didMove = !0, o && C(), u.x = b(e), u.y = I(e), u.delta = "x" === t.draggableDirection ? u.x - u.start : u.y - u.start, u.start !== u.x && (u.canCloseOnClick = !1), n.style.transform = `translate${t.draggableDirection}(${u.delta}px)`, n.style.opacity = "" + (1 - Math.abs(u.delta / u.removalDistance)));
    }
    function L() {
        document.removeEventListener("mousemove", _), document.removeEventListener("mouseup", L), document.removeEventListener("touchmove", _), document.removeEventListener("touchend", L);
        const e = c.current;
        if (u.canDrag && u.didMove && e) {
            if (u.canDrag = !1, Math.abs(u.delta) > u.removalDistance) return l(!0), void t.closeToast();
            e.style.transition = "transform 0.2s, opacity 0.2s", e.style.transform = `translate${t.draggableDirection}(0)`, e.style.opacity = "1";
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        d.current = t;
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(c.current && c.current.addEventListener("d", E, {
            once: !0
        }), p(t.onOpen) && t.onOpen((0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(t.children) && t.children.props), ()=>{
            const t = d.current;
            p(t.onClose) && t.onClose((0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(t.children) && t.children.props);
        }), []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>(t.pauseOnFocusLoss && (document.hasFocus() || C(), window.addEventListener("focus", E), window.addEventListener("blur", C)), ()=>{
            t.pauseOnFocusLoss && (window.removeEventListener("focus", E), window.removeEventListener("blur", C));
        }), [
        t.pauseOnFocusLoss
    ]);
    const O = {
        onMouseDown: v,
        onTouchStart: v,
        onMouseUp: T,
        onTouchEnd: T
    };
    return m && f && (O.onMouseEnter = C, O.onMouseLeave = E), y && (O.onClick = (t)=>{
        h && h(t), u.canCloseOnClick && g();
    }), {
        playToast: E,
        pauseToast: C,
        isRunning: o,
        preventExitTransition: r,
        toastRef: c,
        eventHandlers: O
    };
}
function L(e) {
    let { closeToast: n, theme: o, ariaLabel: s = "close" } = e;
    return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        className: `Toastify__close-button Toastify__close-button--${o}`,
        type: "button",
        onClick: (t)=>{
            t.stopPropagation(), n(t);
        },
        "aria-label": s
    }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 14 16"
    }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    })));
}
function O(e) {
    let { delay: n, isRunning: o, closeToast: s, type: a = "default", hide: r, className: i, style: l, controlledProgress: u, progress: d, rtl: m, isIn: f, theme: g } = e;
    const h = r || u && 0 === d, y = {
        ...l,
        animationDuration: `${n}ms`,
        animationPlayState: o ? "running" : "paused",
        opacity: h ? 0 : 1
    };
    u && (y.transform = `scaleX(${d})`);
    const v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("Toastify__progress-bar", u ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g}`, `Toastify__progress-bar--${a}`, {
        "Toastify__progress-bar--rtl": m
    }), T = p(i) ? i({
        rtl: m,
        type: a,
        defaultClassName: v
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(v, i);
    return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        role: "progressbar",
        "aria-hidden": h ? "true" : "false",
        "aria-label": "notification timer",
        className: T,
        style: y,
        [u && d >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: u && d < 1 ? null : ()=>{
            f && s();
        }
    });
}
const N = (n)=>{
    const { isRunning: o, preventExitTransition: s, toastRef: r, eventHandlers: i } = _(n), { closeButton: l, children: u, autoClose: d, onClick: m, type: f, hideProgressBar: g, closeToast: h, transition: y, position: v, className: T, style: E, bodyClassName: C, bodyStyle: b, progressClassName: I, progressStyle: N, updateId: M, role: R, progress: w, rtl: x, toastId: $, deleteToast: k, isIn: P, isLoading: B, iconOut: D, closeOnClick: A, theme: z } = n, F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast", `Toastify__toast-theme--${z}`, `Toastify__toast--${f}`, {
        "Toastify__toast--rtl": x
    }, {
        "Toastify__toast--close-on-click": A
    }), H = p(T) ? T({
        rtl: x,
        position: v,
        type: f,
        defaultClassName: F
    }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(F, T), S = !!w || !d, q = {
        closeToast: h,
        type: f,
        theme: z
    };
    let Q = null;
    return !1 === l || (Q = p(l) ? l(q) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidElement"])(l) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["cloneElement"])(l, q) : L(q)), __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(y, {
        isIn: P,
        done: k,
        position: v,
        preventExitTransition: s,
        nodeRef: r
    }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: $,
        onClick: m,
        className: H,
        ...i,
        style: E,
        ref: r
    }, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        ...P && {
            role: R
        },
        className: p(C) ? C({
            type: f
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-body", C),
        style: b
    }, null != D && __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-icon", {
            "Toastify--animate-icon Toastify__zoom-enter": !B
        })
    }, D), __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", null, u)), Q, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(O, {
        ...M && !S ? {
            key: `pb-${M}`
        } : {},
        rtl: x,
        theme: z,
        delay: d,
        isRunning: o,
        isIn: P,
        closeToast: h,
        hide: g,
        type: f,
        style: N,
        className: I,
        controlledProgress: S,
        progress: w || 0
    })));
}, M = function(t, e) {
    return void 0 === e && (e = !1), {
        enter: `Toastify--animate Toastify__${t}-enter`,
        exit: `Toastify--animate Toastify__${t}-exit`,
        appendPosition: e
    };
}, R = h(M("bounce", !0)), w = h(M("slide", !0)), x = h(M("zoom")), $ = h(M("flip")), k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["forwardRef"])((e, n)=>{
    const { getToastToRender: o, containerRef: a, isToastActive: r } = C(e), { className: i, style: l, rtl: u, containerId: d } = e;
    function f(t) {
        const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("Toastify__toast-container", `Toastify__toast-container--${t}`, {
            "Toastify__toast-container--rtl": u
        });
        return p(i) ? i({
            position: t,
            rtl: u,
            defaultClassName: e
        }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$m$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(e, m(i));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        n && (n.current = a.current);
    }, []), __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        ref: a,
        className: "Toastify",
        id: d
    }, o((e, n)=>{
        const o = n.length ? {
            ...l
        } : {
            ...l,
            pointerEvents: "none"
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
            className: f(e),
            style: o,
            key: `container-${e}`
        }, n.map((e, o)=>{
            let { content: s, props: a } = e;
            return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].createElement(N, {
                ...a,
                isIn: r(a.toastId),
                style: {
                    ...a.style,
                    "--nth": o + 1,
                    "--len": n.length
                },
                key: `toast-${a.key}`
            }, s);
        }));
    }));
});
k.displayName = "ToastContainer", k.defaultProps = {
    position: "top-right",
    transition: R,
    autoClose: 5e3,
    closeButton: L,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    closeOnClick: !0,
    draggable: !0,
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light"
};
let P, B = new Map, D = [], A = 1;
function z() {
    return "" + A++;
}
function F(t) {
    return t && (d(t.toastId) || u(t.toastId)) ? t.toastId : z();
}
function H(t, e) {
    return B.size > 0 ? v.emit(0, t, e) : D.push({
        content: t,
        options: e
    }), e.toastId;
}
function S(t, e) {
    return {
        ...e,
        type: e && e.type || t,
        toastId: F(e)
    };
}
function q(t) {
    return (e, n)=>H(e, S(t, n));
}
function Q(t, e) {
    return H(t, S("default", e));
}
Q.loading = (t, e)=>H(t, S("default", {
        isLoading: !0,
        autoClose: !1,
        closeOnClick: !1,
        closeButton: !1,
        draggable: !1,
        ...e
    })), Q.promise = function(t, e, n) {
    let o, { pending: s, error: a, success: r } = e;
    s && (o = d(s) ? Q.loading(s, n) : Q.loading(s.render, {
        ...n,
        ...s
    }));
    const i = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null
    }, l = (t, e, s)=>{
        if (null == e) return void Q.dismiss(o);
        const a = {
            type: t,
            ...i,
            ...n,
            data: s
        }, r = d(e) ? {
            render: e
        } : e;
        return o ? Q.update(o, {
            ...a,
            ...r
        }) : Q(r.render, {
            ...a,
            ...r
        }), s;
    }, c = p(t) ? t() : t;
    return c.then((t)=>l("success", r, t)).catch((t)=>l("error", a, t)), c;
}, Q.success = q("success"), Q.info = q("info"), Q.error = q("error"), Q.warning = q("warning"), Q.warn = Q.warning, Q.dark = (t, e)=>H(t, S("default", {
        theme: "dark",
        ...e
    })), Q.dismiss = (t)=>{
    B.size > 0 ? v.emit(1, t) : D = D.filter((e)=>null != t && e.options.toastId !== t);
}, Q.clearWaitingQueue = function(t) {
    return void 0 === t && (t = {}), v.emit(5, t);
}, Q.isActive = (t)=>{
    let e = !1;
    return B.forEach((n)=>{
        n.isToastActive && n.isToastActive(t) && (e = !0);
    }), e;
}, Q.update = function(t, e) {
    void 0 === e && (e = {}), setTimeout(()=>{
        const n = function(t, e) {
            let { containerId: n } = e;
            const o = B.get(n || P);
            return o && o.getToast(t);
        }(t, e);
        if (n) {
            const { props: o, content: s } = n, a = {
                delay: 100,
                ...o,
                ...e,
                toastId: e.toastId || t,
                updateId: z()
            };
            a.toastId !== t && (a.staleId = t);
            const r = a.render || s;
            delete a.render, H(r, a);
        }
    }, 0);
}, Q.done = (t)=>{
    Q.update(t, {
        progress: 1
    });
}, Q.onChange = (t)=>(v.on(4, t), ()=>{
        v.off(4, t);
    }), Q.POSITION = {
    TOP_LEFT: "top-left",
    TOP_RIGHT: "top-right",
    TOP_CENTER: "top-center",
    BOTTOM_LEFT: "bottom-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_CENTER: "bottom-center"
}, Q.TYPE = {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
    DEFAULT: "default"
}, v.on(2, (t)=>{
    P = t.containerId || t, B.set(P, t), D.forEach((t)=>{
        v.emit(0, t.content, t.options);
    }), D = [];
}).on(3, (t)=>{
    B.delete(t.containerId || t), 0 === B.size && v.off(0).off(1).off(5);
});
;
 //# sourceMappingURL=react-toastify.esm.mjs.map
}),
]);

//# sourceMappingURL=a1723_3ff8d414._.js.map