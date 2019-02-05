function observeEvent(target, eventName, observerFunction, useCapture){
	//setting useCapture to true will not affect IE8 and earlier
	if (target.addEventListener) {
		target.addEventListener(eventName, observerFunction, useCapture);
	} else if (target.attachEvent) {
		target.attachEvent("on" + eventName, observerFunction);
	}
}

function stopPropagation(e) {
	e = e || window.event;
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function unObserveEvent(target, eventName, observerFunction, useCapture){
	if (target.removeEventListener) {
		target.removeEventListener(eventName, observerFunction, useCapture);
	} else if (target.detachEvent) {
		target.detachEvent("on" + eventName, observerFunction);
	}
}

function getElementsByClassName(node,classSearch) {
	if (node.getElementsByClassName) { //returns nodeList
		return node.getElementsByClassName(classSearch);
	} else { //returns array
		var classElements = [];
		var elems = node.getElementsByTagName("*");
		var pattern = new RegExp("(^|\\s)" + classSearch + "(\\s|$)");
		for (var i in elems) {
			if (pattern.test(elems[i].className) ) {
				classElements.push(elems[i]);
			}
		}
		return classElements;
	}
}

function hasClassName(elem,classSearch) {
	if (elem.classList && elem.classList.contains) {
		return elem.classList.contains(classSearch);
	} else if ( !elem.className.length ) {
		return false;
	} else {
		var pattern = new RegExp("(^|\\s)" + classSearch + "(\\s|$)");
		return pattern.test(elem.className);
	}
}

function addClass(elem,classSearch) {
	if (elem.classList && elem.classList.add) {
		elem.classList.add(classSearch);
	} else { //for older browsers
		if ( !hasClassName(elem,classSearch) ) {
			elem.className += " " + classSearch;
		}
	}
}

function removeClass(elem,classSearch) {
	if (hasClassName(elem,classSearch)) {
		if (elem.classList && elem.classList.remove) {
			elem.classList.remove(classSearch);
		} else { //for older browsers
			var pattern = new RegExp("(\\s|^)" + classSearch + "(\\s|$)");
			elem.className=elem.className.replace(pattern," ");
		}
	}
}

function removeElement(elem) {
	elem.parentNode.removeChild(elem);
	elem = null;
}

function removeAllChildren(parent) {	
	while (parent.hasChildNodes()) {
		removeElement(parent.childNodes[0]);
	}
}

function getTarget(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;
	return target;
}