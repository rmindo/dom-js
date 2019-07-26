const ids = {};
const DOM = {};
const state = {};
const routes = [];
const layout = [];
const genIDs = [];
const classes = {};
const DOMkeeper = {};

const head = document.head;
const links = document.links;
const location = window.location;



/**
* Create Element
*/
const ce = (name) => {
	return document.createElement(name);
}

/**
* Create Text Node
*/
const ct = (text) => {
	return document.createTextNode(text);
}

/**
* Get Element by ID
*/
const gi = (name) => {
	return document.getElementById(name);
}

/**
* Get Element by Class
*/
const gc = (name) => {
	return document.getElementsByClassName(name);
}

/**
* Clear node
*/
const cl = (node) => {
	if(typeof node == 'object') {
		node.innerHTML = '';
	}
	return node;
}


/**
* Create ID
*/
const cid = (length) => {
	
   var r = '';
   var c = 'abcdefghijklmnopqrstuvwxyz';

   for(let i = 0; i < length; i++) {
      r += c.charAt(Math.floor(Math.random() * c.length));
   }
   return r;
};


/**
* Set Prototype to the app
*/
const set = (ins, type) => {

	var proto = ins.prototype;


	proto.head = HTMLHead(ins, type);

	proto.node = (name) => {
		 return DOM.Node(name);
	};


	return ins;
}



/**
* Map and create the routes
* and remove unwanted styles added to the head
*/
const map = (app, path) => {

	// Reset state
	for(let i in state) {
		delete state[i];
	}
	// Remove unwanted node in the head
	for(let i in genIDs) {
		if(head.children.hasOwnProperty(genIDs[i])) {
			head.children[genIDs[i]].remove();	
		}
	}

	for(let i in routes) {
		let route = routes[i];
		if(path.replace('#', '') == route.path) {
			var app = new app;
			DOM.module = new route.module(app);
			DOM.createDOM(app, DOM.module);
			return true;
		}
	}
}



/**
* Load the page
*/
const load = (app) => {

	if(location.hash) {
		map(app, location.hash);
	} else {
		if(map(app, '#/')) {
			location.replace('#/');
		}
	}
}






/**
* Manipulate HTML head
*/
const HTMLHead = (ins, type) => {

	const DOMHead = {
		node: (name, att, data = null) => {
			var node = DOM.Node(name, att);

			if(att.id == null) {
				node.id = cid(5);
			}

			if(type == 'module') {
				genIDs.push(node.id);
			}

			if(typeof head.children[node.id] == 'undefined') {
				if(data) {
					if(typeof data == 'function') {
						var value = data(node);
					}
					head.appendChild(value);
				} else {
					head.appendChild(node);
				}
			}
		},
		css: (style, id = null) => {

			DOMHead.node('style', {id, type: 'text/css'}, (node) => {

				var css = '';
				for(let n in style) {
					var prop = '';
					for(let i in style[n]) {
						let v = String(style[n][i]).replace(/;/g,'');
						prop += `${i}:${v};`;
					}
					css += `${n}{${prop}}`;
				}
				node.appendChild(ct(css));

				return node;
			});
		},
		link: (value, id = null) => {
			DOMHead.node('link', {
				id: id,
				type: 'text/css',
				rel: 'stylesheet',
				href: value,
			});
		},
		script: (value, id = null) => {
			DOMHead.node('script', {
				id: id,
				type: 'text/javascript',
				src: value
			});
		},
		title: (value) => {
			document.title = value;
		}
	};

	return DOMHead;
};



/**
* Create node
*/
const DOMMethods = {

	set: (node) => {

		// Set Default state
		node.state = false;


		node.on = (name, callback) => {
			node[`on${name}`] = (e) => {
				callback.call(DOM.module, e);
				if(node.state) {
					DOM.UpdateDOM(e);
				}
			};
		};


		node.get = (name) => {
			return state[name];
		};


		node.set = (object) => {
			for(let i in object) {
				state[i] = object[i];
			}
			node.state = object;
		};


		node.att = (att) => {
			var cls = [];
			for(let i in att) {
				if(i == 'id') {
					ids[att[i]] = node;
				} else {
					if(i == 'class') {
						if(typeof classes[att[i]] !== 'undefined') {
							classes[att[i]].push(node);	
						} else {
							cls.push(node);
							classes[att[i]] = cls;	
						}
					}
				}
				node.setAttribute(i, att[i]);
			}
		};


		node.css = (object) => {
			var css = '';
			for(let i in object) {
				let val = String(object[i]).replace(/;/g,'');
				css += `${i}:${val};`;
			}
			node.setAttribute('style', css);
		};


		node.put = (data, clear = null) => {

			if(clear == null) {
				node = cl(node);
			}
			DOM.DigIn(node, data);
		};


		node.pick = (name, callback) => {

			var match = name.match(/\.(\w+)/i);

			if(Array.isArray(match)) {
				let items = classes[match[1]];
				for(let i in items) {
					if(callback) {
						callback(DOMMethods.set(items[i]));
					}
				}
			} else {
				var el = DOMMethods.set(ids[name]);

				if(callback) {
					return callback(el);
				}
				return el;
			}
		};


		node.route = (href, name) => {

			node.on('click', (e) => {
				e.preventDefault();
				if(map(DOM.Base, e.target.hash)) {
					location.replace(e.target.hash);
				}
			});
			node.appendChild(ct(name));
			node.setAttribute('href', href);
		};


		node.append = (data) => {
			node.put(data, true);
		};


		node.prepend = async (data) => {
			DOM.DigIn(node, data, true);
		};

		return node;
	}
}




