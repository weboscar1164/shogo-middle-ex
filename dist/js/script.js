AOS.init();
$(function () {
	$(window).on("load", () => {
		splashControll();
		mvControll();
	});

	$(window).on("scroll", () => {
		headerControll();
		totopHideControll();
	});

	function splashControll() {
		$("#splash").delay(1500).fadeOut("slow");
	}

	//mv操作
	function mvControll() {
		const sld = ".sldFade",
			sldPre = "sld",
			sldTime = 3000,
			sldWait = 7000;

		let sldNum = 2;

		$("#sld1").show(sldTime);
		$("#sld1").addClass("zoomImg");

		setInterval(function () {
			$(sld).not(`#${sldPre}${sldNum}`).fadeOut(sldTime);
			$(`#${sldPre}${sldNum}`).removeClass("zoomImg");
			$(`#${sldPre}${sldNum}`).fadeIn(sldTime);
			$(`#${sldPre}${sldNum}`).addClass("zoomImg");

			sldNum++;
			if (sldNum > $(sld).length) {
				sldNum = 1;
			}
		}, sldWait);
	}

	//header挙動
	function headerControll() {
		const header = $("#header"),
			cangeElemTop = 300,
			openElemTop = $(window).height();

		let scroll = $(window).scrollTop();

		if (!totopClicked) {
			if (cangeElemTop < scroll && header.hasClass("headerBgChange") == false) {
				header.addClass("headerBgChange");
			} else if (
				cangeElemTop > scroll &&
				header.hasClass("headerBgChange") == true
			) {
				header.removeClass("headerBgChange");
			}

			if (
				openElemTop < scroll &&
				header.hasClass("headerScrollOpen") == false
			) {
				header.addClass("headerScrollOpen");
				header.removeClass("headerScrollClose");
			} else if (
				openElemTop > scroll &&
				header.hasClass("headerScrollOpen") == true
			) {
				header.removeClass("headerScrollOpen");
				header.addClass("headerScrollClose");
			}
		}
	}

	//totop挙動
	function totopHideControll() {
		const totop = $("#totop"),
			scrollTop = 400;

		if ($(this).scrollTop() > scrollTop) {
			totop.fadeIn();
		} else {
			totop.fadeOut();
		}
	}

	//infoTab挙動
	const infoTab = $(".info_container .info_tab_item"),
		infoItems = $(".info_container .info_items"),
		fadeTime = 1200;

	infoTab.click(function () {
		let index = infoTab.index(this);
		infoItems.css("display", "none");
		infoItems.eq(index).fadeIn(fadeTime);
		$(infoTab).removeClass("info_tab_item--active");
		$(this).addClass("info_tab_item--active");
	});

	//totopクリックイベント
	const totop = $(".totop"),
		header = $("#header");

	let totopClicked = false;

	totop.click(function () {
		totopClicked = true;
		header.removeClass("headerScrollOpen");
		header.removeClass("headerScrollClose");
		header.removeClass("headerBgChange");
		$("html,body").animate(
			{
				scrollTop: 0,
			},
			1000
		);

		//totopスクロール中はheaderコントロールを無効にする
		setTimeout(function () {
			totopClicked = false;
		}, 1000);
	});
});
