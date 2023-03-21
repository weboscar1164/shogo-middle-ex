$(function () {
	$(window).on("load", () => {
		scrollControl();
	});

	$(window).on("resize", () => {
		scrollControl();
	});

	function scrollControl() {
		alert("called");
	}

	//totop挙動
	var totop = $(".totop");
	totop.click(function () {
		$("html,body").animate(
			{
				scrollTop: 0,
			},
			1000
		);
	});
});
