(function(t){function e(e){for(var o,r,s=e[0],c=e[1],u=e[2],p=0,l=[];p<s.length;p++)r=s[p],i[r]&&l.push(i[r][0]),i[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);d&&d(e);while(l.length)l.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(o=!1)}o&&(a.splice(e--,1),t=r(r.s=n[0]))}return t}var o={},i={app:0},a=[];function r(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var d=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var o=n("64a9"),i=n.n(o);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=n("bc3a"),a=n.n(i),r=n("a7fe"),s=n.n(r),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"description-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],attrs:{placeholder:"Your description..."},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}}),n("button",{staticClass:"add-task-btn",on:{click:t.addTodo}},[n("span",[t._v("+")])])]),n("hr",{staticClass:"divider"}),n("div",{staticClass:"todo-body"},[n("ul",{staticClass:"todo-container"},t._l(t.tasks[t.page],function(e){return n("li",{key:e.id,staticClass:"todo-item",class:""+(1==e.complete&&"checked")},[n("p",{staticClass:"task"},[t._v(t._s(e.description))]),n("input",{attrs:{type:"radio","data-id":e.id},on:{click:t.checkTodo}})])}),0)]),n("ul",{staticClass:"pagination"},t._l(t.tasks,function(e,o){return n("li",{key:o,class:t.page===o?"active":"",on:{click:function(){return t.page=o}}},[t._v(t._s(o+1))])}),0)])])},u=[],d={name:"app",data:function(){return{tasks:[],description:"",page:0}},created:function(){this.userId=1,this.getTodoList()},methods:{addTodo:function(){var t=this,e=this.description,n=this.userId;if(e){var o=e.trim();this.$http.post("/api/todo/add",{description:o,id:n}).then(function(e){var n=e.data,o=(n.data,n.success);o&&(t.getTodoList(),t.goToPage(t.tasks.length-1))})}},checkTodo:function(t){var e=this,n=t.target.parentNode,o=t.target.dataset.id;o&&this.$http.post("/api/todo/complete",{userId:this.userId,id:o}).then(function(t){var o=t.data,i=(o.data,o.success);i&&(e.getTodoList(),n.classList.toggle("checked"))})},getTodoList:function(){var t=this;return this.$http.get("/api/todo").then(function(e){var n=e.data;if(n&&n.length){for(var o=[],i=0,a=n.length;i<a;i+=5)o.push(n.slice(i,i+5));t.tasks=o}})},goToPage:function(t){this.page=t}}},p=d,l=(n("034f"),n("2877")),f=Object(l["a"])(p,c,u,!1,null,null,null),h=f.exports;o["a"].config.productionTip=!1,o["a"].use(s.a,a.a),new o["a"]({render:function(t){return t(h)}}).$mount("#app")},"64a9":function(t,e,n){}});
//# sourceMappingURL=app.4e59eff9.js.map