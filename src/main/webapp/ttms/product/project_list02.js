$(document).ready(function(){
	$("#queryFormId").on("click",".btn-search",doQueryObjects)
					 .on("click",".btn-invalid,.btn-valid",doValidById)
					 .on("click",".btn-add,.btn-update",doLoadEditPage)
	doGetObjects();
});
function doGetObjects(){
	//var url = "project/doGetObjects.do";
	var url = "project/doGetPageObjects.do";
	var pageCurrent =$("#pageId").data("pageCurrent");
	if(!pageCurrent)pageCurrent=1;
	var params = {"pageCurrent":pageCurrent};
	params.name=$("#searchNameId").val();
	params.valid=$("#searchValidId").val();
	console.log(params);
	$.getJSON(url,params,function(result){
		if(result.state==1){
			console.log(result);
			setTableBodyRows(result.data.list);
			setPagination(result.data.pageObject);
		}else{
			alert(result.message);
		}
		
	});
};
function setTableBodyRows(result){
	console.log(result);
	var tBody=$("#tbodyId");
	tBody.empty();
	for(var i in result){
		var tr =$("<tr></tr>");
		tr.data("id",result[i].id);
		var tds ="<td><input type='checkbox' name='checkId' value='"+result[i].id+"'></td>"+
		         "<td>"+result[i].code+"</td>"+
		         "<td>"+result[i].name+"</td>"+
		         "<td>"+result[i].beginDate+"</td>"+
		         "<td>"+result[i].endDate+"</td>"+
		         "<td>"+(result[i].valid?"有效":"无效")+"</td>"+
		         "<td><input type='button' class='btn btn-success btn-update' value='修改'</td>";
		tr.append(tds);
		tBody.append(tr);
	}	
};
function doQueryObjects(){
	//1、初始化当前页码数据
	$("#pageId").data("pageCurrent",1);
	//2、根据条件查询数据
	doGetObjects();
};
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
	console.log("valid="+valid);
	console.log("ids="+ids);
	if(ids==""){
		alert("请至少选择一个");
		return;
	}
	
	var url = "project/doValidById.do";
	var params = {"valid":valid,"ids":ids};
	$.post(url,params,function(result){
		if(result.state==1){
			alert(result.message);
			doGetObjects();
		}else{
			alert(result.message);
		}
		
	});
};
//加载编辑页面
function doLoadEditPage(){
	//定义访问编辑页面的url地址
	var url = "project/editUI.do";
	var title;
	if($(this).hasClass("btn-add")){
		title = "添加项目信息";
	}
	if($(this).hasClass("btn-update")){
		//将获得的要修改记录的id值绑定到模态框对象上
		//为什么要绑定这个id值
		//目的是根据模态框的这个id值判定是要执行添加还是修改
		var idValue=$(this).parent().parent().data("id");
		$("#modal-dialog").data("idKey",idValue);
		title = "修改项目信息,id="+idValue;
	}
	//在模态框中异步加载显示编辑页面。
	//本项目中模态框的定义在index.jsp中，而且默认是隐藏的。
	$("#modal-dialog .modal-body").load(url,function(){
		$("#myModalLabel").html(title);
		$("#modal-dialog").modal("show");
	});
}