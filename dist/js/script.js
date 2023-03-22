$(function () {
	$(window).on("load", () => {
		mvControll();
	});

	$(window).on("scroll", () => {
		headerControll();
		totopHideControll();
	});

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
			scrollTop = 400;

		console.log($(this).scrollTop());
		if ($(this).scrollTop() > scrollTop) {
			header.addClass("headerBgChange");
		} else {
			header.removeClass("headerBgChange");
		}
	}

	//totop挙動
	function totopHideControll() {
		const totop = $("#totop"),
			scrollTop = 400;

		console.log($(this).scrollTop());
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

	//totop挙動
	const totop = $(".totop");
	totop.click(function () {
		$("html,body").animate(
			{
				scrollTop: 0,
			},
			1000
		);
	});
});
