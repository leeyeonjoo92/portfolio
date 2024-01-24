window.addEventListener("load", function() {
	/* 헤더 */
	var header = document.getElementById("header");
	/* 섹션 */
	var about = document.querySelector(".about");
	var project = document.querySelector(".project");
	/* 스크롤 위치 */
	var aboutY = about.offsetTop;
	var projectY = project.offsetTop;
	var intro = document.querySelector(".intro");

	/*************************************************
	 ** 이벤트
	*************************************************/
	/* 로드시 실행함수 */
	navScroll();
	introText();
	licenseH();
	projectWH();
	mobile();
	/* 스크롤시 실행함수 */
	/* 리사이즈시 실행함수 */
	window.addEventListener("scroll", navScroll);
	window.addEventListener("resize", function() {
		introText();
		licenseH();
		projectWH();
		mobile();
	});

	/*************************************************
	 ** 네비게이션 스크롤 함수 
	 *************************************************/
	function navScroll() {
		var currentY = window.scrollY;

		if(currentY == 0) {
			header.classList.remove("hide");
			header.addEventListener("mouseout", function(e) {
				e.currentTarget.classList.remove("hide");
			});
		} else  {
			header.classList.add("hide");
			/* 네비게이션 호버 이벤트 */
			header.addEventListener("mouseover", function(e) {
				e.currentTarget.classList.remove("hide");
			});
			header.addEventListener("mouseout", function(e) {
				e.currentTarget.classList.add("hide");
			});
		}
	}

	var navis = document.querySelectorAll(".navi");
	navis.forEach(function(navi) {
		var aboutNav = navi.lastElementChild.firstElementChild;
		var projectNav = navi.lastElementChild.lastElementChild;
		var navBtn = document.getElementById("nav-btn");
		var navLabel = navBtn.nextElementSibling;

		/* 소개 메뉴 클릭 */
		aboutNav.addEventListener("click", function() {
			aboutMove();
		});
		
		function aboutMove() {
			window.scrollTo({
				top: aboutY,
				left: 0,
				behavior: "smooth",
			});
		}

		/* 프로젝트 메뉴 클릭 */
		projectNav.addEventListener("click", function() {
			projectMove();
		});

		function projectMove() {
			window.scrollTo({
				top: projectY,
				left: 0,
				behavior: "smooth",
			});
		}

		// 모바일 햄버거 메뉴 클릭
		var navOpen = navBtn.checked;

		navLabel.addEventListener("click", function() {
			if(!navOpen) {
				aboutNav.addEventListener("click", function() {
					aboutMove();
					navBtn.checked = false;
				});
				projectNav.addEventListener("click", function() {
					projectMove();
					navBtn.checked = false;
				});
			// } else {
			// 	navBtn.checked = true;
			}
		});
	});

	/*************************************************
	 ** 인트로 세로 가운데 정렬
	*************************************************/
	function introText() {
		var welcomeH = intro.firstElementChild.getBoundingClientRect().height;
		var mypageH = intro.lastElementChild.getBoundingClientRect().height;
		var introtxtH = welcomeH + mypageH;
		intro.style.paddingTop = "calc((100vh - " + introtxtH + "px) * 0.5)";
	}

	/*************************************************
	 ** 스킬 높이 = 자격증 높이
	*************************************************/
	function licenseH() {
		var toolH = document.querySelector(".tool").getBoundingClientRect().height;
		var license = document.querySelector(".license");

		license.style.height = toolH;
	}


	/*************************************************
	 ** 스크롤 트리거 (공통 - 위로 올라오게)
	*************************************************/
	var up = gsap.timeline();
	var showUps = document.querySelectorAll(".show-up");

	showUps.forEach(function(showUp) {
		gsap.fromTo(showUp, {
			yPercent: 20,
			opacity: 0,
		}, {
			yPercent: 0,
			opacity: 1,
			duration: 0.8,
			scrollTrigger: {
				animation: up,
				trigger: showUp,
				start: "center 100%",
				end: "center 80%",
				// markers: true,
				toggleActions: "play none none none",
				scrub: 1,
			}
		});
	});

	/*************************************************
	 ** 스크롤 트리거 (자격증 -오른쪽으로 나오게)
	*************************************************/
	var right = gsap.timeline();
	var showRights = document.querySelectorAll(".show-right");

	showRights.forEach(function(showRight) {
		gsap.fromTo(showRight, {
			xPercent: -20,
			opacity: 0,
		}, {
			xPercent: 0,
			opacity: 1,
			duration: 0.8,
			scrollTrigger: {
				animation: right,
				trigger: showRight,
				start: "center 100%",
				end: "center 80%",
				// markers: true,
				toggleActions: "play none none none",
				scrub: 1,
			}
		});
	});

	/*************************************************
	 ** 스크롤 트리거 (자격증 - 왼쪽으로 나오게)
	*************************************************/
	var left = gsap.timeline();
	left.fromTo(".about-left", {xPercent: 20, opacity: 0}, {xPercent: 0, opacity: 1, duration: 0.8});

	ScrollTrigger.create({
		animation: left,
		trigger: ".about-left",
		start: "center 75%",
		end: "center 55%",
		// markers: true,
		toggleActions: "play none none none",
		scrub: 1,
	});

	/*************************************************
	 ** 스크롤 트리거 (강점 테두리 pin)
	*************************************************/
	var meritPin = gsap.timeline();
	meritPin.fromTo(".merit-pin", {yPercent: -20, opacity: 0}, {yPercent: 0, opacity: 1})
					.fromTo(".merit1", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1})
					.fromTo(".merit2", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1})
					.fromTo(".merit3", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1})

	ScrollTrigger.create({
		animation: meritPin,
		trigger: ".merit",
		start: "top top",
		// end: "center top",
		end: "+=3000",
		pin: true,
		anticipatePin: 1,
		scrub: 1,
		// markers: true,
	});

	/*************************************************
	 ** 스크롤 트리거 (프로젝트)
	*************************************************/
	var projectPin = gsap.timeline();
	projectPin.fromTo(".project-pin > div:nth-of-type(1)", {xPercent: -50, opacity: 0}, {xPercent: 0, opacity: 1})
						.fromTo(".project-pin > div:nth-of-type(2)", {xPercent: 150, yPercent: -50, opacity: 0}, {xPercent: 0, yPercent: -50, opacity: 1})
						.fromTo(".project-pin > div:nth-of-type(3)", {xPercent: -50, opacity: 0}, {xPercent: 0, opacity: 1})

	ScrollTrigger.create({
		animation: projectPin,
		trigger: ".project-intro",
		start: "top top",
		end: "+=3000",
		pin: true,
		anticipatePin: 1,
		scrub: 1,
		// markers: true,
	});

	/*************************************************
	 ** 프로젝트 가로스크롤
	*************************************************/
	const projectConPin = document.getElementById("project");
	const projectCons = gsap.utils.toArray(".project .con");

	// [하단 코드 오류 내용]
	// 강점 섹션중간부터 가로스크롤이 시작됨
	// -> 강점 섹션과 프로젝트 인트로 섹션의 pin-spacer padding값을 인식못함
	// gsap 애니메이션에 scrollTriger를 넣는 방식
	// gsap.to(projectCons, {
	// 		xPercent: -100 * (projectCons.length - 1),
	// 		ease: "none",
	// 		scrollTrigger: {
	// 				trigger: projectConPin,
	// 				// start: "top top",
	// 				end: () =>  "+=" + (projectConPin.offsetWidth - innerWidth),
	// 				pin: true,
	// 				scrub: 1,
	// 				snap: {
	// 						snapTo: 1 / (projectCons.length - 1),
	// 						inertia: false,
	// 						duration: {min: 0.1, max: 0.1}
	// 				},
	// 				invalidateOnRefresh: true,
	// 				anticipatePin: 1,
	// 				markers: true,
	// 		}
	// });

	// scrollTrigger를 독립적으로 사용하는 방식
	var projectHorizon = gsap.timeline();
	projectHorizon.to(projectCons, {xPercent: -100 * (projectCons.length - 1), ease: "none"});

	ScrollTrigger.create({
		animation: projectHorizon,
		trigger: projectConPin,
		// start: "top top",
		end: () =>  "+=" + (projectConPin.offsetWidth - innerWidth),
		pin: true,
		scrub: 1,
		snap: {
				snapTo: 1 / (projectCons.length - 1),
				inertia: false,
				duration: {min: 0.1, max: 0.1}
		},
		invalidateOnRefresh: true,
		anticipatePin: 1,
		//markers: true,
	});

	/*************************************************
	 ** 프로젝트 이미지 높이 & 사용툴 너비
	*************************************************/
	function projectWH() {
		var lyj = document.querySelector(".project-lyj");
		var lyjW = lyj.getBoundingClientRect().width;
		lyj.style.height = lyjW;

		var projectTools = document.querySelectorAll(".project-txt-topic > div:last-of-type > span");
		var usedTools = document.querySelectorAll(".project-txt-topic > div:last-of-type > div");

		projectTools.forEach(function(projectTool, idx) {
			// var toolsW = projectTool.getBoundingClientRect().width;
			var toolsW = projectTool.clientWidth;
			usedTools[idx].style.width = "calc(100% - " + toolsW + "px)";
		});
	}

	/*************************************************
	 ** 프로젝트 클릭이벤트
	*************************************************/
	var con1Mores = document.querySelectorAll(".project-con1 .project-more");
	var con1Details = document.querySelectorAll(".project-con1 .project-detail");

	con1Mores[0].classList.add("project-on");
	con1Details[0].style.display = "block";

	con1Mores.forEach(function(con1More, idx) {
		con1More.addEventListener("click", function() {
			for(var n = 0; n < con1Mores.length; n++) {
				con1Mores[n].classList.remove("project-on");
				con1Details[n].style.display = "none";
			}

			con1Mores[idx].classList.add("project-on");
			con1Details[idx].style.display = "block";
		});
	});

	var con3Mores = document.querySelectorAll(".project-con3 .project-more");
	var con3Details = document.querySelectorAll(".project-con3 .project-detail");

	con3Mores[0].classList.add("project-on");
	con3Details[0].style.display = "block";

	con3Mores.forEach(function(con3More, idx) {
		con3More.addEventListener("click", function() {
			for(var n = 0; n < con3Mores.length; n++) {
				con3Mores[n].classList.remove("project-on");
				con3Details[n].style.display = "none";
			}

			con3Mores[idx].classList.add("project-on");
			con3Details[idx].style.display = "block";
		});
	});

	
	/*************************************************
	 ** 프로젝트 슬라이드
	*************************************************/
	var dentals = document.querySelectorAll(".dental");
	var pages = document.querySelectorAll(".dental-page");

	dentals.forEach(function(dental, idx) {
		var dentalSlide = new Swiper(dental, {
			pagination: {
				el: pages[idx],
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},
		});
	});

	/*************************************************
	 ** 프로젝트 모바일 반응형
	*************************************************/
	function mobile() {
		var bodyW = window.innerWidth;
		var conLefts = document.querySelectorAll(".con-left");
		var conRights = document.querySelectorAll(".con-right");

		if(bodyW <= 768) {
			conLefts.forEach(function(conLeft, idx) {
				var conLeftH = conLeft.getBoundingClientRect().height;
				var conRightH = "calc(100% - " + conLeftH + "px)";
				conRights[idx].style.height = conRightH;
			});
		} else {
			for(var i = 0; i < conRights.length; i++) {
				conRights[i].style.height = "100%";
			}
		}
	}

}); // load 이벤트 닫음
