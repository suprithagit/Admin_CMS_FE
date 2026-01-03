module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/react-hook-form [external] (react-hook-form, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-hook-form");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/axios [external] (axios, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/AdminCMS/src/lib/apiClient.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const API_URL = ("TURBOPACK compile-time value", "https://cmsbackend-arlh.onrender.com/api") || 'http://localhost:5000/api';
const apiClient = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].create({
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
            const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post(`${API_URL}/auth/refresh`, {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/AdminCMS/src/lib/api.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/apiClient.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const authAPI = {
    login: (email, password)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/login', {
            email,
            password
        }),
    register: (email, password, name)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/register', {
            email,
            password,
            name
        }),
    refresh: (refreshToken)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/auth/refresh', {
            refreshToken
        })
};
const aboutAPI = {
    get: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/about'),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/about', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/about/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/about/${id}`)
};
const skillsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/skills'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/skills/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/skills', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/skills/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/skills/${id}`)
};
const projectsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/projects'),
    getFeatured: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/projects/featured'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/projects/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/projects', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/projects/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/projects/${id}`)
};
const blogsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/blogs'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/blogs/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/blogs', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/blogs/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/blogs/${id}`)
};
const experienceAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/experience'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/experience/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/experience', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/experience/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/experience/${id}`)
};
const servicesAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/services'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/services/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/services', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/services/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/services/${id}`)
};
const testimonialsAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/testimonials'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/testimonials/${id}`),
    create: (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/testimonials', data),
    update: (id, data)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].put(`/testimonials/${id}`, data),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/testimonials/${id}`)
};
const contactAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/contact'),
    getUnread: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/contact/unread'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/contact/${id}`),
    reply: (id, replyMessage)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post(`/contact/${id}/reply`, {
            replyMessage
        }),
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/contact/${id}`)
};
const mediaAPI = {
    getAll: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get('/media'),
    getById: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].get(`/media/${id}`),
    upload: (file)=>{
        const formData = new FormData();
        formData.append('file', file);
        return __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    delete: (id)=>__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$apiClient$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/media/${id}`)
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/zustand [external] (zustand, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("zustand");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/AdminCMS/src/context/authStore.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/zustand [external] (zustand, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const useAuthStore = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$zustand__$5b$external$5d$__$28$zustand$2c$__esm_import$29$__["create"])((set)=>({
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
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
    }));
const __TURBOPACK__default__export__ = useAuthStore;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/AdminCMS/src/pages/login.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [ssr] (ecmascript)"); // Changed to navigation to match your code, or keep 'next/router'
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hook-form [external] (react-hook-form, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/mail.js [ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/lock.js [ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/arrow-right.js [ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [ssr] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/lucide-react/dist/esm/icons/circle-alert.js [ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/head.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
function LoginPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const setUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])((state)=>state.setUser);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Using your existing form logic
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__["useForm"])();
    const onSubmit = async (data)=>{
        setLoading(true);
        try {
            // 1. YOUR ORIGINAL LOGIC
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["authAPI"].login(data.email, data.password);
            const { accessToken, refreshToken, user } = response.data;
            // 2. YOUR ORIGINAL STORAGE LOGIC
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user, accessToken, refreshToken);
            // 3. SUCCESS & REDIRECT
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].success('Login successful');
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].error(error.response?.data?.message || 'Login failed');
        } finally{
            setLoading(false);
        }
    };
    return(// DARK THEME WRAPPER (Only applies to this page)
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center font-sans selection:bg-purple-500/30 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/pages/login.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-8 flex flex-col items-center z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold tracking-tight",
                        children: [
                            "Admin",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl z-10 mx-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-[#121212] rounded-xl p-8 shadow-2xl border border-white/5 backdrop-blur-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-bold text-white mb-2",
                                    children: "Access Your Account"
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit(onSubmit),
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-400 uppercase tracking-wider ml-1",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 78,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors",
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                                        errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "text-xs font-medium text-gray-400 uppercase tracking-wider ml-1",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "relative group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    className: "absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors",
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/login.jsx",
                                                    lineNumber: 95,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
                                        errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-red-400 text-xs flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                                    children: loading ? 'Authenticating...' : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            "Login ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__83e259da._.js.map