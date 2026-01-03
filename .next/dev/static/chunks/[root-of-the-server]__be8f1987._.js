(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/AdminCMS/src/components/Sidebar.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-icons/fi/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Sidebar() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const menuItems = [
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'About',
            href: '/about'
        },
        {
            label: 'Skills',
            href: '/skills'
        },
        {
            label: 'Projects',
            href: '/projects'
        },
        {
            label: 'Blogs',
            href: '/blogs'
        },
        {
            label: 'Experience',
            href: '/experience'
        },
        {
            label: 'Services',
            href: '/services'
        },
        {
            label: 'Testimonials',
            href: '/testimonials'
        },
        {
            label: 'Messages',
            href: '/messages'
        },
        {
            label: 'Media',
            href: '/media'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `${open ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 min-h-screen`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex items-center justify-between",
                children: [
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold",
                        children: "CMS"
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                        lineNumber: 30,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen(!open),
                        className: "p-2 rounded hover:bg-gray-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FiMenu"], {}, void 0, false, {
                            fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "mt-8",
                children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: item.href,
                        className: `block px-4 py-3 hover:bg-gray-700 transition ${!open && 'text-center'}`,
                        children: open ? item.label : item.label.charAt(0)
                    }, item.href, false, {
                        fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "dVkDIfRb5RN4FjtonjBYYwpg89o=");
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/context/authStore.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/zustand/esm/index.mjs [client] (ecmascript) <locals>");
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        setUser: (user, accessToken, refreshToken)=>set({
                user,
                accessToken,
                refreshToken,
                isAuthenticated: true
            }),
        logout: ()=>set({
                user: null,
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false
            }),
        loadFromStorage: ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const user = localStorage.getItem('user');
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                if (user && accessToken) {
                    set({
                        user: JSON.parse(user),
                        accessToken,
                        refreshToken,
                        isAuthenticated: true
                    });
                }
            }
        }
    }));
