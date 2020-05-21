var columns = [
{
field : 'selectItem',
radio : true
},
{
title : '分类id',
field : 'id',
visible : false,
align : 'center',
valign : 'middle',
width : '80px'
},
{
title : '分类名称',
field : 'name',
align : 'center',
valign : 'middle',
sortable : true,
width : '180px'
},
{
title : '上级分类',
field : 'parentName',
align : 'center',
valign : 'middle',
sortable : true,
width : '180px'
},
{
title : '排序号',
field : 'sort',
align : 'center',
valign : 'middle',
sortable : true,
width : '100px'
}];//treegrid控件，定义table表头及每列元素数据信息
$(function(){
	$("#formHead").on("click",".btn-delete",doDeleteObject)
				.on("click",".btn-add",doLoadEditPage)
	doGetObjects();
});
function doGetObjects(){
	var tableId = "typeTable";
	var url = "type/doFindObjects.do";
	//TreeTable是在tree.table.js中定义的
	var table = new TreeTable(tableId,url,columns);
	//设置从哪一列上展开树结构(0表示第一列)
	table.setExpandColumn(2);
	//初始化table对象(底层会发起异步请求获得数据然后跟新页面)
	table.init();
};
function doDeleteObject(){
	//1、获得选中的id值
	var id = getSelectedId();
	
	if(!id){
		alert("请先选择");
		return;
	}
	
	//2、根据id值删除分类信息
	var url = "type/doDeleteObject.do";
	var params = {"id":id};
	$.post(url,params,function(result){
		if(result.state==1){
			alert(result.message);
			doGetObjects();
		}else{
			alert(result.message);
		}
	});
};
function getSelectedId(){
	//1、获得选中的记录(返回值是一个数组)
	var selections = 
	$("#typeTable").bootstrapTreeTable("getSelections");//jquery.treegrid.extension.js
	console.log(selections);

	//2、判定是否有选中
	if(selections.length==0){
		//alert("请先选择");
		return;
	}
	//3、获得选中记录的id
	return selections[0].id;
};
function doLoadEditPage(){
	var url = "type/editUI.do";
	$(".content").load(url,function(){
		$("#pageTitle").html("添加分类");
	});
};






