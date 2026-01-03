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
"[project]/AdminCMS/src/pages/login.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [client] (ecmascript)"); // Changed to navigation to match your code, or keep 'next/router'
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-hook-form/dist/index.esm.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-toastify/dist/react-toastify.esm.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/mail.js [client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/lock.js [client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/arrow-right.js [client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [client] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/circle-alert.js [client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/head.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
function LoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        "LoginPage.useAuthStore[setUser]": (state)=>state.setUser
    }["LoginPage.useAuthStore[setUser]"]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Using your existing form logic
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"])();
    const onSubmit = async (data)=>{
        setLoading(true);
        try {
            // 1. YOUR ORIGINAL LOGIC
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["authAPI"].login(data.email, data.password);
            const { accessToken, refreshToken, user } = response.data;
            // 2. YOUR ORIGINAL STORAGE LOGIC
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user, accessToken, refreshToken);
            // 3. SUCCESS & REDIRECT
            __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].success('Login successful');
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$react$2d$toastify$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || 'Login failed');
        } finally{
            setLoading(false);
        }
    };
    return(// DARK THEME WRAPPER (Only applies to this page)
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center font-sans selection:bg-purple-500/30 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: "Login | AdminCMS"
                }, void 0, false, {
                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 flex flex-col items-center z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
                            size: 24,
                            className: "text-white"
                        }, void 0, false, {
                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/login.jsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold tracking-tight",
                        children: [
                            "Admin",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-purple-400",
                                children: "CMS"
                            }, void 0, false, {
                                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                lineNumber: 61,
                                columnNumber: 16
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AdminCMS/src/pages/login.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl z-10 mx-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#121212] rounded-xl p-8 shadow-2xl border border-white/5 backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-white mb-2",
                                    children: "Access Your Account"
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-sm",
                                    children: "Sign in to manage your content."
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit(onSubmit),
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-400 uppercase tracking-wider ml-1",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors",
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    placeholder: "admin@example.com",
                                                    ...register("email", {
                                                        required: "Email is required"
                                                    }),
                                                    className: "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 81,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 88,
                                                    columnNumber: 95
                                                }, this),
                                                " ",
                                                errors.email.message
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 88,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-400 uppercase tracking-wider ml-1",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    className: "absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors",
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "password",
                                                    placeholder: "••••••••",
                                                    ...register("password", {
                                                        required: "Password is required"
                                                    }),
                                                    className: "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 96,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this),
                                        errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 103,
                                                    columnNumber: 98
                                                }, this),
                                                " ",
                                                errors.password.message
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 103,
                                            columnNumber: 35
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: loading ? 'Authenticating...' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            "Login ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 18,
                                                className: "group-hover:translate-x-1 transition-transform"
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                lineNumber: 114,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-8 text-gray-600 text-xs z-10",
                children: "© 2025 AdminCMS. All rights reserved Powered by SRP Admin CMS."
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/pages/login.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, this));
}
_s(LoginPage, "NNdZmZnJFI7lk+3QmVdQyRhol3g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/AdminCMS/src/pages/login.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/login";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/AdminCMS/src/pages/login.jsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/AdminCMS/src/pages/login\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/AdminCMS/src/pages/login.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f93f9c05._.js.map