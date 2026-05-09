(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function Hp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Eu={exports:{}},ia={},Cu={exports:{}},M={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zr=Symbol.for("react.element"),Wp=Symbol.for("react.portal"),Vp=Symbol.for("react.fragment"),Kp=Symbol.for("react.strict_mode"),Gp=Symbol.for("react.profiler"),Yp=Symbol.for("react.provider"),qp=Symbol.for("react.context"),Qp=Symbol.for("react.forward_ref"),Xp=Symbol.for("react.suspense"),Jp=Symbol.for("react.memo"),Zp=Symbol.for("react.lazy"),Tl=Symbol.iterator;function eh(e){return e===null||typeof e!="object"?null:(e=Tl&&e[Tl]||e["@@iterator"],typeof e=="function"?e:null)}var _u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},bu=Object.assign,Nu={};function Hn(e,t,n){this.props=e,this.context=t,this.refs=Nu,this.updater=n||_u}Hn.prototype.isReactComponent={};Hn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Hn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ju(){}ju.prototype=Hn.prototype;function vs(e,t,n){this.props=e,this.context=t,this.refs=Nu,this.updater=n||_u}var ws=vs.prototype=new ju;ws.constructor=vs;bu(ws,Hn.prototype);ws.isPureReactComponent=!0;var Il=Array.isArray,Tu=Object.prototype.hasOwnProperty,xs={current:null},Iu={key:!0,ref:!0,__self:!0,__source:!0};function Ru(e,t,n){var r,i={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)Tu.call(t,r)&&!Iu.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var c=Array(l),u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:zr,type:e,key:a,ref:o,props:i,_owner:xs.current}}function th(e,t){return{$$typeof:zr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ss(e){return typeof e=="object"&&e!==null&&e.$$typeof===zr}function nh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Rl=/\/+/g;function _a(e,t){return typeof e=="object"&&e!==null&&e.key!=null?nh(""+e.key):t.toString(36)}function pi(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case zr:case Wp:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+_a(o,0):r,Il(i)?(n="",e!=null&&(n=e.replace(Rl,"$&/")+"/"),pi(i,t,n,"",function(u){return u})):i!=null&&(Ss(i)&&(i=th(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Rl,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",Il(e))for(var l=0;l<e.length;l++){a=e[l];var c=r+_a(a,l);o+=pi(a,t,n,c,i)}else if(c=eh(e),typeof c=="function")for(e=c.call(e),l=0;!(a=e.next()).done;)a=a.value,c=r+_a(a,l++),o+=pi(a,t,n,c,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function qr(e,t,n){if(e==null)return e;var r=[],i=0;return pi(e,r,"","",function(a){return t.call(n,a,i++)}),r}function rh(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var he={current:null},hi={transition:null},ih={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:hi,ReactCurrentOwner:xs};function Pu(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:qr,forEach:function(e,t,n){qr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return qr(e,function(){t++}),t},toArray:function(e){return qr(e,function(t){return t})||[]},only:function(e){if(!Ss(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=Hn;M.Fragment=Vp;M.Profiler=Gp;M.PureComponent=vs;M.StrictMode=Kp;M.Suspense=Xp;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ih;M.act=Pu;M.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=bu({},e.props),i=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=xs.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(c in t)Tu.call(t,c)&&!Iu.hasOwnProperty(c)&&(r[c]=t[c]===void 0&&l!==void 0?l[c]:t[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var u=0;u<c;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:zr,type:e.type,key:i,ref:a,props:r,_owner:o}};M.createContext=function(e){return e={$$typeof:qp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Yp,_context:e},e.Consumer=e};M.createElement=Ru;M.createFactory=function(e){var t=Ru.bind(null,e);return t.type=e,t};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:Qp,render:e}};M.isValidElement=Ss;M.lazy=function(e){return{$$typeof:Zp,_payload:{_status:-1,_result:e},_init:rh}};M.memo=function(e,t){return{$$typeof:Jp,type:e,compare:t===void 0?null:t}};M.startTransition=function(e){var t=hi.transition;hi.transition={};try{e()}finally{hi.transition=t}};M.unstable_act=Pu;M.useCallback=function(e,t){return he.current.useCallback(e,t)};M.useContext=function(e){return he.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return he.current.useDeferredValue(e)};M.useEffect=function(e,t){return he.current.useEffect(e,t)};M.useId=function(){return he.current.useId()};M.useImperativeHandle=function(e,t,n){return he.current.useImperativeHandle(e,t,n)};M.useInsertionEffect=function(e,t){return he.current.useInsertionEffect(e,t)};M.useLayoutEffect=function(e,t){return he.current.useLayoutEffect(e,t)};M.useMemo=function(e,t){return he.current.useMemo(e,t)};M.useReducer=function(e,t,n){return he.current.useReducer(e,t,n)};M.useRef=function(e){return he.current.useRef(e)};M.useState=function(e){return he.current.useState(e)};M.useSyncExternalStore=function(e,t,n){return he.current.useSyncExternalStore(e,t,n)};M.useTransition=function(){return he.current.useTransition()};M.version="18.3.1";Cu.exports=M;var y=Cu.exports;const ah=Hp(y);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oh=y,sh=Symbol.for("react.element"),lh=Symbol.for("react.fragment"),ch=Object.prototype.hasOwnProperty,uh=oh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,dh={key:!0,ref:!0,__self:!0,__source:!0};function Mu(e,t,n){var r,i={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)ch.call(t,r)&&!dh.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:sh,type:e,key:a,ref:o,props:i,_owner:uh.current}}ia.Fragment=lh;ia.jsx=Mu;ia.jsxs=Mu;Eu.exports=ia;var s=Eu.exports,mo={},Au={exports:{}},Ne={},Lu={exports:{}},Du={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,R){var P=_.length;_.push(R);e:for(;0<P;){var K=P-1>>>1,G=_[K];if(0<i(G,R))_[K]=R,_[P]=G,P=K;else break e}}function n(_){return _.length===0?null:_[0]}function r(_){if(_.length===0)return null;var R=_[0],P=_.pop();if(P!==R){_[0]=P;e:for(var K=0,G=_.length,hn=G>>>1;K<hn;){var kt=2*(K+1)-1,Fe=_[kt],Ke=kt+1,mn=_[Ke];if(0>i(Fe,P))Ke<G&&0>i(mn,Fe)?(_[K]=mn,_[Ke]=P,K=Ke):(_[K]=Fe,_[kt]=P,K=kt);else if(Ke<G&&0>i(mn,P))_[K]=mn,_[Ke]=P,K=Ke;else break e}}return R}function i(_,R){var P=_.sortIndex-R.sortIndex;return P!==0?P:_.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,l=o.now();e.unstable_now=function(){return o.now()-l}}var c=[],u=[],p=1,d=null,m=3,x=!1,w=!1,v=!1,k=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(_){for(var R=n(u);R!==null;){if(R.callback===null)r(u);else if(R.startTime<=_)r(u),R.sortIndex=R.expirationTime,t(c,R);else break;R=n(u)}}function S(_){if(v=!1,g(_),!w)if(n(c)!==null)w=!0,Yn(C);else{var R=n(u);R!==null&&ue(S,R.startTime-_)}}function C(_,R){w=!1,v&&(v=!1,f(T),T=-1),x=!0;var P=m;try{for(g(R),d=n(c);d!==null&&(!(d.expirationTime>R)||_&&!ae());){var K=d.callback;if(typeof K=="function"){d.callback=null,m=d.priorityLevel;var G=K(d.expirationTime<=R);R=e.unstable_now(),typeof G=="function"?d.callback=G:d===n(c)&&r(c),g(R)}else r(c);d=n(c)}if(d!==null)var hn=!0;else{var kt=n(u);kt!==null&&ue(S,kt.startTime-R),hn=!1}return hn}finally{d=null,m=P,x=!1}}var b=!1,N=null,T=-1,L=5,I=-1;function ae(){return!(e.unstable_now()-I<L)}function nt(){if(N!==null){var _=e.unstable_now();I=_;var R=!0;try{R=N(!0,_)}finally{R?Ve():(b=!1,N=null)}}else b=!1}var Ve;if(typeof h=="function")Ve=function(){h(nt)};else if(typeof MessageChannel<"u"){var St=new MessageChannel,Te=St.port2;St.port1.onmessage=nt,Ve=function(){Te.postMessage(null)}}else Ve=function(){k(nt,0)};function Yn(_){N=_,b||(b=!0,Ve())}function ue(_,R){T=k(function(){_(e.unstable_now())},R)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){w||x||(w=!0,Yn(C))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(_){switch(m){case 1:case 2:case 3:var R=3;break;default:R=m}var P=m;m=R;try{return _()}finally{m=P}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,R){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var P=m;m=_;try{return R()}finally{m=P}},e.unstable_scheduleCallback=function(_,R,P){var K=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?K+P:K):P=K,_){case 1:var G=-1;break;case 2:G=250;break;case 5:G=1073741823;break;case 4:G=1e4;break;default:G=5e3}return G=P+G,_={id:p++,callback:R,priorityLevel:_,startTime:P,expirationTime:G,sortIndex:-1},P>K?(_.sortIndex=P,t(u,_),n(c)===null&&_===n(u)&&(v?(f(T),T=-1):v=!0,ue(S,P-K))):(_.sortIndex=G,t(c,_),w||x||(w=!0,Yn(C))),_},e.unstable_shouldYield=ae,e.unstable_wrapCallback=function(_){var R=m;return function(){var P=m;m=R;try{return _.apply(this,arguments)}finally{m=P}}}})(Du);Lu.exports=Du;var fh=Lu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ph=y,be=fh;function E(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Fu=new Set,wr={};function fn(e,t){Dn(e,t),Dn(e+"Capture",t)}function Dn(e,t){for(wr[e]=t,e=0;e<t.length;e++)Fu.add(t[e])}var lt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),go=Object.prototype.hasOwnProperty,hh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pl={},Ml={};function mh(e){return go.call(Ml,e)?!0:go.call(Pl,e)?!1:hh.test(e)?Ml[e]=!0:(Pl[e]=!0,!1)}function gh(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function yh(e,t,n,r){if(t===null||typeof t>"u"||gh(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function me(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var ie={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ie[e]=new me(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ie[t]=new me(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ie[e]=new me(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ie[e]=new me(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ie[e]=new me(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ie[e]=new me(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ie[e]=new me(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ie[e]=new me(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ie[e]=new me(e,5,!1,e.toLowerCase(),null,!1,!1)});var ks=/[\-:]([a-z])/g;function Es(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ks,Es);ie[t]=new me(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ks,Es);ie[t]=new me(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ks,Es);ie[t]=new me(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ie[e]=new me(e,1,!1,e.toLowerCase(),null,!1,!1)});ie.xlinkHref=new me("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ie[e]=new me(e,1,!1,e.toLowerCase(),null,!0,!0)});function Cs(e,t,n,r){var i=ie.hasOwnProperty(t)?ie[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(yh(t,n,i,r)&&(n=null),r||i===null?mh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var mt=ph.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qr=Symbol.for("react.element"),yn=Symbol.for("react.portal"),vn=Symbol.for("react.fragment"),_s=Symbol.for("react.strict_mode"),yo=Symbol.for("react.profiler"),Ou=Symbol.for("react.provider"),zu=Symbol.for("react.context"),bs=Symbol.for("react.forward_ref"),vo=Symbol.for("react.suspense"),wo=Symbol.for("react.suspense_list"),Ns=Symbol.for("react.memo"),_t=Symbol.for("react.lazy"),$u=Symbol.for("react.offscreen"),Al=Symbol.iterator;function qn(e){return e===null||typeof e!="object"?null:(e=Al&&e[Al]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,ba;function ar(e){if(ba===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ba=t&&t[1]||""}return`
`+ba+e}var Na=!1;function ja(e,t){if(!e||Na)return"";Na=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,l=a.length-1;1<=o&&0<=l&&i[o]!==a[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==a[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==a[l]){var c=`
`+i[o].replace(" at new "," at ");return e.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",e.displayName)),c}while(1<=o&&0<=l);break}}}finally{Na=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?ar(e):""}function vh(e){switch(e.tag){case 5:return ar(e.type);case 16:return ar("Lazy");case 13:return ar("Suspense");case 19:return ar("SuspenseList");case 0:case 2:case 15:return e=ja(e.type,!1),e;case 11:return e=ja(e.type.render,!1),e;case 1:return e=ja(e.type,!0),e;default:return""}}function xo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case vn:return"Fragment";case yn:return"Portal";case yo:return"Profiler";case _s:return"StrictMode";case vo:return"Suspense";case wo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case zu:return(e.displayName||"Context")+".Consumer";case Ou:return(e._context.displayName||"Context")+".Provider";case bs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ns:return t=e.displayName||null,t!==null?t:xo(e.type)||"Memo";case _t:t=e._payload,e=e._init;try{return xo(e(t))}catch{}}return null}function wh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xo(t);case 8:return t===_s?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Ut(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function xh(e){var t=Bu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xr(e){e._valueTracker||(e._valueTracker=xh(e))}function Uu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Bu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ti(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function So(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ll(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Ut(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Hu(e,t){t=t.checked,t!=null&&Cs(e,"checked",t,!1)}function ko(e,t){Hu(e,t);var n=Ut(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Eo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Eo(e,t.type,Ut(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Dl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Eo(e,t,n){(t!=="number"||Ti(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var or=Array.isArray;function Tn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Ut(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Co(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(E(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Fl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(E(92));if(or(n)){if(1<n.length)throw Error(E(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Ut(n)}}function Wu(e,t){var n=Ut(t.value),r=Ut(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ol(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _o(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Jr,Ku=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Jr=Jr||document.createElement("div"),Jr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Jr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function xr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var cr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Sh=["Webkit","ms","Moz","O"];Object.keys(cr).forEach(function(e){Sh.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),cr[t]=cr[e]})});function Gu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||cr.hasOwnProperty(e)&&cr[e]?(""+t).trim():t+"px"}function Yu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Gu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var kh=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function bo(e,t){if(t){if(kh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(E(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(E(61))}if(t.style!=null&&typeof t.style!="object")throw Error(E(62))}}function No(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var jo=null;function js(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var To=null,In=null,Rn=null;function zl(e){if(e=Ur(e)){if(typeof To!="function")throw Error(E(280));var t=e.stateNode;t&&(t=ca(t),To(e.stateNode,e.type,t))}}function qu(e){In?Rn?Rn.push(e):Rn=[e]:In=e}function Qu(){if(In){var e=In,t=Rn;if(Rn=In=null,zl(e),t)for(e=0;e<t.length;e++)zl(t[e])}}function Xu(e,t){return e(t)}function Ju(){}var Ta=!1;function Zu(e,t,n){if(Ta)return e(t,n);Ta=!0;try{return Xu(e,t,n)}finally{Ta=!1,(In!==null||Rn!==null)&&(Ju(),Qu())}}function Sr(e,t){var n=e.stateNode;if(n===null)return null;var r=ca(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(E(231,t,typeof n));return n}var Io=!1;if(lt)try{var Qn={};Object.defineProperty(Qn,"passive",{get:function(){Io=!0}}),window.addEventListener("test",Qn,Qn),window.removeEventListener("test",Qn,Qn)}catch{Io=!1}function Eh(e,t,n,r,i,a,o,l,c){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(p){this.onError(p)}}var ur=!1,Ii=null,Ri=!1,Ro=null,Ch={onError:function(e){ur=!0,Ii=e}};function _h(e,t,n,r,i,a,o,l,c){ur=!1,Ii=null,Eh.apply(Ch,arguments)}function bh(e,t,n,r,i,a,o,l,c){if(_h.apply(this,arguments),ur){if(ur){var u=Ii;ur=!1,Ii=null}else throw Error(E(198));Ri||(Ri=!0,Ro=u)}}function pn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ed(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function $l(e){if(pn(e)!==e)throw Error(E(188))}function Nh(e){var t=e.alternate;if(!t){if(t=pn(e),t===null)throw Error(E(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return $l(i),e;if(a===r)return $l(i),t;a=a.sibling}throw Error(E(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=a;break}if(l===r){o=!0,r=i,n=a;break}l=l.sibling}if(!o){for(l=a.child;l;){if(l===n){o=!0,n=a,r=i;break}if(l===r){o=!0,r=a,n=i;break}l=l.sibling}if(!o)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?e:t}function td(e){return e=Nh(e),e!==null?nd(e):null}function nd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=nd(e);if(t!==null)return t;e=e.sibling}return null}var rd=be.unstable_scheduleCallback,Bl=be.unstable_cancelCallback,jh=be.unstable_shouldYield,Th=be.unstable_requestPaint,q=be.unstable_now,Ih=be.unstable_getCurrentPriorityLevel,Ts=be.unstable_ImmediatePriority,id=be.unstable_UserBlockingPriority,Pi=be.unstable_NormalPriority,Rh=be.unstable_LowPriority,ad=be.unstable_IdlePriority,aa=null,Xe=null;function Ph(e){if(Xe&&typeof Xe.onCommitFiberRoot=="function")try{Xe.onCommitFiberRoot(aa,e,void 0,(e.current.flags&128)===128)}catch{}}var Ue=Math.clz32?Math.clz32:Lh,Mh=Math.log,Ah=Math.LN2;function Lh(e){return e>>>=0,e===0?32:31-(Mh(e)/Ah|0)|0}var Zr=64,ei=4194304;function sr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Mi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=sr(l):(a&=o,a!==0&&(r=sr(a)))}else o=n&~i,o!==0?r=sr(o):a!==0&&(r=sr(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ue(t),i=1<<n,r|=e[n],t&=~i;return r}function Dh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Fh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Ue(a),l=1<<o,c=i[o];c===-1?(!(l&n)||l&r)&&(i[o]=Dh(l,t)):c<=t&&(e.expiredLanes|=l),a&=~l}}function Po(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function od(){var e=Zr;return Zr<<=1,!(Zr&4194240)&&(Zr=64),e}function Ia(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $r(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ue(t),e[t]=n}function Oh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Ue(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function Is(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ue(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var D=0;function sd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ld,Rs,cd,ud,dd,Mo=!1,ti=[],Pt=null,Mt=null,At=null,kr=new Map,Er=new Map,Nt=[],zh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ul(e,t){switch(e){case"focusin":case"focusout":Pt=null;break;case"dragenter":case"dragleave":Mt=null;break;case"mouseover":case"mouseout":At=null;break;case"pointerover":case"pointerout":kr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Er.delete(t.pointerId)}}function Xn(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ur(t),t!==null&&Rs(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function $h(e,t,n,r,i){switch(t){case"focusin":return Pt=Xn(Pt,e,t,n,r,i),!0;case"dragenter":return Mt=Xn(Mt,e,t,n,r,i),!0;case"mouseover":return At=Xn(At,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return kr.set(a,Xn(kr.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Er.set(a,Xn(Er.get(a)||null,e,t,n,r,i)),!0}return!1}function fd(e){var t=Jt(e.target);if(t!==null){var n=pn(t);if(n!==null){if(t=n.tag,t===13){if(t=ed(n),t!==null){e.blockedOn=t,dd(e.priority,function(){cd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function mi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ao(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);jo=r,n.target.dispatchEvent(r),jo=null}else return t=Ur(n),t!==null&&Rs(t),e.blockedOn=n,!1;t.shift()}return!0}function Hl(e,t,n){mi(e)&&n.delete(t)}function Bh(){Mo=!1,Pt!==null&&mi(Pt)&&(Pt=null),Mt!==null&&mi(Mt)&&(Mt=null),At!==null&&mi(At)&&(At=null),kr.forEach(Hl),Er.forEach(Hl)}function Jn(e,t){e.blockedOn===t&&(e.blockedOn=null,Mo||(Mo=!0,be.unstable_scheduleCallback(be.unstable_NormalPriority,Bh)))}function Cr(e){function t(i){return Jn(i,e)}if(0<ti.length){Jn(ti[0],e);for(var n=1;n<ti.length;n++){var r=ti[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Pt!==null&&Jn(Pt,e),Mt!==null&&Jn(Mt,e),At!==null&&Jn(At,e),kr.forEach(t),Er.forEach(t),n=0;n<Nt.length;n++)r=Nt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Nt.length&&(n=Nt[0],n.blockedOn===null);)fd(n),n.blockedOn===null&&Nt.shift()}var Pn=mt.ReactCurrentBatchConfig,Ai=!0;function Uh(e,t,n,r){var i=D,a=Pn.transition;Pn.transition=null;try{D=1,Ps(e,t,n,r)}finally{D=i,Pn.transition=a}}function Hh(e,t,n,r){var i=D,a=Pn.transition;Pn.transition=null;try{D=4,Ps(e,t,n,r)}finally{D=i,Pn.transition=a}}function Ps(e,t,n,r){if(Ai){var i=Ao(e,t,n,r);if(i===null)$a(e,t,r,Li,n),Ul(e,r);else if($h(i,e,t,n,r))r.stopPropagation();else if(Ul(e,r),t&4&&-1<zh.indexOf(e)){for(;i!==null;){var a=Ur(i);if(a!==null&&ld(a),a=Ao(e,t,n,r),a===null&&$a(e,t,r,Li,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else $a(e,t,r,null,n)}}var Li=null;function Ao(e,t,n,r){if(Li=null,e=js(r),e=Jt(e),e!==null)if(t=pn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ed(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Li=e,null}function pd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ih()){case Ts:return 1;case id:return 4;case Pi:case Rh:return 16;case ad:return 536870912;default:return 16}default:return 16}}var Tt=null,Ms=null,gi=null;function hd(){if(gi)return gi;var e,t=Ms,n=t.length,r,i="value"in Tt?Tt.value:Tt.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gi=i.slice(e,1<r?1-r:void 0)}function yi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ni(){return!0}function Wl(){return!1}function je(e){function t(n,r,i,a,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(a):a[l]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?ni:Wl,this.isPropagationStopped=Wl,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ni)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ni)},persist:function(){},isPersistent:ni}),t}var Wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},As=je(Wn),Br=V({},Wn,{view:0,detail:0}),Wh=je(Br),Ra,Pa,Zn,oa=V({},Br,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ls,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Zn&&(Zn&&e.type==="mousemove"?(Ra=e.screenX-Zn.screenX,Pa=e.screenY-Zn.screenY):Pa=Ra=0,Zn=e),Ra)},movementY:function(e){return"movementY"in e?e.movementY:Pa}}),Vl=je(oa),Vh=V({},oa,{dataTransfer:0}),Kh=je(Vh),Gh=V({},Br,{relatedTarget:0}),Ma=je(Gh),Yh=V({},Wn,{animationName:0,elapsedTime:0,pseudoElement:0}),qh=je(Yh),Qh=V({},Wn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Xh=je(Qh),Jh=V({},Wn,{data:0}),Kl=je(Jh),Zh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},em={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tm[e])?!!t[e]:!1}function Ls(){return nm}var rm=V({},Br,{key:function(e){if(e.key){var t=Zh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=yi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?em[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ls,charCode:function(e){return e.type==="keypress"?yi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?yi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),im=je(rm),am=V({},oa,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gl=je(am),om=V({},Br,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ls}),sm=je(om),lm=V({},Wn,{propertyName:0,elapsedTime:0,pseudoElement:0}),cm=je(lm),um=V({},oa,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),dm=je(um),fm=[9,13,27,32],Ds=lt&&"CompositionEvent"in window,dr=null;lt&&"documentMode"in document&&(dr=document.documentMode);var pm=lt&&"TextEvent"in window&&!dr,md=lt&&(!Ds||dr&&8<dr&&11>=dr),Yl=" ",ql=!1;function gd(e,t){switch(e){case"keyup":return fm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function yd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var wn=!1;function hm(e,t){switch(e){case"compositionend":return yd(t);case"keypress":return t.which!==32?null:(ql=!0,Yl);case"textInput":return e=t.data,e===Yl&&ql?null:e;default:return null}}function mm(e,t){if(wn)return e==="compositionend"||!Ds&&gd(e,t)?(e=hd(),gi=Ms=Tt=null,wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return md&&t.locale!=="ko"?null:t.data;default:return null}}var gm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ql(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gm[e.type]:t==="textarea"}function vd(e,t,n,r){qu(r),t=Di(t,"onChange"),0<t.length&&(n=new As("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var fr=null,_r=null;function ym(e){Td(e,0)}function sa(e){var t=kn(e);if(Uu(t))return e}function vm(e,t){if(e==="change")return t}var wd=!1;if(lt){var Aa;if(lt){var La="oninput"in document;if(!La){var Xl=document.createElement("div");Xl.setAttribute("oninput","return;"),La=typeof Xl.oninput=="function"}Aa=La}else Aa=!1;wd=Aa&&(!document.documentMode||9<document.documentMode)}function Jl(){fr&&(fr.detachEvent("onpropertychange",xd),_r=fr=null)}function xd(e){if(e.propertyName==="value"&&sa(_r)){var t=[];vd(t,_r,e,js(e)),Zu(ym,t)}}function wm(e,t,n){e==="focusin"?(Jl(),fr=t,_r=n,fr.attachEvent("onpropertychange",xd)):e==="focusout"&&Jl()}function xm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return sa(_r)}function Sm(e,t){if(e==="click")return sa(t)}function km(e,t){if(e==="input"||e==="change")return sa(t)}function Em(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var We=typeof Object.is=="function"?Object.is:Em;function br(e,t){if(We(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!go.call(t,i)||!We(e[i],t[i]))return!1}return!0}function Zl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function ec(e,t){var n=Zl(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Zl(n)}}function Sd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Sd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kd(){for(var e=window,t=Ti();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ti(e.document)}return t}function Fs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Cm(e){var t=kd(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Sd(n.ownerDocument.documentElement,n)){if(r!==null&&Fs(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=ec(n,a);var o=ec(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var _m=lt&&"documentMode"in document&&11>=document.documentMode,xn=null,Lo=null,pr=null,Do=!1;function tc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Do||xn==null||xn!==Ti(r)||(r=xn,"selectionStart"in r&&Fs(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),pr&&br(pr,r)||(pr=r,r=Di(Lo,"onSelect"),0<r.length&&(t=new As("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=xn)))}function ri(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Sn={animationend:ri("Animation","AnimationEnd"),animationiteration:ri("Animation","AnimationIteration"),animationstart:ri("Animation","AnimationStart"),transitionend:ri("Transition","TransitionEnd")},Da={},Ed={};lt&&(Ed=document.createElement("div").style,"AnimationEvent"in window||(delete Sn.animationend.animation,delete Sn.animationiteration.animation,delete Sn.animationstart.animation),"TransitionEvent"in window||delete Sn.transitionend.transition);function la(e){if(Da[e])return Da[e];if(!Sn[e])return e;var t=Sn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ed)return Da[e]=t[n];return e}var Cd=la("animationend"),_d=la("animationiteration"),bd=la("animationstart"),Nd=la("transitionend"),jd=new Map,nc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Vt(e,t){jd.set(e,t),fn(t,[e])}for(var Fa=0;Fa<nc.length;Fa++){var Oa=nc[Fa],bm=Oa.toLowerCase(),Nm=Oa[0].toUpperCase()+Oa.slice(1);Vt(bm,"on"+Nm)}Vt(Cd,"onAnimationEnd");Vt(_d,"onAnimationIteration");Vt(bd,"onAnimationStart");Vt("dblclick","onDoubleClick");Vt("focusin","onFocus");Vt("focusout","onBlur");Vt(Nd,"onTransitionEnd");Dn("onMouseEnter",["mouseout","mouseover"]);Dn("onMouseLeave",["mouseout","mouseover"]);Dn("onPointerEnter",["pointerout","pointerover"]);Dn("onPointerLeave",["pointerout","pointerover"]);fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jm=new Set("cancel close invalid load scroll toggle".split(" ").concat(lr));function rc(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,bh(r,t,void 0,e),e.currentTarget=null}function Td(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var l=r[o],c=l.instance,u=l.currentTarget;if(l=l.listener,c!==a&&i.isPropagationStopped())break e;rc(i,l,u),a=c}else for(o=0;o<r.length;o++){if(l=r[o],c=l.instance,u=l.currentTarget,l=l.listener,c!==a&&i.isPropagationStopped())break e;rc(i,l,u),a=c}}}if(Ri)throw e=Ro,Ri=!1,Ro=null,e}function z(e,t){var n=t[Bo];n===void 0&&(n=t[Bo]=new Set);var r=e+"__bubble";n.has(r)||(Id(t,e,2,!1),n.add(r))}function za(e,t,n){var r=0;t&&(r|=4),Id(n,e,r,t)}var ii="_reactListening"+Math.random().toString(36).slice(2);function Nr(e){if(!e[ii]){e[ii]=!0,Fu.forEach(function(n){n!=="selectionchange"&&(jm.has(n)||za(n,!1,e),za(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ii]||(t[ii]=!0,za("selectionchange",!1,t))}}function Id(e,t,n,r){switch(pd(t)){case 1:var i=Uh;break;case 4:i=Hh;break;default:i=Ps}n=i.bind(null,t,n,e),i=void 0,!Io||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function $a(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Jt(l),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue e}l=l.parentNode}}r=r.return}Zu(function(){var u=a,p=js(n),d=[];e:{var m=jd.get(e);if(m!==void 0){var x=As,w=e;switch(e){case"keypress":if(yi(n)===0)break e;case"keydown":case"keyup":x=im;break;case"focusin":w="focus",x=Ma;break;case"focusout":w="blur",x=Ma;break;case"beforeblur":case"afterblur":x=Ma;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":x=Vl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":x=Kh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":x=sm;break;case Cd:case _d:case bd:x=qh;break;case Nd:x=cm;break;case"scroll":x=Wh;break;case"wheel":x=dm;break;case"copy":case"cut":case"paste":x=Xh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":x=Gl}var v=(t&4)!==0,k=!v&&e==="scroll",f=v?m!==null?m+"Capture":null:m;v=[];for(var h=u,g;h!==null;){g=h;var S=g.stateNode;if(g.tag===5&&S!==null&&(g=S,f!==null&&(S=Sr(h,f),S!=null&&v.push(jr(h,S,g)))),k)break;h=h.return}0<v.length&&(m=new x(m,w,null,n,p),d.push({event:m,listeners:v}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",x=e==="mouseout"||e==="pointerout",m&&n!==jo&&(w=n.relatedTarget||n.fromElement)&&(Jt(w)||w[ct]))break e;if((x||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,x?(w=n.relatedTarget||n.toElement,x=u,w=w?Jt(w):null,w!==null&&(k=pn(w),w!==k||w.tag!==5&&w.tag!==6)&&(w=null)):(x=null,w=u),x!==w)){if(v=Vl,S="onMouseLeave",f="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(v=Gl,S="onPointerLeave",f="onPointerEnter",h="pointer"),k=x==null?m:kn(x),g=w==null?m:kn(w),m=new v(S,h+"leave",x,n,p),m.target=k,m.relatedTarget=g,S=null,Jt(p)===u&&(v=new v(f,h+"enter",w,n,p),v.target=g,v.relatedTarget=k,S=v),k=S,x&&w)t:{for(v=x,f=w,h=0,g=v;g;g=gn(g))h++;for(g=0,S=f;S;S=gn(S))g++;for(;0<h-g;)v=gn(v),h--;for(;0<g-h;)f=gn(f),g--;for(;h--;){if(v===f||f!==null&&v===f.alternate)break t;v=gn(v),f=gn(f)}v=null}else v=null;x!==null&&ic(d,m,x,v,!1),w!==null&&k!==null&&ic(d,k,w,v,!0)}}e:{if(m=u?kn(u):window,x=m.nodeName&&m.nodeName.toLowerCase(),x==="select"||x==="input"&&m.type==="file")var C=vm;else if(Ql(m))if(wd)C=km;else{C=xm;var b=wm}else(x=m.nodeName)&&x.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(C=Sm);if(C&&(C=C(e,u))){vd(d,C,n,p);break e}b&&b(e,m,u),e==="focusout"&&(b=m._wrapperState)&&b.controlled&&m.type==="number"&&Eo(m,"number",m.value)}switch(b=u?kn(u):window,e){case"focusin":(Ql(b)||b.contentEditable==="true")&&(xn=b,Lo=u,pr=null);break;case"focusout":pr=Lo=xn=null;break;case"mousedown":Do=!0;break;case"contextmenu":case"mouseup":case"dragend":Do=!1,tc(d,n,p);break;case"selectionchange":if(_m)break;case"keydown":case"keyup":tc(d,n,p)}var N;if(Ds)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else wn?gd(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(md&&n.locale!=="ko"&&(wn||T!=="onCompositionStart"?T==="onCompositionEnd"&&wn&&(N=hd()):(Tt=p,Ms="value"in Tt?Tt.value:Tt.textContent,wn=!0)),b=Di(u,T),0<b.length&&(T=new Kl(T,e,null,n,p),d.push({event:T,listeners:b}),N?T.data=N:(N=yd(n),N!==null&&(T.data=N)))),(N=pm?hm(e,n):mm(e,n))&&(u=Di(u,"onBeforeInput"),0<u.length&&(p=new Kl("onBeforeInput","beforeinput",null,n,p),d.push({event:p,listeners:u}),p.data=N))}Td(d,t)})}function jr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Di(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=Sr(e,n),a!=null&&r.unshift(jr(e,a,i)),a=Sr(e,t),a!=null&&r.push(jr(e,a,i))),e=e.return}return r}function gn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ic(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var l=n,c=l.alternate,u=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&u!==null&&(l=u,i?(c=Sr(n,a),c!=null&&o.unshift(jr(n,c,l))):i||(c=Sr(n,a),c!=null&&o.push(jr(n,c,l)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Tm=/\r\n?/g,Im=/\u0000|\uFFFD/g;function ac(e){return(typeof e=="string"?e:""+e).replace(Tm,`
`).replace(Im,"")}function ai(e,t,n){if(t=ac(t),ac(e)!==t&&n)throw Error(E(425))}function Fi(){}var Fo=null,Oo=null;function zo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var $o=typeof setTimeout=="function"?setTimeout:void 0,Rm=typeof clearTimeout=="function"?clearTimeout:void 0,oc=typeof Promise=="function"?Promise:void 0,Pm=typeof queueMicrotask=="function"?queueMicrotask:typeof oc<"u"?function(e){return oc.resolve(null).then(e).catch(Mm)}:$o;function Mm(e){setTimeout(function(){throw e})}function Ba(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Cr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Cr(t)}function Lt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function sc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),qe="__reactFiber$"+Vn,Tr="__reactProps$"+Vn,ct="__reactContainer$"+Vn,Bo="__reactEvents$"+Vn,Am="__reactListeners$"+Vn,Lm="__reactHandles$"+Vn;function Jt(e){var t=e[qe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ct]||n[qe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=sc(e);e!==null;){if(n=e[qe])return n;e=sc(e)}return t}e=n,n=e.parentNode}return null}function Ur(e){return e=e[qe]||e[ct],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function kn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function ca(e){return e[Tr]||null}var Uo=[],En=-1;function Kt(e){return{current:e}}function $(e){0>En||(e.current=Uo[En],Uo[En]=null,En--)}function O(e,t){En++,Uo[En]=e.current,e.current=t}var Ht={},ce=Kt(Ht),we=Kt(!1),an=Ht;function Fn(e,t){var n=e.type.contextTypes;if(!n)return Ht;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function xe(e){return e=e.childContextTypes,e!=null}function Oi(){$(we),$(ce)}function lc(e,t,n){if(ce.current!==Ht)throw Error(E(168));O(ce,t),O(we,n)}function Rd(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(E(108,wh(e)||"Unknown",i));return V({},n,r)}function zi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ht,an=ce.current,O(ce,e),O(we,we.current),!0}function cc(e,t,n){var r=e.stateNode;if(!r)throw Error(E(169));n?(e=Rd(e,t,an),r.__reactInternalMemoizedMergedChildContext=e,$(we),$(ce),O(ce,e)):$(we),O(we,n)}var it=null,ua=!1,Ua=!1;function Pd(e){it===null?it=[e]:it.push(e)}function Dm(e){ua=!0,Pd(e)}function Gt(){if(!Ua&&it!==null){Ua=!0;var e=0,t=D;try{var n=it;for(D=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}it=null,ua=!1}catch(i){throw it!==null&&(it=it.slice(e+1)),rd(Ts,Gt),i}finally{D=t,Ua=!1}}return null}var Cn=[],_n=0,$i=null,Bi=0,Ie=[],Re=0,on=null,at=1,ot="";function Yt(e,t){Cn[_n++]=Bi,Cn[_n++]=$i,$i=e,Bi=t}function Md(e,t,n){Ie[Re++]=at,Ie[Re++]=ot,Ie[Re++]=on,on=e;var r=at;e=ot;var i=32-Ue(r)-1;r&=~(1<<i),n+=1;var a=32-Ue(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,at=1<<32-Ue(t)+i|n<<i|r,ot=a+e}else at=1<<a|n<<i|r,ot=e}function Os(e){e.return!==null&&(Yt(e,1),Md(e,1,0))}function zs(e){for(;e===$i;)$i=Cn[--_n],Cn[_n]=null,Bi=Cn[--_n],Cn[_n]=null;for(;e===on;)on=Ie[--Re],Ie[Re]=null,ot=Ie[--Re],Ie[Re]=null,at=Ie[--Re],Ie[Re]=null}var Ce=null,Ee=null,B=!1,Be=null;function Ad(e,t){var n=Pe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function uc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ce=e,Ee=Lt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ce=e,Ee=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=on!==null?{id:at,overflow:ot}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Pe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ce=e,Ee=null,!0):!1;default:return!1}}function Ho(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Wo(e){if(B){var t=Ee;if(t){var n=t;if(!uc(e,t)){if(Ho(e))throw Error(E(418));t=Lt(n.nextSibling);var r=Ce;t&&uc(e,t)?Ad(r,n):(e.flags=e.flags&-4097|2,B=!1,Ce=e)}}else{if(Ho(e))throw Error(E(418));e.flags=e.flags&-4097|2,B=!1,Ce=e}}}function dc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ce=e}function oi(e){if(e!==Ce)return!1;if(!B)return dc(e),B=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!zo(e.type,e.memoizedProps)),t&&(t=Ee)){if(Ho(e))throw Ld(),Error(E(418));for(;t;)Ad(e,t),t=Lt(t.nextSibling)}if(dc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ee=Lt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ee=null}}else Ee=Ce?Lt(e.stateNode.nextSibling):null;return!0}function Ld(){for(var e=Ee;e;)e=Lt(e.nextSibling)}function On(){Ee=Ce=null,B=!1}function $s(e){Be===null?Be=[e]:Be.push(e)}var Fm=mt.ReactCurrentBatchConfig;function er(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var l=i.refs;o===null?delete l[a]:l[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,e))}return e}function si(e,t){throw e=Object.prototype.toString.call(t),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function fc(e){var t=e._init;return t(e._payload)}function Dd(e){function t(f,h){if(e){var g=f.deletions;g===null?(f.deletions=[h],f.flags|=16):g.push(h)}}function n(f,h){if(!e)return null;for(;h!==null;)t(f,h),h=h.sibling;return null}function r(f,h){for(f=new Map;h!==null;)h.key!==null?f.set(h.key,h):f.set(h.index,h),h=h.sibling;return f}function i(f,h){return f=zt(f,h),f.index=0,f.sibling=null,f}function a(f,h,g){return f.index=g,e?(g=f.alternate,g!==null?(g=g.index,g<h?(f.flags|=2,h):g):(f.flags|=2,h)):(f.flags|=1048576,h)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,h,g,S){return h===null||h.tag!==6?(h=qa(g,f.mode,S),h.return=f,h):(h=i(h,g),h.return=f,h)}function c(f,h,g,S){var C=g.type;return C===vn?p(f,h,g.props.children,S,g.key):h!==null&&(h.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===_t&&fc(C)===h.type)?(S=i(h,g.props),S.ref=er(f,h,g),S.return=f,S):(S=Ci(g.type,g.key,g.props,null,f.mode,S),S.ref=er(f,h,g),S.return=f,S)}function u(f,h,g,S){return h===null||h.tag!==4||h.stateNode.containerInfo!==g.containerInfo||h.stateNode.implementation!==g.implementation?(h=Qa(g,f.mode,S),h.return=f,h):(h=i(h,g.children||[]),h.return=f,h)}function p(f,h,g,S,C){return h===null||h.tag!==7?(h=rn(g,f.mode,S,C),h.return=f,h):(h=i(h,g),h.return=f,h)}function d(f,h,g){if(typeof h=="string"&&h!==""||typeof h=="number")return h=qa(""+h,f.mode,g),h.return=f,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Qr:return g=Ci(h.type,h.key,h.props,null,f.mode,g),g.ref=er(f,null,h),g.return=f,g;case yn:return h=Qa(h,f.mode,g),h.return=f,h;case _t:var S=h._init;return d(f,S(h._payload),g)}if(or(h)||qn(h))return h=rn(h,f.mode,g,null),h.return=f,h;si(f,h)}return null}function m(f,h,g,S){var C=h!==null?h.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return C!==null?null:l(f,h,""+g,S);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Qr:return g.key===C?c(f,h,g,S):null;case yn:return g.key===C?u(f,h,g,S):null;case _t:return C=g._init,m(f,h,C(g._payload),S)}if(or(g)||qn(g))return C!==null?null:p(f,h,g,S,null);si(f,g)}return null}function x(f,h,g,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(g)||null,l(h,f,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Qr:return f=f.get(S.key===null?g:S.key)||null,c(h,f,S,C);case yn:return f=f.get(S.key===null?g:S.key)||null,u(h,f,S,C);case _t:var b=S._init;return x(f,h,g,b(S._payload),C)}if(or(S)||qn(S))return f=f.get(g)||null,p(h,f,S,C,null);si(h,S)}return null}function w(f,h,g,S){for(var C=null,b=null,N=h,T=h=0,L=null;N!==null&&T<g.length;T++){N.index>T?(L=N,N=null):L=N.sibling;var I=m(f,N,g[T],S);if(I===null){N===null&&(N=L);break}e&&N&&I.alternate===null&&t(f,N),h=a(I,h,T),b===null?C=I:b.sibling=I,b=I,N=L}if(T===g.length)return n(f,N),B&&Yt(f,T),C;if(N===null){for(;T<g.length;T++)N=d(f,g[T],S),N!==null&&(h=a(N,h,T),b===null?C=N:b.sibling=N,b=N);return B&&Yt(f,T),C}for(N=r(f,N);T<g.length;T++)L=x(N,f,T,g[T],S),L!==null&&(e&&L.alternate!==null&&N.delete(L.key===null?T:L.key),h=a(L,h,T),b===null?C=L:b.sibling=L,b=L);return e&&N.forEach(function(ae){return t(f,ae)}),B&&Yt(f,T),C}function v(f,h,g,S){var C=qn(g);if(typeof C!="function")throw Error(E(150));if(g=C.call(g),g==null)throw Error(E(151));for(var b=C=null,N=h,T=h=0,L=null,I=g.next();N!==null&&!I.done;T++,I=g.next()){N.index>T?(L=N,N=null):L=N.sibling;var ae=m(f,N,I.value,S);if(ae===null){N===null&&(N=L);break}e&&N&&ae.alternate===null&&t(f,N),h=a(ae,h,T),b===null?C=ae:b.sibling=ae,b=ae,N=L}if(I.done)return n(f,N),B&&Yt(f,T),C;if(N===null){for(;!I.done;T++,I=g.next())I=d(f,I.value,S),I!==null&&(h=a(I,h,T),b===null?C=I:b.sibling=I,b=I);return B&&Yt(f,T),C}for(N=r(f,N);!I.done;T++,I=g.next())I=x(N,f,T,I.value,S),I!==null&&(e&&I.alternate!==null&&N.delete(I.key===null?T:I.key),h=a(I,h,T),b===null?C=I:b.sibling=I,b=I);return e&&N.forEach(function(nt){return t(f,nt)}),B&&Yt(f,T),C}function k(f,h,g,S){if(typeof g=="object"&&g!==null&&g.type===vn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Qr:e:{for(var C=g.key,b=h;b!==null;){if(b.key===C){if(C=g.type,C===vn){if(b.tag===7){n(f,b.sibling),h=i(b,g.props.children),h.return=f,f=h;break e}}else if(b.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===_t&&fc(C)===b.type){n(f,b.sibling),h=i(b,g.props),h.ref=er(f,b,g),h.return=f,f=h;break e}n(f,b);break}else t(f,b);b=b.sibling}g.type===vn?(h=rn(g.props.children,f.mode,S,g.key),h.return=f,f=h):(S=Ci(g.type,g.key,g.props,null,f.mode,S),S.ref=er(f,h,g),S.return=f,f=S)}return o(f);case yn:e:{for(b=g.key;h!==null;){if(h.key===b)if(h.tag===4&&h.stateNode.containerInfo===g.containerInfo&&h.stateNode.implementation===g.implementation){n(f,h.sibling),h=i(h,g.children||[]),h.return=f,f=h;break e}else{n(f,h);break}else t(f,h);h=h.sibling}h=Qa(g,f.mode,S),h.return=f,f=h}return o(f);case _t:return b=g._init,k(f,h,b(g._payload),S)}if(or(g))return w(f,h,g,S);if(qn(g))return v(f,h,g,S);si(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,h!==null&&h.tag===6?(n(f,h.sibling),h=i(h,g),h.return=f,f=h):(n(f,h),h=qa(g,f.mode,S),h.return=f,f=h),o(f)):n(f,h)}return k}var zn=Dd(!0),Fd=Dd(!1),Ui=Kt(null),Hi=null,bn=null,Bs=null;function Us(){Bs=bn=Hi=null}function Hs(e){var t=Ui.current;$(Ui),e._currentValue=t}function Vo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Mn(e,t){Hi=e,Bs=bn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ve=!0),e.firstContext=null)}function Ae(e){var t=e._currentValue;if(Bs!==e)if(e={context:e,memoizedValue:t,next:null},bn===null){if(Hi===null)throw Error(E(308));bn=e,Hi.dependencies={lanes:0,firstContext:e}}else bn=bn.next=e;return t}var Zt=null;function Ws(e){Zt===null?Zt=[e]:Zt.push(e)}function Od(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ws(t)):(n.next=i.next,i.next=n),t.interleaved=n,ut(e,r)}function ut(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var bt=!1;function Vs(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function st(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Dt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,A&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,ut(e,n)}return i=r.interleaved,i===null?(t.next=t,Ws(r)):(t.next=i.next,i.next=t),r.interleaved=t,ut(e,n)}function vi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Is(e,n)}}function pc(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wi(e,t,n,r){var i=e.updateQueue;bt=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var c=l,u=c.next;c.next=null,o===null?a=u:o.next=u,o=c;var p=e.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=u:l.next=u,p.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,p=u=c=null,l=a;do{var m=l.lane,x=l.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:x,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var w=e,v=l;switch(m=t,x=n,v.tag){case 1:if(w=v.payload,typeof w=="function"){d=w.call(x,d,m);break e}d=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=v.payload,m=typeof w=="function"?w.call(x,d,m):w,m==null)break e;d=V({},d,m);break e;case 2:bt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else x={eventTime:x,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(u=p=x,c=d):p=p.next=x,o|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(p===null&&(c=d),i.baseState=c,i.firstBaseUpdate=u,i.lastBaseUpdate=p,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);ln|=o,e.lanes=o,e.memoizedState=d}}function hc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(E(191,i));i.call(r)}}}var Hr={},Je=Kt(Hr),Ir=Kt(Hr),Rr=Kt(Hr);function en(e){if(e===Hr)throw Error(E(174));return e}function Ks(e,t){switch(O(Rr,t),O(Ir,e),O(Je,Hr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:_o(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=_o(t,e)}$(Je),O(Je,t)}function $n(){$(Je),$(Ir),$(Rr)}function $d(e){en(Rr.current);var t=en(Je.current),n=_o(t,e.type);t!==n&&(O(Ir,e),O(Je,n))}function Gs(e){Ir.current===e&&($(Je),$(Ir))}var U=Kt(0);function Vi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ha=[];function Ys(){for(var e=0;e<Ha.length;e++)Ha[e]._workInProgressVersionPrimary=null;Ha.length=0}var wi=mt.ReactCurrentDispatcher,Wa=mt.ReactCurrentBatchConfig,sn=0,H=null,J=null,ee=null,Ki=!1,hr=!1,Pr=0,Om=0;function oe(){throw Error(E(321))}function qs(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!We(e[n],t[n]))return!1;return!0}function Qs(e,t,n,r,i,a){if(sn=a,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,wi.current=e===null||e.memoizedState===null?Um:Hm,e=n(r,i),hr){a=0;do{if(hr=!1,Pr=0,25<=a)throw Error(E(301));a+=1,ee=J=null,t.updateQueue=null,wi.current=Wm,e=n(r,i)}while(hr)}if(wi.current=Gi,t=J!==null&&J.next!==null,sn=0,ee=J=H=null,Ki=!1,t)throw Error(E(300));return e}function Xs(){var e=Pr!==0;return Pr=0,e}function Ye(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?H.memoizedState=ee=e:ee=ee.next=e,ee}function Le(){if(J===null){var e=H.alternate;e=e!==null?e.memoizedState:null}else e=J.next;var t=ee===null?H.memoizedState:ee.next;if(t!==null)ee=t,J=e;else{if(e===null)throw Error(E(310));J=e,e={memoizedState:J.memoizedState,baseState:J.baseState,baseQueue:J.baseQueue,queue:J.queue,next:null},ee===null?H.memoizedState=ee=e:ee=ee.next=e}return ee}function Mr(e,t){return typeof t=="function"?t(e):t}function Va(e){var t=Le(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=J,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var l=o=null,c=null,u=a;do{var p=u.lane;if((sn&p)===p)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var d={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(l=c=d,o=r):c=c.next=d,H.lanes|=p,ln|=p}u=u.next}while(u!==null&&u!==a);c===null?o=r:c.next=l,We(r,t.memoizedState)||(ve=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=c,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,H.lanes|=a,ln|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ka(e){var t=Le(),n=t.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);We(a,t.memoizedState)||(ve=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Bd(){}function Ud(e,t){var n=H,r=Le(),i=t(),a=!We(r.memoizedState,i);if(a&&(r.memoizedState=i,ve=!0),r=r.queue,Js(Vd.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,Ar(9,Wd.bind(null,n,r,i,t),void 0,null),te===null)throw Error(E(349));sn&30||Hd(n,t,i)}return i}function Hd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wd(e,t,n,r){t.value=n,t.getSnapshot=r,Kd(t)&&Gd(e)}function Vd(e,t,n){return n(function(){Kd(t)&&Gd(e)})}function Kd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!We(e,n)}catch{return!0}}function Gd(e){var t=ut(e,1);t!==null&&He(t,e,1,-1)}function mc(e){var t=Ye();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Mr,lastRenderedState:e},t.queue=e,e=e.dispatch=Bm.bind(null,H,e),[t.memoizedState,e]}function Ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=H.updateQueue,t===null?(t={lastEffect:null,stores:null},H.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Yd(){return Le().memoizedState}function xi(e,t,n,r){var i=Ye();H.flags|=e,i.memoizedState=Ar(1|t,n,void 0,r===void 0?null:r)}function da(e,t,n,r){var i=Le();r=r===void 0?null:r;var a=void 0;if(J!==null){var o=J.memoizedState;if(a=o.destroy,r!==null&&qs(r,o.deps)){i.memoizedState=Ar(t,n,a,r);return}}H.flags|=e,i.memoizedState=Ar(1|t,n,a,r)}function gc(e,t){return xi(8390656,8,e,t)}function Js(e,t){return da(2048,8,e,t)}function qd(e,t){return da(4,2,e,t)}function Qd(e,t){return da(4,4,e,t)}function Xd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Jd(e,t,n){return n=n!=null?n.concat([e]):null,da(4,4,Xd.bind(null,t,e),n)}function Zs(){}function Zd(e,t){var n=Le();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qs(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ef(e,t){var n=Le();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qs(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function tf(e,t,n){return sn&21?(We(n,t)||(n=od(),H.lanes|=n,ln|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ve=!0),e.memoizedState=n)}function zm(e,t){var n=D;D=n!==0&&4>n?n:4,e(!0);var r=Wa.transition;Wa.transition={};try{e(!1),t()}finally{D=n,Wa.transition=r}}function nf(){return Le().memoizedState}function $m(e,t,n){var r=Ot(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},rf(e))af(t,n);else if(n=Od(e,t,n,r),n!==null){var i=fe();He(n,e,r,i),of(n,t,r)}}function Bm(e,t,n){var r=Ot(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(rf(e))af(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,l=a(o,n);if(i.hasEagerState=!0,i.eagerState=l,We(l,o)){var c=t.interleaved;c===null?(i.next=i,Ws(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}finally{}n=Od(e,t,i,r),n!==null&&(i=fe(),He(n,e,r,i),of(n,t,r))}}function rf(e){var t=e.alternate;return e===H||t!==null&&t===H}function af(e,t){hr=Ki=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function of(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Is(e,n)}}var Gi={readContext:Ae,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},Um={readContext:Ae,useCallback:function(e,t){return Ye().memoizedState=[e,t===void 0?null:t],e},useContext:Ae,useEffect:gc,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xi(4194308,4,Xd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xi(4194308,4,e,t)},useInsertionEffect:function(e,t){return xi(4,2,e,t)},useMemo:function(e,t){var n=Ye();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ye();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=$m.bind(null,H,e),[r.memoizedState,e]},useRef:function(e){var t=Ye();return e={current:e},t.memoizedState=e},useState:mc,useDebugValue:Zs,useDeferredValue:function(e){return Ye().memoizedState=e},useTransition:function(){var e=mc(!1),t=e[0];return e=zm.bind(null,e[1]),Ye().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=H,i=Ye();if(B){if(n===void 0)throw Error(E(407));n=n()}else{if(n=t(),te===null)throw Error(E(349));sn&30||Hd(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,gc(Vd.bind(null,r,a,e),[e]),r.flags|=2048,Ar(9,Wd.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Ye(),t=te.identifierPrefix;if(B){var n=ot,r=at;n=(r&~(1<<32-Ue(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Pr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Om++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Hm={readContext:Ae,useCallback:Zd,useContext:Ae,useEffect:Js,useImperativeHandle:Jd,useInsertionEffect:qd,useLayoutEffect:Qd,useMemo:ef,useReducer:Va,useRef:Yd,useState:function(){return Va(Mr)},useDebugValue:Zs,useDeferredValue:function(e){var t=Le();return tf(t,J.memoizedState,e)},useTransition:function(){var e=Va(Mr)[0],t=Le().memoizedState;return[e,t]},useMutableSource:Bd,useSyncExternalStore:Ud,useId:nf,unstable_isNewReconciler:!1},Wm={readContext:Ae,useCallback:Zd,useContext:Ae,useEffect:Js,useImperativeHandle:Jd,useInsertionEffect:qd,useLayoutEffect:Qd,useMemo:ef,useReducer:Ka,useRef:Yd,useState:function(){return Ka(Mr)},useDebugValue:Zs,useDeferredValue:function(e){var t=Le();return J===null?t.memoizedState=e:tf(t,J.memoizedState,e)},useTransition:function(){var e=Ka(Mr)[0],t=Le().memoizedState;return[e,t]},useMutableSource:Bd,useSyncExternalStore:Ud,useId:nf,unstable_isNewReconciler:!1};function ze(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ko(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var fa={isMounted:function(e){return(e=e._reactInternals)?pn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fe(),i=Ot(e),a=st(r,i);a.payload=t,n!=null&&(a.callback=n),t=Dt(e,a,i),t!==null&&(He(t,e,i,r),vi(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fe(),i=Ot(e),a=st(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Dt(e,a,i),t!==null&&(He(t,e,i,r),vi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fe(),r=Ot(e),i=st(n,r);i.tag=2,t!=null&&(i.callback=t),t=Dt(e,i,r),t!==null&&(He(t,e,r,n),vi(t,e,r))}};function yc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!br(n,r)||!br(i,a):!0}function sf(e,t,n){var r=!1,i=Ht,a=t.contextType;return typeof a=="object"&&a!==null?a=Ae(a):(i=xe(t)?an:ce.current,r=t.contextTypes,a=(r=r!=null)?Fn(e,i):Ht),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=fa,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function vc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&fa.enqueueReplaceState(t,t.state,null)}function Go(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Vs(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=Ae(a):(a=xe(t)?an:ce.current,i.context=Fn(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Ko(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&fa.enqueueReplaceState(i,i.state,null),Wi(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Bn(e,t){try{var n="",r=t;do n+=vh(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function Ga(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Yo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Vm=typeof WeakMap=="function"?WeakMap:Map;function lf(e,t,n){n=st(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){qi||(qi=!0,is=r),Yo(e,t)},n}function cf(e,t,n){n=st(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Yo(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Yo(e,t),typeof r!="function"&&(Ft===null?Ft=new Set([this]):Ft.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function wc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Vm;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=ag.bind(null,e,t,n),t.then(e,e))}function xc(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Sc(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=st(-1,1),t.tag=2,Dt(n,t,1))),n.lanes|=1),e)}var Km=mt.ReactCurrentOwner,ve=!1;function de(e,t,n,r){t.child=e===null?Fd(t,null,n,r):zn(t,e.child,n,r)}function kc(e,t,n,r,i){n=n.render;var a=t.ref;return Mn(t,i),r=Qs(e,t,n,r,a,i),n=Xs(),e!==null&&!ve?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,dt(e,t,i)):(B&&n&&Os(t),t.flags|=1,de(e,t,r,i),t.child)}function Ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!sl(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,uf(e,t,a,r,i)):(e=Ci(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&i)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:br,n(o,r)&&e.ref===t.ref)return dt(e,t,i)}return t.flags|=1,e=zt(a,r),e.ref=t.ref,e.return=t,t.child=e}function uf(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(br(a,r)&&e.ref===t.ref)if(ve=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(ve=!0);else return t.lanes=e.lanes,dt(e,t,i)}return qo(e,t,n,r,i)}function df(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},O(jn,ke),ke|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,O(jn,ke),ke|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,O(jn,ke),ke|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,O(jn,ke),ke|=r;return de(e,t,i,n),t.child}function ff(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function qo(e,t,n,r,i){var a=xe(n)?an:ce.current;return a=Fn(t,a),Mn(t,i),n=Qs(e,t,n,r,a,i),r=Xs(),e!==null&&!ve?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,dt(e,t,i)):(B&&r&&Os(t),t.flags|=1,de(e,t,n,i),t.child)}function Cc(e,t,n,r,i){if(xe(n)){var a=!0;zi(t)}else a=!1;if(Mn(t,i),t.stateNode===null)Si(e,t),sf(t,n,r),Go(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,l=t.memoizedProps;o.props=l;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ae(u):(u=xe(n)?an:ce.current,u=Fn(t,u));var p=n.getDerivedStateFromProps,d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||c!==u)&&vc(t,o,r,u),bt=!1;var m=t.memoizedState;o.state=m,Wi(t,r,o,i),c=t.memoizedState,l!==r||m!==c||we.current||bt?(typeof p=="function"&&(Ko(t,n,p,r),c=t.memoizedState),(l=bt||yc(t,n,l,r,m,c,u))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=u,r=l):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,zd(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:ze(t.type,l),o.props=u,d=t.pendingProps,m=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ae(c):(c=xe(n)?an:ce.current,c=Fn(t,c));var x=n.getDerivedStateFromProps;(p=typeof x=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==d||m!==c)&&vc(t,o,r,c),bt=!1,m=t.memoizedState,o.state=m,Wi(t,r,o,i);var w=t.memoizedState;l!==d||m!==w||we.current||bt?(typeof x=="function"&&(Ko(t,n,x,r),w=t.memoizedState),(u=bt||yc(t,n,u,r,m,w,c)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,w,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,w,c)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),o.props=r,o.state=w,o.context=c,r=u):(typeof o.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Qo(e,t,n,r,a,i)}function Qo(e,t,n,r,i,a){ff(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&cc(t,n,!1),dt(e,t,a);r=t.stateNode,Km.current=t;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=zn(t,e.child,null,a),t.child=zn(t,null,l,a)):de(e,t,l,a),t.memoizedState=r.state,i&&cc(t,n,!0),t.child}function pf(e){var t=e.stateNode;t.pendingContext?lc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&lc(e,t.context,!1),Ks(e,t.containerInfo)}function _c(e,t,n,r,i){return On(),$s(i),t.flags|=256,de(e,t,n,r),t.child}var Xo={dehydrated:null,treeContext:null,retryLane:0};function Jo(e){return{baseLanes:e,cachePool:null,transitions:null}}function hf(e,t,n){var r=t.pendingProps,i=U.current,a=!1,o=(t.flags&128)!==0,l;if((l=o)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),O(U,i&1),e===null)return Wo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=ma(o,r,0,null),e=rn(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Jo(n),t.memoizedState=Xo,e):el(t,o));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Gm(e,t,o,r,l,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,l=i.sibling;var c={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=zt(i,c),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?a=zt(l,a):(a=rn(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?Jo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Xo,r}return a=e.child,e=a.sibling,r=zt(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function el(e,t){return t=ma({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function li(e,t,n,r){return r!==null&&$s(r),zn(t,e.child,null,n),e=el(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Gm(e,t,n,r,i,a,o){if(n)return t.flags&256?(t.flags&=-257,r=Ga(Error(E(422))),li(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=ma({mode:"visible",children:r.children},i,0,null),a=rn(a,i,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&zn(t,e.child,null,o),t.child.memoizedState=Jo(o),t.memoizedState=Xo,a);if(!(t.mode&1))return li(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,a=Error(E(419)),r=Ga(a,r,void 0),li(e,t,o,r)}if(l=(o&e.childLanes)!==0,ve||l){if(r=te,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,ut(e,i),He(r,e,i,-1))}return ol(),r=Ga(Error(E(421))),li(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=og.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,Ee=Lt(i.nextSibling),Ce=t,B=!0,Be=null,e!==null&&(Ie[Re++]=at,Ie[Re++]=ot,Ie[Re++]=on,at=e.id,ot=e.overflow,on=t),t=el(t,r.children),t.flags|=4096,t)}function bc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Vo(e.return,t,n)}function Ya(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function mf(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(de(e,t,r.children,n),r=U.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bc(e,n,t);else if(e.tag===19)bc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(O(U,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Vi(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Ya(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Vi(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Ya(t,!0,n,null,a);break;case"together":Ya(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Si(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function dt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ln|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(E(153));if(t.child!==null){for(e=t.child,n=zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ym(e,t,n){switch(t.tag){case 3:pf(t),On();break;case 5:$d(t);break;case 1:xe(t.type)&&zi(t);break;case 4:Ks(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;O(Ui,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(O(U,U.current&1),t.flags|=128,null):n&t.child.childLanes?hf(e,t,n):(O(U,U.current&1),e=dt(e,t,n),e!==null?e.sibling:null);O(U,U.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return mf(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(U,U.current),r)break;return null;case 22:case 23:return t.lanes=0,df(e,t,n)}return dt(e,t,n)}var gf,Zo,yf,vf;gf=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Zo=function(){};yf=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,en(Je.current);var a=null;switch(n){case"input":i=So(e,i),r=So(e,r),a=[];break;case"select":i=V({},i,{value:void 0}),r=V({},r,{value:void 0}),a=[];break;case"textarea":i=Co(e,i),r=Co(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Fi)}bo(n,r);var o;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(wr.hasOwnProperty(u)?a||(a=[]):(a=a||[]).push(u,null));for(u in r){var c=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&c!==l&&(c!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&l[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(a||(a=[]),a.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(a=a||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(a=a||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(wr.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&z("scroll",e),a||l===c||(a=[])):(a=a||[]).push(u,c))}n&&(a=a||[]).push("style",n);var u=a;(t.updateQueue=u)&&(t.flags|=4)}};vf=function(e,t,n,r){n!==r&&(t.flags|=4)};function tr(e,t){if(!B)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function qm(e,t,n){var r=t.pendingProps;switch(zs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return xe(t.type)&&Oi(),se(t),null;case 3:return r=t.stateNode,$n(),$(we),$(ce),Ys(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(oi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Be!==null&&(ss(Be),Be=null))),Zo(e,t),se(t),null;case 5:Gs(t);var i=en(Rr.current);if(n=t.type,e!==null&&t.stateNode!=null)yf(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(E(166));return se(t),null}if(e=en(Je.current),oi(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[qe]=t,r[Tr]=a,e=(t.mode&1)!==0,n){case"dialog":z("cancel",r),z("close",r);break;case"iframe":case"object":case"embed":z("load",r);break;case"video":case"audio":for(i=0;i<lr.length;i++)z(lr[i],r);break;case"source":z("error",r);break;case"img":case"image":case"link":z("error",r),z("load",r);break;case"details":z("toggle",r);break;case"input":Ll(r,a),z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},z("invalid",r);break;case"textarea":Fl(r,a),z("invalid",r)}bo(n,a),i=null;for(var o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="children"?typeof l=="string"?r.textContent!==l&&(a.suppressHydrationWarning!==!0&&ai(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(a.suppressHydrationWarning!==!0&&ai(r.textContent,l,e),i=["children",""+l]):wr.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&z("scroll",r)}switch(n){case"input":Xr(r),Dl(r,a,!0);break;case"textarea":Xr(r),Ol(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Fi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[qe]=t,e[Tr]=r,gf(e,t,!1,!1),t.stateNode=e;e:{switch(o=No(n,r),n){case"dialog":z("cancel",e),z("close",e),i=r;break;case"iframe":case"object":case"embed":z("load",e),i=r;break;case"video":case"audio":for(i=0;i<lr.length;i++)z(lr[i],e);i=r;break;case"source":z("error",e),i=r;break;case"img":case"image":case"link":z("error",e),z("load",e),i=r;break;case"details":z("toggle",e),i=r;break;case"input":Ll(e,r),i=So(e,r),z("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=V({},r,{value:void 0}),z("invalid",e);break;case"textarea":Fl(e,r),i=Co(e,r),z("invalid",e);break;default:i=r}bo(n,i),l=i;for(a in l)if(l.hasOwnProperty(a)){var c=l[a];a==="style"?Yu(e,c):a==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Ku(e,c)):a==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&xr(e,c):typeof c=="number"&&xr(e,""+c):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(wr.hasOwnProperty(a)?c!=null&&a==="onScroll"&&z("scroll",e):c!=null&&Cs(e,a,c,o))}switch(n){case"input":Xr(e),Dl(e,r,!1);break;case"textarea":Xr(e),Ol(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Ut(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Tn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Tn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Fi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)vf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(E(166));if(n=en(Rr.current),en(Je.current),oi(t)){if(r=t.stateNode,n=t.memoizedProps,r[qe]=t,(a=r.nodeValue!==n)&&(e=Ce,e!==null))switch(e.tag){case 3:ai(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ai(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[qe]=t,t.stateNode=r}return se(t),null;case 13:if($(U),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(B&&Ee!==null&&t.mode&1&&!(t.flags&128))Ld(),On(),t.flags|=98560,a=!1;else if(a=oi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(E(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(E(317));a[qe]=t}else On(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),a=!1}else Be!==null&&(ss(Be),Be=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||U.current&1?Z===0&&(Z=3):ol())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return $n(),Zo(e,t),e===null&&Nr(t.stateNode.containerInfo),se(t),null;case 10:return Hs(t.type._context),se(t),null;case 17:return xe(t.type)&&Oi(),se(t),null;case 19:if($(U),a=t.memoizedState,a===null)return se(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)tr(a,!1);else{if(Z!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Vi(e),o!==null){for(t.flags|=128,tr(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return O(U,U.current&1|2),t.child}e=e.sibling}a.tail!==null&&q()>Un&&(t.flags|=128,r=!0,tr(a,!1),t.lanes=4194304)}else{if(!r)if(e=Vi(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),tr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!B)return se(t),null}else 2*q()-a.renderingStartTime>Un&&n!==1073741824&&(t.flags|=128,r=!0,tr(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=q(),t.sibling=null,n=U.current,O(U,r?n&1|2:n&1),t):(se(t),null);case 22:case 23:return al(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ke&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(E(156,t.tag))}function Qm(e,t){switch(zs(t),t.tag){case 1:return xe(t.type)&&Oi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return $n(),$(we),$(ce),Ys(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Gs(t),null;case 13:if($(U),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(E(340));On()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $(U),null;case 4:return $n(),null;case 10:return Hs(t.type._context),null;case 22:case 23:return al(),null;case 24:return null;default:return null}}var ci=!1,le=!1,Xm=typeof WeakSet=="function"?WeakSet:Set,j=null;function Nn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Y(e,t,r)}else n.current=null}function es(e,t,n){try{n()}catch(r){Y(e,t,r)}}var Nc=!1;function Jm(e,t){if(Fo=Ai,e=kd(),Fs(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,l=-1,c=-1,u=0,p=0,d=e,m=null;t:for(;;){for(var x;d!==n||i!==0&&d.nodeType!==3||(l=o+i),d!==a||r!==0&&d.nodeType!==3||(c=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(x=d.firstChild)!==null;)m=d,d=x;for(;;){if(d===e)break t;if(m===n&&++u===i&&(l=o),m===a&&++p===r&&(c=o),(x=d.nextSibling)!==null)break;d=m,m=d.parentNode}d=x}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Oo={focusedElem:e,selectionRange:n},Ai=!1,j=t;j!==null;)if(t=j,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,j=e;else for(;j!==null;){t=j;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var v=w.memoizedProps,k=w.memoizedState,f=t.stateNode,h=f.getSnapshotBeforeUpdate(t.elementType===t.type?v:ze(t.type,v),k);f.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(S){Y(t,t.return,S)}if(e=t.sibling,e!==null){e.return=t.return,j=e;break}j=t.return}return w=Nc,Nc=!1,w}function mr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&es(t,n,a)}i=i.next}while(i!==r)}}function pa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ts(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function wf(e){var t=e.alternate;t!==null&&(e.alternate=null,wf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[qe],delete t[Tr],delete t[Bo],delete t[Am],delete t[Lm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function xf(e){return e.tag===5||e.tag===3||e.tag===4}function jc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||xf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ns(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Fi));else if(r!==4&&(e=e.child,e!==null))for(ns(e,t,n),e=e.sibling;e!==null;)ns(e,t,n),e=e.sibling}function rs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(rs(e,t,n),e=e.sibling;e!==null;)rs(e,t,n),e=e.sibling}var ne=null,$e=!1;function Et(e,t,n){for(n=n.child;n!==null;)Sf(e,t,n),n=n.sibling}function Sf(e,t,n){if(Xe&&typeof Xe.onCommitFiberUnmount=="function")try{Xe.onCommitFiberUnmount(aa,n)}catch{}switch(n.tag){case 5:le||Nn(n,t);case 6:var r=ne,i=$e;ne=null,Et(e,t,n),ne=r,$e=i,ne!==null&&($e?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&($e?(e=ne,n=n.stateNode,e.nodeType===8?Ba(e.parentNode,n):e.nodeType===1&&Ba(e,n),Cr(e)):Ba(ne,n.stateNode));break;case 4:r=ne,i=$e,ne=n.stateNode.containerInfo,$e=!0,Et(e,t,n),ne=r,$e=i;break;case 0:case 11:case 14:case 15:if(!le&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&es(n,t,o),i=i.next}while(i!==r)}Et(e,t,n);break;case 1:if(!le&&(Nn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Y(n,t,l)}Et(e,t,n);break;case 21:Et(e,t,n);break;case 22:n.mode&1?(le=(r=le)||n.memoizedState!==null,Et(e,t,n),le=r):Et(e,t,n);break;default:Et(e,t,n)}}function Tc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Xm),t.forEach(function(r){var i=sg.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Oe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,o=t,l=o;e:for(;l!==null;){switch(l.tag){case 5:ne=l.stateNode,$e=!1;break e;case 3:ne=l.stateNode.containerInfo,$e=!0;break e;case 4:ne=l.stateNode.containerInfo,$e=!0;break e}l=l.return}if(ne===null)throw Error(E(160));Sf(a,o,i),ne=null,$e=!1;var c=i.alternate;c!==null&&(c.return=null),i.return=null}catch(u){Y(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)kf(t,e),t=t.sibling}function kf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Oe(t,e),Ge(e),r&4){try{mr(3,e,e.return),pa(3,e)}catch(v){Y(e,e.return,v)}try{mr(5,e,e.return)}catch(v){Y(e,e.return,v)}}break;case 1:Oe(t,e),Ge(e),r&512&&n!==null&&Nn(n,n.return);break;case 5:if(Oe(t,e),Ge(e),r&512&&n!==null&&Nn(n,n.return),e.flags&32){var i=e.stateNode;try{xr(i,"")}catch(v){Y(e,e.return,v)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,l=e.type,c=e.updateQueue;if(e.updateQueue=null,c!==null)try{l==="input"&&a.type==="radio"&&a.name!=null&&Hu(i,a),No(l,o);var u=No(l,a);for(o=0;o<c.length;o+=2){var p=c[o],d=c[o+1];p==="style"?Yu(i,d):p==="dangerouslySetInnerHTML"?Ku(i,d):p==="children"?xr(i,d):Cs(i,p,d,u)}switch(l){case"input":ko(i,a);break;case"textarea":Wu(i,a);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var x=a.value;x!=null?Tn(i,!!a.multiple,x,!1):m!==!!a.multiple&&(a.defaultValue!=null?Tn(i,!!a.multiple,a.defaultValue,!0):Tn(i,!!a.multiple,a.multiple?[]:"",!1))}i[Tr]=a}catch(v){Y(e,e.return,v)}}break;case 6:if(Oe(t,e),Ge(e),r&4){if(e.stateNode===null)throw Error(E(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(v){Y(e,e.return,v)}}break;case 3:if(Oe(t,e),Ge(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Cr(t.containerInfo)}catch(v){Y(e,e.return,v)}break;case 4:Oe(t,e),Ge(e);break;case 13:Oe(t,e),Ge(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(rl=q())),r&4&&Tc(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(le=(u=le)||p,Oe(t,e),le=u):Oe(t,e),Ge(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!p&&e.mode&1)for(j=e,p=e.child;p!==null;){for(d=j=p;j!==null;){switch(m=j,x=m.child,m.tag){case 0:case 11:case 14:case 15:mr(4,m,m.return);break;case 1:Nn(m,m.return);var w=m.stateNode;if(typeof w.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(v){Y(r,n,v)}}break;case 5:Nn(m,m.return);break;case 22:if(m.memoizedState!==null){Rc(d);continue}}x!==null?(x.return=m,j=x):Rc(d)}p=p.sibling}e:for(p=null,d=e;;){if(d.tag===5){if(p===null){p=d;try{i=d.stateNode,u?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(l=d.stateNode,c=d.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=Gu("display",o))}catch(v){Y(e,e.return,v)}}}else if(d.tag===6){if(p===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(v){Y(e,e.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;p===d&&(p=null),d=d.return}p===d&&(p=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Oe(t,e),Ge(e),r&4&&Tc(e);break;case 21:break;default:Oe(t,e),Ge(e)}}function Ge(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(xf(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(xr(i,""),r.flags&=-33);var a=jc(e);rs(e,a,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=jc(e);ns(e,l,o);break;default:throw Error(E(161))}}catch(c){Y(e,e.return,c)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Zm(e,t,n){j=e,Ef(e)}function Ef(e,t,n){for(var r=(e.mode&1)!==0;j!==null;){var i=j,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ci;if(!o){var l=i.alternate,c=l!==null&&l.memoizedState!==null||le;l=ci;var u=le;if(ci=o,(le=c)&&!u)for(j=i;j!==null;)o=j,c=o.child,o.tag===22&&o.memoizedState!==null?Pc(i):c!==null?(c.return=o,j=c):Pc(i);for(;a!==null;)j=a,Ef(a),a=a.sibling;j=i,ci=l,le=u}Ic(e)}else i.subtreeFlags&8772&&a!==null?(a.return=i,j=a):Ic(e)}}function Ic(e){for(;j!==null;){var t=j;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||pa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!le)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:ze(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&hc(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}hc(t,o,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var c=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var d=p.dehydrated;d!==null&&Cr(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}le||t.flags&512&&ts(t)}catch(m){Y(t,t.return,m)}}if(t===e){j=null;break}if(n=t.sibling,n!==null){n.return=t.return,j=n;break}j=t.return}}function Rc(e){for(;j!==null;){var t=j;if(t===e){j=null;break}var n=t.sibling;if(n!==null){n.return=t.return,j=n;break}j=t.return}}function Pc(e){for(;j!==null;){var t=j;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{pa(4,t)}catch(c){Y(t,n,c)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(c){Y(t,i,c)}}var a=t.return;try{ts(t)}catch(c){Y(t,a,c)}break;case 5:var o=t.return;try{ts(t)}catch(c){Y(t,o,c)}}}catch(c){Y(t,t.return,c)}if(t===e){j=null;break}var l=t.sibling;if(l!==null){l.return=t.return,j=l;break}j=t.return}}var eg=Math.ceil,Yi=mt.ReactCurrentDispatcher,tl=mt.ReactCurrentOwner,Me=mt.ReactCurrentBatchConfig,A=0,te=null,X=null,re=0,ke=0,jn=Kt(0),Z=0,Lr=null,ln=0,ha=0,nl=0,gr=null,ye=null,rl=0,Un=1/0,rt=null,qi=!1,is=null,Ft=null,ui=!1,It=null,Qi=0,yr=0,as=null,ki=-1,Ei=0;function fe(){return A&6?q():ki!==-1?ki:ki=q()}function Ot(e){return e.mode&1?A&2&&re!==0?re&-re:Fm.transition!==null?(Ei===0&&(Ei=od()),Ei):(e=D,e!==0||(e=window.event,e=e===void 0?16:pd(e.type)),e):1}function He(e,t,n,r){if(50<yr)throw yr=0,as=null,Error(E(185));$r(e,n,r),(!(A&2)||e!==te)&&(e===te&&(!(A&2)&&(ha|=n),Z===4&&jt(e,re)),Se(e,r),n===1&&A===0&&!(t.mode&1)&&(Un=q()+500,ua&&Gt()))}function Se(e,t){var n=e.callbackNode;Fh(e,t);var r=Mi(e,e===te?re:0);if(r===0)n!==null&&Bl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Bl(n),t===1)e.tag===0?Dm(Mc.bind(null,e)):Pd(Mc.bind(null,e)),Pm(function(){!(A&6)&&Gt()}),n=null;else{switch(sd(r)){case 1:n=Ts;break;case 4:n=id;break;case 16:n=Pi;break;case 536870912:n=ad;break;default:n=Pi}n=Rf(n,Cf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Cf(e,t){if(ki=-1,Ei=0,A&6)throw Error(E(327));var n=e.callbackNode;if(An()&&e.callbackNode!==n)return null;var r=Mi(e,e===te?re:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Xi(e,r);else{t=r;var i=A;A|=2;var a=bf();(te!==e||re!==t)&&(rt=null,Un=q()+500,nn(e,t));do try{rg();break}catch(l){_f(e,l)}while(!0);Us(),Yi.current=a,A=i,X!==null?t=0:(te=null,re=0,t=Z)}if(t!==0){if(t===2&&(i=Po(e),i!==0&&(r=i,t=os(e,i))),t===1)throw n=Lr,nn(e,0),jt(e,r),Se(e,q()),n;if(t===6)jt(e,r);else{if(i=e.current.alternate,!(r&30)&&!tg(i)&&(t=Xi(e,r),t===2&&(a=Po(e),a!==0&&(r=a,t=os(e,a))),t===1))throw n=Lr,nn(e,0),jt(e,r),Se(e,q()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(E(345));case 2:qt(e,ye,rt);break;case 3:if(jt(e,r),(r&130023424)===r&&(t=rl+500-q(),10<t)){if(Mi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){fe(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=$o(qt.bind(null,e,ye,rt),t);break}qt(e,ye,rt);break;case 4:if(jt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Ue(r);a=1<<o,o=t[o],o>i&&(i=o),r&=~a}if(r=i,r=q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*eg(r/1960))-r,10<r){e.timeoutHandle=$o(qt.bind(null,e,ye,rt),r);break}qt(e,ye,rt);break;case 5:qt(e,ye,rt);break;default:throw Error(E(329))}}}return Se(e,q()),e.callbackNode===n?Cf.bind(null,e):null}function os(e,t){var n=gr;return e.current.memoizedState.isDehydrated&&(nn(e,t).flags|=256),e=Xi(e,t),e!==2&&(t=ye,ye=n,t!==null&&ss(t)),e}function ss(e){ye===null?ye=e:ye.push.apply(ye,e)}function tg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!We(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function jt(e,t){for(t&=~nl,t&=~ha,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ue(t),r=1<<n;e[n]=-1,t&=~r}}function Mc(e){if(A&6)throw Error(E(327));An();var t=Mi(e,0);if(!(t&1))return Se(e,q()),null;var n=Xi(e,t);if(e.tag!==0&&n===2){var r=Po(e);r!==0&&(t=r,n=os(e,r))}if(n===1)throw n=Lr,nn(e,0),jt(e,t),Se(e,q()),n;if(n===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,qt(e,ye,rt),Se(e,q()),null}function il(e,t){var n=A;A|=1;try{return e(t)}finally{A=n,A===0&&(Un=q()+500,ua&&Gt())}}function cn(e){It!==null&&It.tag===0&&!(A&6)&&An();var t=A;A|=1;var n=Me.transition,r=D;try{if(Me.transition=null,D=1,e)return e()}finally{D=r,Me.transition=n,A=t,!(A&6)&&Gt()}}function al(){ke=jn.current,$(jn)}function nn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Rm(n)),X!==null)for(n=X.return;n!==null;){var r=n;switch(zs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Oi();break;case 3:$n(),$(we),$(ce),Ys();break;case 5:Gs(r);break;case 4:$n();break;case 13:$(U);break;case 19:$(U);break;case 10:Hs(r.type._context);break;case 22:case 23:al()}n=n.return}if(te=e,X=e=zt(e.current,null),re=ke=t,Z=0,Lr=null,nl=ha=ln=0,ye=gr=null,Zt!==null){for(t=0;t<Zt.length;t++)if(n=Zt[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}Zt=null}return e}function _f(e,t){do{var n=X;try{if(Us(),wi.current=Gi,Ki){for(var r=H.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ki=!1}if(sn=0,ee=J=H=null,hr=!1,Pr=0,tl.current=null,n===null||n.return===null){Z=1,Lr=t,X=null;break}e:{var a=e,o=n.return,l=n,c=t;if(t=re,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,p=l,d=p.tag;if(!(p.mode&1)&&(d===0||d===11||d===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var x=xc(o);if(x!==null){x.flags&=-257,Sc(x,o,l,a,t),x.mode&1&&wc(a,u,t),t=x,c=u;var w=t.updateQueue;if(w===null){var v=new Set;v.add(c),t.updateQueue=v}else w.add(c);break e}else{if(!(t&1)){wc(a,u,t),ol();break e}c=Error(E(426))}}else if(B&&l.mode&1){var k=xc(o);if(k!==null){!(k.flags&65536)&&(k.flags|=256),Sc(k,o,l,a,t),$s(Bn(c,l));break e}}a=c=Bn(c,l),Z!==4&&(Z=2),gr===null?gr=[a]:gr.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var f=lf(a,c,t);pc(a,f);break e;case 1:l=c;var h=a.type,g=a.stateNode;if(!(a.flags&128)&&(typeof h.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Ft===null||!Ft.has(g)))){a.flags|=65536,t&=-t,a.lanes|=t;var S=cf(a,l,t);pc(a,S);break e}}a=a.return}while(a!==null)}jf(n)}catch(C){t=C,X===n&&n!==null&&(X=n=n.return);continue}break}while(!0)}function bf(){var e=Yi.current;return Yi.current=Gi,e===null?Gi:e}function ol(){(Z===0||Z===3||Z===2)&&(Z=4),te===null||!(ln&268435455)&&!(ha&268435455)||jt(te,re)}function Xi(e,t){var n=A;A|=2;var r=bf();(te!==e||re!==t)&&(rt=null,nn(e,t));do try{ng();break}catch(i){_f(e,i)}while(!0);if(Us(),A=n,Yi.current=r,X!==null)throw Error(E(261));return te=null,re=0,Z}function ng(){for(;X!==null;)Nf(X)}function rg(){for(;X!==null&&!jh();)Nf(X)}function Nf(e){var t=If(e.alternate,e,ke);e.memoizedProps=e.pendingProps,t===null?jf(e):X=t,tl.current=null}function jf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Qm(n,t),n!==null){n.flags&=32767,X=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Z=6,X=null;return}}else if(n=qm(n,t,ke),n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);Z===0&&(Z=5)}function qt(e,t,n){var r=D,i=Me.transition;try{Me.transition=null,D=1,ig(e,t,n,r)}finally{Me.transition=i,D=r}return null}function ig(e,t,n,r){do An();while(It!==null);if(A&6)throw Error(E(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Oh(e,a),e===te&&(X=te=null,re=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ui||(ui=!0,Rf(Pi,function(){return An(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Me.transition,Me.transition=null;var o=D;D=1;var l=A;A|=4,tl.current=null,Jm(e,n),kf(n,e),Cm(Oo),Ai=!!Fo,Oo=Fo=null,e.current=n,Zm(n),Th(),A=l,D=o,Me.transition=a}else e.current=n;if(ui&&(ui=!1,It=e,Qi=i),a=e.pendingLanes,a===0&&(Ft=null),Ph(n.stateNode),Se(e,q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(qi)throw qi=!1,e=is,is=null,e;return Qi&1&&e.tag!==0&&An(),a=e.pendingLanes,a&1?e===as?yr++:(yr=0,as=e):yr=0,Gt(),null}function An(){if(It!==null){var e=sd(Qi),t=Me.transition,n=D;try{if(Me.transition=null,D=16>e?16:e,It===null)var r=!1;else{if(e=It,It=null,Qi=0,A&6)throw Error(E(331));var i=A;for(A|=4,j=e.current;j!==null;){var a=j,o=a.child;if(j.flags&16){var l=a.deletions;if(l!==null){for(var c=0;c<l.length;c++){var u=l[c];for(j=u;j!==null;){var p=j;switch(p.tag){case 0:case 11:case 15:mr(8,p,a)}var d=p.child;if(d!==null)d.return=p,j=d;else for(;j!==null;){p=j;var m=p.sibling,x=p.return;if(wf(p),p===u){j=null;break}if(m!==null){m.return=x,j=m;break}j=x}}}var w=a.alternate;if(w!==null){var v=w.child;if(v!==null){w.child=null;do{var k=v.sibling;v.sibling=null,v=k}while(v!==null)}}j=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,j=o;else e:for(;j!==null;){if(a=j,a.flags&2048)switch(a.tag){case 0:case 11:case 15:mr(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,j=f;break e}j=a.return}}var h=e.current;for(j=h;j!==null;){o=j;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,j=g;else e:for(o=h;j!==null;){if(l=j,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:pa(9,l)}}catch(C){Y(l,l.return,C)}if(l===o){j=null;break e}var S=l.sibling;if(S!==null){S.return=l.return,j=S;break e}j=l.return}}if(A=i,Gt(),Xe&&typeof Xe.onPostCommitFiberRoot=="function")try{Xe.onPostCommitFiberRoot(aa,e)}catch{}r=!0}return r}finally{D=n,Me.transition=t}}return!1}function Ac(e,t,n){t=Bn(n,t),t=lf(e,t,1),e=Dt(e,t,1),t=fe(),e!==null&&($r(e,1,t),Se(e,t))}function Y(e,t,n){if(e.tag===3)Ac(e,e,n);else for(;t!==null;){if(t.tag===3){Ac(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ft===null||!Ft.has(r))){e=Bn(n,e),e=cf(t,e,1),t=Dt(t,e,1),e=fe(),t!==null&&($r(t,1,e),Se(t,e));break}}t=t.return}}function ag(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=fe(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(re&n)===n&&(Z===4||Z===3&&(re&130023424)===re&&500>q()-rl?nn(e,0):nl|=n),Se(e,t)}function Tf(e,t){t===0&&(e.mode&1?(t=ei,ei<<=1,!(ei&130023424)&&(ei=4194304)):t=1);var n=fe();e=ut(e,t),e!==null&&($r(e,t,n),Se(e,n))}function og(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Tf(e,n)}function sg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(t),Tf(e,n)}var If;If=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||we.current)ve=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ve=!1,Ym(e,t,n);ve=!!(e.flags&131072)}else ve=!1,B&&t.flags&1048576&&Md(t,Bi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Si(e,t),e=t.pendingProps;var i=Fn(t,ce.current);Mn(t,n),i=Qs(null,t,r,e,i,n);var a=Xs();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,xe(r)?(a=!0,zi(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Vs(t),i.updater=fa,t.stateNode=i,i._reactInternals=t,Go(t,r,e,n),t=Qo(null,t,r,!0,a,n)):(t.tag=0,B&&a&&Os(t),de(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Si(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=cg(r),e=ze(r,e),i){case 0:t=qo(null,t,r,e,n);break e;case 1:t=Cc(null,t,r,e,n);break e;case 11:t=kc(null,t,r,e,n);break e;case 14:t=Ec(null,t,r,ze(r.type,e),n);break e}throw Error(E(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ze(r,i),qo(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ze(r,i),Cc(e,t,r,i,n);case 3:e:{if(pf(t),e===null)throw Error(E(387));r=t.pendingProps,a=t.memoizedState,i=a.element,zd(e,t),Wi(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=Bn(Error(E(423)),t),t=_c(e,t,r,n,i);break e}else if(r!==i){i=Bn(Error(E(424)),t),t=_c(e,t,r,n,i);break e}else for(Ee=Lt(t.stateNode.containerInfo.firstChild),Ce=t,B=!0,Be=null,n=Fd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(On(),r===i){t=dt(e,t,n);break e}de(e,t,r,n)}t=t.child}return t;case 5:return $d(t),e===null&&Wo(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,zo(r,i)?o=null:a!==null&&zo(r,a)&&(t.flags|=32),ff(e,t),de(e,t,o,n),t.child;case 6:return e===null&&Wo(t),null;case 13:return hf(e,t,n);case 4:return Ks(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=zn(t,null,r,n):de(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ze(r,i),kc(e,t,r,i,n);case 7:return de(e,t,t.pendingProps,n),t.child;case 8:return de(e,t,t.pendingProps.children,n),t.child;case 12:return de(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,o=i.value,O(Ui,r._currentValue),r._currentValue=o,a!==null)if(We(a.value,o)){if(a.children===i.children&&!we.current){t=dt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var l=a.dependencies;if(l!==null){o=a.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(a.tag===1){c=st(-1,n&-n),c.tag=2;var u=a.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?c.next=c:(c.next=p.next,p.next=c),u.pending=c}}a.lanes|=n,c=a.alternate,c!==null&&(c.lanes|=n),Vo(a.return,n,t),l.lanes|=n;break}c=c.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(E(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Vo(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}de(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Mn(t,n),i=Ae(i),r=r(i),t.flags|=1,de(e,t,r,n),t.child;case 14:return r=t.type,i=ze(r,t.pendingProps),i=ze(r.type,i),Ec(e,t,r,i,n);case 15:return uf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:ze(r,i),Si(e,t),t.tag=1,xe(r)?(e=!0,zi(t)):e=!1,Mn(t,n),sf(t,r,i),Go(t,r,i,n),Qo(null,t,r,!0,e,n);case 19:return mf(e,t,n);case 22:return df(e,t,n)}throw Error(E(156,t.tag))};function Rf(e,t){return rd(e,t)}function lg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pe(e,t,n,r){return new lg(e,t,n,r)}function sl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function cg(e){if(typeof e=="function")return sl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===bs)return 11;if(e===Ns)return 14}return 2}function zt(e,t){var n=e.alternate;return n===null?(n=Pe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ci(e,t,n,r,i,a){var o=2;if(r=e,typeof e=="function")sl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case vn:return rn(n.children,i,a,t);case _s:o=8,i|=8;break;case yo:return e=Pe(12,n,t,i|2),e.elementType=yo,e.lanes=a,e;case vo:return e=Pe(13,n,t,i),e.elementType=vo,e.lanes=a,e;case wo:return e=Pe(19,n,t,i),e.elementType=wo,e.lanes=a,e;case $u:return ma(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ou:o=10;break e;case zu:o=9;break e;case bs:o=11;break e;case Ns:o=14;break e;case _t:o=16,r=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return t=Pe(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function rn(e,t,n,r){return e=Pe(7,e,r,t),e.lanes=n,e}function ma(e,t,n,r){return e=Pe(22,e,r,t),e.elementType=$u,e.lanes=n,e.stateNode={isHidden:!1},e}function qa(e,t,n){return e=Pe(6,e,null,t),e.lanes=n,e}function Qa(e,t,n){return t=Pe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ug(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ia(0),this.expirationTimes=Ia(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ia(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ll(e,t,n,r,i,a,o,l,c){return e=new ug(e,t,n,l,c),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Pe(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vs(a),e}function dg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Pf(e){if(!e)return Ht;e=e._reactInternals;e:{if(pn(e)!==e||e.tag!==1)throw Error(E(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(xe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(E(171))}if(e.tag===1){var n=e.type;if(xe(n))return Rd(e,n,t)}return t}function Mf(e,t,n,r,i,a,o,l,c){return e=ll(n,r,!0,e,i,a,o,l,c),e.context=Pf(null),n=e.current,r=fe(),i=Ot(n),a=st(r,i),a.callback=t??null,Dt(n,a,i),e.current.lanes=i,$r(e,i,r),Se(e,r),e}function ga(e,t,n,r){var i=t.current,a=fe(),o=Ot(i);return n=Pf(n),t.context===null?t.context=n:t.pendingContext=n,t=st(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Dt(i,t,o),e!==null&&(He(e,i,o,a),vi(e,i,o)),o}function Ji(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Lc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function cl(e,t){Lc(e,t),(e=e.alternate)&&Lc(e,t)}function fg(){return null}var Af=typeof reportError=="function"?reportError:function(e){console.error(e)};function ul(e){this._internalRoot=e}ya.prototype.render=ul.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(E(409));ga(e,t,null,null)};ya.prototype.unmount=ul.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;cn(function(){ga(null,e,null,null)}),t[ct]=null}};function ya(e){this._internalRoot=e}ya.prototype.unstable_scheduleHydration=function(e){if(e){var t=ud();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Nt.length&&t!==0&&t<Nt[n].priority;n++);Nt.splice(n,0,e),n===0&&fd(e)}};function dl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Dc(){}function pg(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var u=Ji(o);a.call(u)}}var o=Mf(t,r,e,0,null,!1,!1,"",Dc);return e._reactRootContainer=o,e[ct]=o.current,Nr(e.nodeType===8?e.parentNode:e),cn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=Ji(c);l.call(u)}}var c=ll(e,0,!1,null,null,!1,!1,"",Dc);return e._reactRootContainer=c,e[ct]=c.current,Nr(e.nodeType===8?e.parentNode:e),cn(function(){ga(t,c,n,r)}),c}function wa(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i=="function"){var l=i;i=function(){var c=Ji(o);l.call(c)}}ga(t,o,e,i)}else o=pg(n,t,e,i,r);return Ji(o)}ld=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=sr(t.pendingLanes);n!==0&&(Is(t,n|1),Se(t,q()),!(A&6)&&(Un=q()+500,Gt()))}break;case 13:cn(function(){var r=ut(e,1);if(r!==null){var i=fe();He(r,e,1,i)}}),cl(e,1)}};Rs=function(e){if(e.tag===13){var t=ut(e,134217728);if(t!==null){var n=fe();He(t,e,134217728,n)}cl(e,134217728)}};cd=function(e){if(e.tag===13){var t=Ot(e),n=ut(e,t);if(n!==null){var r=fe();He(n,e,t,r)}cl(e,t)}};ud=function(){return D};dd=function(e,t){var n=D;try{return D=e,t()}finally{D=n}};To=function(e,t,n){switch(t){case"input":if(ko(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=ca(r);if(!i)throw Error(E(90));Uu(r),ko(r,i)}}}break;case"textarea":Wu(e,n);break;case"select":t=n.value,t!=null&&Tn(e,!!n.multiple,t,!1)}};Xu=il;Ju=cn;var hg={usingClientEntryPoint:!1,Events:[Ur,kn,ca,qu,Qu,il]},nr={findFiberByHostInstance:Jt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},mg={bundleType:nr.bundleType,version:nr.version,rendererPackageName:nr.rendererPackageName,rendererConfig:nr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:mt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=td(e),e===null?null:e.stateNode},findFiberByHostInstance:nr.findFiberByHostInstance||fg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var di=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!di.isDisabled&&di.supportsFiber)try{aa=di.inject(mg),Xe=di}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hg;Ne.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!dl(t))throw Error(E(200));return dg(e,t,null,n)};Ne.createRoot=function(e,t){if(!dl(e))throw Error(E(299));var n=!1,r="",i=Af;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=ll(e,1,!1,null,null,n,!1,r,i),e[ct]=t.current,Nr(e.nodeType===8?e.parentNode:e),new ul(t)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=td(t),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return cn(e)};Ne.hydrate=function(e,t,n){if(!va(t))throw Error(E(200));return wa(null,e,t,!0,n)};Ne.hydrateRoot=function(e,t,n){if(!dl(e))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",o=Af;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Mf(t,null,e,1,n??null,i,!1,a,o),e[ct]=t.current,Nr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new ya(t)};Ne.render=function(e,t,n){if(!va(t))throw Error(E(200));return wa(null,e,t,!1,n)};Ne.unmountComponentAtNode=function(e){if(!va(e))throw Error(E(40));return e._reactRootContainer?(cn(function(){wa(null,null,e,!1,function(){e._reactRootContainer=null,e[ct]=null})}),!0):!1};Ne.unstable_batchedUpdates=il;Ne.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!va(n))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return wa(e,t,n,!1,r)};Ne.version="18.3.1-next-f1338f8080-20240426";function Lf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lf)}catch(e){console.error(e)}}Lf(),Au.exports=Ne;var gg=Au.exports,Fc=gg;mo.createRoot=Fc.createRoot,mo.hydrateRoot=Fc.hydrateRoot;/**
 * react-router v7.13.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Oc="popstate";function zc(e){return typeof e=="object"&&e!=null&&"pathname"in e&&"search"in e&&"hash"in e&&"state"in e&&"key"in e}function yg(e={}){function t(r,i){var u;let a=(u=i.state)==null?void 0:u.masked,{pathname:o,search:l,hash:c}=a||r.location;return ls("",{pathname:o,search:l,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default",a?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,i){return typeof i=="string"?i:Dr(i)}return wg(t,n,null,e)}function W(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function tt(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function vg(){return Math.random().toString(36).substring(2,10)}function $c(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ls(e,t,n=null,r,i){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Kn(t):t,state:n,key:t&&t.key||r||vg(),unstable_mask:i}}function Dr({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Kn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function wg(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,l="POP",c=null,u=p();u==null&&(u=0,o.replaceState({...o.state,idx:u},""));function p(){return(o.state||{idx:null}).idx}function d(){l="POP";let k=p(),f=k==null?null:k-u;u=k,c&&c({action:l,location:v.location,delta:f})}function m(k,f){l="PUSH";let h=zc(k)?k:ls(v.location,k,f);u=p()+1;let g=$c(h,u),S=v.createHref(h.unstable_mask||h);try{o.pushState(g,"",S)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;i.location.assign(S)}a&&c&&c({action:l,location:v.location,delta:1})}function x(k,f){l="REPLACE";let h=zc(k)?k:ls(v.location,k,f);u=p();let g=$c(h,u),S=v.createHref(h.unstable_mask||h);o.replaceState(g,"",S),a&&c&&c({action:l,location:v.location,delta:0})}function w(k){return xg(k)}let v={get action(){return l},get location(){return e(i,o)},listen(k){if(c)throw new Error("A history only accepts one active listener");return i.addEventListener(Oc,d),c=k,()=>{i.removeEventListener(Oc,d),c=null}},createHref(k){return t(i,k)},createURL:w,encodeLocation(k){let f=w(k);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:m,replace:x,go(k){return o.go(k)}};return v}function xg(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),W(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:Dr(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Df(e,t,n="/"){return Sg(e,t,n,!1)}function Sg(e,t,n,r){let i=typeof t=="string"?Kn(t):t,a=ft(i.pathname||"/",n);if(a==null)return null;let o=Ff(e);kg(o);let l=null;for(let c=0;l==null&&c<o.length;++c){let u=Mg(a);l=Rg(o[c],u,r)}return l}function Ff(e,t=[],n=[],r="",i=!1){let a=(o,l,c=i,u)=>{let p={relativePath:u===void 0?o.path||"":u,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(p.relativePath.startsWith("/")){if(!p.relativePath.startsWith(r)&&c)return;W(p.relativePath.startsWith(r),`Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),p.relativePath=p.relativePath.slice(r.length)}let d=Ze([r,p.relativePath]),m=n.concat(p);o.children&&o.children.length>0&&(W(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Ff(o.children,t,m,d,c)),!(o.path==null&&!o.index)&&t.push({path:d,score:Tg(d,o.index),routesMeta:m})};return e.forEach((o,l)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))a(o,l);else for(let u of Of(o.path))a(o,l,!0,u)}),t}function Of(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return i?[a,""]:[a];let o=Of(r.join("/")),l=[];return l.push(...o.map(c=>c===""?a:[a,c].join("/"))),i&&l.push(...o),l.map(c=>e.startsWith("/")&&c===""?"/":c)}function kg(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Ig(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Eg=/^:[\w-]+$/,Cg=3,_g=2,bg=1,Ng=10,jg=-2,Bc=e=>e==="*";function Tg(e,t){let n=e.split("/"),r=n.length;return n.some(Bc)&&(r+=jg),t&&(r+=_g),n.filter(i=>!Bc(i)).reduce((i,a)=>i+(Eg.test(a)?Cg:a===""?bg:Ng),r)}function Ig(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function Rg(e,t,n=!1){let{routesMeta:r}=e,i={},a="/",o=[];for(let l=0;l<r.length;++l){let c=r[l],u=l===r.length-1,p=a==="/"?t:t.slice(a.length)||"/",d=Zi({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},p),m=c.route;if(!d&&u&&n&&!r[r.length-1].route.index&&(d=Zi({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:Ze([a,d.pathname]),pathnameBase:Fg(Ze([a,d.pathnameBase])),route:m}),d.pathnameBase!=="/"&&(a=Ze([a,d.pathnameBase]))}return o}function Zi(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Pg(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((u,{paramName:p,isOptional:d},m)=>{if(p==="*"){let w=l[m]||"";o=a.slice(0,a.length-w.length).replace(/(.)\/+$/,"$1")}const x=l[m];return d&&!x?u[p]=void 0:u[p]=(x||"").replace(/%2F/g,"/"),u},{}),pathname:a,pathnameBase:o,pattern:e}}function Pg(e,t=!1,n=!0){tt(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,c,u,p)=>{if(r.push({paramName:l,isOptional:c!=null}),c){let d=p.charAt(u+o.length);return d&&d!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function Mg(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return tt(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ft(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Ag=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Lg(e,t="/"){let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?Kn(e):e,a;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?a=Uc(n.substring(1),"/"):a=Uc(n,t)):a=t,{pathname:a,search:Og(r),hash:zg(i)}}function Uc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function Xa(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Dg(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function zf(e){let t=Dg(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function fl(e,t,n,r=!1){let i;typeof e=="string"?i=Kn(e):(i={...e},W(!i.pathname||!i.pathname.includes("?"),Xa("?","pathname","search",i)),W(!i.pathname||!i.pathname.includes("#"),Xa("#","pathname","hash",i)),W(!i.search||!i.search.includes("#"),Xa("#","search","hash",i)));let a=e===""||i.pathname==="",o=a?"/":i.pathname,l;if(o==null)l=n;else{let d=t.length-1;if(!r&&o.startsWith("..")){let m=o.split("/");for(;m[0]==="..";)m.shift(),d-=1;i.pathname=m.join("/")}l=d>=0?t[d]:"/"}let c=Lg(i,l),u=o&&o!=="/"&&o.endsWith("/"),p=(a||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||p)&&(c.pathname+="/"),c}var Ze=e=>e.join("/").replace(/\/\/+/g,"/"),Fg=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Og=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,zg=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,$g=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Bg(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Ug(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var $f=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Bf(e,t){let n=e;if(typeof n!="string"||!Ag.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if($f)try{let a=new URL(window.location.href),o=n.startsWith("//")?new URL(a.protocol+n):new URL(n),l=ft(o.pathname,t);o.origin===a.origin&&l!=null?n=l+o.search+o.hash:i=!0}catch{tt(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Uf=["POST","PUT","PATCH","DELETE"];new Set(Uf);var Hg=["GET",...Uf];new Set(Hg);var Gn=y.createContext(null);Gn.displayName="DataRouter";var xa=y.createContext(null);xa.displayName="DataRouterState";var Wg=y.createContext(!1),Hf=y.createContext({isTransitioning:!1});Hf.displayName="ViewTransition";var Vg=y.createContext(new Map);Vg.displayName="Fetchers";var Kg=y.createContext(null);Kg.displayName="Await";var De=y.createContext(null);De.displayName="Navigation";var Wr=y.createContext(null);Wr.displayName="Location";var gt=y.createContext({outlet:null,matches:[],isDataRoute:!1});gt.displayName="Route";var pl=y.createContext(null);pl.displayName="RouteError";var Wf="REACT_ROUTER_ERROR",Gg="REDIRECT",Yg="ROUTE_ERROR_RESPONSE";function qg(e){if(e.startsWith(`${Wf}:${Gg}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Qg(e){if(e.startsWith(`${Wf}:${Yg}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new $g(t.status,t.statusText,t.data)}catch{}}function Xg(e,{relative:t}={}){W(Vr(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=y.useContext(De),{hash:i,pathname:a,search:o}=Kr(e,{relative:t}),l=a;return n!=="/"&&(l=a==="/"?n:Ze([n,a])),r.createHref({pathname:l,search:o,hash:i})}function Vr(){return y.useContext(Wr)!=null}function yt(){return W(Vr(),"useLocation() may be used only in the context of a <Router> component."),y.useContext(Wr).location}var Vf="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Kf(e){y.useContext(De).static||y.useLayoutEffect(e)}function Jg(){let{isDataRoute:e}=y.useContext(gt);return e?dy():Zg()}function Zg(){W(Vr(),"useNavigate() may be used only in the context of a <Router> component.");let e=y.useContext(Gn),{basename:t,navigator:n}=y.useContext(De),{matches:r}=y.useContext(gt),{pathname:i}=yt(),a=JSON.stringify(zf(r)),o=y.useRef(!1);return Kf(()=>{o.current=!0}),y.useCallback((c,u={})=>{if(tt(o.current,Vf),!o.current)return;if(typeof c=="number"){n.go(c);return}let p=fl(c,JSON.parse(a),i,u.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:Ze([t,p.pathname])),(u.replace?n.replace:n.push)(p,u.state,u)},[t,n,a,i,e])}y.createContext(null);function Kr(e,{relative:t}={}){let{matches:n}=y.useContext(gt),{pathname:r}=yt(),i=JSON.stringify(zf(n));return y.useMemo(()=>fl(e,JSON.parse(i),r,t==="path"),[e,i,r,t])}function ey(e,t){return Gf(e,t)}function Gf(e,t,n){var k;W(Vr(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=y.useContext(De),{matches:i}=y.useContext(gt),a=i[i.length-1],o=a?a.params:{},l=a?a.pathname:"/",c=a?a.pathnameBase:"/",u=a&&a.route;{let f=u&&u.path||"";qf(l,!u||f.endsWith("*")||f.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${f}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${f}"> to <Route path="${f==="/"?"*":`${f}/*`}">.`)}let p=yt(),d;if(t){let f=typeof t=="string"?Kn(t):t;W(c==="/"||((k=f.pathname)==null?void 0:k.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${f.pathname}" was given in the \`location\` prop.`),d=f}else d=p;let m=d.pathname||"/",x=m;if(c!=="/"){let f=c.replace(/^\//,"").split("/");x="/"+m.replace(/^\//,"").split("/").slice(f.length).join("/")}let w=Df(e,{pathname:x});tt(u||w!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),tt(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=ay(w&&w.map(f=>Object.assign({},f,{params:Object.assign({},o,f.params),pathname:Ze([c,r.encodeLocation?r.encodeLocation(f.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?c:Ze([c,r.encodeLocation?r.encodeLocation(f.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:f.pathnameBase])})),i,n);return t&&v?y.createElement(Wr.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...d},navigationType:"POP"}},v):v}function ty(){let e=uy(),t=Bg(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},a={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=y.createElement(y.Fragment,null,y.createElement("p",null,"💿 Hey developer 👋"),y.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",y.createElement("code",{style:a},"ErrorBoundary")," or"," ",y.createElement("code",{style:a},"errorElement")," prop on your route.")),y.createElement(y.Fragment,null,y.createElement("h2",null,"Unexpected Application Error!"),y.createElement("h3",{style:{fontStyle:"italic"}},t),n?y.createElement("pre",{style:i},n):null,o)}var ny=y.createElement(ty,null),Yf=class extends y.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=Qg(e.digest);n&&(e=n)}let t=e!==void 0?y.createElement(gt.Provider,{value:this.props.routeContext},y.createElement(pl.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?y.createElement(ry,{error:e},t):t}};Yf.contextType=Wg;var Ja=new WeakMap;function ry({children:e,error:t}){let{basename:n}=y.useContext(De);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=qg(t.digest);if(r){let i=Ja.get(t);if(i)throw i;let a=Bf(r.location,n);if($f&&!Ja.get(t))if(a.isExternal||r.reloadDocument)window.location.href=a.absoluteURL||a.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:r.replace}));throw Ja.set(t,o),o}return y.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a.absoluteURL||a.to}`})}}return e}function iy({routeContext:e,match:t,children:n}){let r=y.useContext(Gn);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),y.createElement(gt.Provider,{value:e},n)}function ay(e,t=[],n){let r=n==null?void 0:n.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r==null?void 0:r.errors;if(a!=null){let p=i.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);W(p>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),i=i.slice(0,Math.min(i.length,p+1))}let o=!1,l=-1;if(n&&r){o=r.renderFallback;for(let p=0;p<i.length;p++){let d=i[p];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(l=p),d.route.id){let{loaderData:m,errors:x}=r,w=d.route.loader&&!m.hasOwnProperty(d.route.id)&&(!x||x[d.route.id]===void 0);if(d.route.lazy||w){n.isStatic&&(o=!0),l>=0?i=i.slice(0,l+1):i=[i[0]];break}}}}let c=n==null?void 0:n.onError,u=r&&c?(p,d)=>{var m,x;c(p,{location:r.location,params:((x=(m=r.matches)==null?void 0:m[0])==null?void 0:x.params)??{},unstable_pattern:Ug(r.matches),errorInfo:d})}:void 0;return i.reduceRight((p,d,m)=>{let x,w=!1,v=null,k=null;r&&(x=a&&d.route.id?a[d.route.id]:void 0,v=d.route.errorElement||ny,o&&(l<0&&m===0?(qf("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),w=!0,k=null):l===m&&(w=!0,k=d.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,m+1)),h=()=>{let g;return x?g=v:w?g=k:d.route.Component?g=y.createElement(d.route.Component,null):d.route.element?g=d.route.element:g=p,y.createElement(iy,{match:d,routeContext:{outlet:p,matches:f,isDataRoute:r!=null},children:g})};return r&&(d.route.ErrorBoundary||d.route.errorElement||m===0)?y.createElement(Yf,{location:r.location,revalidation:r.revalidation,component:v,error:x,children:h(),routeContext:{outlet:null,matches:f,isDataRoute:!0},onError:u}):h()},null)}function hl(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function oy(e){let t=y.useContext(Gn);return W(t,hl(e)),t}function sy(e){let t=y.useContext(xa);return W(t,hl(e)),t}function ly(e){let t=y.useContext(gt);return W(t,hl(e)),t}function ml(e){let t=ly(e),n=t.matches[t.matches.length-1];return W(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function cy(){return ml("useRouteId")}function uy(){var r;let e=y.useContext(pl),t=sy("useRouteError"),n=ml("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function dy(){let{router:e}=oy("useNavigate"),t=ml("useNavigate"),n=y.useRef(!1);return Kf(()=>{n.current=!0}),y.useCallback(async(i,a={})=>{tt(n.current,Vf),n.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:t,...a}))},[e,t])}var Hc={};function qf(e,t,n){!t&&!Hc[e]&&(Hc[e]=!0,tt(!1,n))}y.memo(fy);function fy({routes:e,future:t,state:n,isStatic:r,onError:i}){return Gf(e,void 0,{state:n,isStatic:r,onError:i})}function Qt(e){W(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function py({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:i,static:a=!1,unstable_useTransitions:o}){W(!Vr(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),c=y.useMemo(()=>({basename:l,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[l,i,a,o]);typeof n=="string"&&(n=Kn(n));let{pathname:u="/",search:p="",hash:d="",state:m=null,key:x="default",unstable_mask:w}=n,v=y.useMemo(()=>{let k=ft(u,l);return k==null?null:{location:{pathname:k,search:p,hash:d,state:m,key:x,unstable_mask:w},navigationType:r}},[l,u,p,d,m,x,r,w]);return tt(v!=null,`<Router basename="${l}"> is not able to match the URL "${u}${p}${d}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:y.createElement(De.Provider,{value:c},y.createElement(Wr.Provider,{children:t,value:v}))}function hy({children:e,location:t}){return ey(cs(e),t)}function cs(e,t=[]){let n=[];return y.Children.forEach(e,(r,i)=>{if(!y.isValidElement(r))return;let a=[...t,i];if(r.type===y.Fragment){n.push.apply(n,cs(r.props.children,a));return}W(r.type===Qt,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),W(!r.props.index||!r.props.children,"An index route cannot have child routes.");let o={id:r.props.id||a.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=cs(r.props.children,a)),n.push(o)}),n}var _i="get",bi="application/x-www-form-urlencoded";function Sa(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function my(e){return Sa(e)&&e.tagName.toLowerCase()==="button"}function gy(e){return Sa(e)&&e.tagName.toLowerCase()==="form"}function yy(e){return Sa(e)&&e.tagName.toLowerCase()==="input"}function vy(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function wy(e,t){return e.button===0&&(!t||t==="_self")&&!vy(e)}var fi=null;function xy(){if(fi===null)try{new FormData(document.createElement("form"),0),fi=!1}catch{fi=!0}return fi}var Sy=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Za(e){return e!=null&&!Sy.has(e)?(tt(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${bi}"`),null):e}function ky(e,t){let n,r,i,a,o;if(gy(e)){let l=e.getAttribute("action");r=l?ft(l,t):null,n=e.getAttribute("method")||_i,i=Za(e.getAttribute("enctype"))||bi,a=new FormData(e)}else if(my(e)||yy(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=e.getAttribute("formaction")||l.getAttribute("action");if(r=c?ft(c,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||_i,i=Za(e.getAttribute("formenctype"))||Za(l.getAttribute("enctype"))||bi,a=new FormData(l,e),!xy()){let{name:u,type:p,value:d}=e;if(p==="image"){let m=u?`${u}.`:"";a.append(`${m}x`,"0"),a.append(`${m}y`,"0")}else u&&a.append(u,d)}}else{if(Sa(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=_i,r=null,i=bi,o=e}return a&&i==="text/plain"&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function gl(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ey(e,t,n,r){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname==="/"?i.pathname=`_root.${r}`:t&&ft(i.pathname,t)==="/"?i.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,"")}.${r}`,i}async function Cy(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function _y(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function by(e,t,n){let r=await Promise.all(e.map(async i=>{let a=t.routes[i.route.id];if(a){let o=await Cy(a,n);return o.links?o.links():[]}return[]}));return Iy(r.flat(1).filter(_y).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function Wc(e,t,n,r,i,a){let o=(c,u)=>n[u]?c.route.id!==n[u].route.id:!0,l=(c,u)=>{var p;return n[u].pathname!==c.pathname||((p=n[u].route.path)==null?void 0:p.endsWith("*"))&&n[u].params["*"]!==c.params["*"]};return a==="assets"?t.filter((c,u)=>o(c,u)||l(c,u)):a==="data"?t.filter((c,u)=>{var d;let p=r.routes[c.route.id];if(!p||!p.hasLoader)return!1;if(o(c,u)||l(c,u))return!0;if(c.route.shouldRevalidate){let m=c.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof m=="boolean")return m}return!0}):[]}function Ny(e,t,{includeHydrateFallback:n}={}){return jy(e.map(r=>{let i=t.routes[r.route.id];if(!i)return[];let a=[i.module];return i.clientActionModule&&(a=a.concat(i.clientActionModule)),i.clientLoaderModule&&(a=a.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(a=a.concat(i.hydrateFallbackModule)),i.imports&&(a=a.concat(i.imports)),a}).flat(1))}function jy(e){return[...new Set(e)]}function Ty(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Iy(e,t){let n=new Set;return new Set(t),e.reduce((r,i)=>{let a=JSON.stringify(Ty(i));return n.has(a)||(n.add(a),r.push({key:a,link:i})),r},[])}function Qf(){let e=y.useContext(Gn);return gl(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Ry(){let e=y.useContext(xa);return gl(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var yl=y.createContext(void 0);yl.displayName="FrameworkContext";function Xf(){let e=y.useContext(yl);return gl(e,"You must render this element inside a <HydratedRouter> element"),e}function Py(e,t){let n=y.useContext(yl),[r,i]=y.useState(!1),[a,o]=y.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:u,onMouseLeave:p,onTouchStart:d}=t,m=y.useRef(null);y.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let v=f=>{f.forEach(h=>{o(h.isIntersecting)})},k=new IntersectionObserver(v,{threshold:.5});return m.current&&k.observe(m.current),()=>{k.disconnect()}}},[e]),y.useEffect(()=>{if(r){let v=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(v)}}},[r]);let x=()=>{i(!0)},w=()=>{i(!1),o(!1)};return n?e!=="intent"?[a,m,{}]:[a,m,{onFocus:rr(l,x),onBlur:rr(c,w),onMouseEnter:rr(u,x),onMouseLeave:rr(p,w),onTouchStart:rr(d,x)}]:[!1,m,{}]}function rr(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function My({page:e,...t}){let{router:n}=Qf(),r=y.useMemo(()=>Df(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?y.createElement(Ly,{page:e,matches:r,...t}):null}function Ay(e){let{manifest:t,routeModules:n}=Xf(),[r,i]=y.useState([]);return y.useEffect(()=>{let a=!1;return by(e,t,n).then(o=>{a||i(o)}),()=>{a=!0}},[e,t,n]),r}function Ly({page:e,matches:t,...n}){let r=yt(),{future:i,manifest:a,routeModules:o}=Xf(),{basename:l}=Qf(),{loaderData:c,matches:u}=Ry(),p=y.useMemo(()=>Wc(e,t,u,a,r,"data"),[e,t,u,a,r]),d=y.useMemo(()=>Wc(e,t,u,a,r,"assets"),[e,t,u,a,r]),m=y.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let v=new Set,k=!1;if(t.forEach(h=>{var S;let g=a.routes[h.route.id];!g||!g.hasLoader||(!p.some(C=>C.route.id===h.route.id)&&h.route.id in c&&((S=o[h.route.id])!=null&&S.shouldRevalidate)||g.hasClientLoader?k=!0:v.add(h.route.id))}),v.size===0)return[];let f=Ey(e,l,i.unstable_trailingSlashAwareDataRequests,"data");return k&&v.size>0&&f.searchParams.set("_routes",t.filter(h=>v.has(h.route.id)).map(h=>h.route.id).join(",")),[f.pathname+f.search]},[l,i.unstable_trailingSlashAwareDataRequests,c,r,a,p,t,e,o]),x=y.useMemo(()=>Ny(d,a),[d,a]),w=Ay(d);return y.createElement(y.Fragment,null,m.map(v=>y.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),x.map(v=>y.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),w.map(({key:v,link:k})=>y.createElement("link",{key:v,nonce:n.nonce,...k,crossOrigin:k.crossOrigin??n.crossOrigin})))}function Dy(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Fy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Fy&&(window.__reactRouterVersion="7.13.2")}catch{}function Oy({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=y.useRef();i.current==null&&(i.current=yg({window:r,v5Compat:!0}));let a=i.current,[o,l]=y.useState({action:a.action,location:a.location}),c=y.useCallback(u=>{n===!1?l(u):y.startTransition(()=>l(u))},[n]);return y.useLayoutEffect(()=>a.listen(c),[a,c]),y.createElement(py,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}var Jf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Zf=y.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:i,reloadDocument:a,replace:o,unstable_mask:l,state:c,target:u,to:p,preventScrollReset:d,viewTransition:m,unstable_defaultShouldRevalidate:x,...w},v){let{basename:k,navigator:f,unstable_useTransitions:h}=y.useContext(De),g=typeof p=="string"&&Jf.test(p),S=Bf(p,k);p=S.to;let C=Xg(p,{relative:i}),b=yt(),N=null;if(l){let Te=fl(l,[],b.unstable_mask?b.unstable_mask.pathname:"/",!0);k!=="/"&&(Te.pathname=Te.pathname==="/"?k:Ze([k,Te.pathname])),N=f.createHref(Te)}let[T,L,I]=Py(r,w),ae=Uy(p,{replace:o,unstable_mask:l,state:c,target:u,preventScrollReset:d,relative:i,viewTransition:m,unstable_defaultShouldRevalidate:x,unstable_useTransitions:h});function nt(Te){t&&t(Te),Te.defaultPrevented||ae(Te)}let Ve=!(S.isExternal||a),St=y.createElement("a",{...w,...I,href:(Ve?N:void 0)||S.absoluteURL||C,onClick:Ve?nt:t,ref:Dy(v,L),target:u,"data-discover":!g&&n==="render"?"true":void 0});return T&&!g?y.createElement(y.Fragment,null,St,y.createElement(My,{page:C})):St});Zf.displayName="Link";var zy=y.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:i=!1,style:a,to:o,viewTransition:l,children:c,...u},p){let d=Kr(o,{relative:u.relative}),m=yt(),x=y.useContext(xa),{navigator:w,basename:v}=y.useContext(De),k=x!=null&&Gy(d)&&l===!0,f=w.encodeLocation?w.encodeLocation(d).pathname:d.pathname,h=m.pathname,g=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;n||(h=h.toLowerCase(),g=g?g.toLowerCase():null,f=f.toLowerCase()),g&&v&&(g=ft(g,v)||g);const S=f!=="/"&&f.endsWith("/")?f.length-1:f.length;let C=h===f||!i&&h.startsWith(f)&&h.charAt(S)==="/",b=g!=null&&(g===f||!i&&g.startsWith(f)&&g.charAt(f.length)==="/"),N={isActive:C,isPending:b,isTransitioning:k},T=C?t:void 0,L;typeof r=="function"?L=r(N):L=[r,C?"active":null,b?"pending":null,k?"transitioning":null].filter(Boolean).join(" ");let I=typeof a=="function"?a(N):a;return y.createElement(Zf,{...u,"aria-current":T,className:L,ref:p,style:I,to:o,viewTransition:l},typeof c=="function"?c(N):c)});zy.displayName="NavLink";var $y=y.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=_i,action:l,onSubmit:c,relative:u,preventScrollReset:p,viewTransition:d,unstable_defaultShouldRevalidate:m,...x},w)=>{let{unstable_useTransitions:v}=y.useContext(De),k=Vy(),f=Ky(l,{relative:u}),h=o.toLowerCase()==="get"?"get":"post",g=typeof l=="string"&&Jf.test(l),S=C=>{if(c&&c(C),C.defaultPrevented)return;C.preventDefault();let b=C.nativeEvent.submitter,N=(b==null?void 0:b.getAttribute("formmethod"))||o,T=()=>k(b||C.currentTarget,{fetcherKey:t,method:N,navigate:n,replace:i,state:a,relative:u,preventScrollReset:p,viewTransition:d,unstable_defaultShouldRevalidate:m});v&&n!==!1?y.startTransition(()=>T()):T()};return y.createElement("form",{ref:w,method:h,action:f,onSubmit:r?c:S,...x,"data-discover":!g&&e==="render"?"true":void 0})});$y.displayName="Form";function By(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ep(e){let t=y.useContext(Gn);return W(t,By(e)),t}function Uy(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:l,unstable_defaultShouldRevalidate:c,unstable_useTransitions:u}={}){let p=Jg(),d=yt(),m=Kr(e,{relative:o});return y.useCallback(x=>{if(wy(x,t)){x.preventDefault();let w=n!==void 0?n:Dr(d)===Dr(m),v=()=>p(e,{replace:w,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:l,unstable_defaultShouldRevalidate:c});u?y.startTransition(()=>v()):v()}},[d,p,m,n,r,i,t,e,a,o,l,c,u])}var Hy=0,Wy=()=>`__${String(++Hy)}__`;function Vy(){let{router:e}=ep("useSubmit"),{basename:t}=y.useContext(De),n=cy(),r=e.fetch,i=e.navigate;return y.useCallback(async(a,o={})=>{let{action:l,method:c,encType:u,formData:p,body:d}=ky(a,t);if(o.navigate===!1){let m=o.fetcherKey||Wy();await r(m,n,o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:p,body:d,formMethod:o.method||c,formEncType:o.encType||u,flushSync:o.flushSync})}else await i(o.action||l,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:p,body:d,formMethod:o.method||c,formEncType:o.encType||u,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[r,i,t,n])}function Ky(e,{relative:t}={}){let{basename:n}=y.useContext(De),r=y.useContext(gt);W(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),a={...Kr(e||".",{relative:t})},o=yt();if(e==null){a.search=o.search;let l=new URLSearchParams(a.search),c=l.getAll("index");if(c.some(p=>p==="")){l.delete("index"),c.filter(d=>d).forEach(d=>l.append("index",d));let p=l.toString();a.search=p?`?${p}`:""}}return(!e||e===".")&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(a.pathname=a.pathname==="/"?n:Ze([n,a.pathname])),Dr(a)}function Gy(e,{relative:t}={}){let n=y.useContext(Hf);W(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=ep("useViewTransitionState"),i=Kr(e,{relative:t});if(!n.isTransitioning)return!1;let a=ft(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ft(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Zi(i.pathname,o)!=null||Zi(i.pathname,a)!=null}/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tp=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vc=e=>{const t=qy(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var eo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qy=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Xy=y.createContext({}),Jy=()=>y.useContext(Xy),Zy=y.forwardRef(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i="",children:a,iconNode:o,...l},c)=>{const{size:u=24,strokeWidth:p=2,absoluteStrokeWidth:d=!1,color:m="currentColor",className:x=""}=Jy()??{},w=r??d?Number(n??p)*24/Number(t??u):n??p;return y.createElement("svg",{ref:c,...eo,width:t??u??eo.width,height:t??u??eo.height,stroke:e??m,strokeWidth:w,className:tp("lucide",x,i),...!a&&!Qy(l)&&{"aria-hidden":"true"},...l},[...o.map(([v,k])=>y.createElement(v,k)),...Array.isArray(a)?a:[a]])});/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const np=(e,t)=>{const n=y.forwardRef(({className:r,...i},a)=>y.createElement(Zy,{ref:a,iconNode:t,className:tp(`lucide-${Yy(Vc(e))}`,`lucide-${e}`,r),...i}));return n.displayName=Vc(e),n};/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ev=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],tv=np("circle-x",ev);/**
 * @license lucide-react v1.6.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nv=[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]],rp=np("loader",nv),Qe=new Proxy({},{get(e,t){var n;return(n=window.clevertap)==null?void 0:n[t]}});function Ni(e,t,n){typeof window.fbq=="function"&&window.fbq("track",e,t,n)}function ka(e,t){typeof window.fbq=="function"&&window.fbq("trackCustom",e,t)}const vl=()=>typeof window<"u"&&typeof window.clarity=="function",vr=(e,t)=>{if(t!=null)try{window.clarity("set",e,String(t))}catch{}};function Rt(e,t={}){if(vl()){try{window.clarity("event",e)}catch{}Object.keys(t).forEach(n=>{vr(n,t[n])})}}function rv({name:e,email:t,phone:n}={}){if(vl()){try{window.clarity("identify",n||t,void 0,void 0,e)}catch{}vr("email",t),vr("phone",n),vr("name",e)}}function iv(e={}){vl()&&Object.keys(e).forEach(t=>{vr(t,e[t])})}const av=()=>{};var Kc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ov={SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us=function(e,t){if(!e)throw sv(t)},sv=function(e){return new Error("Firebase Database ("+ov.SDK_VERSION+") INTERNAL ASSERT FAILED: "+e)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},lv=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=e[n++],o=e[n++],l=e[n++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{const a=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return t.join("")},ap={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const a=e[i],o=i+1<e.length,l=o?e[i+1]:0,c=i+2<e.length,u=c?e[i+2]:0,p=a>>2,d=(a&3)<<4|l>>4;let m=(l&15)<<2|u>>6,x=u&63;c||(x=64,o||(m=64)),r.push(n[p],n[d],n[m],n[x])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(ip(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):lv(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const a=n[e.charAt(i++)],l=i<e.length?n[e.charAt(i)]:0;++i;const u=i<e.length?n[e.charAt(i)]:64;++i;const d=i<e.length?n[e.charAt(i)]:64;if(++i,a==null||l==null||u==null||d==null)throw new cv;const m=a<<2|l>>4;if(r.push(m),u!==64){const x=l<<4&240|u>>2;if(r.push(x),d!==64){const w=u<<6&192|d;r.push(w)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class cv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const uv=function(e){const t=ip(e);return ap.encodeByteArray(t,!0)},op=function(e){return uv(e).replace(/\./g,"")},dv=function(e){try{return ap.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pv=()=>fv().__FIREBASE_DEFAULTS__,hv=()=>{if(typeof process>"u"||typeof Kc>"u")return;const e=Kc.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},mv=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&dv(e[1]);return t&&JSON.parse(t)},gv=()=>{try{return av()||pv()||hv()||mv()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},sp=()=>{var e;return(e=gv())==null?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function vv(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function wl(){try{return typeof indexedDB=="object"}catch{return!1}}function lp(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var a;t(((a=i.error)==null?void 0:a.message)||"")}}catch(n){t(n)}})}function wv(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xv="FirebaseError";class vt extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=xv,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Gr.prototype.create)}}class Gr{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,a=this.errors[t],o=a?Sv(a,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new vt(i,l,r)}}function Sv(e,t){return e.replace(kv,(n,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const kv=/\{\$([^}]+)}/g;function Fr(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const a=e[i],o=t[i];if(Gc(a)&&Gc(o)){if(!Fr(a,o))return!1}else if(a!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Gc(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ev=1e3,Cv=2,_v=4*60*60*1e3,bv=.5;function ea(e,t=Ev,n=Cv){const r=t*Math.pow(n,e),i=Math.round(bv*r*(Math.random()-.5)*2);return Math.min(_v,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(e){return e&&e._delegate?e._delegate:e}class pt{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new yv;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Tv(t))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:i});r.resolve(a)}catch{}}}}clearInstance(t=Xt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Xt){return this.instances.has(t)}getOptions(t=Xt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(a);r===l&&o.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const a=this.instances.get(r);return a&&t(a,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jv(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Xt){return this.component?this.component.multipleInstances?t:Xt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jv(e){return e===Xt?void 0:e}function Tv(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Nv(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var F;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(F||(F={}));const Rv={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Pv=F.INFO,Mv={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},Av=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=Mv[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class xl{constructor(t){this.name=t,this._logLevel=Pv,this._logHandler=Av,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in F))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Rv[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...t),this._logHandler(this,F.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...t),this._logHandler(this,F.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,F.INFO,...t),this._logHandler(this,F.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,F.WARN,...t),this._logHandler(this,F.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...t),this._logHandler(this,F.ERROR,...t)}}const Lv=(e,t)=>t.some(n=>e instanceof n);let Yc,qc;function Dv(){return Yc||(Yc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fv(){return qc||(qc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cp=new WeakMap,ds=new WeakMap,up=new WeakMap,to=new WeakMap,Sl=new WeakMap;function Ov(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",a),e.removeEventListener("error",o)},a=()=>{n($t(e.result)),i()},o=()=>{r(e.error),i()};e.addEventListener("success",a),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&cp.set(n,e)}).catch(()=>{}),Sl.set(t,e),t}function zv(e){if(ds.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",o),e.removeEventListener("abort",o)},a=()=>{n(),i()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",a),e.addEventListener("error",o),e.addEventListener("abort",o)});ds.set(e,t)}let fs={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ds.get(e);if(t==="objectStoreNames")return e.objectStoreNames||up.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $t(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function $v(e){fs=e(fs)}function Bv(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(no(this),t,...n);return up.set(r,t.sort?t.sort():[t]),$t(r)}:Fv().includes(e)?function(...t){return e.apply(no(this),t),$t(cp.get(this))}:function(...t){return $t(e.apply(no(this),t))}}function Uv(e){return typeof e=="function"?Bv(e):(e instanceof IDBTransaction&&zv(e),Lv(e,Dv())?new Proxy(e,fs):e)}function $t(e){if(e instanceof IDBRequest)return Ov(e);if(to.has(e))return to.get(e);const t=Uv(e);return t!==e&&(to.set(e,t),Sl.set(t,e)),t}const no=e=>Sl.get(e);function dp(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){const o=indexedDB.open(e,t),l=$t(o);return r&&o.addEventListener("upgradeneeded",c=>{r($t(o.result),c.oldVersion,c.newVersion,$t(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{a&&c.addEventListener("close",()=>a()),i&&c.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Hv=["get","getKey","getAll","getAllKeys","count"],Wv=["put","add","delete","clear"],ro=new Map;function Qc(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ro.get(t))return ro.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Wv.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Hv.includes(n)))return;const a=async function(o,...l){const c=this.transaction(o,i?"readwrite":"readonly");let u=c.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),i&&c.done]))[0]};return ro.set(t,a),a}$v(e=>({...e,get:(t,n,r)=>Qc(t,n)||e.get(t,n,r),has:(t,n)=>!!Qc(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vv{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Kv(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Kv(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ps="@firebase/app",Xc="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=new xl("@firebase/app"),Gv="@firebase/app-compat",Yv="@firebase/analytics-compat",qv="@firebase/analytics",Qv="@firebase/app-check-compat",Xv="@firebase/app-check",Jv="@firebase/auth",Zv="@firebase/auth-compat",e0="@firebase/database",t0="@firebase/data-connect",n0="@firebase/database-compat",r0="@firebase/functions",i0="@firebase/functions-compat",a0="@firebase/installations",o0="@firebase/installations-compat",s0="@firebase/messaging",l0="@firebase/messaging-compat",c0="@firebase/performance",u0="@firebase/performance-compat",d0="@firebase/remote-config",f0="@firebase/remote-config-compat",p0="@firebase/storage",h0="@firebase/storage-compat",m0="@firebase/firestore",g0="@firebase/ai",y0="@firebase/firestore-compat",v0="firebase",w0="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs="[DEFAULT]",x0={[ps]:"fire-core",[Gv]:"fire-core-compat",[qv]:"fire-analytics",[Yv]:"fire-analytics-compat",[Xv]:"fire-app-check",[Qv]:"fire-app-check-compat",[Jv]:"fire-auth",[Zv]:"fire-auth-compat",[e0]:"fire-rtdb",[t0]:"fire-data-connect",[n0]:"fire-rtdb-compat",[r0]:"fire-fn",[i0]:"fire-fn-compat",[a0]:"fire-iid",[o0]:"fire-iid-compat",[s0]:"fire-fcm",[l0]:"fire-fcm-compat",[c0]:"fire-perf",[u0]:"fire-perf-compat",[d0]:"fire-rc",[f0]:"fire-rc-compat",[p0]:"fire-gcs",[h0]:"fire-gcs-compat",[m0]:"fire-fst",[y0]:"fire-fst-compat",[g0]:"fire-vertex","fire-js":"fire-js",[v0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=new Map,S0=new Map,ms=new Map;function Jc(e,t){try{e.container.addComponent(t)}catch(n){ht.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Wt(e){const t=e.name;if(ms.has(t))return ht.debug(`There were multiple attempts to register component ${t}.`),!1;ms.set(t,e);for(const n of ta.values())Jc(n,e);for(const n of S0.values())Jc(n,e);return!0}function Yr(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Bt=new Gr("app","Firebase",k0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E0{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Bt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc=w0;function fp(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:hs,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw Bt.create("bad-app-name",{appName:String(i)});if(n||(n=sp()),!n)throw Bt.create("no-options");const a=ta.get(i);if(a){if(Fr(n,a.options)&&Fr(r,a.config))return a;throw Bt.create("duplicate-app",{appName:i})}const o=new Iv(i);for(const c of ms.values())o.addComponent(c);const l=new E0(n,r,o);return ta.set(i,l),l}function pp(e=hs){const t=ta.get(e);if(!t&&e===hs&&sp())return fp();if(!t)throw Bt.create("no-app",{appName:e});return t}function et(e,t,n){let r=x0[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const o=[`Unable to register library "${r}" with version "${t}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&o.push("and"),a&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ht.warn(o.join(" "));return}Wt(new pt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C0="firebase-heartbeat-database",_0=1,Or="firebase-heartbeat-store";let io=null;function hp(){return io||(io=dp(C0,_0,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Or)}catch(n){console.warn(n)}}}}).catch(e=>{throw Bt.create("idb-open",{originalErrorMessage:e.message})})),io}async function b0(e){try{const n=(await hp()).transaction(Or),r=await n.objectStore(Or).get(mp(e));return await n.done,r}catch(t){if(t instanceof vt)ht.warn(t.message);else{const n=Bt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});ht.warn(n.message)}}}async function eu(e,t){try{const r=(await hp()).transaction(Or,"readwrite");await r.objectStore(Or).put(t,mp(e)),await r.done}catch(n){if(n instanceof vt)ht.warn(n.message);else{const r=Bt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ht.warn(r.message)}}}function mp(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N0=1024,j0=30;class T0{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new R0(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=tu();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats.length>j0){const o=P0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ht.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=tu(),{heartbeatsToSend:r,unsentEntries:i}=I0(this._heartbeatsCache.heartbeats),a=op(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return ht.warn(n),""}}}function tu(){return new Date().toISOString().substring(0,10)}function I0(e,t=N0){const n=[];let r=e.slice();for(const i of e){const a=n.find(o=>o.agent===i.agent);if(a){if(a.dates.push(i.date),nu(n)>t){a.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),nu(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class R0{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wl()?lp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await b0(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return eu(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return eu(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function nu(e){return op(JSON.stringify({version:2,heartbeats:e})).length}function P0(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M0(e){Wt(new pt("platform-logger",t=>new Vv(t),"PRIVATE")),Wt(new pt("heartbeat",t=>new T0(t),"PRIVATE")),et(ps,Xc,e),et(ps,Xc,"esm2020"),et("fire-js","")}M0("");var A0="firebase",L0="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */et(A0,L0,"app");const gp="@firebase/installations",kl="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yp=1e4,vp=`w:${kl}`,wp="FIS_v2",D0="https://firebaseinstallations.googleapis.com/v1",F0=60*60*1e3,O0="installations",z0="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $0={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},un=new Gr(O0,z0,$0);function xp(e){return e instanceof vt&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp({projectId:e}){return`${D0}/projects/${e}/installations`}function kp(e){return{token:e.token,requestStatus:2,expiresIn:U0(e.expiresIn),creationTime:Date.now()}}async function Ep(e,t){const r=(await t.json()).error;return un.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Cp({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function B0(e,{refreshToken:t}){const n=Cp(e);return n.append("Authorization",H0(t)),n}async function _p(e){const t=await e();return t.status>=500&&t.status<600?e():t}function U0(e){return Number(e.replace("s","000"))}function H0(e){return`${wp} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function W0({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=Sp(e),i=Cp(e),a=t.getImmediate({optional:!0});if(a){const u=await a.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={fid:n,authVersion:wp,appId:e.appId,sdkVersion:vp},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await _p(()=>fetch(r,l));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:kp(u.authToken)}}else throw await Ep("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V0(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K0=/^[cdef][\w-]{21}$/,gs="";function G0(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Y0(e);return K0.test(n)?n:gs}catch{return gs}}function Y0(e){return V0(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np=new Map;function jp(e,t){const n=Ea(e);Tp(n,t),q0(n,t)}function Tp(e,t){const n=Np.get(e);if(n)for(const r of n)r(t)}function q0(e,t){const n=Q0();n&&n.postMessage({key:e,fid:t}),X0()}let tn=null;function Q0(){return!tn&&"BroadcastChannel"in self&&(tn=new BroadcastChannel("[Firebase] FID Change"),tn.onmessage=e=>{Tp(e.data.key,e.data.fid)}),tn}function X0(){Np.size===0&&tn&&(tn.close(),tn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J0="firebase-installations-database",Z0=1,dn="firebase-installations-store";let ao=null;function El(){return ao||(ao=dp(J0,Z0,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(dn)}}})),ao}async function na(e,t){const n=Ea(e),i=(await El()).transaction(dn,"readwrite"),a=i.objectStore(dn),o=await a.get(n);return await a.put(t,n),await i.done,(!o||o.fid!==t.fid)&&jp(e,t.fid),t}async function Ip(e){const t=Ea(e),r=(await El()).transaction(dn,"readwrite");await r.objectStore(dn).delete(t),await r.done}async function Ca(e,t){const n=Ea(e),i=(await El()).transaction(dn,"readwrite"),a=i.objectStore(dn),o=await a.get(n),l=t(o);return l===void 0?await a.delete(n):await a.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&jp(e,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cl(e){let t;const n=await Ca(e.appConfig,r=>{const i=ew(r),a=tw(e,i);return t=a.registrationPromise,a.installationEntry});return n.fid===gs?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function ew(e){const t=e||{fid:G0(),registrationStatus:0};return Rp(t)}function tw(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(un.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=nw(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:rw(e)}:{installationEntry:t}}async function nw(e,t){try{const n=await W0(e,t);return na(e.appConfig,n)}catch(n){throw xp(n)&&n.customData.serverCode===409?await Ip(e.appConfig):await na(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function rw(e){let t=await ru(e.appConfig);for(;t.registrationStatus===1;)await bp(100),t=await ru(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Cl(e);return r||n}return t}function ru(e){return Ca(e,t=>{if(!t)throw un.create("installation-not-found");return Rp(t)})}function Rp(e){return iw(e)?{fid:e.fid,registrationStatus:0}:e}function iw(e){return e.registrationStatus===1&&e.registrationTime+yp<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aw({appConfig:e,heartbeatServiceProvider:t},n){const r=ow(e,n),i=B0(e,n),a=t.getImmediate({optional:!0});if(a){const u=await a.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={installation:{sdkVersion:vp,appId:e.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await _p(()=>fetch(r,l));if(c.ok){const u=await c.json();return kp(u)}else throw await Ep("Generate Auth Token",c)}function ow(e,{fid:t}){return`${Sp(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _l(e,t=!1){let n;const r=await Ca(e.appConfig,a=>{if(!Pp(a))throw un.create("not-registered");const o=a.authToken;if(!t&&cw(o))return a;if(o.requestStatus===1)return n=sw(e,t),a;{if(!navigator.onLine)throw un.create("app-offline");const l=dw(a);return n=lw(e,l),l}});return n?await n:r.authToken}async function sw(e,t){let n=await iu(e.appConfig);for(;n.authToken.requestStatus===1;)await bp(100),n=await iu(e.appConfig);const r=n.authToken;return r.requestStatus===0?_l(e,t):r}function iu(e){return Ca(e,t=>{if(!Pp(t))throw un.create("not-registered");const n=t.authToken;return fw(n)?{...t,authToken:{requestStatus:0}}:t})}async function lw(e,t){try{const n=await aw(e,t),r={...t,authToken:n};return await na(e.appConfig,r),n}catch(n){if(xp(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Ip(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await na(e.appConfig,r)}throw n}}function Pp(e){return e!==void 0&&e.registrationStatus===2}function cw(e){return e.requestStatus===2&&!uw(e)}function uw(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+F0}function dw(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function fw(e){return e.requestStatus===1&&e.requestTime+yp<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pw(e){const t=e,{installationEntry:n,registrationPromise:r}=await Cl(t);return r?r.catch(console.error):_l(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hw(e,t=!1){const n=e;return await mw(n),(await _l(n,t)).token}async function mw(e){const{registrationPromise:t}=await Cl(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(e){if(!e||!e.options)throw oo("App Configuration");if(!e.name)throw oo("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw oo(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function oo(e){return un.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="installations",yw="installations-internal",vw=e=>{const t=e.getProvider("app").getImmediate(),n=gw(t),r=Yr(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},ww=e=>{const t=e.getProvider("app").getImmediate(),n=Yr(t,Mp).getImmediate();return{getId:()=>pw(n),getToken:i=>hw(n,i)}};function xw(){Wt(new pt(Mp,vw,"PUBLIC")),Wt(new pt(yw,ww,"PRIVATE"))}xw();et(gp,kl);et(gp,kl,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="analytics",Sw="firebase_id",kw="origin",Ew=60*1e3,Cw="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",bl="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe=new xl("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},_e=new Gr("analytics","Analytics",_w);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bw(e){if(!e.startsWith(bl)){const t=_e.create("invalid-gtag-resource",{gtagURL:e});return pe.warn(t.message),""}return e}function Ap(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Nw(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function jw(e,t){const n=Nw("firebase-js-sdk-policy",{createScriptURL:bw}),r=document.createElement("script"),i=`${bl}?l=${e}&id=${t}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function Tw(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Iw(e,t,n,r,i,a){const o=r[i];try{if(o)await t[o];else{const c=(await Ap(n)).find(u=>u.measurementId===i);c&&await t[c.appId]}}catch(l){pe.error(l)}e("config",i,a)}async function Rw(e,t,n,r,i){try{let a=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await Ap(n);for(const c of o){const u=l.find(d=>d.measurementId===c),p=u&&t[u.appId];if(p)a.push(p);else{a=[];break}}}a.length===0&&(a=Object.values(t)),await Promise.all(a),e("event",r,i||{})}catch(a){pe.error(a)}}function Pw(e,t,n,r){async function i(a,...o){try{if(a==="event"){const[l,c]=o;await Rw(e,t,n,l,c)}else if(a==="config"){const[l,c]=o;await Iw(e,t,n,r,l,c)}else if(a==="consent"){const[l,c]=o;e("consent",l,c)}else if(a==="get"){const[l,c,u]=o;e("get",l,c,u)}else if(a==="set"){const[l]=o;e("set",l)}else e(a,...o)}catch(l){pe.error(l)}}return i}function Mw(e,t,n,r,i){let a=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(a=window[i]),window[i]=Pw(a,e,t,n),{gtagCore:a,wrappedGtag:window[i]}}function Aw(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(bl)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw=30,Dw=1e3;class Fw{constructor(t={},n=Dw){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Lp=new Fw;function Ow(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function zw(e){var o;const{appId:t,apiKey:n}=e,r={method:"GET",headers:Ow(n)},i=Cw.replace("{app-id}",t),a=await fetch(i,r);if(a.status!==200&&a.status!==304){let l="";try{const c=await a.json();(o=c.error)!=null&&o.message&&(l=c.error.message)}catch{}throw _e.create("config-fetch-failed",{httpStatus:a.status,responseMessage:l})}return a.json()}async function $w(e,t=Lp,n){const{appId:r,apiKey:i,measurementId:a}=e.options;if(!r)throw _e.create("no-app-id");if(!i){if(a)return{measurementId:a,appId:r};throw _e.create("no-api-key")}const o=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new Hw;return setTimeout(async()=>{l.abort()},Ew),Dp({appId:r,apiKey:i,measurementId:a},o,l,t)}async function Dp(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=Lp){var l;const{appId:a,measurementId:o}=e;try{await Bw(r,t)}catch(c){if(o)return pe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:o};throw c}try{const c=await zw(e);return i.deleteThrottleMetadata(a),c}catch(c){const u=c;if(!Uw(u)){if(i.deleteThrottleMetadata(a),o)return pe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:a,measurementId:o};throw c}const p=Number((l=u==null?void 0:u.customData)==null?void 0:l.httpStatus)===503?ea(n,i.intervalMillis,Lw):ea(n,i.intervalMillis),d={throttleEndTimeMillis:Date.now()+p,backoffCount:n+1};return i.setThrottleMetadata(a,d),pe.debug(`Calling attemptFetch again in ${p} millis`),Dp(e,d,r,i)}}function Bw(e,t){return new Promise((n,r)=>{const i=Math.max(t-Date.now(),0),a=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(a),r(_e.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Uw(e){if(!(e instanceof vt)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class Hw{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function Ww(e,t,n,r,i){if(i&&i.global){e("event",n,r);return}else{const a=await t,o={...r,send_to:a};e("event",n,o)}}async function Vw(e,t,n,r){if(r&&r.global){const i={};for(const a of Object.keys(n))i[`user_properties.${a}`]=n[a];return e("set",i),Promise.resolve()}else{const i=await t;e("config",i,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kw(){if(wl())try{await lp()}catch(e){return pe.warn(_e.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return pe.warn(_e.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Gw(e,t,n,r,i,a,o){const l=$w(e);l.then(m=>{n[m.measurementId]=m.appId,e.options.measurementId&&m.measurementId!==e.options.measurementId&&pe.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>pe.error(m)),t.push(l);const c=Kw().then(m=>{if(m)return r.getId()}),[u,p]=await Promise.all([l,c]);Aw(a)||jw(a,u.measurementId),i("js",new Date);const d=(o==null?void 0:o.config)??{};return d[kw]="firebase",d.update=!0,p!=null&&(d[Sw]=p),i("config",u.measurementId,d),u.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(t){this.app=t}_delete(){return delete Ln[this.app.options.appId],Promise.resolve()}}let Ln={},au=[];const ou={};let so="dataLayer",qw="gtag",su,Nl,lu=!1;function Qw(){const e=[];if(vv()&&e.push("This is a browser extension environment."),wv()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=_e.create("invalid-analytics-context",{errorInfo:t});pe.warn(n.message)}}function Xw(e,t,n){Qw();const r=e.options.appId;if(!r)throw _e.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)pe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw _e.create("no-api-key");if(Ln[r]!=null)throw _e.create("already-exists",{id:r});if(!lu){Tw(so);const{wrappedGtag:a,gtagCore:o}=Mw(Ln,au,ou,so,qw);Nl=a,su=o,lu=!0}return Ln[r]=Gw(e,au,ou,t,su,so,n),new Yw(e)}function Jw(e=pp()){e=wt(e);const t=Yr(e,ra);return t.isInitialized()?t.getImmediate():Zw(e)}function Zw(e,t={}){const n=Yr(e,ra);if(n.isInitialized()){const i=n.getImmediate();if(Fr(t,n.getOptions()))return i;throw _e.create("already-initialized")}return n.initialize({options:t})}function e1(e,t,n){e=wt(e),Vw(Nl,Ln[e.app.options.appId],t,n).catch(r=>pe.error(r))}function t1(e,t,n,r){e=wt(e),Ww(Nl,Ln[e.app.options.appId],t,n,r).catch(i=>pe.error(i))}const cu="@firebase/analytics",uu="0.10.21";function n1(){Wt(new pt(ra,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return Xw(r,i,n)},"PUBLIC")),Wt(new pt("analytics-internal",e,"PRIVATE")),et(cu,uu),et(cu,uu,"esm2020");function e(t){try{const n=t.getProvider(ra).getImmediate();return{logEvent:(r,i,a)=>t1(n,r,i,a),setUserProperties:(r,i)=>e1(n,r,i)}}catch(n){throw _e.create("interop-component-reg-failed",{reason:n})}}}n1();const lo="@firebase/remote-config",du="0.8.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op="remote-config",fu=100;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r1={"already-initialized":"Remote Config already initialized","registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser","custom-signal-max-allowed-signals":"Setting more than {$maxSignals} custom signals is not supported.","stream-error":"The stream was not able to connect to the backend: {$originalErrorMessage}.","realtime-unavailable":"The Realtime service is unavailable: {$originalErrorMessage}","update-message-invalid":"The stream invalidation message was unparsable: {$originalErrorMessage}","update-not-fetched":"Unable to fetch the latest config: {$originalErrorMessage}","analytics-unavailable":"Connection to Firebase Analytics failed: {$originalErrorMessage}"},Q=new Gr("remoteconfig","Remote Config",r1);function i1(e,t){return e instanceof vt&&e.code.indexOf(t)!==-1}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a1=!1,o1="",pu=0,s1=["1","true","t","yes","y","on"];class co{constructor(t,n=o1){this._source=t,this._value=n}asString(){return this._value}asBoolean(){return this._source==="static"?a1:s1.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return pu;let t=Number(this._value);return isNaN(t)&&(t=pu),t}getSource(){return this._source}}class l1{constructor(t){this.storage=t._storage,this.logger=t._logger,this.analyticsProvider=t._analyticsProvider}async updateActiveExperiments(t){const n=await this.storage.getActiveExperiments()||new Set,r=this.createExperimentInfoMap(t);return this.addActiveExperiments(r),this.removeInactiveExperiments(n,r),this.storage.setActiveExperiments(new Set(r.keys()))}createExperimentInfoMap(t){const n=new Map;for(const r of t)n.set(r.experimentId,r);return n}addActiveExperiments(t){const n={};for(const[r,i]of t.entries())n[`firebase${r}`]=i.variantId;this.addExperimentToAnalytics(n)}removeInactiveExperiments(t,n){const r={};for(const i of t)n.has(i)||(r[`firebase${i}`]=null);this.addExperimentToAnalytics(r)}addExperimentToAnalytics(t){if(Object.keys(t).length!==0)try{const n=this.analyticsProvider.getImmediate({optional:!0});n?(n.setUserProperties(t),n.logEvent("set_firebase_experiment_state")):this.logger.warn("Analytics import failed. Verify if you have imported Firebase Analytics in your app code.")}catch(n){throw Q.create("analytics-unavailable",{originalErrorMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c1(e=pp(),t={}){var i,a;e=wt(e);const n=Yr(e,Op);if(n.isInitialized()){const o=n.getOptions();if(Fr(o,t))return n.getImmediate();throw Q.create("already-initialized")}n.initialize({options:t});const r=n.getImmediate();return t.initialFetchResponse&&(r._initializePromise=Promise.all([r._storage.setLastSuccessfulFetchResponse(t.initialFetchResponse),r._storage.setActiveConfigEtag(((i=t.initialFetchResponse)==null?void 0:i.eTag)||""),r._storage.setActiveConfigTemplateVersion(t.initialFetchResponse.templateVersion||0),r._storageCache.setLastSuccessfulFetchTimestampMillis(Date.now()),r._storageCache.setLastFetchStatus("success"),r._storageCache.setActiveConfig(((a=t.initialFetchResponse)==null?void 0:a.config)||{})]).then(),r._isInitializationComplete=!0),r}async function u1(e){const t=wt(e),[n,r]=await Promise.all([t._storage.getLastSuccessfulFetchResponse(),t._storage.getActiveConfigEtag()]);if(!n||!n.config||!n.eTag||!n.templateVersion||n.eTag===r)return!1;const i=new l1(t),a=n.experiments?i.updateActiveExperiments(n.experiments):Promise.resolve();return await Promise.all([t._storageCache.setActiveConfig(n.config),t._storage.setActiveConfigEtag(n.eTag),t._storage.setActiveConfigTemplateVersion(n.templateVersion),a]),!0}function d1(e){const t=wt(e);return t._initializePromise||(t._initializePromise=t._storageCache.loadFromStorage().then(()=>{t._isInitializationComplete=!0})),t._initializePromise}async function f1(e){const t=wt(e),n=new Fp;setTimeout(async()=>{n.abort()},t.settings.fetchTimeoutMillis);const r=t._storageCache.getCustomSignals();r&&t._logger.debug(`Fetching config with custom signals: ${JSON.stringify(r)}`);try{await t._client.fetch({cacheMaxAgeMillis:t.settings.minimumFetchIntervalMillis,signal:n,customSignals:r}),await t._storageCache.setLastFetchStatus("success")}catch(i){const a=i1(i,"fetch-throttle")?"throttle":"failure";throw await t._storageCache.setLastFetchStatus(a),i}}function ir(e,t){const n=wt(e);n._isInitializationComplete||n._logger.debug(`A value was requested for key "${t}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const r=n._storageCache.getActiveConfig();return r&&r[t]!==void 0?new co("remote",r[t]):n.defaultConfig&&n.defaultConfig[t]!==void 0?new co("default",String(n.defaultConfig[t])):(n._logger.debug(`Returning static value for key "${t}". Define a default or remote value if this is unintentional.`),new co("static"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p1{constructor(t,n,r,i){this.client=t,this.storage=n,this.storageCache=r,this.logger=i}isCachedDataFresh(t,n){if(!n)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const r=Date.now()-n,i=r<=t;return this.logger.debug(`Config fetch cache check. Cache age millis: ${r}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${i}.`),i}async fetch(t){const[n,r]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(r&&this.isCachedDataFresh(t.cacheMaxAgeMillis,n))return r;t.eTag=r&&r.eTag;const i=await this.client.fetch(t),a=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return i.status===200&&a.push(this.storage.setLastSuccessfulFetchResponse(i)),await Promise.all(a),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h1(e=navigator){return e.languages&&e.languages[0]||e.language}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m1{constructor(t,n,r,i,a,o){this.firebaseInstallations=t,this.sdkVersion=n,this.namespace=r,this.projectId=i,this.apiKey=a,this.appId=o}async fetch(t){const[n,r]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),a=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,o={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},l={sdk_version:this.sdkVersion,app_instance_id:n,app_instance_id_token:r,app_id:this.appId,language_code:h1(),custom_signals:t.customSignals},c={method:"POST",headers:o,body:JSON.stringify(l)},u=fetch(a,c),p=new Promise((h,g)=>{t.signal.addEventListener(()=>{const S=new Error("The operation was aborted.");S.name="AbortError",g(S)})});let d;try{await Promise.race([u,p]),d=await u}catch(h){let g="fetch-client-network";throw(h==null?void 0:h.name)==="AbortError"&&(g="fetch-timeout"),Q.create(g,{originalErrorMessage:h==null?void 0:h.message})}let m=d.status;const x=d.headers.get("ETag")||void 0;let w,v,k,f;if(d.status===200){let h;try{h=await d.json()}catch(g){throw Q.create("fetch-client-parse",{originalErrorMessage:g==null?void 0:g.message})}w=h.entries,v=h.state,k=h.templateVersion,f=h.experimentDescriptions}if(v==="INSTANCE_STATE_UNSPECIFIED"?m=500:v==="NO_CHANGE"?m=304:(v==="NO_TEMPLATE"||v==="EMPTY_CONFIG")&&(w={},f=[]),m!==304&&m!==200)throw Q.create("fetch-status",{httpStatus:m});return{status:m,eTag:x,config:w,templateVersion:k,experiments:f}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g1(e,t){return new Promise((n,r)=>{const i=Math.max(t-Date.now(),0),a=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(a),r(Q.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function y1(e){if(!(e instanceof vt)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class v1{constructor(t,n){this.client=t,this.storage=n}async fetch(t){const n=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(t,n)}async attemptFetch(t,{throttleEndTimeMillis:n,backoffCount:r}){await g1(t.signal,n);try{const i=await this.client.fetch(t);return await this.storage.deleteThrottleMetadata(),i}catch(i){if(!y1(i))throw i;const a={throttleEndTimeMillis:Date.now()+ea(r),backoffCount:r+1};return await this.storage.setThrottleMetadata(a),this.attemptFetch(t,a)}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w1=60*1e3,x1=12*60*60*1e3;class S1{get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}constructor(t,n,r,i,a,o,l){this.app=t,this._client=n,this._storageCache=r,this._storage=i,this._logger=a,this._realtimeHandler=o,this._analyticsProvider=l,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:w1,minimumFetchIntervalMillis:x1},this.defaultConfig={}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(e,t){const n=e.target.error||void 0;return Q.create(t,{originalErrorMessage:n&&(n==null?void 0:n.message)})}const Ct="app_namespace_store",k1="firebase_remote_config",E1=1;function C1(){return new Promise((e,t)=>{try{const n=indexedDB.open(k1,E1);n.onerror=r=>{t(ji(r,"storage-open"))},n.onsuccess=r=>{e(r.target.result)},n.onupgradeneeded=r=>{const i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Ct,{keyPath:"compositeKey"})}}}catch(n){t(Q.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}})}class zp{getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(t){return this.set("last_fetch_status",t)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(t){return this.set("last_successful_fetch_timestamp_millis",t)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(t){return this.set("last_successful_fetch_response",t)}getActiveConfig(){return this.get("active_config")}setActiveConfig(t){return this.set("active_config",t)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(t){return this.set("active_config_etag",t)}getActiveExperiments(){return this.get("active_experiments")}setActiveExperiments(t){return this.set("active_experiments",t)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(t){return this.set("throttle_metadata",t)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}getCustomSignals(){return this.get("custom_signals")}getRealtimeBackoffMetadata(){return this.get("realtime_backoff_metadata")}setRealtimeBackoffMetadata(t){return this.set("realtime_backoff_metadata",t)}getActiveConfigTemplateVersion(){return this.get("last_known_template_version")}setActiveConfigTemplateVersion(t){return this.set("last_known_template_version",t)}}class _1 extends zp{constructor(t,n,r,i=C1()){super(),this.appId=t,this.appName=n,this.namespace=r,this.openDbPromise=i}async setCustomSignals(t){const r=(await this.openDbPromise).transaction([Ct],"readwrite"),i=await this.getWithTransaction("custom_signals",r),a=$p(t,i||{});return await this.setWithTransaction("custom_signals",a,r),a}async getWithTransaction(t,n){return new Promise((r,i)=>{const a=n.objectStore(Ct),o=this.createCompositeKey(t);try{const l=a.get(o);l.onerror=c=>{i(ji(c,"storage-get"))},l.onsuccess=c=>{const u=c.target.result;r(u?u.value:void 0)}}catch(l){i(Q.create("storage-get",{originalErrorMessage:l==null?void 0:l.message}))}})}async setWithTransaction(t,n,r){return new Promise((i,a)=>{const o=r.objectStore(Ct),l=this.createCompositeKey(t);try{const c=o.put({compositeKey:l,value:n});c.onerror=u=>{a(ji(u,"storage-set"))},c.onsuccess=()=>{i()}}catch(c){a(Q.create("storage-set",{originalErrorMessage:c==null?void 0:c.message}))}})}async get(t){const r=(await this.openDbPromise).transaction([Ct],"readonly");return this.getWithTransaction(t,r)}async set(t,n){const i=(await this.openDbPromise).transaction([Ct],"readwrite");return this.setWithTransaction(t,n,i)}async delete(t){const n=await this.openDbPromise;return new Promise((r,i)=>{const o=n.transaction([Ct],"readwrite").objectStore(Ct),l=this.createCompositeKey(t);try{const c=o.delete(l);c.onerror=u=>{i(ji(u,"storage-delete"))},c.onsuccess=()=>{r()}}catch(c){i(Q.create("storage-delete",{originalErrorMessage:c==null?void 0:c.message}))}})}createCompositeKey(t){return[this.appId,this.appName,this.namespace,t].join()}}class b1 extends zp{constructor(){super(...arguments),this.storage={}}async get(t){return Promise.resolve(this.storage[t])}async set(t,n){return this.storage[t]=n,Promise.resolve(void 0)}async delete(t){return this.storage[t]=void 0,Promise.resolve()}async setCustomSignals(t){const n=this.storage.custom_signals||{};return this.storage.custom_signals=$p(t,n),Promise.resolve(this.storage.custom_signals)}}function $p(e,t){const n={...t,...e},r=Object.fromEntries(Object.entries(n).filter(([i,a])=>a!==null).map(([i,a])=>typeof a=="number"?[i,a.toString()]:[i,a]));if(Object.keys(r).length>fu)throw Q.create("custom-signal-max-allowed-signals",{maxSignals:fu});return r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1{constructor(t){this.storage=t}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}getCustomSignals(){return this.customSignals}async loadFromStorage(){const t=this.storage.getLastFetchStatus(),n=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),i=this.storage.getCustomSignals(),a=await t;a&&(this.lastFetchStatus=a);const o=await n;o&&(this.lastSuccessfulFetchTimestampMillis=o);const l=await r;l&&(this.activeConfig=l);const c=await i;c&&(this.customSignals=c)}setLastFetchStatus(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)}setLastSuccessfulFetchTimestampMillis(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)}setActiveConfig(t){return this.activeConfig=t,this.storage.setActiveConfig(t)}async setCustomSignals(t){this.customSignals=await this.storage.setCustomSignals(t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j1{constructor(t){this.allowedEvents_=t,this.listeners_={},us(Array.isArray(t)&&t.length>0,"Requires a non-empty array")}trigger(t,...n){if(Array.isArray(this.listeners_[t])){const r=[...this.listeners_[t]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(t,n,r){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:n,context:r});const i=this.getInitialEvent(t);i&&n.apply(r,i)}off(t,n,r){this.validateEventType_(t);const i=this.listeners_[t]||[];for(let a=0;a<i.length;a++)if(i[a].callback===n&&(!r||r===i[a].context)){i.splice(a,1);return}}validateEventType_(t){us(this.allowedEvents_.find(n=>n===t),"Unknown event: "+t)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl extends j1{static getInstance(){return new jl}constructor(){super(["visible"]);let t,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",t="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",t="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",t="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",t="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[t];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(t){return us(t==="visible","Unknown event type: "+t),[this.visible_]}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T1="X-Goog-Api-Key",I1="X-Goog-Firebase-Installations-Auth",uo=8,hu=3,mu=-1,gu=0,yu="featureDisabled",vu="retryIntervalSeconds",wu="latestTemplateVersionNumber";class R1{constructor(t,n,r,i,a,o,l,c,u,p){this.firebaseInstallations=t,this.storage=n,this.sdkVersion=r,this.namespace=i,this.projectId=a,this.apiKey=o,this.appId=l,this.logger=c,this.storageCache=u,this.cachingClient=p,this.observers=new Set,this.isConnectionActive=!1,this.isRealtimeDisabled=!1,this.httpRetriesRemaining=uo,this.isInBackground=!1,this.decoder=new TextDecoder("utf-8"),this.isClosingConnection=!1,this.propagateError=d=>this.observers.forEach(m=>{var x;return(x=m.error)==null?void 0:x.call(m,d)}),this.isStatusCodeRetryable=d=>!d||[408,429,502,503,504].includes(d),this.setRetriesRemaining(),jl.getInstance().on("visible",this.onVisibilityChange,this)}async setRetriesRemaining(){const t=await this.storage.getRealtimeBackoffMetadata(),n=(t==null?void 0:t.numFailedStreams)||0;this.httpRetriesRemaining=Math.max(uo-n,1)}async updateBackoffMetadataWithLastFailedStreamConnectionTime(t){var i;const n=(((i=await this.storage.getRealtimeBackoffMetadata())==null?void 0:i.numFailedStreams)||0)+1,r=ea(n,6e4,2);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(t.getTime()+r),numFailedStreams:n})}async updateBackoffMetadataWithRetryInterval(t){const n=Date.now(),r=t*1e3,i=new Date(n+r);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:i,numFailedStreams:0}),await this.retryHttpConnectionWhenBackoffEnds()}async closeRealtimeHttpConnection(){if(!this.isClosingConnection){this.isClosingConnection=!0;try{this.reader&&await this.reader.cancel()}catch{this.logger.debug("Failed to cancel the reader, connection was lost.")}finally{this.reader=void 0}this.controller&&(await this.controller.abort(),this.controller=void 0),this.isClosingConnection=!1}}async resetRealtimeBackoff(){await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(-1),numFailedStreams:0})}resetRetryCount(){this.httpRetriesRemaining=uo}async establishRealtimeConnection(t,n,r,i){const a=await this.storage.getActiveConfigEtag(),o=await this.storage.getActiveConfigTemplateVersion(),l={[T1]:this.apiKey,[I1]:r,"Content-Type":"application/json",Accept:"application/json","If-None-Match":a||"*","Content-Encoding":"gzip"},c={project:this.projectId,namespace:this.namespace,lastKnownVersionNumber:o,appId:this.appId,sdkVersion:this.sdkVersion,appInstanceId:n};return await fetch(t,{method:"POST",headers:l,body:JSON.stringify(c),signal:i})}getRealtimeUrl(){const n=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfigrealtime.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:streamFetchInvalidations?key=${this.apiKey}`;return new URL(n)}async createRealtimeConnection(){const[t,n]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken(!1)]);this.controller=new AbortController;const r=this.getRealtimeUrl();return await this.establishRealtimeConnection(r,t,n,this.controller.signal)}async retryHttpConnectionWhenBackoffEnds(){let t=await this.storage.getRealtimeBackoffMetadata();t||(t={backoffEndTimeMillis:new Date(mu),numFailedStreams:gu});const n=new Date(t.backoffEndTimeMillis).getTime(),r=Date.now(),i=Math.max(0,n-r);await this.makeRealtimeHttpConnection(i)}setIsHttpConnectionRunning(t){this.isConnectionActive=t}checkAndSetHttpConnectionFlagIfNotRunning(){const t=this.canEstablishStreamConnection();return t&&this.setIsHttpConnectionRunning(!0),t}fetchResponseIsUpToDate(t,n){return t.config!=null&&t.templateVersion?t.templateVersion>=n:this.storageCache.getLastFetchStatus()==="success"}parseAndValidateConfigUpdateMessage(t){const n=t.indexOf("{"),r=t.indexOf("}",n);return n<0||r<0||n>=r?"":t.substring(n,r+1)}isEventListenersEmpty(){return this.observers.size===0}getRandomInt(t){return Math.floor(Math.random()*t)}executeAllListenerCallbacks(t){this.observers.forEach(n=>n.next(t))}getChangedParams(t,n){const r=new Set,i=new Set(Object.keys(t||{})),a=new Set(Object.keys(n||{}));for(const o of i)(!a.has(o)||t[o]!==n[o])&&r.add(o);for(const o of a)i.has(o)||r.add(o);return r}async fetchLatestConfig(t,n){const r=t-1,i=hu-r,a=this.storageCache.getCustomSignals();a&&this.logger.debug(`Fetching config with custom signals: ${JSON.stringify(a)}`);const o=new Fp;try{const l={cacheMaxAgeMillis:0,signal:o,customSignals:a,fetchType:"REALTIME",fetchAttempt:i},c=await this.cachingClient.fetch(l);let u=await this.storage.getActiveConfig();if(!this.fetchResponseIsUpToDate(c,n)){this.logger.debug("Fetched template version is the same as SDK's current version. Retrying fetch."),await this.autoFetch(r,n);return}if(c.config==null){this.logger.debug("The fetch succeeded, but the backend had no updates.");return}u==null&&(u={});const p=this.getChangedParams(c.config,u);if(p.size===0){this.logger.debug("Config was fetched, but no params changed.");return}const d={getUpdatedKeys(){return new Set(p)}};this.executeAllListenerCallbacks(d)}catch(l){const c=l instanceof Error?l.message:String(l),u=Q.create("update-not-fetched",{originalErrorMessage:`Failed to auto-fetch config update: ${c}`});this.propagateError(u)}}async autoFetch(t,n){if(t===0){const a=Q.create("update-not-fetched",{originalErrorMessage:"Unable to fetch the latest version of the template."});this.propagateError(a);return}const i=this.getRandomInt(4)*1e3;await new Promise(a=>setTimeout(a,i)),await this.fetchLatestConfig(t,n)}async handleNotifications(t){let n,r="";for(;;){const{done:i,value:a}=await t.read();if(i)break;if(n=this.decoder.decode(a,{stream:!0}),r+=n,n.includes("}")){if(r=this.parseAndValidateConfigUpdateMessage(r),r.length===0)continue;try{const o=JSON.parse(r);if(this.isEventListenersEmpty())break;if(yu in o&&o[yu]===!0){const l=Q.create("realtime-unavailable",{originalErrorMessage:"The server is temporarily unavailable. Try again in a few minutes."});this.propagateError(l);break}if(wu in o){const l=await this.storage.getActiveConfigTemplateVersion(),c=Number(o[wu]);l&&c>l&&await this.autoFetch(hu,c)}if(vu in o){const l=Number(o[vu]);await this.updateBackoffMetadataWithRetryInterval(l)}}catch(o){this.logger.debug("Unable to parse latest config update message.",o);const l=o instanceof Error?o.message:String(o);this.propagateError(Q.create("update-message-invalid",{originalErrorMessage:l}))}r=""}}}async listenForNotifications(t){try{await this.handleNotifications(t)}catch{this.isInBackground||this.logger.debug("Real-time connection was closed due to an exception.")}}async prepareAndBeginRealtimeHttpStream(){if(!this.checkAndSetHttpConnectionFlagIfNotRunning())return;let t=await this.storage.getRealtimeBackoffMetadata();t||(t={backoffEndTimeMillis:new Date(mu),numFailedStreams:gu});const n=t.backoffEndTimeMillis.getTime();if(Date.now()<n){await this.retryHttpConnectionWhenBackoffEnds();return}let r,i;try{if(r=await this.createRealtimeConnection(),i=r.status,r.ok&&r.body){this.resetRetryCount(),await this.resetRealtimeBackoff();const a=r.body.getReader();this.reader=a,await this.listenForNotifications(a)}}catch(a){this.isInBackground?this.resetRetryCount():this.logger.debug("Exception connecting to real-time RC backend. Retrying the connection...:",a)}finally{await this.closeRealtimeHttpConnection(),this.setIsHttpConnectionRunning(!1);const a=!this.isInBackground&&(i===void 0||this.isStatusCodeRetryable(i));if(a&&await this.updateBackoffMetadataWithLastFailedStreamConnectionTime(new Date),a||r!=null&&r.ok)await this.retryHttpConnectionWhenBackoffEnds();else{const o=`Unable to connect to the server. HTTP status code: ${i}`,l=Q.create("stream-error",{originalErrorMessage:o});this.propagateError(l)}}}canEstablishStreamConnection(){const t=this.observers.size>0,n=!this.isRealtimeDisabled,r=!this.isConnectionActive,i=!this.isInBackground;return t&&n&&r&&i}async makeRealtimeHttpConnection(t){if(this.canEstablishStreamConnection()){if(this.httpRetriesRemaining>0)this.httpRetriesRemaining--,await new Promise(n=>setTimeout(n,t)),this.prepareAndBeginRealtimeHttpStream();else if(!this.isInBackground){const n=Q.create("stream-error",{originalErrorMessage:"Unable to connect to the server. Check your connection and try again."});this.propagateError(n)}}}async beginRealtime(){this.observers.size>0&&await this.makeRealtimeHttpConnection(0)}addObserver(t){this.observers.add(t),this.beginRealtime()}removeObserver(t){this.observers.has(t)&&this.observers.delete(t)}async onVisibilityChange(t){this.isInBackground=!t,t?t&&await this.beginRealtime():await this.closeRealtimeHttpConnection()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P1(){Wt(new pt(Op,e,"PUBLIC").setMultipleInstances(!0)),et(lo,du),et(lo,du,"esm2020");function e(t,{options:n}){const r=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate(),a=t.getProvider("analytics-internal"),{projectId:o,apiKey:l,appId:c}=r.options;if(!o)throw Q.create("registration-project-id");if(!l)throw Q.create("registration-api-key");if(!c)throw Q.create("registration-app-id");const u=(n==null?void 0:n.templateId)||"firebase",p=wl()?new _1(c,r.name,u):new b1,d=new N1(p),m=new xl(lo);m.logLevel=F.ERROR;const x=new m1(i,Zc,u,o,l,c),w=new v1(x,p),v=new p1(w,p,d,m),k=new R1(i,p,Zc,u,o,l,c,m,d,v),f=new S1(r,v,d,p,m,k,a);return d1(f),f}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function M1(e){return e=wt(e),await f1(e),u1(e)}P1();const A1={apiKey:void 0,authDomain:void 0,projectId:"shweta-makeover",storageBucket:"shweta-makeover.firebasestorage.app",messagingSenderId:void 0,appId:void 0,measurementId:void 0},Bp=fp(A1);Jw(Bp);const ge=c1(Bp);ge.settings={minimumFetchIntervalMillis:0};function L1(){const e=["January","February","March","April","May","June","July","August","September","October","November","December"],t=new Date;t.setDate(t.getDate()+3);const n=[],r=new Set;for(let c=0;c<3;c++){const u=new Date(t);u.setDate(t.getDate()+c),n.push(u.getDate()),r.add(e[u.getMonth()])}const i=new Date(t),a=new Date(t);a.setDate(t.getDate()+1);const o=new Date(t);o.setDate(t.getDate()+2);const l=c=>`${c.getDate()} ${e[c.getMonth()]}`;return i.getMonth()===o.getMonth()?`${i.getDate()}, ${a.getDate()} & ${o.getDate()} ${e[i.getMonth()]}`:i.getMonth()===a.getMonth()?`${i.getDate()} & ${a.getDate()} ${e[i.getMonth()]} & ${o.getDate()} ${e[o.getMonth()]}`:`${l(i)}, ${l(a)} & ${l(o)}`}ge.defaultConfig={course_price:"499",original_price:"999",pricing_variant:"default",urgency_test:"false",course_dates:L1()};const Up=y.createContext(null);function D1({children:e}){const[t,n]=y.useState(Number(ge.defaultConfig.course_price)||499),[r,i]=y.useState(Number(ge.defaultConfig.original_price)||999),[a,o]=y.useState(ge.defaultConfig.pricing_variant||"default"),[l,c]=y.useState(ge.defaultConfig.urgency_test==="true"),[u,p]=y.useState(ge.defaultConfig.course_dates),[d,m]=y.useState(!1);y.useEffect(()=>{let w=!1;async function v(){try{if(await M1(ge),w)return;const k=ir(ge,"course_price").asString(),f=ir(ge,"original_price").asString(),h=ir(ge,"pricing_variant").asString(),g=ir(ge,"urgency_test").asString(),S=ir(ge,"course_dates").asString();n(Number(k)||499),i(Number(f)||999),o(h||"default"),c(g==="true"),p(S||ge.defaultConfig.course_dates)}catch(k){console.error("Remote config error:",k),c(!1)}finally{w||m(!0)}}return v(),()=>{w=!0}},[]);const x=l?"enabled":"disabled";return s.jsx(Up.Provider,{value:{coursePrice:t,originalPrice:r,pricingVariant:a,urgencyTest:l,urgencyVariant:x,courseDates:u,ready:d},children:e})}function xt(){const e=y.useContext(Up);if(!e)throw new Error("usePrice must be used within a PriceProvider");return e}function F1(){const{coursePrice:e,urgencyTest:t}=xt();return s.jsx("div",{className:"announcement-bar","data-clarity-unmask":"True",children:t?s.jsxs(s.Fragment,{children:["⚡ Limited Time Offer: Enroll at"," ",s.jsxs("strong",{"data-clarity-unmask":"True",children:["₹",e]})," ",s.jsx("span",{className:"original-price","data-clarity-unmask":"True",children:"₹499"})," "]}):s.jsxs(s.Fragment,{children:["⚡ Limited Time Offer:"," ",s.jsxs("strong",{"data-clarity-unmask":"True",children:["Enroll at Rs. ₹",e]})," "]})})}const xu="/payment",Su=[{name:"Naina",city:"Jodhpur"},{name:"Vaishali",city:"Nashik"},{name:"Muskan",city:"Indore"},{name:"Tripti",city:"Patna"},{name:"Ishika",city:"Indore"},{name:"Vivek",city:"Rajkot"},{name:"Satvika",city:"Kolkota"},{name:"Manju Devi",city:"Ranchi"},{name:"Prabhavati",city:"Mysore"}];function O1(){const[e,t]=y.useState(null),[n,r]=y.useState(!1),i=y.useRef(0),a=y.useRef(null),o=()=>{const l=Su[i.current%Su.length];i.current+=1,r(!1),t({...l,id:Date.now()}),a.current=setTimeout(()=>{r(!0),setTimeout(()=>{o()},420)},2600)};return y.useEffect(()=>{const l=setTimeout(o,600);return()=>{clearTimeout(l),clearTimeout(a.current)}},[]),e?s.jsx("div",{className:"ticker-wrapper",children:s.jsxs("div",{className:"social-proof-ticker",style:{animation:n?"tickerExit 0.4s cubic-bezier(0.4,0,1,1) forwards":"tickerEnter 0.45s cubic-bezier(0.16,1,0.3,1) forwards"},children:[s.jsx("span",{className:"ticker-bolt",children:"⚡"}),s.jsxs("span",{className:"ticker-text",children:[s.jsx("strong",{children:s.jsx("b",{children:e.name})}),s.jsx("span",{className:"ticker-sep",children:" from "}),s.jsx("strong",{children:e.city}),s.jsx("span",{className:"ticker-action",children:" just joined the course"})]})]})}):s.jsx("div",{style:{height:"38px"}})}function z1(){const{coursePrice:e,urgencyTest:t,courseDates:n}=xt(),r=y.useRef(null),i=y.useRef(null),[a,o]=y.useState(!0),l=[{icon:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z",clipRule:"evenodd"})}),text:`Date: ${n} (Live & recorded)`},{icon:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{fillRule:"evenodd",d:"M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z",clipRule:"evenodd"})}),text:"Timings: 12 PM to 4 PM"},{icon:s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:[s.jsx("path",{d:"m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"}),s.jsx("path",{d:"M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"})]}),text:"Learn 15 Trending Hairstyles"},{icon:s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:s.jsx("path",{d:"M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z"})}),text:"Get Full Class Video Recording"}];y.useEffect(()=>{const u=r.current;u&&(u.muted=!0,u.play().catch(()=>{}))},[]),y.useEffect(()=>{const u=r.current,p=i.current;if(!u||!p)return;const d=new IntersectionObserver(([m])=>{m.isIntersecting?u.play().catch(()=>{}):u.pause()},{threshold:.25});return d.observe(p),()=>d.disconnect()},[]);const c=()=>{const u=r.current;u&&(u.muted=!u.muted,o(u.muted))};return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
        @keyframes tickerEnter {
          0%   { opacity: 0; transform: translateY(12px) scale(0.94); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0px) scale(1); filter: blur(0px); }
        }
        @keyframes tickerExit {
          0%   { opacity: 1; transform: translateY(0px) scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-12px) scale(0.94); filter: blur(4px); }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.6; }
        }
        @keyframes ringPulse {
          0%   { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -250% center; }
          100% { background-position: 250% center; }
        }

        .ticker-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
          min-height: 40px;
          margin-top: -55px;
          margin-bottom: 20px;
        }

        .social-proof-ticker {
          display: inline-flex;
          align-items: center;
          background: #fffdf5;
          border: 1px solid rgba(255, 200, 130, 0.42);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 999px;
          height: 32px;
          padding: 0px 22px 0px 14px;
          font-size: 0.70rem;
          font-weight: 500;
          letter-spacing: 0.015em;
          color: #2d1f18;
          box-shadow:
            0 0 0 1px rgba(255, 200, 100, 0.12),
            0 4px 28px rgba(220, 130, 60, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          position: relative;
          overflow: hidden;
          max-width: 100%;
          white-space: nowrap;
        }

        .social-proof-ticker::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255, 230, 160, 0.15) 45%,
            rgba(255, 255, 220, 0.20) 50%,
            rgba(255, 230, 160, 0.15) 55%,
            transparent 75%
          );
          background-size: 250% 100%;
          animation: shimmer 2.8s linear infinite;
          border-radius: inherit;
          pointer-events: none;
        }

        .social-proof-ticker::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15%;
          right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 200, 120, 0.5), transparent);
          border-radius: 999px;
        }

        .ticker-bolt {
          font-size: 0.88rem;
          flex-shrink: 0;
          filter: drop-shadow(0 0 5px rgba(255, 220, 80, 0.9));
        }

        .ticker-text {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .ticker-text strong {
          color: #c0614a;
          font-weight: 800;
          text-shadow: 0 1px 10px rgba(255, 200, 120, 0.5);
        }

        .ticker-sep {
          color: #7a5c52;
          font-weight: 400;
          margin: 0 1px;
        }

        .ticker-action {
          color: #7a5c52;
          font-weight: 400;
        }

        .video-container {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
        }

        .hero-video {
          width: 100%;
          border-radius: 16px;
          display: block;
          pointer-events: none;
        }

        .sound-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.50);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 6px 12px 6px 9px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #fff;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .sound-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #f87171;
          animation: pulseDot 1.4s ease-in-out infinite;
        }

        .sound-overlay.unmuted .sound-dot {
          background: #4ade80;
          animation: none;
        }
      `}),s.jsx("section",{className:"hero-section","data-section":"hero",children:s.jsxs("div",{className:"hero-inner",children:[s.jsx(O1,{}),s.jsxs("h1",{className:"hero-title",children:["Makeup Achha Hai, ",s.jsx("br",{}),s.jsx("em",{children:" Par Hairstyling Weak?"}),s.jsx("br",{}),"Stop Losing Time & Clients"]}),s.jsxs("div",{ref:i,className:"video-container",onClick:c,children:[s.jsx("video",{ref:r,src:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/hero-section%20videos/0325(1).mp4",autoPlay:!0,muted:!0,loop:!0,poster:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/certificate-shweta-makeover.jpeg",playsInline:!0,preload:"auto",className:"hero-video"}),s.jsxs("div",{className:`sound-overlay ${a?"":"unmuted"}`,children:[s.jsx("span",{className:"sound-dot"}),s.jsx("span",{children:a?"🔇 Tap for sound":"🔊 Sound on"})]})]}),s.jsx("div",{className:"hero-features",children:l.map(({icon:u,text:p},d)=>s.jsxs("div",{className:"hero-feature-item",style:{animationDelay:`${.5+d*.1}s`},children:[u,s.jsx("span",{children:p})]},p))}),t?s.jsxs("div",{className:"cta-with-urgency",style:{animation:"fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both"},children:[s.jsxs("a",{href:xu,className:"cta-button cta-pulse",children:["🚀 Join Now for ",s.jsxs("strong",{children:["₹",e]})," ",s.jsx("span",{className:"original",children:"₹499"})]}),s.jsxs("div",{className:"seats-remaining",children:[s.jsx("span",{className:"seats-dot"})," Only ",s.jsx("strong",{children:"2 seats"})," remaining"]})]}):s.jsxs("a",{href:xu,className:"cta-button",style:{animation:"fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.9s both"},children:["🚀 Join Now for ",s.jsxs("strong",{children:["₹",e]})]})]})})]})}const $1=()=>s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),B1=["You know makeup, but can't do hairstyling confidently","You run a beauty parlour and want to increase your income","Clients ask for hairstyles, but you say no","You want to take bridal and function bookings","You want to start earning extra from home"];function U1(){return s.jsx("section",{className:"section perfect-section","data-section":"perfect-for-you",children:s.jsxs("div",{className:"section-inner",children:[s.jsxs("div",{className:"reveal",children:[s.jsx("h2",{className:"section-title",children:"This Masterclass is Perfect for You if"}),s.jsx("div",{className:"section-divider section-divider-white"})]}),s.jsx("div",{className:"reveal",style:{maxWidth:680,margin:"0 auto"},children:s.jsx("div",{className:"solution-card",children:B1.map((e,t)=>s.jsxs("div",{className:"card-item",children:[s.jsx($1,{}),s.jsx("span",{children:e})]},t))})})]})})}const H1=[{label:"Part 1",title:"Front Hairstyle Mastery",items:[{bold:"Learn 12 different front hairstyle variations",text:"for different face shapes, occasions, and looks."},{bold:"Create styles that look modern, trendy, and client-ready",text:"– perfect for real salon use."},{bold:"Understand how to adjust styles",text:"based on hair volume and length for every client."}]},{label:"Part 2",title:"👰 Bridal Hairstyling",items:[{bold:"Step-by-step training on 2 bridal buns",text:"(perfect for weddings & events)."},{bold:"Learn how to create full, heavy, and elegant bridal looks",text:"that wow clients."},{bold:"Make hairstyles that last 8–10 hours",text:"without loosening throughout the event."}]},{label:"Part 3",title:"💎 Professional Finishing",items:[{bold:"Learn brooch making & styling",text:"to give a premium, decorated finish to every look."},{bold:"Make your hairstyles look highly-attractive and high-end",text:"for better client satisfaction."},{bold:"Small detailing techniques",text:"that make a big difference in the final look."}]},{label:"Part 4",title:"⚡ Speed & Client Handling",items:[{bold:"Learn how to complete hairstyles in 30–40 minutes",text:"efficiently and professionally."},{bold:"Handle multiple clients efficiently",text:"during busy wedding/function days without stress."},{bold:"Work with confidence on real clients",text:"without hesitation."}]},{label:"Part 5",title:"💰 Earning-Focused Skills",items:[{bold:"Learn how to create hairstyles that you can charge more per client",text:"and grow your income."},{bold:"Offer makeup + hairstyle packages",text:"to increase your total billing per appointment."},{bold:"Build skills that help you start earning from home",text:"or grow your existing orders."}]}];function W1(){return s.jsx("section",{className:"section curriculum-section","data-section":"curriculum",children:s.jsxs("div",{className:"section-inner",children:[s.jsx("div",{className:"curriculum-header",children:s.jsxs("div",{className:"curriculum-intro reveal-left",children:[s.jsx("h2",{className:"section-title",children:"What You'll Learn"}),s.jsx("div",{className:"section-divider",style:{margin:"14px 0 0",textAlign:"left"}}),s.jsx("p",{style:{marginTop:20},children:"This 3 Day hairstyle masterclass is designed to learn trendy Hairstyles that clients actually ask for. Learn everything from essential techniques to advanced bridal styles, and confidently create instagram like looks."})]})}),s.jsx("div",{className:"curriculum-parts",children:H1.map((e,t)=>s.jsxs("div",{className:`curriculum-part reveal delay-${t+1}`,children:[s.jsx("span",{className:"part-label",children:e.label}),s.jsx("h3",{className:"part-title",children:e.title}),s.jsx("div",{className:"part-items",children:e.items.map(n=>s.jsxs("div",{className:"part-item",children:[s.jsx("strong",{children:n.bold})," ",n.text]},n.bold))})]},e.label))})]})})}function V1(){return s.jsx("section",{className:"section certificate-section","data-section":"certificate",children:s.jsxs("div",{className:"section-inner",style:{textAlign:"center"},children:[s.jsxs("div",{className:"reveal",children:[s.jsx("h2",{className:"section-title",children:"Get Certified!"}),s.jsx("div",{className:"section-divider section-divider-white"})]}),s.jsx("div",{className:"certificate-frame reveal-scale",children:s.jsx("img",{src:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/certificate-shweta-makeover.jpeg",alt:"Course Certificate",loading:"lazy"})})]})})}function fo({target:e,suffix:t=""}){const[n,r]=y.useState(0),i=y.useRef(null),a=y.useRef(!1);return y.useEffect(()=>{const o=i.current;if(!o)return;const l=new IntersectionObserver(([c])=>{if(c.isIntersecting&&!a.current){a.current=!0;let u=0;const p=1800,d=m=>{u||(u=m);const x=Math.min((m-u)/p,1),w=1-Math.pow(1-x,3);r(Math.floor(w*e)),x<1?requestAnimationFrame(d):r(e)};requestAnimationFrame(d)}},{threshold:.5});return l.observe(o),()=>l.disconnect()},[e]),s.jsxs("span",{ref:i,children:[n.toLocaleString(),t]})}function K1(){return s.jsx("section",{className:"section about-section","data-section":"about-mentor",children:s.jsxs("div",{className:"about-inner",children:[s.jsxs("div",{className:"about-text reveal-left",children:[s.jsx("div",{className:"about-eyebrow",children:"✦ Your Mentor"}),s.jsx("h2",{className:"about-title",children:"Meet Shweta Kapoor"}),s.jsx("p",{children:"Hi, I’m Shweta Kapoor — your hairstyling mentor. I have 13 years of experience as a makeup artist and teacher, and I’ve worked with many artists across India, especially from tier 2 and tier 3 cities who run their own parlours or work as freelancers. I understand your daily work, your clients, and your goal to grow in this field."}),s.jsx("p",{children:"Many times, we are good at makeup but feel stuck when it comes to hairstyling. Because of this, we may miss out on giving complete services to our clients. That’s why I’ve made this course in a very simple way, where I teach hairstyling step by step so you can easily learn and use it in your real work."}),s.jsx("p",{children:"In this course, you will learn basic to trendy hairstyles that you can do for bridal and party clients. This will help you increase your income, build confidence, and offer full services to your clients. Let’s learn together and grow your skills in an easy and practical way."}),s.jsxs("div",{className:"about-stat-row",children:[s.jsxs("div",{className:"about-stat",children:[s.jsx("span",{className:"about-stat-number",children:s.jsx(fo,{target:400,suffix:"K+"})}),s.jsx("div",{className:"about-stat-label",children:"Students Taught"})]}),s.jsxs("div",{className:"about-stat",children:[s.jsx("span",{className:"about-stat-number",children:s.jsx(fo,{target:13,suffix:" Yrs"})}),s.jsx("div",{className:"about-stat-label",children:"Experience"})]}),s.jsxs("div",{className:"about-stat",children:[s.jsx("span",{className:"about-stat-number",children:s.jsx(fo,{target:16,suffix:"+"})}),s.jsx("div",{className:"about-stat-label",children:"Lessons"})]})]})]}),s.jsx("div",{className:"about-img-wrapper reveal-right",children:s.jsx("img",{src:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/social-image.jpeg",alt:"Shweta Celeb Makeover",loading:"lazy"})})]})})}const po=[{title:"TM 1",src:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/tanishqa-testimonial.mp4"},{title:"TM 2",src:"https://pub-8cb3f523bbe94c609e0173a143b05f75.r2.dev/testimonials/vinanti-testimonial.mp4"}];function G1({src:e,onPlay:t,onPauseOrEnd:n}){const r=y.useRef(null),i=y.useRef(null),[a,o]=y.useState(!0);y.useEffect(()=>{const c=r.current;c&&(c.muted=!0,c.play().catch(()=>{}))},[]),y.useEffect(()=>{const c=r.current,u=i.current;if(!c||!u)return;const p=new IntersectionObserver(([d])=>{d.isIntersecting?c.play().catch(()=>{}):c.pause()},{threshold:.25});return p.observe(u),()=>p.disconnect()},[]);const l=()=>{const c=r.current;c&&(c.muted=!c.muted,o(c.muted),c.muted?n==null||n():t==null||t())};return s.jsxs("div",{ref:i,className:"tm-video-card",onClick:l,children:[s.jsx("video",{ref:r,src:e,autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:"auto",style:{pointerEvents:"none"}}),s.jsxs("div",{className:`sound-overlay ${a?"":"unmuted"}`,children:[s.jsx("span",{className:"sound-dot"}),s.jsx("span",{children:a?"🔇 Tap for sound":"🔊 Sound on"})]})]})}function Y1(){const[e,t]=y.useState(0),[n,r]=y.useState(!1),[i,a]=y.useState(!1),o=y.useRef(null),l=()=>{clearInterval(o.current),o.current=setInterval(()=>{r(!0),setTimeout(()=>{t(p=>(p+1)%po.length),r(!1),a(!1)},300)},4500)},c=()=>clearInterval(o.current);y.useEffect(()=>(l(),()=>clearInterval(o.current)),[]);const u=p=>{p===e||i||(r(!0),setTimeout(()=>{t(p),r(!1)},300))};return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
        .tm-video-card {
          position: relative;
          width: 80%;
          max-width: 340px;
          margin: 0 auto;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: #0a0a0a;
          cursor: pointer;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 8px 40px rgba(0,0,0,0.55),
            0 2px 8px rgba(0,0,0,0.3);
        }

        .tm-video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .sound-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.50);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 6px 12px 6px 9px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          color: #fff;
          pointer-events: none;
          user-select: none;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255,255,255,0.12);
        }

        .sound-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          background: #f87171;
          animation: pulseDot 1.4s ease-in-out infinite;
        }

        .sound-overlay.unmuted .sound-dot {
          background: #4ade80;
          animation: none;
        }

        .slider-nav {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #a4a4a4;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .slider-dot.active {
          width: 24px;
          background: linear-gradient(90deg, #e8927c, #c9a96e);
        }

        .slider-dot.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }
      `}),s.jsx("section",{className:"section testimonials-section","data-section":"testimonials",children:s.jsxs("div",{className:"section-inner",children:[s.jsxs("div",{className:"reveal",children:[s.jsx("h2",{className:"section-title",children:"Student Feedback"}),s.jsx("div",{className:"section-divider section-divider-white"})]}),s.jsxs("div",{className:"slider-container reveal-scale",children:[s.jsx("div",{style:{opacity:n?0:1,transform:n?"scale(0.97)":"scale(1)",transition:"opacity 0.3s ease, transform 0.3s ease"},children:s.jsx(G1,{src:po[e].src,onPlay:()=>{a(!0),c()},onPauseOrEnd:()=>{a(!1),l()}},e)}),s.jsx("div",{className:"slider-nav",children:po.map((p,d)=>s.jsx("button",{className:`slider-dot${d===e?" active":""}${i&&d!==e?" disabled":""}`,onClick:()=>u(d),"aria-label":`Testimonial ${d+1}`},d))})]})]})})]})}const q1="/payment",Q1=[{badge:"BONUS 1",title:"📖 Easy to Follow Chapter Notes"},{badge:"BONUS 2",title:"🛒 Product Purchase Guide (seller details)"}],X1=["delay-1","delay-2"];function J1(){const{coursePrice:e,urgencyTest:t}=xt();return s.jsx("section",{className:"section bonus-section","data-section":"bonuses",children:s.jsxs("div",{className:"section-inner",children:[s.jsxs("div",{className:"reveal",children:[s.jsx("h2",{className:"section-title",children:"🎁 ₹10,000 Worth of Exclusive Bonuses with this Course"}),s.jsx("div",{className:"section-divider"})]}),s.jsx("div",{className:"bonus-grid",children:Q1.map((n,r)=>s.jsxs("div",{className:`bonus-card reveal-scale ${X1[r]}`,children:[s.jsx("div",{className:"bonus-badge",children:n.badge}),s.jsx("div",{className:"bonus-content",children:s.jsx("div",{className:"bonus-content-title",children:n.title})})]},n.badge))}),s.jsx("div",{className:"cta-center reveal","data-clarity-unmask":"True",children:s.jsxs("a",{href:q1,className:`cta-button${t?" cta-pulse":""}`,"data-clarity-unmask":"True",children:["🚀 Join Now for ",s.jsxs("strong",{"data-clarity-unmask":"True",children:["₹",e]}),t&&s.jsxs(s.Fragment,{children:[" ",s.jsx("span",{className:"original","data-clarity-unmask":"True",children:"₹499"})]})]})})]})})}const Z1=[{q:"How long is the course and what content does it include?",a:"The course comprises 16 lessons totaling over 4 hours of content, covering all aspects of hairstyle from hairstyle theory to practical techniques."},{q:"Can beginners enroll in this course?",a:"YES! This course is suitable for beginners as it starts with the basics and gradually progresses to more advanced & practical techniques."},{q:"Will I receive a certificate upon completing the course?",a:"Yes, upon completion of the course, you will receive a certificate acknowledging your new skills and knowledge in hairstyle."},{q:"Is there any support available during the course?",a:"Yes, you can participate in monthly live Q&A sessions for direct support from Shweta."},{q:"In which languages is Shweta Celeb Makeover's hairstyle Mastery Course available?",a:"Hinglish — it's just as if we were speaking with you one-on-one. Moreover the use of Hindi is more than the use of English."},{q:"I made the payment but didn't receive any confirmation email?",a:"WhatsApp us on +91 7039240054 — our dedicated support team will get back to you in 24 hours."}],ex=({open:e})=>s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:`faq-icon${e?" open":""}`,children:[s.jsx("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),s.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]});function tx(){const[e,t]=y.useState(null);return s.jsx("section",{className:"section faq-section","data-section":"faq",children:s.jsxs("div",{className:"section-inner",children:[s.jsxs("div",{className:"reveal",children:[s.jsx("h2",{className:"section-title",children:"FAQ"}),s.jsx("div",{className:"section-divider"})]}),s.jsx("div",{className:"faq-list",children:Z1.map((n,r)=>s.jsxs("div",{className:`faq-item reveal delay-${Math.min(r+1,6)}`,children:[s.jsxs("button",{className:"faq-question-btn",onClick:()=>t(e===r?null:r),"aria-expanded":e===r,children:[s.jsx("span",{children:n.q}),s.jsx(ex,{open:e===r})]}),s.jsx("div",{className:`faq-answer${e===r?" open":""}`,children:s.jsx("div",{className:"faq-answer-inner",children:n.a})})]},r))}),s.jsxs("div",{className:"faq-footer-links",children:[s.jsx("a",{href:"/terms",children:"Terms of Use"}),s.jsx("a",{href:"/refund",children:"Refund Policy"}),s.jsx("a",{href:"/privacy",children:"Privacy Policy"}),s.jsx("a",{href:"/contact",children:"Contact"})]})]})})}const nx="/payment";function rx(){const{coursePrice:e,urgencyTest:t}=xt();return s.jsxs("div",{className:"sticky-bar","data-clarity-unmask":"True",children:[s.jsxs("div",{children:[s.jsxs("div",{className:"sticky-price",children:[s.jsxs("strong",{"data-clarity-unmask":"True",children:["₹",e,"/-"]}),t&&s.jsx("span",{className:"original","data-clarity-unmask":"True",children:"₹499"})]}),t?s.jsxs("div",{className:"sticky-offer-text sticky-seats",children:[s.jsx("span",{className:"seats-dot"})," Only ",s.jsx("strong",{children:"2 seats"})," remaining"]}):s.jsx("div",{className:"sticky-offer-text",children:"🌟 Limited-Time Offer"})]}),s.jsxs("a",{href:nx,className:`sticky-cta${t?" cta-pulse":""}`,"data-clarity-unmask":"True",children:["🚀 Join Now ",s.jsxs("strong",{"data-clarity-unmask":"True",children:["₹",e]})]})]})}const ix=void 0,ho=[{name:"name",label:"Full Name",type:"text",placeholder:"Your name",required:!0},{name:"phone",label:"WhatsApp Number",type:"tel",placeholder:"98XXXXXXXX",required:!0,prefix:"+91"},{name:"gender",label:"Gender",type:"select",required:!0,options:["Female","Male","Non-binary","Prefer not to say"]},{name:"city",label:"City",type:"text",placeholder:"Mumbai, Delhi…",required:!0},{name:"state",label:"State",type:"text",placeholder:"Maharashtra…",required:!0},{name:"occupation",label:"Occupation",type:"select",required:!0,options:["Student","Working Professional","Homemaker","Freelancer / Self-employed","Beauty Professional","Other"]},{name:"reason",label:"Why do you want to learn?",type:"textarea",placeholder:"I want to do my own makeup for events…",required:!1}];function ax({paymentData:e,courseAmount:t,razorpayOrderId:n,onComplete:r}){const{urgencyVariant:i}=xt(),[a,o]=y.useState({name:"",phone:"",gender:"",city:"",state:"",occupation:"",reason:""}),[l,c]=y.useState(!1),[u,p]=y.useState({}),d=y.useRef({}),m=()=>{const v={};ho.forEach(f=>{var h;f.required&&!((h=a[f.name])!=null&&h.trim())&&(v[f.name]="This field is required")}),p(v);const k=ho.find(f=>v[f.name]);return k&&d.current[k.name]&&d.current[k.name].scrollIntoView({behavior:"smooth",block:"center"}),Object.keys(v).length===0},x=async()=>{if(m()){c(!0);try{await fetch(`${ix}/api/save-profile`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.name,email:e.email,phone:e.phone,razorpayOrderId:n,whatsappPhone:a.phone,gender:a.gender,city:a.city,state:a.state,occupation:a.occupation,reason:a.reason})})}catch(v){console.error("Profile save error:",v)}finally{Qe.profile.push({Site:{Gender:a.gender==="Female"?"F":a.gender==="Male"?"M":void 0,City:a.city,State:a.state}}),iv({Gender:a.gender==="Female"?"F":a.gender==="Male"?"M":void 0,City:a.city,State:a.state}),Qe.event.push("Profile Completed",{gender:a.gender,city:a.city,state:a.state,occupation:a.occupation,pricing_variant:`pricing_${t}`,urgency_variant:i,name:a.name,phone:e.phone}),Rt("Profile Completed",{gender:a.gender,city:a.city,state:a.state,occupation:a.occupation,pricing_variant:`pricing_${t}`,urgency_variant:i,name:a.name,phone:e.phone}),ka("Profile Completed",{gender:a.gender,city:a.city,state:a.state,occupation:a.occupation,pricing_variant:`pricing_${t}`,name:a.name,phone:e.phone}),c(!1),r(a)}}},w=(v,k)=>{o(f=>({...f,[v]:k})),p(f=>({...f,[v]:""}))};return s.jsx("div",{className:"ppf-overlay",children:s.jsxs("div",{className:"ppf-modal",children:[s.jsx("div",{className:"ppf-blob ppf-blob-1"}),s.jsx("div",{className:"ppf-blob ppf-blob-2"}),s.jsxs("div",{className:"ppf-header",children:[s.jsxs("h2",{className:"ppf-title",children:["Tell us about ",s.jsx("em",{children:"yourself"})]}),s.jsx("p",{className:"ppf-subtitle",children:"Help us personalise your experience ✨"})]}),s.jsx("div",{className:"ppf-body",children:ho.map(v=>s.jsxs("div",{className:"ppf-field",ref:k=>d.current[v.name]=k,children:[s.jsxs("label",{className:"ppf-label",children:[v.label,v.required&&s.jsx("span",{className:"ppf-required",children:"*"})]}),v.type==="select"?s.jsxs("div",{className:"ppf-select-wrap",children:[s.jsxs("select",{className:`ppf-select ${u[v.name]?"ppf-error":""}`,value:a[v.name],onChange:k=>w(v.name,k.target.value),children:[s.jsx("option",{value:"",children:"Choose…"}),v.options.map(k=>s.jsx("option",{value:k,children:k},k))]}),s.jsx("span",{className:"ppf-select-arrow",children:"▾"})]}):v.type==="textarea"?s.jsx("textarea",{className:`ppf-textarea ${u[v.name]?"ppf-error":""}`,placeholder:v.placeholder,value:a[v.name],rows:3,onChange:k=>w(v.name,k.target.value)}):s.jsxs("div",{className:`ppf-input-wrap ${v.prefix?"ppf-has-prefix":""}`,children:[v.prefix&&s.jsx("span",{className:"ppf-tel-prefix",children:v.prefix}),s.jsx("input",{className:`ppf-input ${u[v.name]?"ppf-error":""}`,type:v.type,placeholder:v.placeholder,value:a[v.name],onChange:k=>w(v.name,k.target.value)})]}),u[v.name]&&s.jsx("span",{className:"ppf-error-msg",children:u[v.name]})]},v.name))}),s.jsx("div",{className:"ppf-footer",children:s.jsx("button",{className:"ppf-next-btn",onClick:x,disabled:l,children:l?s.jsx("span",{className:"ppf-spinner"}):s.jsx(s.Fragment,{children:"Complete & Continue →"})})})]})})}function ox({paymentData:e={},profileData:t={},courseAmount:n}){const r=y.useRef(null),{urgencyVariant:i,courseDates:a}=xt();y.useEffect(()=>{Qe.event.push("Order Confirmed",{course_name:"3-Day Hairstyle Masterclass",pricing_variant:`pricing_${n}`,urgency_variant:i,name:e.name,phone:e.phone}),Rt("Order Confirmed",{course_name:"3-Day Hairstyle Masterclass",pricing_variant:`pricing_${n}`,urgency_variant:i,name:e.name,phone:e.phone}),ka("Order Confirmed",{course_name:"3-Day Hairstyle Masterclass",pricing_variant:`pricing_${n}`,name:e.name,phone:e.phone})},[]),y.useEffect(()=>{const l=r.current;if(!l)return;const c=l.getContext("2d");l.width=window.innerWidth,l.height=window.innerHeight;const u=["#e8962e","#c8702a","#f7c87a","#fff8f0","#d4a44e","#a85020"],p=Array.from({length:80},()=>({x:Math.random()*l.width,y:Math.random()*l.height-l.height,w:Math.random()*10+5,h:Math.random()*6+3,color:u[Math.floor(Math.random()*u.length)],rot:Math.random()*Math.PI*2,rotSpeed:(Math.random()-.5)*.08,vx:(Math.random()-.5)*1.5,vy:Math.random()*2+1,alpha:1}));let d;const m=()=>{c.clearRect(0,0,l.width,l.height),p.forEach(w=>{c.save(),c.translate(w.x+w.w/2,w.y+w.h/2),c.rotate(w.rot),c.globalAlpha=w.alpha,c.fillStyle=w.color,c.fillRect(-w.w/2,-w.h/2,w.w,w.h),c.restore(),w.x+=w.vx,w.y+=w.vy,w.rot+=w.rotSpeed,w.y>l.height&&(w.y=-20,w.x=Math.random()*l.width,w.alpha=1)}),d=requestAnimationFrame(m)};m();const x=setTimeout(()=>cancelAnimationFrame(d),4e3);return()=>{cancelAnimationFrame(d),clearTimeout(x)}},[]);const o=[{icon:"🎓",label:"Course Access",value:"Hairstyle Masterclass"},{icon:"📅",label:"Dates",value:a},{icon:"🕐",label:"Timings",value:"12 PM – 4 PM"},{icon:"📹",label:"Recording",value:"Full class video included"}];return s.jsxs("div",{className:"oc-page",children:[s.jsx("canvas",{ref:r,className:"oc-confetti"}),s.jsxs("div",{className:"oc-card",children:[s.jsx("div",{className:"oc-glow"}),s.jsx("div",{className:"oc-badge",children:s.jsx("div",{className:"oc-badge-ring",children:s.jsx("span",{className:"oc-check",children:"✓"})})}),s.jsx("div",{className:"oc-eyebrow",children:"Payment Confirmed"}),s.jsxs("h1",{className:"oc-heading",children:["You're all set!",s.jsx("br",{})]}),s.jsx("p",{className:"oc-subtext",children:"Welcome to the Hairstyle Masterclass. Get ready to transform your skills! 🌟"}),s.jsxs("div",{className:"oc-footer-note",children:["Any doubts? WhatsApp us on ",s.jsxs("a",{href:`https://wa.me/917039240054?text=Hello%2C%20this%20is%20my%20payment%20number%20${e.phone}%2C%20I%20have%20made%20the%20payment.%20This%20is%20my%20confirmation%20message.`,target:"_blank",rel:"noopener noreferrer",className:"oc-wa-btn",children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"20",height:"20",children:[s.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"}),s.jsx("path",{d:"M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.55a.75.75 0 0 0 .906.919l5.857-1.533A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.999-1.385l-.358-.214-3.718.974.993-3.63-.234-.373A9.705 9.705 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"})]}),"Confirm on WhatsApp"]})]}),s.jsx("div",{className:"oc-divider"}),s.jsx("div",{className:"oc-details",children:o.map(l=>s.jsxs("div",{className:"oc-detail-row",children:[s.jsx("span",{className:"oc-detail-icon",children:l.icon}),s.jsx("span",{className:"oc-detail-label",children:l.label}),s.jsx("span",{className:"oc-detail-value",children:l.value})]},l.label))}),e.email&&s.jsxs("div",{className:"oc-email-notice",children:[s.jsx("span",{className:"oc-email-icon",children:"📧"}),s.jsxs("span",{children:["Confirmation sent to ",s.jsx("strong",{children:e.email})]})]}),s.jsxs("div",{className:"oc-next",children:[s.jsx("div",{className:"oc-next-title",children:"What happens next?"}),s.jsxs("div",{className:"oc-next-steps",children:[s.jsxs("div",{className:"oc-next-step",children:[s.jsx("div",{className:"oc-next-num",children:"1"}),s.jsx("div",{children:"You'll receive class details on your WhatsApp number"})]}),s.jsxs("div",{className:"oc-next-step",children:[s.jsx("div",{className:"oc-next-num",children:"3"}),s.jsx("div",{children:"Show up on April 13th at 12 PM — ready to learn!"})]})]})]}),s.jsxs("div",{className:"oc-footer-note",children:["Any doubts? WhatsApp us on ",s.jsxs("a",{href:`https://wa.me/917039240054?text=Hello%2C%20this%20was%20my%20payment%20number%20${e.phone}%2C%20I%20have%20made%20the%20payment.%20This%20is%20my%20confirmation%20message.`,target:"_blank",rel:"noopener noreferrer",className:"oc-wa-btn",children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"20",height:"20",children:[s.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"}),s.jsx("path",{d:"M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.864L.057 23.55a.75.75 0 0 0 .906.919l5.857-1.533A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.705 9.705 0 0 1-4.999-1.385l-.358-.214-3.718.974.993-3.63-.234-.373A9.705 9.705 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"})]}),"Confirm on WhatsApp"]})]})]})]})}const ku=void 0,sx=void 0;function ys(e){const t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]+)"));return t?t[2]:null}async function lx(e=1500,t=100){const n=Date.now()+e;let r=ys("_fbp");for(;!r&&Date.now()<n;)await new Promise(i=>setTimeout(i,t)),r=ys("_fbp");return r||null}function cx({onBackToHome:e}={}){const[t,n]=y.useState({name:"",email:"",phone:"",state:"Karnataka"}),[r,i]=y.useState(null),[a,o]=y.useState(!1),[l,c]=y.useState(null),[u,p]=y.useState(!1),[d,m]=y.useState(!1),[x,w]=y.useState(!1),[v,k]=y.useState(""),{coursePrice:f,originalPrice:h,pricingVariant:g,urgencyTest:S,urgencyVariant:C}=xt(),[b,N]=y.useState(null),[T,L]=y.useState(!1),I=y.useRef(null),ae=y.useRef(!1);y.useEffect(()=>{ae.current||(ae.current=!0,Qe.event.push("payment_page_shown",{pricing_variant:`pricing_${f}`,urgency_variant:C}),Rt("payment_page_shown",{pricing_variant:`pricing_${f}`,urgency_variant:C}),Ni("ViewContent",{content_name:"3-Day Hairstyle Masterclass",value:f,currency:"INR",pricing_variant:`pricing_${f}`}))},[f]);const nt=ue=>{ue.target.name==="phone"&&L(!1),n({...t,[ue.target.name]:ue.target.value})},Ve=()=>new Promise(ue=>{const _=document.createElement("script");_.src="https://checkout.razorpay.com/v1/checkout.js",_.onload=()=>ue(!0),_.onerror=()=>ue(!1),document.body.appendChild(_)}),St=/^\d{10}$/.test(t.phone),Te=async()=>{if(!St){L(!0),I.current&&(I.current.classList.remove("pp-shake"),I.current.offsetWidth,I.current.classList.add("pp-shake"));return}Qe.event.push("Payment Initiated",{amount:f,pricing_variant:`pricing_${f}`,urgency_variant:C,phone:t.phone,name:t.name}),Rt("Payment Initiated",{amount:f,pricing_variant:`pricing_${f}`,urgency_variant:C,phone:t.phone,name:t.name}),Ni("InitiateCheckout",{value:f,currency:"INR",num_items:1,pricing_variant:`pricing_${f}`,phone:t.phone,name:t.name}),Qe.onUserLogin.push({Site:{Name:t.name,Email:t.email||void 0,Phone:`+91${t.phone}`,Identity:t.phone}}),rv({name:t.name,email:t.email,phone:`+91${t.phone}`}),p(!0);try{if(!await Ve()){alert("Razorpay SDK failed to load. Please check your internet connection."),p(!1);return}const _=new URLSearchParams(window.location.search).get("fbclid"),R=ys("_fbc")||(_?`fb.1.${Date.now()}.${_}`:null),P=await lx(),G=await(await fetch(`${ku}/api/create-order`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name,email:t.email||null,phone:t.phone,amount:f,fbc:R,fbp:P})})).json();if(!G.success){alert("Failed to create order. Please try again."),p(!1);return}N(G.orderId);const hn={key:sx,order_id:G.orderId,name:"Shweta Celeb Makeover",description:`Core Of Makeup — ₹${f}`,handler:async function(Fe){const Ke=`purchase_${Fe.razorpay_order_id}`;try{await fetch(`${ku}/api/verify-payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({razorpay_order_id:Fe.razorpay_order_id,razorpay_payment_id:Fe.razorpay_payment_id,razorpay_signature:Fe.razorpay_signature,event_id:Ke})})}catch(mn){console.error("Payment verification error:",mn)}Qe.event.push("Payment Success",{amount:f,original_price:h,pricing_variant:`pricing_${f}`,urgency_variant:C,course_name:"3-Day Hairstyle Masterclass",razorpay_order_id:Fe.razorpay_order_id,phone:t.phone,name:t.name}),Rt("Payment Success",{amount:f,original_price:h,pricing_variant:`pricing_${f}`,urgency_variant:C,course_name:"3-Day Hairstyle Masterclass",razorpay_order_id:Fe.razorpay_order_id,phone:t.phone,name:t.name}),Ni("Purchase",{value:f,currency:"INR",content_name:"3-Day Hairstyle Masterclass",original_price:h,pricing_variant:`pricing_${f}`,order_id:Fe.razorpay_order_id,phone:t.phone,name:t.name},{eventID:Ke}),i("success"),o(!0)},prefill:{name:t.name,email:t.email||"",contact:t.phone},theme:{color:"#17120e"},modal:{ondismiss:function(){Qe.event.push("Payment Dismissed",{amount:f,pricing_variant:`pricing_${f}`,urgency_variant:C,name:t.name,phone:t.phone}),Rt("Payment Dismissed",{amount:f,pricing_variant:`pricing_${f}`,urgency_variant:C,name:t.name,phone:t.phone}),ka("Payment Dismissed",{value:f,pricing_variant:`pricing_${f}`,name:t.name,phone:t.phone}),i("failed"),p(!1)}}};new window.Razorpay(hn).open(),p(!1)}catch(ue){console.error("Payment error:",ue),alert("Failed to initiate payment. Please try again."),p(!1)}};if(l)return s.jsx(ox,{paymentData:t,profileData:l,courseAmount:f});if(a)return s.jsxs("div",{children:[s.jsx("div",{style:{minHeight:"100vh",background:"#f6f2ec",display:"flex",alignItems:"center",justifyContent:"center"},children:s.jsx("div",{style:{color:"#b8912a",fontFamily:"'Cormorant Garamond', Georgia, serif",fontSize:17,fontStyle:"italic",opacity:.6},children:"Payment confirmed ✓"})}),s.jsx(ax,{paymentData:t,courseAmount:f,razorpayOrderId:b,onComplete:ue=>c(ue)})]});if(r==="failed")return s.jsx("div",{style:{minHeight:"100vh",background:"#f6f2ec",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"'DM Sans', system-ui, sans-serif"},children:s.jsxs("div",{style:{maxWidth:380,width:"100%",background:"#fffefb",borderRadius:16,padding:"44px 32px",textAlign:"center",border:"1px solid #e2dbd0",boxShadow:"0 12px 40px rgba(23,18,14,0.12)"},children:[s.jsx("div",{style:{width:68,height:68,background:"#fef2f2",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",border:"1px solid #fecaca"},children:s.jsx(tv,{size:36,style:{color:"#c0392b"}})}),s.jsx("h2",{style:{fontFamily:"'Cormorant Garamond', Georgia, serif",fontSize:28,fontWeight:300,letterSpacing:"0.02em",marginBottom:8,color:"#17120e"},children:"Payment Failed"}),s.jsx("p",{style:{fontSize:13,color:"#7a6d64",marginBottom:28,lineHeight:1.6,fontWeight:300},children:"Your payment could not be processed. Please try again."}),s.jsx("a",{href:"/",style:{width:"100%",padding:"14px 20px",background:"linear-gradient(135deg, #1f1710 0%, #3a2f27 50%, #2a1f16 100%)",color:"#d4aa4e",border:"none",borderRadius:8,fontSize:14,fontWeight:600,fontFamily:"'DM Sans', system-ui, sans-serif",letterSpacing:"0.04em",cursor:"pointer"},children:"Try Again"})]})});const Yn=St;return s.jsxs("div",{className:"pp-page",children:[s.jsxs("div",{className:"pp-topbar",children:[s.jsxs("a",{className:"pp-back-btn",href:"/",children:[s.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("polyline",{points:"15 18 9 12 15 6"})}),"Back"]}),s.jsxs("div",{className:"pp-brand-logo",children:["Shweta Celeb",s.jsx("br",{}),"Makeover"]})]}),s.jsxs("div",{className:"pp-content",children:[s.jsx("div",{className:"pp-page-title",children:"Payment details"}),s.jsx("div",{className:"pp-page-subtitle",children:"Complete your purchase by providing your details below."}),s.jsxs("div",{className:"pp-card",children:[s.jsx("div",{className:"pp-field-divider"}),s.jsx("div",{className:"pp-field-divider"}),s.jsxs("div",{className:"pp-input-row","data-clarity-unmask":"true",ref:I,children:[s.jsxs("div",{className:"pp-phone-flag-block",children:[s.jsx("span",{style:{fontSize:18,lineHeight:1},children:"🇮🇳"}),s.jsx("span",{className:"pp-phone-code","data-clarity-unmask":"true",children:"+91"}),s.jsx("span",{className:"pp-phone-chevron","data-clarity-unmask":"true",children:"▾"})]}),s.jsx("div",{className:"pp-phone-divider","data-clarity-unmask":"true"}),s.jsx("input",{className:"pp-bare-input",type:"tel",name:"phone",value:t.phone,onChange:nt,placeholder:"Phone number","data-clarity-unmask":"true"})]}),T&&s.jsx("div",{className:"pp-phone-error",children:"Please enter your number to proceed"})]}),s.jsxs("div",{className:"pp-card",children:[s.jsx("div",{className:"pp-service-section",children:s.jsxs("div",{className:"pp-service-line",children:[s.jsx("span",{className:"pp-service-name",children:"3-Day Hairstyle Masterclass"}),s.jsxs("div",{className:"pp-service-prices",children:[s.jsxs("span",{className:"pp-disc-price","data-clarity-unmask":"true",children:["₹",f.toFixed(2)]}),S&&s.jsx("span",{className:"pp-orig-price","data-clarity-unmask":"true",children:"₹499.00"})]})]})}),s.jsx("div",{className:"pp-amount-divider"}),s.jsxs("div",{className:"pp-total-line",children:[s.jsx("span",{className:"pp-total-label",children:"Amount to be paid"}),S?s.jsxs("span",{className:"pp-total-values",children:[s.jsxs("span",{className:"pp-total-value","data-clarity-unmask":"true",children:["₹",f.toFixed(2)]}),s.jsx("span",{className:"pp-total-orig","data-clarity-unmask":"true",children:"₹499.00"})]}):s.jsxs("span",{className:"pp-total-value","data-clarity-unmask":"true",children:["₹",f.toFixed(2)]})]})]})]}),s.jsx("div",{className:"pp-sticky-bar",children:s.jsx("button",{type:"button",className:`pp-proceed-btn${u||!Yn?" is-disabled":""}`,onClick:Te,disabled:u,"data-clarity-unmask":"true",children:u?s.jsxs(s.Fragment,{children:[s.jsx(rp,{size:17,className:"pp-spin"})," Processing…"]}):s.jsxs(s.Fragment,{children:["Proceed to pay ",s.jsxs("strong",{"data-clarity-unmask":"true",children:["₹",f,".00"]})]})})})]})}const ux=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');


  body{
    padding-bottom: 0px;
  }

  .lp-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #e8e0d8;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .lp-login-btn {
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-login-btn:hover { background: #d94040; }

  .lp-hero {
    position: relative;
    padding: 50px 40px 0;
    overflow: hidden;
  }

  .lp-hero-watermark {
    font-family: 'arial ', serif;
    font-size: clamp(70px, 12vw, 150px);
    font-weight: 300;
    color: rgba(255,255,255,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    margin: 0;
    padding-bottom: 40px;
  }

  .lp-content {
    padding: 10px 40px 80px;
    max-width: 900px;
  }

  .lp-intro {
    font-size: 0.84rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.78);
    font-weight: 300;
    margin: 0 0 40px;
  }

  .lp-section { margin-bottom: 44px; }

  .lp-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .lp-section-body {
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.72);
    font-weight: 300;
    margin: 0;
    white-space: pre-line;
  }

  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 44px 0;
  }

  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 28px 40px;
    font-size: 0.72rem;
    color: rgba(232,224,216,0.35);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .lp-footer a { color: rgba(232,224,216,0.5); text-decoration: none; }
  .lp-footer a:hover { color: #fff; }

  .lp-cta-block {
    margin-top: 48px;
    padding: 32px 28px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
  }

  .lp-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 10px;
  }

  .lp-cta-body {
    font-size: 0.82rem;
    line-height: 1.8;
    color: rgba(232,224,216,0.6);
    font-weight: 300;
    margin: 0 0 20px;
  }

  .lp-cta-btn {
    display: inline-block;
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 28px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-cta-btn:hover { background: #d94040; }

  @media (max-width: 600px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
  }
`;function dx(){return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:ux}),s.jsxs("div",{className:"lp-page",children:[s.jsxs("nav",{className:"lp-nav",children:[s.jsxs("a",{href:"/",className:"lp-logo",children:["Shweta Celeb",s.jsx("br",{})," Makeover"]}),s.jsx("a",{href:"/",className:"lp-login-btn",children:"Go Back"})]}),s.jsx("div",{className:"lp-hero",children:s.jsx("p",{className:"lp-hero-watermark",children:"Refund Policy"})}),s.jsxs("div",{className:"lp-content",children:[s.jsx("p",{className:"lp-intro",children:"With this course we are committed to delivering top-quality content and an exceptional learning experience. Before enrolling, we encourage you to carefully review the course details, as all sales are final and we maintain a strict no-refund policy."}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"No Refund Policy"}),s.jsx("p",{className:"lp-section-body",children:"All sales are final. Once a purchase has been made, we do not offer refunds, exchanges, or cancellations under any circumstances. Before enrolling, we strongly encourage you to thoroughly review all course details, module descriptions, and sample content to ensure the course is right for you."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Our Quality Promise"}),s.jsx("p",{className:"lp-section-body",children:"We are confident that our online makeup course will meet and exceed your expectations. Every lesson has been crafted with care and expertise, designed to deliver real, practical skills. We stand behind the quality of our content and look forward to helping you achieve your beauty goals."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Need Help or Have Questions?"}),s.jsx("p",{className:"lp-section-body",children:"If you have any questions or concerns about the course before enrolling, our customer support team is here to assist. Feel free to reach out and we'll be happy to provide detailed information to help you make an informed decision."})]}),s.jsxs("div",{className:"lp-cta-block",children:[s.jsx("p",{className:"lp-cta-title",children:"Speak to our support team"}),s.jsx("p",{className:"lp-cta-body",children:"Available to answer all your questions before you enroll. We want you to feel fully confident in your decision."}),s.jsx("a",{href:"https://wa.me/917039240054",className:"lp-cta-btn",children:"WhatsApp +91 7039240054"})]})]}),s.jsxs("div",{className:"lp-footer",children:["© 2026 Shweta Kapoor  ·  ",s.jsx("a",{href:"/privacy",children:"Privacy Policy"}),"  ·  ",s.jsx("a",{href:"/terms",children:"Terms of Use"}),"  ·  ",s.jsx("a",{href:"/refund",children:"Refund Policy"}),"  ·  ",s.jsx("a",{href:"/contact",children:"Contact"})]})]})]})}const fx=`

  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');

  
  body{
    padding-bottom: 0px;
  }
  .lp-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #e8e0d8;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .lp-login-btn {
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-login-btn:hover { background: #d94040; }

  .lp-hero {
    position: relative;
    padding: 50px 40px 0;
    overflow: hidden;
  }

  .lp-hero-watermark {
    font-family: 'arial', serif;
    font-size: clamp(70px, 12vw, 150px);
    font-weight: 300;
    color: rgba(255,255,255,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    margin: 0;
    padding-bottom: 40px;
  }

  .lp-content {
    padding: 10px 40px 80px;
    max-width: 900px;
  }

  .lp-intro {
    font-size: 0.84rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.78);
    font-weight: 300;
    margin: 0 0 16px;
  }

  .lp-section { margin-bottom: 44px; }

  .lp-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .lp-section-body {
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.72);
    font-weight: 300;
    margin: 0;
    white-space: pre-line;
  }

  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 44px 0;
  }

  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 28px 40px;
    font-size: 0.72rem;
    color: rgba(232,224,216,0.35);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .lp-footer a { color: rgba(232,224,216,0.5); text-decoration: none; }
  .lp-footer a:hover { color: #fff; }

  @media (max-width: 600px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
  }
`;function px(){return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:fx}),s.jsxs("div",{className:"lp-page",children:[s.jsxs("nav",{className:"lp-nav",children:[s.jsxs("a",{href:"/",className:"lp-logo",children:["Shweta Celeb",s.jsx("br",{})," Makeover"]}),s.jsx("a",{href:"/",className:"lp-login-btn",children:"Go Back"})]}),s.jsx("div",{className:"lp-hero",children:s.jsx("p",{className:"lp-hero-watermark",children:"Privacy Policy"})}),s.jsxs("div",{className:"lp-content",children:[s.jsx("p",{className:"lp-intro",children:"We know you care about how your personal information is used and shared, and we take your privacy seriously. We have therefore created this Privacy Policy in order to clearly communicate our commitment to your privacy. Please read the following to learn more about our Privacy Policy. By using or accessing the Site and the services provided by us in any manner, you acknowledge that you accept the practices and policies outlined in this Privacy Policy, and you hereby consent that we will collect, use, and share your information in the manner specified in this Privacy Policy."}),s.jsx("p",{className:"lp-intro",style:{marginBottom:"40px"},children:"Remember that your use of the Site is at all times subject to the Terms of Use which incorporates this Privacy Policy. Any terms we use in this Policy without defining them have the definitions given to them in the Terms. The general provisions as outlined in the Terms shall be applicable to this Privacy Policy as well."}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"How We Collect Personal and Other Information"}),s.jsx("p",{className:"lp-section-body",children:`When you visit the Site, you can browse without submitting any personal information about yourself. We will, however, receive and store some non-personally identifiable information about your visit.

When you register or create an account, we collect information you provide voluntarily, including:

• Name (first, middle, last names)
• Profile Name & Username
• Email address
• Gender
• Mobile Number
• Password

When you access or use our Site, we also automatically collect data about the pages you access, your IP address, device type, geo-location (with consent), connection information, page view statistics, referral URLs, ad data, and standard web log data.`})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Cookies & Tracking Technologies"}),s.jsx("p",{className:"lp-section-body",children:"The Site uses persistent and session cookies and other similar technologies to offer you a personalized experience and to remember your browsing preferences, including your log-in details and choice of language. Cookies are stored primarily to ensure that when you return to the Site, it personalizes your browsing experience. You can disable cookies through your browser settings, though this may impact many of the Site's features. We and our third-party advertising partners may also use technologies such as web beacons to better manage and analyse content."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"How We Use Your Information"}),s.jsx("p",{className:"lp-section-body",children:`Our primary purpose in collecting personal information is to provide you with a secure, smooth, efficient, and customized experience. We may use your information to:

• Verify your identity and enable access to our services
• Send transactional communications and respond to your queries
• Contact you via voice call, text, or email as authorized
• Advertise, promote, or market our products and services
• Comply with applicable laws and legal processes
• Detect, prevent or remedy any breach of our Terms
• Perform research and operational analysis
• Track user activity and behaviour patterns on the Site
• Protect the public interest or for official purposes if formally requested by any governmental authority`})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"How We Share Your Information"}),s.jsx("p",{className:"lp-section-body",children:"We share information with our officers, employees, consultants, agents and third-party service providers who help us host and maintain the Site, and provide application development, storage, analytics, and marketing services. We do not permit third-party service providers to use your personal information for their own marketing purposes. We may also share your information to comply with applicable law, respond to legal processes, or to protect the rights, property or safety of us, our users, and the public."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"User Content"}),s.jsx("p",{className:"lp-section-body",children:"If you submit content to any interactive portion of the Site, your content may be made publicly available to anyone who visits that area of the Site. Other users or the general public may access or use content that you make publicly available. Even if you remove or delete your content, copies may remain in cached or archived areas of the Site."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Data Security & Retention"}),s.jsx("p",{className:"lp-section-body",children:"Keeping your information secure is of great concern to us. Your personal information is maintained in electronic form with restricted access and appropriate security measures in place. We retain your personal information only for as long as necessary to fulfil the purposes we collected it for, including satisfying any legal, accounting, or reporting requirements. We may delete your information at any time without prior notice."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Children's Privacy"}),s.jsx("p",{className:"lp-section-body",children:"Our primary audience is adults and young adults. We do not knowingly collect personal information from children under the age of 10. Children under 10 are prohibited from using the Site without parent/guardian supervision. If you are under 18, it is mandatory that your parent or guardian has read and accepted this Privacy Policy on your behalf. If we learn we have collected information from a child under the age of 13, we will remove that information immediately."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Third Party Websites"}),s.jsx("p",{className:"lp-section-body",children:"The Site may contain links to third-party websites. We are not responsible for the content or privacy practices of other websites or services linked on our Site. We do not endorse or make any representations about third-party websites. The information you choose to provide to or that is collected by these third parties is not covered by our Privacy Policy. We strongly encourage you to read such third parties' privacy policies."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Changes to Privacy Policy"}),s.jsx("p",{className:"lp-section-body",children:"We reserve the right to update this Privacy Policy at any time, with or without advance notice. In the event there are significant changes in the way we treat user's personal information, we will display a notice on the Site or send users an email. Your continued access to the Site following the posting of changes to this Privacy Policy will mean you consent to and accept those changes."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Contact & Grievance Officer"}),s.jsx("p",{className:"lp-section-body",children:`Should you have questions about this Privacy Policy or our information practices, please contact our grievance officer:

Name: Shweta Kapoor
WhatsApp: +91 7039240054`})]})]}),s.jsxs("div",{className:"lp-footer",children:["© 2026 Shweta Kapoor  ·  ",s.jsx("a",{href:"/privacy",children:"Privacy Policy"}),"  ·  ",s.jsx("a",{href:"/terms",children:"Terms of Use"}),"  ·  ",s.jsx("a",{href:"/refund",children:"Refund Policy"}),"  ·  ",s.jsx("a",{href:"/contact",children:"Contact"})]})]})]})}const hx=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');


  body{
    padding-bottom: 0px;
  }

  .lp-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #e8e0d8;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .lp-login-btn {
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-login-btn:hover { background: #d94040; }

  .lp-hero {
    position: relative;
    padding: 50px 40px 0;
    overflow: hidden;
  }

  .lp-hero-watermark {
    font-family: 'arial', serif;
    font-size: clamp(70px, 12vw, 150px);
    font-weight: 300;
    color: rgba(255,255,255,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    margin: 0;
    padding-bottom: 40px;
  }

  .lp-content {
    padding: 10px 40px 80px;
    max-width: 900px;
  }

  .lp-intro {
    font-size: 0.84rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.78);
    font-weight: 300;
    margin: 0 0 40px;
  }

  .lp-section { margin-bottom: 44px; }

  .lp-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .lp-section-body {
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.72);
    font-weight: 300;
    margin: 0;
    white-space: pre-line;
  }

  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 44px 0;
  }

  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 28px 40px;
    font-size: 0.72rem;
    color: rgba(232,224,216,0.35);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .lp-footer a { color: rgba(232,224,216,0.5); text-decoration: none; }
  .lp-footer a:hover { color: #fff; }

  @media (max-width: 600px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
  }
`;function mx(){return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:hx}),s.jsxs("div",{className:"lp-page",children:[s.jsxs("nav",{className:"lp-nav",children:[s.jsxs("a",{href:"/",className:"lp-logo",children:["Shweta Celeb ",s.jsx("br",{})," Makeover"]}),s.jsx("a",{href:"/",className:"lp-login-btn",children:"Go Back"})]}),s.jsx("div",{className:"lp-hero",children:s.jsx("p",{className:"lp-hero-watermark",children:"Terms of Use"})}),s.jsxs("div",{className:"lp-content",children:[s.jsx("p",{className:"lp-intro",children:'Shweta Kapoor welcomes you to shwetamakeover.online ("Site"). The Site is owned, controlled and operated by Shweta Kapoor as its proprietor ("Firm", "us", "we", "our"). These Terms of Use ("Terms") govern your access to and use of the Site. By visiting, browsing, accessing, or using the Site, you unconditionally accept and agree to be legally bound by these Terms. If you do not agree, do not access or use the Site.'}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Age & Eligibility"}),s.jsx("p",{className:"lp-section-body",children:"The Site is intended for adults or people who have attained the age of majority. The Site is strictly prohibited to persons under the age of 10. Use of the Site is available only to persons who can enter into legally binding contracts under applicable law. If you are under 18 years of age, your parent or legal guardian must agree to these Terms on your behalf."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Amendments to Terms"}),s.jsx("p",{className:"lp-section-body",children:"We reserve the right, at any time, to amend, modify, revise, update, suspend, or otherwise change these Terms without prior notice. All amendments take effect immediately when posted on the Site. By continuing to access or browse the Site after any amendments, you agree to be bound by the updated Terms. We encourage you to review these Terms whenever you access the Site."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"The Website"}),s.jsx("p",{className:"lp-section-body",children:"The Site is designed for informational purposes only and is not intended to provide professional advice of any nature. Content is intended solely for your personal, non-commercial use. We do not provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information on the Site. Your use of any content is entirely at your own risk."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Payments & Refunds"}),s.jsx("p",{className:"lp-section-body",children:"Except where otherwise provided, access to and use of the Site is without charge. We reserve the right to charge fees for access to services on the Site. If you purchase a paid service, payments may be processed by a third-party payment gateway. Please note — any amounts paid to us are not refundable. Please review our Refund Policy before making any purchase."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Accounts & Security"}),s.jsx("p",{className:"lp-section-body",children:"If you register for an account, you must provide current, complete and accurate information. It is your responsibility to maintain the confidentiality of your password and account. You are entirely responsible for any and all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We are not liable for any loss resulting from unauthorized use of your password or account."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Intellectual Property"}),s.jsx("p",{className:"lp-section-body",children:"The Site and all its content — including copyrighted works, text, graphics, logos, images, audio/video clips, data compilations and software — are owned by us or used with consent of the owner, and are protected by applicable laws. Reproduction and use of any Site content is prohibited unless specific written permission is provided by us. All rights in the Site and its content are reserved."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Limited License"}),s.jsx("p",{className:"lp-section-body",children:"Subject to these Terms, we grant you a non-exclusive, revocable, non-sublicensable, non-transferable, and limited license to access the Site solely for your personal and non-commercial use. You shall not copy, adapt, modify, decompile, distribute, or use the Site to provide services to third parties. Any unauthorized use strictly violates these Terms."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"User Content"}),s.jsx("p",{className:"lp-section-body",children:'All content created, uploaded, submitted or posted on the Site by users ("User Content") is the sole responsibility of the user who created it. You represent that all User Content is accurate, complete, and in compliance with all applicable laws. By submitting User Content, you grant us a worldwide, non-exclusive, perpetual, royalty-free license to use, reproduce, distribute, display and otherwise exploit such content in connection with the Site and our services.'})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"User Code of Conduct"}),s.jsx("p",{className:"lp-section-body",children:"As a condition of use, you agree not to use the Site for any unlawful, threatening, abusive, defamatory, fraudulent, or otherwise inappropriate purpose. You shall not interfere with or disrupt the Site, attempt to gain unauthorized access, run spam or auto-responders, or use automated tools to crawl the Site. You shall abide by all applicable laws with respect to use of the Site."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Disclaimer"}),s.jsx("p",{className:"lp-section-body",children:'The Site and all content are provided on an "as is" and "as available" basis, without warranty of any kind, express or implied. We make no warranty that the Site will meet your requirements or be uninterrupted, timely, secure, or error-free. We specifically disclaim all liability for any actions resulting from your use of the Site.'})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Limitation of Liability"}),s.jsx("p",{className:"lp-section-body",children:"In no event shall we, our affiliates, licensors and partners be liable for any lost profits, loss of data, business interruption, or special, indirect, incidental, punitive or consequential damages of any kind. Our total liability shall not exceed ₹1,000 (Rupees One Thousand only) or the fees paid to us for usage of the Site, whichever is lower."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Governing Law & Disputes"}),s.jsx("p",{className:"lp-section-body",children:"These Terms are governed by the laws of India, without regard to conflict of law principles. The courts at India shall have exclusive jurisdiction for all matters arising out of or in connection with these Terms. Any disputes shall first be attempted to be resolved amicably, failing which they shall be settled by arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be India, and the language shall be English."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Termination"}),s.jsx("p",{className:"lp-section-body",children:"You may stop using the Site at any time. We may, at any time, terminate your right to access and use the Site if you breach any provision of these Terms or if required to do so by applicable law. Upon termination, all licenses and rights provided by us shall cease immediately. Any and all rights granted to the user will immediately be terminated, and the user shall promptly discontinue all use of the Site."})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"lp-section",children:[s.jsx("h2",{className:"lp-section-title",children:"Contact Us"}),s.jsx("p",{className:"lp-section-body",children:`Shweta Kapoor
            WhatsApp Number: +91 7039240054

Effective Date: March 2026
Copyright 2026: Shweta Kapoor. All rights reserved.`})]})]}),s.jsxs("div",{className:"lp-footer",children:["© 2026 Shweta Kapoor  ·  ",s.jsx("a",{href:"/privacy",children:"Privacy Policy"}),"  ·  ",s.jsx("a",{href:"/terms",children:"Terms of Use"}),"  ·  ",s.jsx("a",{href:"/refund",children:"Refund Policy"}),"  ·  ",s.jsx("a",{href:"/contact",children:"Contact"})]})]})]})}const gx=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');

  body {
    padding-bottom: 0px;
  }

  .lp-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #e8e0d8;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
  }

  .lp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    height: 70px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .lp-logo {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
  }

  .lp-login-btn {
    background: #e85454;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 10px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }

  .lp-login-btn:hover { background: #d94040; }

  .lp-hero {
    position: relative;
    padding: 50px 40px 0;
    overflow: hidden;
  }

  .lp-hero-watermark {
    font-family: 'arial', serif;
    font-size: clamp(70px, 12vw, 150px);
    font-weight: 300;
    color: rgba(255,255,255,0.045);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
    margin: 0;
    padding-bottom: 40px;
  }

  .lp-content {
    padding: 10px 40px 80px;
    max-width: 900px;
  }

  .lp-intro {
    font-size: 0.84rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.78);
    font-weight: 300;
    margin: 0 0 40px;
  }

  .lp-section { margin-bottom: 44px; }

  .lp-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 400;
    color: #fff;
    margin: 0 0 16px;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }

  .lp-section-body {
    font-size: 0.82rem;
    line-height: 1.9;
    color: rgba(232,224,216,0.72);
    font-weight: 300;
    margin: 0;
    white-space: pre-line;
  }

  .lp-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.08);
    margin: 44px 0;
  }

  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 28px 40px;
    font-size: 0.72rem;
    color: rgba(232,224,216,0.35);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  .lp-footer a { color: rgba(232,224,216,0.5); text-decoration: none; }
  .lp-footer a:hover { color: #fff; }

  /* ── Branch Cards ── */
  .contact-branches {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 44px;
  }

  .contact-branch-card {
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .contact-branch-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #e85454, transparent);
  }

  .contact-branch-card:hover {
    border-color: rgba(255,255,255,0.18);
  }

  .contact-branch-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #e85454;
    margin: 0 0 12px;
  }

  .contact-branch-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 20px;
    line-height: 1.2;
  }

  .contact-info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .contact-info-icon {
    font-size: 14px;
    margin-top: 2px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .contact-info-text {
    font-size: 0.8rem;
    line-height: 1.7;
    color: rgba(232,224,216,0.65);
    font-weight: 300;
  }

  .contact-info-text a {
    color: rgba(232,224,216,0.65);
    text-decoration: none;
    transition: color 0.2s;
  }

  .contact-info-text a:hover {
    color: #fff;
  }

  /* ── Direct contact block ── */
  .contact-direct {
    margin-top: 48px;
    padding: 32px 28px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
  }

  .contact-direct-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    margin: 0 0 10px;
  }

  .contact-direct-body {
    font-size: 0.82rem;
    line-height: 1.8;
    color: rgba(232,224,216,0.6);
    font-weight: 300;
    margin: 0 0 20px;
  }

  .contact-btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .contact-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #25D366;
    color: #fff;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .contact-wa-btn:hover {
    background: #1fb855;
    transform: translateY(-1px);
  }

  .contact-email-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: rgba(232,224,216,0.75);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 12px 24px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.15);
    text-decoration: none;
    transition: all 0.2s;
  }
  .contact-email-btn:hover {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
  }

  @media (max-width: 640px) {
    .lp-nav { padding: 0 20px; }
    .lp-hero { padding: 30px 20px 0; }
    .lp-content { padding: 10px 20px 60px; }
    .lp-footer { padding: 24px 20px; }
    .lp-hero-watermark { font-size: clamp(52px, 14vw, 90px); }
    .contact-branches { grid-template-columns: 1fr; }
  }
`;function yx(){return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:gx}),s.jsxs("div",{className:"lp-page",children:[s.jsxs("nav",{className:"lp-nav",children:[s.jsxs("a",{href:"/",className:"lp-logo",children:["Shweta Celeb",s.jsx("br",{})," Makeover"]}),s.jsx("a",{href:"/",className:"lp-login-btn",children:"Go Back"})]}),s.jsx("div",{className:"lp-hero",children:s.jsx("p",{className:"lp-hero-watermark",children:"Contact Us"})}),s.jsxs("div",{className:"lp-content",children:[s.jsx("p",{className:"lp-intro",children:"We'd love to hear from you. Reach out to either of our branches for course inquiries, enrollment support, or any general questions. Our team is available on WhatsApp for the fastest response."}),s.jsxs("div",{className:"contact-branches",children:[s.jsxs("div",{className:"contact-branch-card",children:[s.jsx("p",{className:"contact-branch-label",children:"Branch 01"}),s.jsx("h2",{className:"contact-branch-name",children:"Hubli"}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"📍"}),s.jsxs("p",{className:"contact-info-text",children:["303 Nilgiri Garden,",s.jsx("br",{}),"New Badami Nagar,",s.jsx("br",{}),"Hubli, Karnataka – 580023"]})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"📞"}),s.jsxs("p",{className:"contact-info-text",children:[s.jsx("a",{href:"tel:+917676363793",children:"+91 76763 63793"}),s.jsx("br",{}),s.jsx("a",{href:"tel:+919066394478",children:"+91 90663 94478"})]})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"👤"}),s.jsx("p",{className:"contact-info-text",children:"Vishal Katwe"})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"✉️"}),s.jsx("p",{className:"contact-info-text",children:s.jsx("a",{href:"mailto:vishal@shwetamakeover.in",children:"vishal@shwetamakeover.in"})})]})]}),s.jsxs("div",{className:"contact-branch-card",children:[s.jsx("p",{className:"contact-branch-label",children:"Branch 02"}),s.jsx("h2",{className:"contact-branch-name",children:"Mumbai"}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"📍"}),s.jsxs("p",{className:"contact-info-text",children:["Shop 7, Shree Complex,",s.jsx("br",{}),"Linking Road, Bandra West,",s.jsx("br",{}),"Mumbai, Maharashtra – 400050"]})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"📞"}),s.jsxs("p",{className:"contact-info-text",children:[s.jsx("a",{href:"tel:+917676363793",children:"+91 76763 63793"}),s.jsx("br",{}),s.jsx("a",{href:"tel:+919066394478",children:"+91 90663 94478"})]})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"👤"}),s.jsx("p",{className:"contact-info-text",children:"Vishal Katwe"})]}),s.jsxs("div",{className:"contact-info-row",children:[s.jsx("span",{className:"contact-info-icon",children:"✉️"}),s.jsx("p",{className:"contact-info-text",children:s.jsx("a",{href:"mailto:vishal@shwetamakeover.in",children:"vishal@shwetamakeover.in"})})]})]})]}),s.jsx("hr",{className:"lp-divider"}),s.jsxs("div",{className:"contact-direct",children:[s.jsx("p",{className:"contact-direct-title",children:"Prefer to chat directly?"}),s.jsx("p",{className:"contact-direct-body",children:"WhatsApp is the quickest way to reach us. For enrollment queries, payment issues, or course-related questions — we typically respond within a few hours."}),s.jsxs("div",{className:"contact-btn-row",children:[s.jsxs("a",{href:"https://wa.me/917676363793",className:"contact-wa-btn",target:"_blank",rel:"noopener noreferrer",children:[s.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"currentColor",children:s.jsx("path",{d:"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"})}),"WhatsApp Us"]}),s.jsx("a",{href:"mailto:vishal@shwetamakeover.in",className:"contact-email-btn",children:"✉ Email Us"})]})]})]}),s.jsxs("div",{className:"lp-footer",children:["© 2026 Shweta Kapoor  · ",s.jsx("a",{href:"/privacy",children:"Privacy Policy"}),"  · ",s.jsx("a",{href:"/terms",children:"Terms of Use"}),"  · ",s.jsx("a",{href:"/refund",children:"Refund Policy"}),"  · ",s.jsx("a",{href:"/contact",children:"Contact"})]})]})]})}function vx(){const{coursePrice:e,urgencyVariant:t}=xt(),n=y.useRef(!1),r=y.useRef(new Set);return y.useEffect(()=>{n.current||(n.current=!0,Qe.event.push("homepage_shown",{pricing_variant:`pricing_${e}`,urgency_variant:t}),Rt("homepage_shown",{pricing_variant:`pricing_${e}`,urgency_variant:t}),Ni("PageView",{pricing_variant:`pricing_${e}`}))},[e]),y.useEffect(()=>{const i=new IntersectionObserver(p=>{p.forEach(d=>{d.isIntersecting&&(d.target.classList.add("visible"),i.unobserve(d.target))})},{threshold:.08}),a=()=>{document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach(p=>i.observe(p))};a();const o=setTimeout(a,300),l=r.current,c=new IntersectionObserver(p=>{p.forEach(d=>{const m=d.target.getAttribute("data-section");d.isIntersecting&&m&&!l.has(m)&&(l.add(m),Qe.event.push("homepage_scroll",{section:m,urgency_variant:t}),Rt("homepage_scroll",{section:m,urgency_variant:t}),ka("homepage_scroll",{section:m}),c.unobserve(d.target))})},{threshold:.1});document.querySelectorAll("[data-section]").forEach(p=>c.observe(p));const u=setTimeout(()=>{document.querySelectorAll("[data-section]").forEach(p=>{l.has(p.getAttribute("data-section"))||c.observe(p)})},300);return()=>{i.disconnect(),c.disconnect(),clearTimeout(o),clearTimeout(u)}},[]),s.jsxs(s.Fragment,{children:[s.jsx(F1,{}),s.jsx(z1,{}),s.jsx(U1,{}),s.jsx(Y1,{}),s.jsx(W1,{}),s.jsx(V1,{}),s.jsx(K1,{}),s.jsx(J1,{}),s.jsx(tx,{}),s.jsx(rx,{})]})}function wx(){const{ready:e}=xt();return e?s.jsxs(hy,{children:[s.jsx(Qt,{path:"/",element:s.jsx(vx,{})}),s.jsx(Qt,{path:"/payment",element:s.jsx(cx,{})}),s.jsx(Qt,{path:"/refund",element:s.jsx(dx,{})}),s.jsx(Qt,{path:"/terms",element:s.jsx(mx,{})}),s.jsx(Qt,{path:"/privacy",element:s.jsx(px,{})}),s.jsx(Qt,{path:"/contact",element:s.jsx(yx,{})})]}):s.jsxs("div",{style:{minHeight:"100vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#f6f2ec"},children:[s.jsx(rp,{size:32,style:{color:"#b8912a",animation:"spin 1s linear infinite"}}),s.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]})}function xx(){return s.jsxs(Oy,{children:[s.jsx(Sx,{}),s.jsx(D1,{children:s.jsx(wx,{})})]})}function Sx(){const{pathname:e}=yt();return y.useEffect(()=>{window.scrollTo(0,0)},[e]),null}mo.createRoot(document.getElementById("root")).render(s.jsx(ah.StrictMode,{children:s.jsx(xx,{})}));
