/** @format */

function valueSetters() {
	gsap.set("#nav a", { y: "100%", opacity: 0 });
	gsap.set("#home .parent .child", { y: "100%" });
	gsap.set("#home .row img", { opacity: 0 });

	document.querySelectorAll("#Visual>g").forEach(function (e) {
		var character = e.childNodes[1].childNodes[1];
		character.style.strokeDasharray = character.getTotalLength() + "px";
		character.style.strokeDashoffset = character.getTotalLength() + "px";
	});
}

function revealToSpan() {
	document.querySelectorAll(".reveal").forEach(function (elem) {
		// create two spans
		var parent = document.createElement("span");
		var child = document.createElement("span");

		// parents and child both sets their respective class
		parent.classList.add("parent");
		child.classList.add("child");

		// span parent span gets child and child gets elem
		child.innerHTML = elem.innerHTML;
		parent.appendChild(child);

		// elem replaces its value with parent span
		elem.innerHTML = "";
		elem.appendChild(parent);
	});
}
function loaderAnimation() {
	var tl = gsap.timeline();

	tl.from("#loader .child span", {
		x: 100,
		delay: 1,
		stagger: 0.2,
		duration: 1.4,
		ease: Power3.easeInOut,
	})
		.to("#loader .parent .child", {
			y: "-100%",
			duration: 1,
			ease: Circ.easeInOut,
		})
		.to("#loader", {
			height: 0,
			duration: 1,
			ease: Circ.easeInOut,
		})
		.to("#green", {
			height: "100%",
			top: 0,
			duration: 1,
			delay: -0.8,
			ease: Circ.easeInOut,
		})
		.to("#green", {
			height: 0,
			delay: -0.5,
			duration: 1,
			ease: Circ.easeInOut,
			onComplete: function () {
				animateHomepage();
			},
		});
}
function animateSvg() {
	gsap.to("#Visual>g>g>path,#Visual>g>g>polyline", {
		strokeDashoffset: 0,
		duration: 2,
		delay: 0,
		ease: Expo.easeInOut,
	});
}

function animateHomepage() {
	let tl = gsap.timeline();
	tl.to("#nav a", {
		y: 0,
		opacity: 1,
		stagger: 0.05,
		ease: Expo.easeInOut,
	})
		.to("#home .parent .child", {
			y: 0,
			duration: 1.5,
			stagger: 0.1,
			ease: Expo.easeInOut,
		})
		.to("#home .row img", {
			opacity: 1,
			ease: Expo.easeInOut,
			delay: -0.5,
			onComplete: function () {
				animateSvg();
			},
		});
}
function locoinitialise() {
	const scroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
}
function cardHoverEffect() {
	document.querySelectorAll(".containers").forEach(function (cnt) {
		var show;
		cnt.addEventListener("mousemove", function (dets) {
			document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
			document.querySelector("#cursor").children[dets.target.dataset.index].style.left = `${dets.x - 150}px`;
			show = dets.target;
			document.querySelector("#cursor").children[dets.target.dataset.index].style.top = `${dets.y - 60}px`;
			show.style.filter = "grayscale(1)";
			document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color;
		});
		cnt.addEventListener("mouseleave", function (dets) {
			document.querySelector("#cursor").children[show.dataset.index].style.opacity = 0;
			show.style.filter = "grayscale(0)";
			document.querySelector("#work").style.backgroundColor = "#f2f2f2";
		});
	});
}
revealToSpan();
valueSetters();
loaderAnimation();
locoinitialise();
cardHoverEffect();

// ye pehle se comment the inko comment out mat karna
// animateSvg();
// animateHomepage();