const __TURBOPACK__default__export__ = useAuthStore;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/components/Topbar.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-icons/fi/index.esm.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Topbar() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    const handleLogout = ()=>{
        logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white shadow-sm p-4 flex justify-between items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-gray-800",
                children: "Portfolio CMS"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600",
                        children: new Date().toLocaleDateString()
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 border-l pl-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-gray-800",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: user.email
                                    }, void 0, false, {
                                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                        lineNumber: 30,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "bg-red-600 hover:bg-red-700 p-2 rounded text-white transition flex items-center gap-2",
                                title: "Logout",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["FiLogOut"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Topbar, "LOSyjRaR5XE8mcRnBdQ2oSGz0YU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/components/ProtectedRoute.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ProtectedRoute({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, loadFromStorage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            loadFromStorage();
            if (!isAuthenticated) {
                router.push('/login');
            }
        }
    }["ProtectedRoute.useEffect"], [
        isAuthenticated,
        router,
        loadFromStorage
    ]);
    if (!isAuthenticated) {
        return null;
    }
    return children;
}
_s(ProtectedRoute, "pbFJndfIXb5ckuE2+NWOP93xw0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/components/TextInput.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
function TextInput({ label, name, register, errors, placeholder = '', type = 'text' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextInput.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                placeholder: placeholder,
                ...register(name, {
                    required: `${label} is required`
                }),
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextInput.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            errors[name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 text-sm mt-1",
                children: errors[name].message
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextInput.jsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/components/TextInput.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = TextInput;
var _c;
__turbopack_context__.k.register(_c, "TextInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/components/TextArea.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextArea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
'use client';
;
function TextArea({ label, name, register, errors, placeholder = '', rows = 4 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextArea.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                placeholder: placeholder,
                rows: rows,
                ...register(name, {
                    required: `${label} is required`
                }),
                className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextArea.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            errors[name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-600 text-sm mt-1",
                children: errors[name].message
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextArea.jsx",
                lineNumber: 14,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/components/TextArea.jsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = TextArea;
var _c;
__turbopack_context__.k.register(_c, "TextArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/lib/apiClient.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/AdminCMS/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/axios/lib/axios.js [client] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "https://cmsbackend-arlh.onrender.com/api") || 'http://localhost:5000/api';
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Add token to requests
apiClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Handle token refresh
apiClient.interceptors.response.use((response)=>response, async (error)=>{
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${API_URL}/auth/refresh`, {
                refreshToken
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            return apiClient(originalRequest);
        } catch (err) {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/lib/api.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aboutAPI",
    ()=>aboutAPI,
    "authAPI",
    ()=>authAPI,
    "blogsAPI",
    ()=>blogsAPI,
    "contactAPI",
    ()=>contactAPI,
    "experienceAPI",
    ()=>experienceAPI,
    "mediaAPI",
    ()=>mediaAPI,
    "projectsAPI",
    ()=>projectsAPI,
    "servicesAPI",
    ()=>servicesAPI,
    "skillsAPI",
    ()=>skillsAPI,
    "testimonialsAPI",
    ()=>testimonialsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/apiClient.js [client] (ecmascript)");
;
const authAPI = {
    login: (email, password)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/auth/login', {
            email,
            password
        }),
    register: (email, password, name)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/auth/register', {
            email,
            password,
            name
        }),
    refresh: (refreshToken)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/auth/refresh', {
            refreshToken
        })
};
const aboutAPI = {
    get: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/about'),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/about', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/about/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/about/${id}`)
};
const skillsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/skills'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/skills/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/skills', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/skills/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/skills/${id}`)
};
const projectsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/projects'),
    getFeatured: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/projects/featured'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/projects/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/projects', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/projects/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/projects/${id}`)
};
const blogsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/blogs'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/blogs/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/blogs', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/blogs/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/blogs/${id}`)
};
const experienceAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/experience'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/experience/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/experience', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/experience/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/experience/${id}`)
};
const servicesAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/services'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/services/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/services', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/services/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/services/${id}`)
};
const testimonialsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/testimonials'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/testimonials/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/testimonials', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].put(`/testimonials/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/testimonials/${id}`)
};
const contactAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/contact'),
    getUnread: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/contact/unread'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/contact/${id}`),
    reply: (id, replyMessage)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`/contact/${id}/reply`, {
            replyMessage
        }),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/contact/${id}`)
};
const mediaAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get('/media'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].get(`/media/${id}`),
    upload: (file)=>{
        const formData = new FormData();
        formData.append('file', file);
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].delete(`/media/${id}`)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/AdminCMS/src/pages/about.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-hook-form/dist/index.esm.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/Sidebar.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/Topbar.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/ProtectedRoute.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/TextInput.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextArea$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/TextArea.jsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-toastify/dist/react-toastify.esm.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function AboutPage() {
    _s();
    const [about, setAbout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { register, handleSubmit, reset, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AboutPage.useEffect": ()=>{
            fetchAbout();
        }
    }["AboutPage.useEffect"], []);
    const fetchAbout = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["aboutAPI"].get();
            // Only set data if response exists
            if (response.data) {
                setAbout(response.data);
                // ✅ MAP DATABASE (snake_case) TO FORM (camelCase)
                // This ensures the form pre-fills correctly
                reset({
                    title: response.data.title,
                    description: response.data.description,
                    image: response.data.image,
                    resume: response.data.resume,
                    yearsExperience: response.data.years_experience,
                    featured: response.data.featured
                });
            }
        } catch (error) {
            // It's okay if no about info exists yet
            console.log("No about info found, ready to create.");
        }
    };
    const onSubmit = async (data)=>{
        try {
            // ✅ PREPARE DATA FOR DB (Convert back to snake_case)
            const formattedData = {
                title: data.title,
                description: data.description,
                image: data.image,
                resume: data.resume,
                // ✅ SAVE AS TEXT (No parseInt)
                years_experience: data.yearsExperience,
                featured: data.featured || false
            };
            if (about?.id) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["aboutAPI"].update(about.id, formattedData);
                __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success('About updated');
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["aboutAPI"].create(formattedData);
                __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success('About created');
            }
            fetchAbout();
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error('Error saving about');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/AdminCMS/src/pages/about.jsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/AdminCMS/src/pages/about.jsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 p-8 bg-gray-50 overflow-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold mb-8",
                                    children: "About"
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded shadow p-8 max-w-2xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit(onSubmit),
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Title",
                                                name: "title",
                                                register: register,
                                                errors: errors,
                                                placeholder: "Your title (e.g. Full Stack Developer)"
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 85,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextArea$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Description",
                                                name: "description",
                                                register: register,
                                                errors: errors,
                                                rows: 6
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Image URL",
                                                name: "image",
                                                register: register,
                                                errors: errors,
                                                placeholder: "https://..."
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Resume URL",
                                                name: "resume",
                                                register: register,
                                                errors: errors,
                                                placeholder: "https://..."
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 106,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                label: "Years of Experience",
                                                name: "yearsExperience",
                                                // type="number"  <-- REMOVED THIS so it accepts text
                                                register: register,
                                                errors: errors,
                                                placeholder: "e.g. 5+ Years"
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold",
                                                children: "Save About"
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/about.jsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AdminCMS/src/pages/about.jsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AdminCMS/src/pages/about.jsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AdminCMS/src/pages/about.jsx",
            lineNumber: 76,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AdminCMS/src/pages/about.jsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(AboutPage, "aQKZzeclGqyOiNMi/INxJiqAb7o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = AboutPage;
var _c;
__turbopack_context__.k.register(_c, "AboutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/AdminCMS/src/pages/about.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/about";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/AdminCMS/src/pages/about.jsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/AdminCMS/src/pages/about\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/AdminCMS/src/pages/about.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__be8f1987._.js.map