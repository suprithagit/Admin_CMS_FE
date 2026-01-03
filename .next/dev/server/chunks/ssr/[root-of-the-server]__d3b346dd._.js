module.exports = [
"[externals]/react-hook-form [external] (react-hook-form, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-hook-form");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/AdminCMS/src/components/Sidebar.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-icons/fi/index.esm.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
'use client';
;
;
;
;
function Sidebar() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
        className: `${open ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 min-h-screen`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-4 flex items-center justify-between",
                children: [
                    open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold",
                        children: "CMS"
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/components/Sidebar.jsx",
                        lineNumber: 30,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen(!open),
                        className: "p-2 rounded hover:bg-gray-700",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["FiMenu"], {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: "mt-8",
                children: menuItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
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
"[project]/AdminCMS/src/components/Topbar.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-icons/fi/index.esm.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
function Topbar() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { logout, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    const handleLogout = ()=>{
        logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "bg-white shadow-sm p-4 flex justify-between items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-gray-800",
                children: "Portfolio CMS"
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-sm text-gray-600",
                        children: new Date().toLocaleDateString()
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 border-l pl-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-gray-800",
                                        children: user.name
                                    }, void 0, false, {
                                        fileName: "[project]/AdminCMS/src/components/Topbar.jsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "bg-red-600 hover:bg-red-700 p-2 rounded text-white transition flex items-center gap-2",
                                title: "Logout",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["FiLogOut"], {
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/AdminCMS/src/components/ProtectedRoute.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/next/navigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/context/authStore.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
function ProtectedRoute({ children }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, loadFromStorage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$context$2f$authStore$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadFromStorage();
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [
        isAuthenticated,
        router,
        loadFromStorage
    ]);
    if (!isAuthenticated) {
        return null;
    }
    return children;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/AdminCMS/src/components/TextInput.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextInput
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
function TextInput({ label, name, register, errors, placeholder = '', type = 'text' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextInput.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
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
            errors[name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
}),
"[project]/AdminCMS/src/components/TextArea.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextArea
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
'use client';
;
function TextArea({ label, name, register, errors, placeholder = '', rows = 4 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "block text-sm font-semibold mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/AdminCMS/src/components/TextArea.jsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
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
            errors[name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
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
}),
"[project]/AdminCMS/src/components/Modal.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hook-form [external] (react-hook-form, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
function Modal({ isOpen, title, onClose, onSubmit, children, defaultValues }) {
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/AdminCMS/src/components/Modal.jsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this),
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/AdminCMS/src/components/Modal.jsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: onSubmit,
                            className: "flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
                            children: "Submit"
                        }, void 0, false, {
                            fileName: "[project]/AdminCMS/src/components/Modal.jsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/AdminCMS/src/components/Modal.jsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/AdminCMS/src/components/Modal.jsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/AdminCMS/src/components/Modal.jsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/AdminCMS/src/pages/blogs.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>BlogsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-hook-form [external] (react-hook-form, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/Sidebar.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/Topbar.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/ProtectedRoute.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/TextInput.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextArea$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/TextArea.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Modal$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/components/Modal.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/src/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-toastify [external] (react-toastify, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/AdminCMS/node_modules/react-icons/fi/index.esm.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Modal$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Modal$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
;
;
function BlogsPage() {
    const [blogs, setBlogs] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const { register, handleSubmit, reset, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$hook$2d$form__$5b$external$5d$__$28$react$2d$hook$2d$form$2c$__esm_import$29$__["useForm"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchBlogs();
    }, []);
    const fetchBlogs = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["blogsAPI"].getAll();
            setBlogs(response.data);
        } catch (error) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].error('Error fetching blogs');
        }
    };
    const onSubmit = async (data)=>{
        try {
            if (editingId) {
                await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["blogsAPI"].update(editingId, data);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].success('Blog updated');
            } else {
                await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["blogsAPI"].create(data);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].success('Blog created');
            }
            setModalOpen(false);
            reset();
            setEditingId(null);
            fetchBlogs();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].error('Error saving blog');
        }
    };
    const handleEdit = (blog)=>{
        reset(blog);
        setEditingId(blog._id);
        setModalOpen(true);
    };
    const handleDelete = async (id)=>{
        if (window.confirm('Are you sure?')) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["blogsAPI"].delete(id);
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].success('Blog deleted');
                fetchBlogs();
            } catch (error) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$toastify__$5b$external$5d$__$28$react$2d$toastify$2c$__esm_import$29$__["toast"].error('Error deleting blog');
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$ProtectedRoute$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Topbar$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1 p-8 bg-gray-50 overflow-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                className: "text-3xl font-bold",
                                                children: "Blogs"
                                            }, void 0, false, {
                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                lineNumber: 78,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    reset();
                                                    setEditingId(null);
                                                    setModalOpen(true);
                                                },
                                                className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["FiPlus"], {}, void 0, false, {
                                                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                        lineNumber: 87,
                                                        columnNumber: 17
                                                    }, this),
                                                    " Add Blog"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "bg-white rounded shadow overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                            className: "w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                                    className: "bg-gray-100",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left font-semibold",
                                                                children: "Title"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                lineNumber: 95,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left font-semibold",
                                                                children: "Author"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                lineNumber: 96,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left font-semibold",
                                                                children: "Published"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                lineNumber: 97,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left font-semibold",
                                                                children: "Views"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                lineNumber: 98,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                                className: "px-6 py-3 text-left font-semibold",
                                                                children: "Actions"
                                                            }, void 0, false, {
                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                lineNumber: 99,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                    lineNumber: 93,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                                    children: blogs.map((blog)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                            className: "border-t hover:bg-gray-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 font-semibold",
                                                                    children: blog.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                    lineNumber: 105,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4",
                                                                    children: blog.author
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                    lineNumber: 106,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4",
                                                                    children: blog.published ? 'Yes' : 'No'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                    lineNumber: 107,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4",
                                                                    children: blog.views
                                                                }, void 0, false, {
                                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                    lineNumber: 108,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                                    className: "px-6 py-4 flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleEdit(blog),
                                                                            className: "text-blue-600 hover:text-blue-800",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["FiEdit"], {}, void 0, false, {
                                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                                lineNumber: 114,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                            lineNumber: 110,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDelete(blog._id),
                                                                            className: "text-red-600 hover:text-red-800",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$esm$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["FiTrash2"], {}, void 0, false, {
                                                                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                                lineNumber: 120,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                            lineNumber: 116,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                                    lineNumber: 109,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, blog._id, true, {
                                                            fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                            lineNumber: 104,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$Modal$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: modalOpen,
                title: editingId ? 'Edit Blog' : 'Add Blog',
                onClose: ()=>{
                    setModalOpen(false);
                    reset();
                    setEditingId(null);
                },
                onSubmit: handleSubmit(onSubmit),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Title",
                        name: "title",
                        register: register,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextArea$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Content",
                        name: "content",
                        register: register,
                        errors: errors,
                        rows: 6
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextArea$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Excerpt",
                        name: "excerpt",
                        register: register,
                        errors: errors,
                        rows: 3
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$AdminCMS$2f$src$2f$components$2f$TextInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Image URL",
                        name: "image",
                        register: register,
                        errors: errors
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    ...register('published'),
                                    className: "mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold",
                                    children: "Published"
                                }, void 0, false, {
                                    fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/AdminCMS/src/pages/blogs.jsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3b346dd._.js.map