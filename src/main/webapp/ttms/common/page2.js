$(document).ready(function(){
	$("#pageId").on("click",".first,.pre,.next,.last",jumpToPage)
})
function setPagination(pageObject){
	$(".pageCount").html("总页数("+pageObject.pageCount+")");
	$(".pageCurrent").html("当前页("+pageObject.pageCurrent+")");
	$("#pageId").data("pageCount",pageObject.pageCount);
	$("#pageId").data("pageCurrent",pageObject.pageCurrent);
}
function jumpToPage(){
		var clazz = $(this).attr("class");
		//获得pageId对象上绑定的pageCurrent对应的值
		var pageCurrent=$('#pageId').data("pageCurrent");
		//获得pageId对象上绑定的pageCount对应的值
		var pageCount=$('#pageId').data("pageCount")
		if(clazz=="pre"&&pageCurrent>1){
			pageCurrent--;
		}
		if(clazz=="next"&&pageCurrent<pageCount){
			pageCurrent++;
		}
		if(clazz=="first"){
			pageCurrent=1;
		}
		if(clazz=="last"){
			pageCurrent=pageCount;
		}
		$("#pageId").data("pageCurrent",pageCurrent);
		doGetObjects();
	}