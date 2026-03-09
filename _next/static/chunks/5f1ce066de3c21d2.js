(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,27225,e=>{"use strict";let t;var i=e.i(71645),n=e.i(8155);let o=e=>{let t=(0,n.createStore)(e),o=e=>(function(e,t=e=>e){let n=i.default.useSyncExternalStore(e.subscribe,i.default.useCallback(()=>t(e.getState()),[e,t]),i.default.useCallback(()=>t(e.getInitialState()),[e,t]));return i.default.useDebugValue(n),n})(t,e);return Object.assign(o,t),o},r=(t=e=>({intention:"",setIntention:t=>e({intention:t}),selectedChapter:null,setSelectedChapter:t=>e({selectedChapter:t}),isFocusMode:!1,setFocusMode:t=>e({isFocusMode:t})}))?o(t):o;e.s(["useAppStore",0,r],27225)},67634,e=>{"use strict";let t,i,n,o;var r=e.i(43476),a=e.i(71645),s=e.i(75056),l=e.i(71753),c=e.i(31067),u=e.i(15080),d=e.i(90072),h=Object.defineProperty;class f{constructor(){((e,t,i)=>{let n,o;o=void 0,(n="symbol"!=typeof t?t+"":t)in e?h(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o})(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let i=this._listeners;void 0===i[e]&&(i[e]=[]),-1===i[e].indexOf(t)&&i[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let i=this._listeners;return void 0!==i[e]&&-1!==i[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let i=this._listeners[e];if(void 0!==i){let e=i.indexOf(t);-1!==e&&i.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let i=t.slice(0);for(let t=0,n=i.length;t<n;t++)i[t].call(this,e);e.target=null}}}var p=Object.defineProperty,m=(e,t,i)=>{let n;return(n="symbol"!=typeof t?t+"":t)in e?p(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i,i};let y=new d.Ray,g=new d.Plane,v=Math.cos(Math.PI/180*70),b=(e,t)=>(e%t+t)%t;class w extends f{constructor(e,t){super(),m(this,"object"),m(this,"domElement"),m(this,"enabled",!0),m(this,"target",new d.Vector3),m(this,"minDistance",0),m(this,"maxDistance",1/0),m(this,"minZoom",0),m(this,"maxZoom",1/0),m(this,"minPolarAngle",0),m(this,"maxPolarAngle",Math.PI),m(this,"minAzimuthAngle",-1/0),m(this,"maxAzimuthAngle",1/0),m(this,"enableDamping",!1),m(this,"dampingFactor",.05),m(this,"enableZoom",!0),m(this,"zoomSpeed",1),m(this,"enableRotate",!0),m(this,"rotateSpeed",1),m(this,"enablePan",!0),m(this,"panSpeed",1),m(this,"screenSpacePanning",!0),m(this,"keyPanSpeed",7),m(this,"zoomToCursor",!1),m(this,"autoRotate",!1),m(this,"autoRotateSpeed",2),m(this,"reverseOrbit",!1),m(this,"reverseHorizontalOrbit",!1),m(this,"reverseVerticalOrbit",!1),m(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),m(this,"mouseButtons",{LEFT:d.MOUSE.ROTATE,MIDDLE:d.MOUSE.DOLLY,RIGHT:d.MOUSE.PAN}),m(this,"touches",{ONE:d.TOUCH.ROTATE,TWO:d.TOUCH.DOLLY_PAN}),m(this,"target0"),m(this,"position0"),m(this,"zoom0"),m(this,"_domElementKeyEvents",null),m(this,"getPolarAngle"),m(this,"getAzimuthalAngle"),m(this,"setPolarAngle"),m(this,"setAzimuthalAngle"),m(this,"getDistance"),m(this,"getZoomScale"),m(this,"listenToKeyEvents"),m(this,"stopListenToKeyEvents"),m(this,"saveState"),m(this,"reset"),m(this,"update"),m(this,"connect"),m(this,"dispose"),m(this,"dollyIn"),m(this,"dollyOut"),m(this,"getScale"),m(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>c.phi,this.getAzimuthalAngle=()=>c.theta,this.setPolarAngle=e=>{let t=b(e,2*Math.PI),n=c.phi;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-n);2*Math.PI-o<o&&(t<n?t+=2*Math.PI:n+=2*Math.PI),u.phi=t-n,i.update()},this.setAzimuthalAngle=e=>{let t=b(e,2*Math.PI),n=c.theta;n<0&&(n+=2*Math.PI),t<0&&(t+=2*Math.PI);let o=Math.abs(t-n);2*Math.PI-o<o&&(t<n?t+=2*Math.PI:n+=2*Math.PI),u.theta=t-n,i.update()},this.getDistance=()=>i.object.position.distanceTo(i.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=()=>{i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(n),i.update(),s=a.NONE},this.update=(()=>{let t=new d.Vector3,o=new d.Vector3(0,1,0),r=new d.Quaternion().setFromUnitVectors(e.up,o),p=r.clone().invert(),m=new d.Vector3,b=new d.Quaternion,w=2*Math.PI;return function(){let x=i.object.position;r.setFromUnitVectors(e.up,o),p.copy(r).invert(),t.copy(x).sub(i.target),t.applyQuaternion(r),c.setFromVector3(t),i.autoRotate&&s===a.NONE&&D(2*Math.PI/60/60*i.autoRotateSpeed),i.enableDamping?(c.theta+=u.theta*i.dampingFactor,c.phi+=u.phi*i.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let S=i.minAzimuthAngle,E=i.maxAzimuthAngle;isFinite(S)&&isFinite(E)&&(S<-Math.PI?S+=w:S>Math.PI&&(S-=w),E<-Math.PI?E+=w:E>Math.PI&&(E-=w),S<=E?c.theta=Math.max(S,Math.min(E,c.theta)):c.theta=c.theta>(S+E)/2?Math.max(S,c.theta):Math.min(E,c.theta)),c.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,c.phi)),c.makeSafe(),!0===i.enableDamping?i.target.addScaledVector(f,i.dampingFactor):i.target.add(f),i.zoomToCursor&&I||i.object.isOrthographicCamera?c.radius=F(c.radius):c.radius=F(c.radius*h),t.setFromSpherical(c),t.applyQuaternion(p),x.copy(i.target).add(t),i.object.matrixAutoUpdate||i.object.updateMatrix(),i.object.lookAt(i.target),!0===i.enableDamping?(u.theta*=1-i.dampingFactor,u.phi*=1-i.dampingFactor,f.multiplyScalar(1-i.dampingFactor)):(u.set(0,0,0),f.set(0,0,0));let P=!1;if(i.zoomToCursor&&I){let n=null;if(i.object instanceof d.PerspectiveCamera&&i.object.isPerspectiveCamera){let e=t.length();n=F(e*h);let o=e-n;i.object.position.addScaledVector(O,o),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){let e=new d.Vector3(j.x,j.y,0);e.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/h)),i.object.updateProjectionMatrix(),P=!0;let o=new d.Vector3(j.x,j.y,0);o.unproject(i.object),i.object.position.sub(o).add(e),i.object.updateMatrixWorld(),n=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;null!==n&&(i.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(n).add(i.object.position):(y.origin.copy(i.object.position),y.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(y.direction))<v?e.lookAt(i.target):(g.setFromNormalAndCoplanarPoint(i.object.up,i.target),y.intersectPlane(g,i.target))))}else i.object instanceof d.OrthographicCamera&&i.object.isOrthographicCamera&&(P=1!==h)&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/h)),i.object.updateProjectionMatrix());return h=1,I=!1,!!(P||m.distanceToSquared(i.object.position)>l||8*(1-b.dot(i.object.quaternion))>l)&&(i.dispatchEvent(n),m.copy(i.object.position),b.copy(i.object.quaternion),P=!1,!0)}})(),this.connect=e=>{i.domElement=e,i.domElement.style.touchAction="none",i.domElement.addEventListener("contextmenu",et),i.domElement.addEventListener("pointerdown",$),i.domElement.addEventListener("pointercancel",Q),i.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,n,o,r,a;i.domElement&&(i.domElement.style.touchAction="auto"),null==(e=i.domElement)||e.removeEventListener("contextmenu",et),null==(t=i.domElement)||t.removeEventListener("pointerdown",$),null==(n=i.domElement)||n.removeEventListener("pointercancel",Q),null==(o=i.domElement)||o.removeEventListener("wheel",J),null==(r=i.domElement)||r.ownerDocument.removeEventListener("pointermove",K),null==(a=i.domElement)||a.ownerDocument.removeEventListener("pointerup",Q),null!==i._domElementKeyEvents&&i._domElementKeyEvents.removeEventListener("keydown",ee)};const i=this,n={type:"change"},o={type:"start"},r={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=a.NONE;const l=1e-6,c=new d.Spherical,u=new d.Spherical;let h=1;const f=new d.Vector3,p=new d.Vector2,w=new d.Vector2,x=new d.Vector2,S=new d.Vector2,E=new d.Vector2,P=new d.Vector2,A=new d.Vector2,M=new d.Vector2,T=new d.Vector2,O=new d.Vector3,j=new d.Vector2;let I=!1;const L=[],_={};function z(){return Math.pow(.95,i.zoomSpeed)}function D(e){i.reverseOrbit||i.reverseHorizontalOrbit?u.theta+=e:u.theta-=e}function C(e){i.reverseOrbit||i.reverseVerticalOrbit?u.phi+=e:u.phi-=e}const k=(()=>{let e=new d.Vector3;return function(t,i){e.setFromMatrixColumn(i,0),e.multiplyScalar(-t),f.add(e)}})(),N=(()=>{let e=new d.Vector3;return function(t,n){!0===i.screenSpacePanning?e.setFromMatrixColumn(n,1):(e.setFromMatrixColumn(n,0),e.crossVectors(i.object.up,e)),e.multiplyScalar(t),f.add(e)}})(),U=(()=>{let e=new d.Vector3;return function(t,n){let o=i.domElement;if(o&&i.object instanceof d.PerspectiveCamera&&i.object.isPerspectiveCamera){let r=i.object.position;e.copy(r).sub(i.target);let a=e.length();k(2*t*(a*=Math.tan(i.object.fov/2*Math.PI/180))/o.clientHeight,i.object.matrix),N(2*n*a/o.clientHeight,i.object.matrix)}else o&&i.object instanceof d.OrthographicCamera&&i.object.isOrthographicCamera?(k(t*(i.object.right-i.object.left)/i.object.zoom/o.clientWidth,i.object.matrix),N(n*(i.object.top-i.object.bottom)/i.object.zoom/o.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}})();function R(e){i.object instanceof d.PerspectiveCamera&&i.object.isPerspectiveCamera||i.object instanceof d.OrthographicCamera&&i.object.isOrthographicCamera?h=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function V(e){if(!i.zoomToCursor||!i.domElement)return;I=!0;let t=i.domElement.getBoundingClientRect(),n=e.clientX-t.left,o=e.clientY-t.top,r=t.width,a=t.height;j.x=n/r*2-1,j.y=-(o/a*2)+1,O.set(j.x,j.y,1).unproject(i.object).sub(i.object.position).normalize()}function F(e){return Math.max(i.minDistance,Math.min(i.maxDistance,e))}function B(e){p.set(e.clientX,e.clientY)}function H(e){S.set(e.clientX,e.clientY)}function W(){if(1==L.length)p.set(L[0].pageX,L[0].pageY);else{let e=.5*(L[0].pageX+L[1].pageX),t=.5*(L[0].pageY+L[1].pageY);p.set(e,t)}}function Y(){if(1==L.length)S.set(L[0].pageX,L[0].pageY);else{let e=.5*(L[0].pageX+L[1].pageX),t=.5*(L[0].pageY+L[1].pageY);S.set(e,t)}}function G(){let e=L[0].pageX-L[1].pageX,t=L[0].pageY-L[1].pageY,i=Math.sqrt(e*e+t*t);A.set(0,i)}function q(e){if(1==L.length)w.set(e.pageX,e.pageY);else{let t=en(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);w.set(i,n)}x.subVectors(w,p).multiplyScalar(i.rotateSpeed);let t=i.domElement;t&&(D(2*Math.PI*x.x/t.clientHeight),C(2*Math.PI*x.y/t.clientHeight)),p.copy(w)}function Z(e){if(1==L.length)E.set(e.pageX,e.pageY);else{let t=en(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);E.set(i,n)}P.subVectors(E,S).multiplyScalar(i.panSpeed),U(P.x,P.y),S.copy(E)}function X(e){var t;let n=en(e),o=e.pageX-n.x,r=e.pageY-n.y,a=Math.sqrt(o*o+r*r);M.set(0,a),T.set(0,Math.pow(M.y/A.y,i.zoomSpeed)),t=T.y,R(h/t),A.copy(M)}function $(e){var t,n,r;!1!==i.enabled&&(0===L.length&&(null==(t=i.domElement)||t.ownerDocument.addEventListener("pointermove",K),null==(n=i.domElement)||n.ownerDocument.addEventListener("pointerup",Q)),r=e,L.push(r),"touch"===e.pointerType?function(e){switch(ei(e),L.length){case 1:switch(i.touches.ONE){case d.TOUCH.ROTATE:if(!1===i.enableRotate)return;W(),s=a.TOUCH_ROTATE;break;case d.TOUCH.PAN:if(!1===i.enablePan)return;Y(),s=a.TOUCH_PAN;break;default:s=a.NONE}break;case 2:switch(i.touches.TWO){case d.TOUCH.DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&G(),i.enablePan&&Y(),s=a.TOUCH_DOLLY_PAN;break;case d.TOUCH.DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&G(),i.enableRotate&&W(),s=a.TOUCH_DOLLY_ROTATE;break;default:s=a.NONE}break;default:s=a.NONE}s!==a.NONE&&i.dispatchEvent(o)}(e):function(e){let t;switch(e.button){case 0:t=i.mouseButtons.LEFT;break;case 1:t=i.mouseButtons.MIDDLE;break;case 2:t=i.mouseButtons.RIGHT;break;default:t=-1}switch(t){case d.MOUSE.DOLLY:if(!1===i.enableZoom)return;V(e),A.set(e.clientX,e.clientY),s=a.DOLLY;break;case d.MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enablePan)return;H(e),s=a.PAN}else{if(!1===i.enableRotate)return;B(e),s=a.ROTATE}break;case d.MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===i.enableRotate)return;B(e),s=a.ROTATE}else{if(!1===i.enablePan)return;H(e),s=a.PAN}break;default:s=a.NONE}s!==a.NONE&&i.dispatchEvent(o)}(e))}function K(e){!1!==i.enabled&&("touch"===e.pointerType?function(e){switch(ei(e),s){case a.TOUCH_ROTATE:if(!1===i.enableRotate)return;q(e),i.update();break;case a.TOUCH_PAN:if(!1===i.enablePan)return;Z(e),i.update();break;case a.TOUCH_DOLLY_PAN:if(!1===i.enableZoom&&!1===i.enablePan)return;i.enableZoom&&X(e),i.enablePan&&Z(e),i.update();break;case a.TOUCH_DOLLY_ROTATE:if(!1===i.enableZoom&&!1===i.enableRotate)return;i.enableZoom&&X(e),i.enableRotate&&q(e),i.update();break;default:s=a.NONE}}(e):function(e){if(!1!==i.enabled)switch(s){case a.ROTATE:let t;if(!1===i.enableRotate)return;w.set(e.clientX,e.clientY),x.subVectors(w,p).multiplyScalar(i.rotateSpeed),(t=i.domElement)&&(D(2*Math.PI*x.x/t.clientHeight),C(2*Math.PI*x.y/t.clientHeight)),p.copy(w),i.update();break;case a.DOLLY:var n,o;if(!1===i.enableZoom)return;(M.set(e.clientX,e.clientY),T.subVectors(M,A),T.y>0)?(n=z(),R(h/n)):T.y<0&&(o=z(),R(h*o)),A.copy(M),i.update();break;case a.PAN:if(!1===i.enablePan)return;E.set(e.clientX,e.clientY),P.subVectors(E,S).multiplyScalar(i.panSpeed),U(P.x,P.y),S.copy(E),i.update()}}(e))}function Q(e){var t,n,o;(function(e){delete _[e.pointerId];for(let t=0;t<L.length;t++)if(L[t].pointerId==e.pointerId)return void L.splice(t,1)})(e),0===L.length&&(null==(t=i.domElement)||t.releasePointerCapture(e.pointerId),null==(n=i.domElement)||n.ownerDocument.removeEventListener("pointermove",K),null==(o=i.domElement)||o.ownerDocument.removeEventListener("pointerup",Q)),i.dispatchEvent(r),s=a.NONE}function J(e){if(!1!==i.enabled&&!1!==i.enableZoom&&(s===a.NONE||s===a.ROTATE)){var t,n;e.preventDefault(),i.dispatchEvent(o),(V(e),e.deltaY<0)?(t=z(),R(h*t)):e.deltaY>0&&(n=z(),R(h/n)),i.update(),i.dispatchEvent(r)}}function ee(e){if(!1!==i.enabled&&!1!==i.enablePan){let t=!1;switch(e.code){case i.keys.UP:U(0,i.keyPanSpeed),t=!0;break;case i.keys.BOTTOM:U(0,-i.keyPanSpeed),t=!0;break;case i.keys.LEFT:U(i.keyPanSpeed,0),t=!0;break;case i.keys.RIGHT:U(-i.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),i.update())}}function et(e){!1!==i.enabled&&e.preventDefault()}function ei(e){let t=_[e.pointerId];void 0===t&&(t=new d.Vector2,_[e.pointerId]=t),t.set(e.pageX,e.pageY)}function en(e){return _[(e.pointerId===L[0].pointerId?L[1]:L[0]).pointerId]}this.dollyIn=(e=z())=>{R(h*e),i.update()},this.dollyOut=(e=z())=>{R(h/e),i.update()},this.getScale=()=>h,this.setScale=e=>{R(e),i.update()},this.getZoomScale=()=>z(),void 0!==t&&this.connect(t),this.update()}}let x=a.forwardRef(({makeDefault:e,camera:t,regress:i,domElement:n,enableDamping:o=!0,keyEvents:r=!1,onChange:s,onStart:d,onEnd:h,...f},p)=>{let m=(0,u.useThree)(e=>e.invalidate),y=(0,u.useThree)(e=>e.camera),g=(0,u.useThree)(e=>e.gl),v=(0,u.useThree)(e=>e.events),b=(0,u.useThree)(e=>e.setEvents),x=(0,u.useThree)(e=>e.set),S=(0,u.useThree)(e=>e.get),E=(0,u.useThree)(e=>e.performance),P=t||y,A=n||v.connected||g.domElement,M=a.useMemo(()=>new w(P),[P]);return(0,l.useFrame)(()=>{M.enabled&&M.update()},-1),a.useEffect(()=>(r&&M.connect(!0===r?A:r),M.connect(A),()=>void M.dispose()),[r,A,i,M,m]),a.useEffect(()=>{let e=e=>{m(),i&&E.regress(),s&&s(e)},t=e=>{d&&d(e)},n=e=>{h&&h(e)};return M.addEventListener("change",e),M.addEventListener("start",t),M.addEventListener("end",n),()=>{M.removeEventListener("start",t),M.removeEventListener("end",n),M.removeEventListener("change",e)}},[s,d,h,M,m,b]),a.useEffect(()=>{if(e){let e=S().controls;return x({controls:M}),()=>x({controls:e})}},[e,M]),a.createElement("primitive",(0,c.default)({ref:p,object:M,enableDamping:o},f))});var S=d;let E=parseInt(d.REVISION.replace(/\D+/g,""));class P extends S.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${E>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}let A=e=>new S.Vector3().setFromSpherical(new S.Spherical(e,Math.acos(1-2*Math.random()),2*Math.random()*Math.PI)),M=a.forwardRef(({radius:e=100,depth:t=50,count:i=5e3,saturation:n=0,factor:o=4,fade:r=!1,speed:s=1},c)=>{let u=a.useRef(null),[d,h,f]=a.useMemo(()=>{let r=[],a=[],s=Array.from({length:i},()=>(.5+.5*Math.random())*o),l=new S.Color,c=e+t,u=t/i;for(let e=0;e<i;e++)c-=u*Math.random(),r.push(...A(c).toArray()),l.setHSL(e/i,n,.9),a.push(l.r,l.g,l.b);return[new Float32Array(r),new Float32Array(a),new Float32Array(s)]},[i,t,o,e,n]);(0,l.useFrame)(e=>u.current&&(u.current.uniforms.time.value=e.clock.elapsedTime*s));let[p]=a.useState(()=>new P);return a.createElement("points",{ref:c},a.createElement("bufferGeometry",null,a.createElement("bufferAttribute",{attach:"attributes-position",args:[d,3]}),a.createElement("bufferAttribute",{attach:"attributes-color",args:[h,3]}),a.createElement("bufferAttribute",{attach:"attributes-size",args:[f,1]})),a.createElement("primitive",{ref:u,object:p,attach:"material",blending:S.AdditiveBlending,"uniforms-fade-value":r,depthWrite:!1,transparent:!0,vertexColors:!0}))});var T=e.i(88014);let O=new d.Vector3,j=new d.Vector3,I=new d.Vector3,L=new d.Vector2;function _(e,t,i){let n=O.setFromMatrixPosition(e.matrixWorld);n.project(t);let o=i.width/2,r=i.height/2;return[n.x*o+o,-(n.y*r)+r]}let z=e=>1e-10>Math.abs(e)?0:e;function D(e,t,i=""){let n="matrix3d(";for(let i=0;16!==i;i++)n+=z(t[i]*e.elements[i])+(15!==i?",":")");return i+n}let C=(n=[1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1],e=>D(e,n)),k=(o=e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1],(e,t)=>D(e,o(t),"translate(-50%,-50%)")),N=a.forwardRef(({children:e,eps:t=.001,style:i,className:n,prepend:o,center:r,fullscreen:s,portal:h,distanceFactor:f,sprite:p=!1,transform:m=!1,occlude:y,onOcclude:g,castShadow:v,receiveShadow:b,material:w,geometry:x,zIndexRange:S=[0x1000037,0],calculatePosition:E=_,as:P="div",wrapperClass:A,pointerEvents:M="auto",...D},N)=>{let{gl:U,camera:R,scene:V,size:F,raycaster:B,events:H,viewport:W}=(0,u.useThree)(),[Y]=a.useState(()=>document.createElement(P)),G=a.useRef(null),q=a.useRef(null),Z=a.useRef(0),X=a.useRef([0,0]),$=a.useRef(null),K=a.useRef(null),Q=(null==h?void 0:h.current)||H.connected||U.domElement.parentNode,J=a.useRef(null),ee=a.useRef(!1),et=a.useMemo(()=>{var e;return y&&"blending"!==y||Array.isArray(y)&&y.length&&(e=y[0])&&"object"==typeof e&&"current"in e},[y]);a.useLayoutEffect(()=>{let e=U.domElement;y&&"blending"===y?(e.style.zIndex=`${Math.floor(S[0]/2)}`,e.style.position="absolute",e.style.pointerEvents="none"):(e.style.zIndex=null,e.style.position=null,e.style.pointerEvents=null)},[y]),a.useLayoutEffect(()=>{if(q.current){let e=G.current=T.createRoot(Y);if(V.updateMatrixWorld(),m)Y.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{let e=E(q.current,R,F);Y.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${e[0]}px,${e[1]}px,0);transform-origin:0 0;`}return Q&&(o?Q.prepend(Y):Q.appendChild(Y)),()=>{Q&&Q.removeChild(Y),e.unmount()}}},[Q,m]),a.useLayoutEffect(()=>{A&&(Y.className=A)},[A]);let ei=a.useMemo(()=>m?{position:"absolute",top:0,left:0,width:F.width,height:F.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:r?"translate3d(-50%,-50%,0)":"none",...s&&{top:-F.height/2,left:-F.width/2,width:F.width,height:F.height},...i},[i,r,s,F,m]),en=a.useMemo(()=>({position:"absolute",pointerEvents:M}),[M]);a.useLayoutEffect(()=>{var t,o;ee.current=!1,m?null==(t=G.current)||t.render(a.createElement("div",{ref:$,style:ei},a.createElement("div",{ref:K,style:en},a.createElement("div",{ref:N,className:n,style:i,children:e})))):null==(o=G.current)||o.render(a.createElement("div",{ref:N,style:ei,className:n,children:e}))});let eo=a.useRef(!0);(0,l.useFrame)(e=>{if(q.current){R.updateMatrixWorld(),q.current.updateWorldMatrix(!0,!1);let e=m?X.current:E(q.current,R,F);if(m||Math.abs(Z.current-R.zoom)>t||Math.abs(X.current[0]-e[0])>t||Math.abs(X.current[1]-e[1])>t){var i;let t,n,o,r,a=(i=q.current,t=O.setFromMatrixPosition(i.matrixWorld),n=j.setFromMatrixPosition(R.matrixWorld),o=t.sub(n),r=R.getWorldDirection(I),o.angleTo(r)>Math.PI/2),s=!1;et&&(Array.isArray(y)?s=y.map(e=>e.current):"blending"!==y&&(s=[V]));let l=eo.current;s?eo.current=function(e,t,i,n){let o=O.setFromMatrixPosition(e.matrixWorld),r=o.clone();r.project(t),L.set(r.x,r.y),i.setFromCamera(L,t);let a=i.intersectObjects(n,!0);if(a.length){let e=a[0].distance;return o.distanceTo(i.ray.origin)<e}return!0}(q.current,R,B,s)&&!a:eo.current=!a,l!==eo.current&&(g?g(!eo.current):Y.style.display=eo.current?"block":"none");let c=Math.floor(S[0]/2),u=y?et?[S[0],c]:[c-1,0]:S;if(Y.style.zIndex=`${function(e,t,i){if(t instanceof d.PerspectiveCamera||t instanceof d.OrthographicCamera){let n=O.setFromMatrixPosition(e.matrixWorld),o=j.setFromMatrixPosition(t.matrixWorld),r=n.distanceTo(o),a=(i[1]-i[0])/(t.far-t.near),s=i[1]-a*t.far;return Math.round(a*r+s)}}(q.current,R,u)}`,m){let[e,t]=[F.width/2,F.height/2],i=R.projectionMatrix.elements[5]*t,{isOrthographicCamera:n,top:o,left:r,bottom:a,right:s}=R,l=C(R.matrixWorldInverse),c=n?`scale(${i})translate(${z(-(s+r)/2)}px,${z((o+a)/2)}px)`:`translateZ(${i}px)`,u=q.current.matrixWorld;p&&((u=R.matrixWorldInverse.clone().transpose().copyPosition(u).scale(q.current.scale)).elements[3]=u.elements[7]=u.elements[11]=0,u.elements[15]=1),Y.style.width=F.width+"px",Y.style.height=F.height+"px",Y.style.perspective=n?"":`${i}px`,$.current&&K.current&&($.current.style.transform=`${c}${l}translate(${e}px,${t}px)`,K.current.style.transform=k(u,1/((f||10)/400)))}else{let t=void 0===f?1:function(e,t){if(t instanceof d.OrthographicCamera)return t.zoom;if(!(t instanceof d.PerspectiveCamera))return 1;{let i=O.setFromMatrixPosition(e.matrixWorld),n=j.setFromMatrixPosition(t.matrixWorld);return 1/(2*Math.tan(t.fov*Math.PI/180/2)*i.distanceTo(n))}}(q.current,R)*f;Y.style.transform=`translate3d(${e[0]}px,${e[1]}px,0) scale(${t})`}X.current=e,Z.current=R.zoom}}if(!et&&J.current&&!ee.current)if(m){if($.current){let e=$.current.children[0];if(null!=e&&e.clientWidth&&null!=e&&e.clientHeight){let{isOrthographicCamera:t}=R;if(t||x)D.scale&&(Array.isArray(D.scale)?D.scale instanceof d.Vector3?J.current.scale.copy(D.scale.clone().divideScalar(1)):J.current.scale.set(1/D.scale[0],1/D.scale[1],1/D.scale[2]):J.current.scale.setScalar(1/D.scale));else{let t=(f||10)/400,i=e.clientWidth*t,n=e.clientHeight*t;J.current.scale.set(i,n,1)}ee.current=!0}}}else{let t=Y.children[0];if(null!=t&&t.clientWidth&&null!=t&&t.clientHeight){let e=1/W.factor,i=t.clientWidth*e,n=t.clientHeight*e;J.current.scale.set(i,n,1),ee.current=!0}J.current.lookAt(e.camera.position)}});let er=a.useMemo(()=>({vertexShader:m?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[m]);return a.createElement("group",(0,c.default)({},D,{ref:q}),y&&!et&&a.createElement("mesh",{castShadow:v,receiveShadow:b,ref:J},x||a.createElement("planeGeometry",null),w||a.createElement("shaderMaterial",{side:d.DoubleSide,vertexShader:er.vertexShader,fragmentShader:er.fragmentShader})))});var U=d,R=d;let V=new R.Box3,F=new R.Vector3;class B extends R.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new R.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new R.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new R.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new R.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new R.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new R.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new R.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new R.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new R.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new R.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),V.setFromBufferAttribute(t),this.boundingBox.union(V))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new R.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let o=0,r=e.count;o<r;o++)F.fromBufferAttribute(e,o),n=Math.max(n,i.distanceToSquared(F)),F.fromBufferAttribute(t,o),n=Math.max(n,i.distanceToSquared(F));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var H=d,W=e.i(8560),Y=e.i(31497);class G extends H.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:H.UniformsUtils.clone(H.UniformsUtils.merge([W.UniformsLib.common,W.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new H.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Y.version>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let q=Y.version>=125?"uv1":"uv2",Z=new U.Vector4,X=new U.Vector3,$=new U.Vector3,K=new U.Vector4,Q=new U.Vector4,J=new U.Vector4,ee=new U.Vector3,et=new U.Matrix4,ei=new U.Line3,en=new U.Vector3,eo=new U.Box3,er=new U.Sphere,ea=new U.Vector4;function es(e,t,n){return ea.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),ea.multiplyScalar(1/ea.w),ea.x=i/n.width,ea.y=i/n.height,ea.applyMatrix4(e.projectionMatrixInverse),ea.multiplyScalar(1/ea.w),Math.abs(Math.max(ea.x,ea.y))}class el extends U.Mesh{constructor(e=new B,t=new G({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,o=0,r=t.count;e<r;e++,o+=2)X.fromBufferAttribute(t,e),$.fromBufferAttribute(i,e),n[o]=0===o?0:n[o-1],n[o+1]=n[o]+X.distanceTo($);let o=new U.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new U.InterleavedBufferAttribute(o,1,0)),e.setAttribute("instanceDistanceEnd",new U.InterleavedBufferAttribute(o,1,1)),this}raycast(e,n){let o,r,a=this.material.worldUnits,s=e.camera;null!==s||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let c=this.matrixWorld,u=this.geometry,d=this.material;if(i=d.linewidth+l,null===u.boundingSphere&&u.computeBoundingSphere(),er.copy(u.boundingSphere).applyMatrix4(c),a)o=.5*i;else{let e=Math.max(s.near,er.distanceToPoint(t.origin));o=es(s,e,d.resolution)}if(er.radius+=o,!1!==t.intersectsSphere(er)){if(null===u.boundingBox&&u.computeBoundingBox(),eo.copy(u.boundingBox).applyMatrix4(c),a)r=.5*i;else{let e=Math.max(s.near,eo.distanceToPoint(t.origin));r=es(s,e,d.resolution)}eo.expandByScalar(r),!1!==t.intersectsBox(eo)&&(a?function(e,n){let o=e.matrixWorld,r=e.geometry,a=r.attributes.instanceStart,s=r.attributes.instanceEnd,l=Math.min(r.instanceCount,a.count);for(let r=0;r<l;r++){ei.start.fromBufferAttribute(a,r),ei.end.fromBufferAttribute(s,r),ei.applyMatrix4(o);let l=new U.Vector3,c=new U.Vector3;t.distanceSqToSegment(ei.start,ei.end,c,l),c.distanceTo(l)<.5*i&&n.push({point:c,pointOnLine:l,distance:t.origin.distanceTo(c),object:e,face:null,faceIndex:r,uv:null,[q]:null})}}(this,n):function(e,n,o){let r=n.projectionMatrix,a=e.material.resolution,s=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,u=l.attributes.instanceEnd,d=Math.min(l.instanceCount,c.count),h=-n.near;t.at(1,J),J.w=1,J.applyMatrix4(n.matrixWorldInverse),J.applyMatrix4(r),J.multiplyScalar(1/J.w),J.x*=a.x/2,J.y*=a.y/2,J.z=0,ee.copy(J),et.multiplyMatrices(n.matrixWorldInverse,s);for(let n=0;n<d;n++){if(K.fromBufferAttribute(c,n),Q.fromBufferAttribute(u,n),K.w=1,Q.w=1,K.applyMatrix4(et),Q.applyMatrix4(et),K.z>h&&Q.z>h)continue;if(K.z>h){let e=K.z-Q.z,t=(K.z-h)/e;K.lerp(Q,t)}else if(Q.z>h){let e=Q.z-K.z,t=(Q.z-h)/e;Q.lerp(K,t)}K.applyMatrix4(r),Q.applyMatrix4(r),K.multiplyScalar(1/K.w),Q.multiplyScalar(1/Q.w),K.x*=a.x/2,K.y*=a.y/2,Q.x*=a.x/2,Q.y*=a.y/2,ei.start.copy(K),ei.start.z=0,ei.end.copy(Q),ei.end.z=0;let l=ei.closestPointToPointParameter(ee,!0);ei.at(l,en);let d=U.MathUtils.lerp(K.z,Q.z,l),f=d>=-1&&d<=1,p=ee.distanceTo(en)<.5*i;if(f&&p){ei.start.fromBufferAttribute(c,n),ei.end.fromBufferAttribute(u,n),ei.start.applyMatrix4(s),ei.end.applyMatrix4(s);let i=new U.Vector3,r=new U.Vector3;t.distanceSqToSegment(ei.start,ei.end,r,i),o.push({point:r,pointOnLine:i,distance:t.origin.distanceTo(r),object:e,face:null,faceIndex:n,uv:null,[q]:null})}}}(this,s,n))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Z),this.material.uniforms.resolution.value.set(Z.z,Z.w))}}class ec extends B{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let o=0;o<i;o+=t)n[2*o]=e[o],n[2*o+1]=e[o+1],n[2*o+2]=e[o+2],n[2*o+3]=e[o+3],n[2*o+4]=e[o+4],n[2*o+5]=e[o+5];else for(let o=0;o<i;o+=t)n[2*o]=e[o],n[2*o+1]=e[o+1],n[2*o+2]=e[o+2],n[2*o+3]=e[o+3],n[2*o+4]=e[o+4],n[2*o+5]=e[o+5],n[2*o+6]=e[o+6],n[2*o+7]=e[o+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class eu extends el{constructor(e=new ec,t=new G({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let ed=a.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:n,lineWidth:o,segments:r,dashed:s,...l},h){var f,p;let m=(0,u.useThree)(e=>e.size),y=a.useMemo(()=>r?new el:new eu,[r]),[g]=a.useState(()=>new G),v=(null==i||null==(f=i[0])?void 0:f.length)===4?4:3,b=a.useMemo(()=>{let n=r?new B:new ec,o=e.map(e=>{let t=Array.isArray(e);return e instanceof d.Vector3||e instanceof d.Vector4?[e.x,e.y,e.z]:e instanceof d.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(o.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof d.Color?e.toArray():e);n.setColors(e.flat(),v)}return n},[e,r,i,v]);return a.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),a.useLayoutEffect(()=>{s?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[s,g]),a.useEffect(()=>()=>{b.dispose(),g.dispose()},[b]),a.createElement("primitive",(0,c.default)({object:y,ref:h},l),a.createElement("primitive",{object:b,attach:"geometry"}),a.createElement("primitive",(0,c.default)({object:g,attach:"material",color:t,vertexColors:!!i,resolution:[m.width,m.height],linewidth:null!=(p=null!=n?n:o)?p:1,dashed:s,transparent:4===v},l)))}),eh=[{id:"ch-1",book:1,chapterNumber:1,title:"The Alternatives Model",surfacePrinciple:"Reality exists in an infinite 'Space of Variations'—you do not 'create' your reality, you simply choose to tune your mindset into an existing, favorable timeline.",deepDive:"Reality is independent of you so long as you simply agree with it. The 'Space of Variations' is a multi-dimensional information field containing all possible pasts, presents, and futures. By holding a specific frequency of thought and Intention, your consciousness 'illuminates' a corresponding sector in the space. Struggling against reality is futile because you are fighting the reflection instead of the image. Change the image—your attitude and focus—and the reflection shifts automatically."},{id:"ch-2",book:1,chapterNumber:2,title:"Pendulums",surfacePrinciple:"Collective thought structures feed on human energy; do not fight them—allow them to pass through you, or deliberately ignore them.",deepDive:"A Pendulum is a destructive energetic-informational structure created by the directed energy of groups of people sharing the same thoughts. They feed on the energy of adherents and opponents alike. When you fight a pendulum (like getting angry at traffic, politics, or a difficult boss), you feed it precisely the energy it wants. To free yourself, practice 'falling through' the pendulum—when provoked, respond with emptiness or unexpected humor, thereby cutting off the energy supply."},{id:"ch-3",book:1,chapterNumber:3,title:"The Wave of Fortune",surfacePrinciple:"Accepting minor successes with gratitude aligns you with a 'Wave' of positive events—do not sabotage it by complaining about the negatives.",deepDive:"The Space of Variations contains 'lifelines' that are grouped into positive and negative tracks. A 'Wave of Fortune' is an accumulation of favorable lifelines. To catch the wave, you must maintain a frequency of transmitting positive energy. When something bad happens, shift your focus. Do not emit negative energy, because doing so shifts you onto a destructive lifeline. By genuinely feeling good about small wins, the wave carries you to larger ones without effort."},{id:"ch-4",book:1,chapterNumber:4,title:"Balance",surfacePrinciple:"Excessive importance creates 'Excess Potential', summoning balancing forces that will actively ruin your plans.",deepDive:"Excess Potential is created when you attribute too much significance to an object, outcome, or even yourself. Nature abhors a vacuum and abhors a spike in potential; it summons 'Balancing Forces' to flatten it out, almost always to your detriment. If you want something too badly, or fear something too much, you create resistance. To achieve your goals reliably, you must lower the Importance. Desire without craving; act without desperation."},{id:"ch-5",book:1,chapterNumber:5,title:"The Induced Transition",surfacePrinciple:"Do not let tragedies, crises, or dramatic news trap you; getting emotionally absorbed in them will sweep you onto their negative timeline.",deepDive:"Destructive pendulums use shocking events (disasters, economic crashes) to hook millions of people. If you emotionally engage with the fear and panic, you emit their native frequency, causing an 'Induced Transition' to a timeline where those horrors manifest in your personal life. You must remain a detached observer. Hear the news, acknowledge it, but do not internalize the fear, thus denying the pendulum your energy."},{id:"ch-6",book:1,chapterNumber:6,title:"The Alternatives Flow",surfacePrinciple:"Life is naturally efficient; stop trying to violently force events, and instead allow the flow of variations to guide you to the path of least resistance.",deepDive:"The flow of variations naturally moves along the path of least energy expenditure. The mind is constantly trying to calculate complex moves and logically force the universe into submission, which requires immense energy. Instead, release your grip. Allow things to unfold dynamically. Act in accordance with circumstances rather than insisting on a rigid plan. Do not row against the current; just steer."},{id:"ch-7",book:2,chapterNumber:7,title:"Intention",surfacePrinciple:"Desire is useless without action. Intention is having the calm, unshakeable resolve to have and to act, free of doubt.",deepDive:"Inner Intention is the resolve to act directly on the physical world (I will lift my arm). Outer Intention is the resolve to HAVE, allowing the universe to organize circumstances on your behalf (My arm is lifted). Desire creates an energy block because it focuses on the lack of the goal. Intention simply assumes the goal is already yours. It is the calm realization that you are selecting a sector in the Space of Variations, and it will eventually materialize."},{id:"ch-8",book:2,chapterNumber:8,title:"Slides",surfacePrinciple:"Your self-image projects a 'Slide' onto reality. Change the negative slides in your head into positive 'Target Slides' that you repeatedly visualize.",deepDive:"A Slide is a distorted picture of reality in the mind. People project negative slides (e.g., 'Everyone is judging my flaws') which then materialize via Outer Intention because the person acts in accordance with them. To hack reality, create a 'Target Slide' where your goal is already achieved. Live inside this slide systematically. Do not look at it as a movie; visualize yourself physically acting inside the slide. Over time, the parameters of the slide align your frequency to the target sector in the Space of Variations."},{id:"ch-9",book:2,chapterNumber:9,title:"Your Soul and Your Mind",surfacePrinciple:"When your soul (subconscious desires) and mind (logical reasoning) are in pure harmony, Outer Intention activates and miracles happen.",deepDive:"The mind runs on logic, language, and the influence of pendulums; the soul operates on feelings, intuition, and direct connection to the Space of Variations. If the mind desires wealth but the soul feels unworthy (or vice versa), the dissonance blocks manifestation. When you align the two—usually by dropping societal programming and listening to the quiet 'rustle of morning stars' (your true intuition)—your Outer Intention becomes flawlessly unified and powerful."},{id:"ch-10",book:2,chapterNumber:10,title:"Goals and Doors",surfacePrinciple:"Find your true goal, not the one society forced on you, and walk through 'your doors', where progress feels effortless.",deepDive:"A 'foreign goal' is injected by a pendulum (e.g., becoming a lawyer to seem prestigious, even if you hate the work). Pursuing it causes suffering and immense resistance. Your true goal brings joy in the process itself. A 'door' is the path to achieving it. You must not force open someone else’s door. If you are moving toward your true goal through your true door, you will experience significantly reduced friction, and the universe will assist you."},{id:"ch-11",book:3,chapterNumber:11,title:"Energy",surfacePrinciple:"You need high free energy to fuel Intention. Clear blockages, stay healthy, and act as a pure conduit rather than a closed battery.",deepDive:"Physical energy is necessary for life; 'Free Energy' is necessary to project your Intention into the Space of Variations and materialize reality. Tension, stress, and unresolved importance create blocks in your energy channels. Do not try to forcefully extract energy from space. Instead, visualize central energy streams running through you seamlessly (one rising from the Earth, one descending from the Cosmos). When you relax and widen these channels, your Intent becomes extraordinarily potent."},{id:"ch-12",book:3,chapterNumber:12,title:"Frailing",surfacePrinciple:"To get what you want from others, focus their attention on what they want. Drop your internal importance and attune to their inner intention.",deepDive:"Frailing is the technology of harmonious human interaction. Instead of trying to force someone to act via Inner Intention, you tune into their frequency. Renounce the intention to *receive*, replace it with the intention to *give*, and you will paradoxically receive what you gave out. If you want respect, respect the other person. If you want help, align the request with the other person’s own self-interest and internal significance. Do this not out of deceit, but genuine energetic alignment."},{id:"ch-13",book:3,chapterNumber:13,title:"Coordination",surfacePrinciple:"Adopt the absolute conviction that whatever happens, no matter how apparently negative, is a step toward your success.",deepDive:"Coordination of Intention is the master key to reality management. It dictates that if you define a seemingly negative event as positive, it will transport you to a positive lifeline. The universe moves along the path of least resistance to your goal, which sometimes looks baffling to the mind. If you panic and label the event 'bad', you shift to a negative timeline. If you calmly coordinate and assume 'this is going perfectly according to plan', reality must obediently arrange itself favorably to match your assertion."},{id:"ch-14",book:4,chapterNumber:14,title:"Dances with Shadows",surfacePrinciple:"Your world is a mirror. It only reflects your attitude; to change the world, you must first deliberately change the image you are projecting.",deepDive:"Material reality is a delayed reflection of your thoughts. Most people look at the mirror, dislike the reflection (their circumstances), get angry, and thus ensure the mirror continues reflecting their anger. You must break the cycle by looking away from the reflection. Form a calm, positive image in your mind (your Target Slide or intention), and hold it there patiently. Because the materialization of the Space of Variations is dense and slow, there is a delay. Keep the image steady, and the world will inevitably catch up."},{id:"ch-15",book:4,chapterNumber:15,title:"Dreams of the Gods",surfacePrinciple:"Reality is merely a lucid dream that we are experiencing collectively; to control it, you must 'wake up' while awake by observing yourself and your environment.",deepDive:"In an unconscious dream, you are a victim of circumstances. If you realize you are dreaming, you can manipulate the dream (lucid dreaming). Physical reality operates the exact same way, just on a denser, slower timeframe. To wake up in reality, practice continuous conscious awareness (the 'Observer point'). Step outside the play. Watch how pendulums try to trigger you. Once awake, your Outer Intention commands the fabric of the 'dream' directly."},{id:"ch-16",book:4,chapterNumber:16,title:"The Dual Mirror",surfacePrinciple:"Reality reflects the unity of the soul and mind. If you are deeply convinced of something, the physical world will materialize it.",deepDive:"The Dual Mirror is the boundary separating physical reality from the metaphysical Space of Variations. Rule 1: The mirror reflects the relationship to you. Rule 2: The reflection is formed by the unity of soul and mind. Rule 3: The mirror reacts with a delay. Rule 4: The mirror states simply the content of the image, completely ignoring 'not' (so fear of failure manifests failure). To rule reality, control the image fed into the Dual Mirror with the calm resolve of having."},{id:"ch-17",book:5,chapterNumber:17,title:"The Master of Your Destiny",surfacePrinciple:"Do not wait for reality to happen to you. Declare yourself the Master, deliberately select your reality, and confidently walk forward.",deepDive:"You are constantly ordering events from the 'catalog' of the universe via your fears and passive reactions. To become the Master, you must abandon the victim mentality. You cease asking and cease demanding. Instead, you simply go and take what is yours. This requires dropping Importance completely, recognizing pendulums, holding inner and outer intention simultaneously, and smoothly navigating the Alternatives Flow without resistance."},{id:"ch-18",book:5,chapterNumber:18,title:"The Guardian",surfacePrinciple:"Trust your world implicitly. Install the belief that 'my world is taking care of me'—and the universe will execute this exact belief.",deepDive:"This is a specialized, powerful Target Slide: 'My world takes care of me.' Whenever anything happens, frame it as the universe protecting or assisting you. The Dual Mirror has no choice but to reflect this conviction. Over time, you will find yourself seemingly 'lucky', effortlessly dodging disasters. The Guardian is not an external deity, but your own perfectly aligned Outer Intention projecting absolute safety and favor."},{id:"ch-19",book:5,chapterNumber:19,title:"The Mirror Principle",surfacePrinciple:"Do not focus on how to achieve your goal (the means); focus entirely on the end state (the slide), and Outer Intention will bring the means to you.",deepDive:"The mind always insists on a logical, step-by-step path to the goal, trapping itself within the limitations of Inner Intention. The Mirror Principle demands you surrender the 'how' and focus completely on the 'what'. By holding the Target Slide in the mind and living it energetically, Outer Intention bridges the gap. The mirror will reflect the end result, and the Space of Variations will mathematically forge the path—often in ways your logical mind could never predict."}];var ef=e.i(27225);function ep({chapter:e,position:t,onClick:i}){let n=(0,a.useRef)(null),[o,s]=(0,a.useState)(!1);return(0,l.useFrame)(e=>{n.current&&(n.current.rotation.y+=.01,n.current.rotation.x+=.005,o?n.current.scale.lerp(new d.Vector3(1.5,1.5,1.5),.1):n.current.scale.lerp(new d.Vector3(1,1,1),.1))}),(0,r.jsxs)("group",{position:t,children:[(0,r.jsxs)("mesh",{ref:n,onClick:e=>{e.stopPropagation(),i()},onPointerOver:e=>{e.stopPropagation(),s(!0),document.body.style.cursor="pointer"},onPointerOut:e=>{s(!1),document.body.style.cursor="auto"},children:[(0,r.jsx)("sphereGeometry",{args:[.2,32,32]}),(0,r.jsx)("meshStandardMaterial",{color:o?"#ffffff":"#888888",emissive:o?"#444444":"#000000",roughness:.2,metalness:.8})]}),(0,r.jsx)(N,{position:[0,-.4,0],center:!0,className:"pointer-events-none fade-in",children:(0,r.jsxs)("div",{className:`text-xs whitespace-nowrap tracking-wider transition-opacity duration-300 font-light ${o?"text-white opacity-100":"text-white/40 opacity-50"}`,children:[e.chapterNumber,". ",e.title]})})]})}function em(){let e=(0,ef.useAppStore)(e=>e.setSelectedChapter),t=(0,ef.useAppStore)(e=>e.setFocusMode),{isFocusMode:i}=(0,ef.useAppStore)(),n=(0,a.useMemo)(()=>(function(e){let t=[],i=2*Math.PI*((1+Math.sqrt(5))/2);for(let n=0;n<e;n++){let e=2+.4*n,o=n*i,r=Math.cos(o)*e,a=.5*e*(Math.random()-.5),s=Math.sin(o)*e+(Math.random()-.5)*2;t.push([r,a,s])}return t})(eh.length),[]);return(0,r.jsx)("div",{className:`w-full h-screen fixed inset-0 transition-opacity duration-1000 ${i?"opacity-30 pointer-events-none blur-sm":"opacity-100"}`,children:(0,r.jsxs)(s.Canvas,{camera:{position:[0,0,15],fov:60},children:[(0,r.jsx)("ambientLight",{intensity:.2}),(0,r.jsx)("pointLight",{position:[10,10,10],intensity:1,color:"#ffffff"}),(0,r.jsx)(M,{radius:100,depth:50,count:5e3,factor:4,saturation:0,fade:!0,speed:1}),(0,r.jsx)("group",{children:eh.map((i,o)=>(0,r.jsx)(ep,{chapter:i,position:n[o],onClick:()=>{e(i),t(!0)}},i.id))}),(0,r.jsx)(ed,{points:n,color:"#ffffff",lineWidth:1,transparent:!0,opacity:.1}),(0,r.jsx)(x,{enablePan:!1,enableZoom:!0,minDistance:2,maxDistance:30,autoRotate:!i,autoRotateSpeed:.5})]})})}e.s(["default",()=>em],67634)},27842,e=>{"use strict";var t=e.i(43476),i=e.i(46932),n=e.i(88653),o=e.i(27225),r=e.i(71645);let a=[{id:"pendulums",term:"Pendulums",definition:"An energetic-informational structure created by the collective thought energy of a group. Pendulums feed on emotional energy (both negative and positive) and manipulate individuals. To defeat them, you must ignore them or respond unexpectedly to cut off their energy supply."},{id:"space_of_variations",term:"Space of Variations",definition:"An infinite, multi-layered information field containing all possible variants of past, present, and future events. You do not physically move through it; your consciousness merely tunes into a specific sector, materializing it as reality."},{id:"excess_potential",term:"Excess Potential",definition:"An artificial disruption in the energy field created when too much significance, desire, or fear is attached to an object or outcome. It summons Balancing Forces that aggressively neutralize the potential to restore equilibrium."},{id:"balancing_forces",term:"Balancing Forces",definition:"The natural mechanism of the universe designed to eliminate Excess Potentials. They act without bias, flattening energetic spikes, often resulting in exactly the outcome you feared or desperately tried to avoid."},{id:"inner_intention",term:"Inner Intention",definition:"The resolve to act in the physical world using personal force, logic, and effort. It is the willpower of the mind trying to force its way through obstacles."},{id:"outer_intention",term:"Outer Intention",definition:"The resolve to HAVE. It is the calm, doubt-free conviction that a goal will be achieved without physical force. Outer Intention utilizes the energy of the universe to slide into the desired sector of the Space of Variations."},{id:"target_slide",term:"Target Slide",definition:"A detailed, positive visualization of the end goal already achieved. Rather than 'watching' it like a movie, the practitioner must mentally participate in the slide, systematically tuning their frequency to match the desired reality."},{id:"coordination_of_intention",term:"Coordination of Intention",definition:"The absolute law that you must define any seemingly negative event or setback as a positive step in your timeline. By actively coordinating your attitude this way, the universe must route you onto a favorable lifeline."},{id:"frailing",term:"Frailing",definition:"An interpersonal technique where you stop trying to force others to give you what you want. Instead, you tune into their frequency and help them achieve their inner intentions, which paradoxically leads to the fulfillment of your own."},{id:"wave_of_fortune",term:"Wave of Fortune",definition:"An accumulation of highly favorable lifelines in the Space of Variations. It is caught by radiating positive energy and gratitude for small successes, and easily lost by complaining and emitting negative energy."},{id:"importance",term:"Importance",definition:"The root cause of all Excess Potential. When you assign immense weight (positive or negative) to an event, person, or yourself, you create friction. Dropping Importance allows you to execute Intention flawlessly."},{id:"lifeline",term:"Lifeline",definition:"A timeline or trajectory in the Space of Variations containing a sequence of cause-and-effect events. Changing your energetic frequency causes your consciousness to seamlessly slide onto a different Lifeline."},{id:"the_dual_mirror",term:"The Dual Mirror",definition:"The conceptual boundary between physical reality and the metaphysical Space of Variations. Physical reality merely reflects the contents of the mind and soul, albeit with a time delay."}];function s(e){let i=[...a].sort((e,t)=>t.term.length-e.term.length),n=RegExp(`\\b(${i.map(e=>e.term).join("|")})\\b`,"gi");return e.split(n).map((e,n)=>{let o=i.find(t=>t.term.toLowerCase()===e.toLowerCase());return o?(0,t.jsxs)("span",{className:"relative group cursor-help text-white font-medium border-b border-white/30 border-dashed pb-[1px] hover:border-white transition-colors",children:[e,(0,t.jsxs)("span",{className:"absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left leading-relaxed",children:[(0,t.jsx)("strong",{className:"block text-white mb-1 uppercase tracking-widest text-[10px]",children:o.term}),o.definition]})]},n):(0,t.jsx)(r.default.Fragment,{children:e},n)})}let l=(0,e.i(75254).default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function c(){let{isFocusMode:e,selectedChapter:r,setFocusMode:a}=(0,o.useAppStore)();return(0,t.jsx)(n.AnimatePresence,{children:e&&r&&(0,t.jsxs)(i.motion.div,{initial:{opacity:0,backdropFilter:"blur(0px)"},animate:{opacity:1,backdropFilter:"blur(12px)"},exit:{opacity:0,backdropFilter:"blur(0px)",transition:{duration:.5}},transition:{duration:.8,ease:"easeOut"},className:"fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 overflow-y-auto bg-black/40",children:[(0,t.jsx)("button",{onClick:()=>a(!1),className:"fixed top-8 right-8 z-[60] text-white/50 hover:text-white transition-colors p-2",children:(0,t.jsx)(l,{size:32,strokeWidth:1})}),(0,t.jsxs)(i.motion.div,{initial:{y:50,opacity:0},animate:{y:0,opacity:1},exit:{y:-50,opacity:0,transition:{duration:.4}},transition:{duration:.6,delay:.2,ease:"easeOut"},className:"max-w-2xl w-full text-left",children:[(0,t.jsxs)("div",{className:"mb-4 text-white/40 tracking-[0.2em] text-xs uppercase font-medium",children:["Book ",r.book," • Chapter ",r.chapterNumber]}),(0,t.jsx)("h2",{className:"text-4xl sm:text-5xl font-light mb-12 tracking-wide leading-tight text-white",children:r.title}),(0,t.jsxs)("div",{className:"space-y-12",children:[(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{className:"text-xs uppercase tracking-widest text-white/30 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full",children:"Surface Principle"}),(0,t.jsx)("p",{className:"text-xl font-light leading-relaxed text-zinc-200",children:s(r.surfacePrinciple)})]}),(0,t.jsx)("div",{className:"h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h3",{className:"text-xs uppercase tracking-widest text-white/30 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full",children:"Deep Dive"}),(0,t.jsx)("div",{className:"text-base font-light leading-loose text-zinc-400 space-y-4",children:s(r.deepDive)})]})]}),(0,t.jsx)("div",{className:"mt-16 text-center",children:(0,t.jsx)("button",{onClick:()=>a(!1),className:"text-white/40 hover:text-white tracking-widest uppercase text-xs border-b border-transparent hover:border-white/40 pb-1 transition-all",children:"Return to Space"})})]})]})})}e.s(["default",()=>c],27842)}]);