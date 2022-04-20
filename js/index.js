$(function () {
	//定义下拉菜单函数
	var dropDown = (function () {
		//动画构造函数
		function Animate(pid, cid) {
			this.pid = $(pid);
			this.cid = $(cid);
		}
		Animate.prototype.animate1 = function () {
			var that = this;
			that.pid.hover(function () {
				that.cid.slideDown(500);
			}, function () {
				that.cid.slideUp(500);
			});
		};

		return {
			init: function (p, c) {
				return new Animate(p, c);
			}
		};
	})();
	//实现下拉菜单的效果
	var dropDown1 = dropDown.init("#upDown", "#contact");
	dropDown1.animate1();
	var dropDown2 = dropDown.init(".sale", ".hot-sale");
	dropDown2.animate1();

	//登录注册遮挡层以及输入框下拉菜单以及图片移动效果,回到顶部效果
	var shieldLayer = function () {
		var $loginButton = $(".login");
		var $regButton = $(".register");
		var $layer = $(".layer");
		var $loginDiv = $("#login");
		var $regDiv = $("#register");
		var $close1 = $("#login img");
		var $close2 = $("#register img");
		var $input = $("#searchInput");
		var $history_ul = $("#history_ul");
		var $floor_item = $(".floor_item img");
		//输入框效果
		$input.on("focus", function () {
			$history_ul.slideDown(0);
		});
		$input.on("blur", function () {
			$history_ul.slideUp(0);
		});
		//遮挡层效果
		$layer.css({
			"width": $("body").width(),
			"height": $("body").height()
		});
		// $loginButton.on("click", function () {
		// 	$layer.slideDown(500);
		// 	$loginDiv.fadeIn(500);
		// });
		// $regButton.on("click", function () {

		// 	$layer.slideDown(500);
		// 	$regDiv.fadeIn(500);
		// });
		$layer.on("click", function () {
			$loginDiv.fadeOut(500);
			$regDiv.fadeOut(500);
			$layer.slideUp(500);
		});
		$close1.on("click", function () {
			$layer.slideUp(500);
			$loginDiv.fadeOut(500);
		});
		$close2.on("click", function () {
			$layer.slideUp(500);
			$regDiv.fadeOut(500);
		});

	};
	shieldLayer();
	//广告图点击效果
	$(".ad .close").on("click", function () {
		$(this).hide();
		$(".ad img").slideUp(1000);
	});

	//引用自己写的轮播插件
	$(".img_list").banner({
		imgWidth: "1440",// 图片宽度
		height: "500",// 图片高度
		imgNum: "3",// 图片数量
		num: "1",
		speed: "3000",// 展示速度
		prev: "#prev",// 传入左右箭头的dom
		next: "#next"// 传入左右箭头的dom
	});

	// 主体大导航栏展开显隐控制
	(function() {
		$(".list_nav_li").hover(
			function() {
				$(this).find(".expand_nav").show();
			},
			function() {
				$(this).find(".expand_nav").hide();
			}
		);
	})();

	//点击不同楼层跳转到当前对应的块
	(function () {
		$(".left_sidebar .sidebar_floor").each(function (index) {
			$(this).on("click", function () {
				$("body,html").animate({
					"scrollTop": $("#F" + (index + 1)).offset().top + "px"
				}, 500);
			});
		});
	})();




	// floor floor_right floor_item item_bottom鼠标悬停弹出div
	// var itemHover = function () {
	// 	var itemBottom = $("#item_bottom");
	// 	var comment = $("#comment");
	// 	// 获取鼠标位置
	// 	itemBottom.on("mousemove", function (event) {
	// 		var mousePosition = pos(itemBottom, 0, 0, event);
	// 		comment.css({ "display": "block", "position": "absolute", "top": mousePosition.x + "px", "left": mousePosition.y + "px" });
	// 	});
	// 	itemBottom.on("mouseleave", function (event) {
	// 		comment.css("display", "none");
	// 	})
	// }
	//itemHover();

	// floor floor_right floor_item鼠标悬停阴影
	var itemShadow = function () {
		var floorItem = $(".floor_item");

		floorItem.on("mousemove", function (event) {
			$(this).css("box-shadow", "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)");
		})
		floorItem.on("mouseleave", function () {
			$(this).css("box-shadow", "");
		})
	};
	itemShadow();

	// 右侧导航鼠标悬停变换图片颜色及展示详情图片
	(function () {
		var navImg = $(".navImg");
		var sortUlLi = $(".sort_ul_li");
		// 图片初始化
		navImg.each(function() {
			$(this).attr("src", $(this).parent().children()[1].attributes[0].nodeValue);
		});
		// 悬停展开位置初始化
		sortUlLi.each(function(index) {
			$(this).children()[1].style.top = index*60 + "px";
		})

		navImg.on("mousemove", function () {
			// 根据当前元素获取同级别的悬停变红图片
			let hoverNavImg = $(this).parent().children()[2].attributes[0].nodeValue;
			$(this).attr("src", "./" + hoverNavImg);

			// 悬停展开图片显示
			// 判断是否有悬停展开图片
			if ($(this).parent().parent().children()[1].children[0].children[0].children[0].attributes[0].nodeValue !== "") {
				$(this).parent().parent().children()[1].style.display = "block";
			}
		});

		sortUlLi.on("mouseleave", function () {
			// 根据当前元素获取它孩子的孩子的第一个元素即白色图片
			let oldNavImg = $(this).children()[0].children[1].attributes[0].nodeValue;
			$(this).children()[0].children[0].attributes[0].nodeValue = "./" + oldNavImg;
			// 悬停展开图片隐藏
			$(this).children()[1].style.display = "none";
		})
	})();

	
	// 左侧和右侧导航栏显隐及回到顶部
	(function() {
		// 左侧导航栏
		var leftSideBar = $(".left_sidebar");
		// 右侧导航栏
		var sortDiv = $(".sort");
		// 回到顶部图片
		var moveTop = $("#moveTop");
		// 滚动条事件
		window.onscroll = function() {
			if ($("html").scrollTop() > 500) {
				sortDiv.css("display", "block");
				leftSideBar.css("display", "block");
			} else {
				sortDiv.css("display", "none");
				leftSideBar.css("display", "none");
			}
			if ($("html").scrollTop() > $(document).height()-$(window).height() - 250) {
				leftSideBar.css("display", "none");
			}
		};
		moveTop.on("click", function () {
			$("html").animate({
				"scrollTop": "0px"
			}, 1000);
		});
	})();


});
