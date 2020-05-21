$(function(){
	$("#queryFormId").on("click",".btn-search",doQueryObjects)
	doGetObjects();
});
function doGetObjects(){
	var url = "team/doFindPageObjects.do?t="+Math.random();
	var params={name:$("#searchNameId").val()};//object
	var pageCurrent=$("#pageId").data("pageCurrent");
	if(!pageCurrent){pageCurrent=1;}
	params['pageCurrent']=pageCurrent;

	console.log(params);
	$.post(url,params,function(result){
		if(result.state==1){
			setTableBodyRows(result.data.list);
			setPagination(result.data.pageObject);
		}else{
			alert(result.message);
		}
	});
};
function setTableBodyRows(list){
	var tBody=$("#tbodyId");
	tBody.empty();
	var firstTd='<td><input type="checkbox" name="checkedItem" value="[id]"></td>';
	for(var i in list){//循环一次取一行
	 var tr=$("<tr></tr>");
	 tr.data("id",list[i].id);//绑定数据,便于修改时使用
	 tr.append(firstTd.replace("[id]",list[i].id));
	 tr.append("<td>"+list[i].name+"</td>");
	 tr.append("<td>"+list[i].projectName+"</td>");
	 tr.append("<td>"+(list[i].valid?"启用":"禁用")+"</td>")
	 tr.append('<td><button type="button" class="btn btn-default btn-update">修改</td>');
	 tBody.append(tr);
	}
};
function doQueryObjects(){
	//1、初始化当前页码数据
	$("#pageId").data("pageCurrent",1);
	//2、根据条件查询数据
	doGetObjects();
}
