$(document).ready(function(){
	$("#queryFormId").on("click",".btn-search",doQueryObjects)
	.on("click",".btn-invalid,.btn-valid",doValidById)
	doGetObjects();
});
	
function doGetObjects(){
	//var url="project/doGetObjects.do";
	var url="project/doGetPageObjects.do";
	var pageCurrent =$("#pageId").data("pageCurrent");
	if(!pageCurrent)pageCurrent=1;
	var params = {"pageCurrent":pageCurrent};
	params.name=$("#searchNameId").val();
	params.valid=$("#searchValidId").val();
	console.log(params);
	$.getJSON(url,params,function(result){
		console.log(result);
		setTableBodyRows(result.list);
		setPagination(result.pageObject);
	})
}
function setTableBodyRows(result){
	var tBody=$("#tbodyId");
	tBody.empty();
	for(var i in result){
		var tr =$("<tr></tr>");
		var tds ="<td><input type='checkbox' name='checkId' value='"+result[i].id+"'></td>"+
		         "<td>"+result[i].code+"</td>"+
		         "<td>"+result[i].name+"</td>"+
		         "<td>"+result[i].beginDate+"</td>"+
		         "<td>"+result[i].endDate+"</td>"+
		         "<td>"+(result[i].valid?"有效":"无效")+"</td>"+
		         "<td><input type='button' class='btn btn-success' value='修改'</td>";
		tr.append(tds);
		tBody.append(tr);
	}	
}
function doQueryObjects(){
	//1、初始化当前页码数据
	$("#pageId").data("pageCurrent",1);
	//2、根据条件查询数据
	doGetObjects();
}
function doValidById(){
	var valid;
	if($(this).hasClass("btn-valid")){
		valid=1;//启用
	}
	if($(this).hasClass("btn-invalid")){
		valid=0;//禁用
	}
	var ids="";
	$("#tbodyId input[name='checkId']")
	.each(function(){
		if($(this).prop("checked")){
			if(ids==""){
				ids+=$(this).val();
			}else{
				ids+=","+$(this).val();
			}
		}
	});
//	console.log("valid="+valid);
//	console.log("ids="+ids);
	if(ids==""){
		alert("请至少选择一个");
		return;
	}
	var url ="project/doValidById.do";
	var params = {"valid":valid,"ids":ids};
	$.post(url,params,function(){
		doGetObjects();
	})
}