/**
* Create node
*/
DOM.Node = (name, att = {}) => {

	var node = DOMMethods.set(ce(name));

	if(typeof node.att !== 'undefined') {
		node.att(att);
	}
	return node;
}



/**
* Dig in until it gets to the last nested object
*/
DOM.DigIn = async (node, data, prepend = null) => {

	// Stop if no data
	if(typeof data == 'undefined') {
		return;
	} else {
		
		// Clear content for new node
		if(node.hasChildNodes()) {
			var node = cl(node);
		}

		// Add to DOM
		var add = async (node, data) => {

			if(prepend) {
				node.insertBefore(data, node.firstChild);
			} else {
				node.appendChild(data);
			}
		}

		// Dig down to the last object
		var nested = async (tag, data) => {
			// Create node object
			const node = DOM.Node(tag);

			if(typeof data == 'function') {

				var func = data;
				var data = func.call(DOM.module, node);
				
				if(data) {
					if(data instanceof Promise) {
						DOM.DigIn(node, await data.then(r => r));
					} else {
						DOM.DigIn(node, data);
					}
				}
				DOM.AddToDOMKeeper(node, func);
			} else {
				DOM.DigIn(node, data);
			}

			return node;
		}


		if(Array.isArray(data)) {
			for(let i in data) {
				if(typeof data[i] == 'string') {
					add(node, ct(data[i]));
				} else {
					add(node, await nested(node.localName, data[i]));
				}
			}
		} else {
			if(typeof data == 'object') {
				for(let name in data) {
					if(Array.isArray(data[name])) {
						for(let i in data[name]) {
							add(node, await nested(name, data[name][i]));
						}
					} else {
						let dom = await nested(name, data[name]);
						if(dom) {
							add(node, dom);
						}
					}
				}
			} else {
				node.innerHTML = data;
			}
		}
		return node;
	}
}




/**
* Create DOM
*/
DOM.createDOM = async (app, mod) => {

	// Clear before adding
	var root = cl(DOM.Root);

	if(typeof app[root.id] == 'function') {

		app.obj = {};

		app.dump = (name) => {

			if(typeof app[name] == 'function') {
				app.obj[name] = app[name];
			} else if(typeof mod[name] == 'function') {
				app.obj[name] = mod[name];
			}
			return name;
		}

		for(let i in (cont = app[root.id].call(app))) {

			let tag = Object.keys(cont[i])[0];
			let name = cont[i][tag];

			if(typeof name == 'string') {
				let node = DOM.Node(tag, {id: name});

				if(typeof app.obj[name] !== 'undefined') {
					DOM.DigIn(node, app.obj[name].call(mod, node));
				}
				root.appendChild(node);
			} else {
				// throw Error('Nested object is not allowed.');
			}
		}
	}
}



/**
* Keep the Node and callback function if it has state
*/
DOM.AddToDOMKeeper = (node, call) => {

	if(typeof call == 'function') {

		var str = call.toString();
		var str = str.replace(/(\/\/.*)/g, '');
		var str = str.replace(/(^\s*\n)/gm, '');
		var arr = str.match(/.get\((?:'|")(\w+)(?:'|")\)/g);

		for(let i in arr) {
			if((match = arr[i].match(/(?:'|")(\w+)(?:'|")/i))) {
				node.call = call;
				DOMkeeper[match[1]] = node;
			}
		}


		/**
		* Update DOM
		*/
		DOM.UpdateDOM = (e) => {

			for(let i in state) {
				let node = DOMkeeper[i];
				let data = node.call.call(DOM.module, node);
				if(data) {
					DOM.DigIn(cl(node), data);
				}
				node.removeAttribute('style');
			}
		}
	}
}




/**
* Export module
*/
module.exports = {
	run: (name, base) => {
		DOM.Root = gi(name);
		DOM.Base = set(base, 'base');
		load(DOM.Base);
	},
	set: (path, module) => {
		routes.push({path, module: set(module, 'module')});
	}
}






// x = {
//   aInternal: 10,
//   aListener: function(val) {},
//   set a(val) {
//     this.aInternal = val;
//     this.aListener(val);
//   },
//   get a() {
//     return this.aInternal;
//   },
//   registerListener: function(listener) {
//     this.aListener = listener;
//   }
// }

// x.registerListener(function(val) {
// 	for(let i in val) {
// 		document[i] = val[i];
// 	}
// });

// x.a = state;