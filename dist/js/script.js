const config = {
	locale: "ja",
	mode: "range",
	minDate: "today",
	dateFormat: "Y-m-d",
};
flatpickr("#date-picker", config);

$(function () {
	$(window).on("load", () => {
		splashControll();
		mvControll();
		headerControll();
		totopHideControll();
		detailTitleControll();
		AOS.init(); //data-aos-offset変更に対応
	});

	$(window).on("scroll", () => {
		headerControll();
		totopHideControll();
	});

	$(window).on("resize", () => {
		detailTitleControll();
		AOS.init(); //data-aos-offset変更に対応
	});

	function splashControll() {
		$("#splash").delay(1500).fadeOut("slow");
	}

	//DOM指定
	const header = $("#header"),
		totop = $("#totop"),
		firstSld = $("#sld1");

	//mv操作
	function mvControll() {
		const sld = ".sldFade",
			sldPre = "sld",
			sldTime = 3000,
			sldWait = 7000;

		let sldNum = 2;

		firstSld.show(sldTime);
		firstSld.addClass("zoomImg");

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
		const changeElemTop = $(window).height() / 2,
			openElemTop = $(window).height();

		let scroll = $(window).scrollTop();

		if (!totopClicked) {
			if (
				changeElemTop < scroll &&
				header.hasClass("headerBgChange") == false
			) {
				header.addClass("headerBgChange");
			} else if (
				changeElemTop > scroll &&
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
		const windowHeight = $(window).height();

		if ($(this).scrollTop() > windowHeight) {
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

	//modal制御
	const openModal = $(".openModal"),
		closeModal = $(".closeModal"),
		reserveModal = $(".reserve_modal");

	openModal.click(function () {
		reserveModal.fadeIn("slow");
		$("body").addClass("stopScroll");
		header.hide();
		totop.hide();
	});

	closeModal.click(function () {
		reserveModal.fadeOut("slow");
		$("body").removeClass("stopScroll");
		setTimeout(function () {
			header.fadeIn();
			totop.fadeIn();
		}, 200);
	});

	function detailTitleControll() {
		if ($(window).width() < 1200) {
			$(".todetail_item_content").attr("data-aos-offset", "-300");
		} else {
			$(".todetail_item_content").attr("data-aos-offset", "120");
		}
	}
});
