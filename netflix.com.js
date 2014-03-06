// this unbreaks the console.log breaking on netflix.
// Props goes to zbtirrell who found the configurable:false which led us to writable:false
var s = document.createElement('script');
s.innerHTML = 'Object.defineProperty(window, "console", {writable: false});';
document.head.appendChild( s );
