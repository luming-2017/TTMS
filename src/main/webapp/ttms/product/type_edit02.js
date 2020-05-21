var zTree;
var setting = {
		data : {   
			simpleData : {
				enable : true,
				idKey : "id",  //节点数据中保存唯一标识的属性名称
				pIdKey : "parentId",  //节点数据中保存其父节点唯一标识的属性名称
				rootPId : null  //根节点id
			}
		}
}
$(function(){
	$("#editTypeForm #btn-return").click(function(){
		 doBack();
	});
	$("#editTypeForm").on("click",".load-product-type",loadZtreeNodes);
	$("#typeLayer").on("click",".btn-cancle,.btn_cancle",doHideZtree)
	 				.on("click",".btn-confirm",doSetType)
	$("#btn-save").click(function(){
		doSaveOrUpdate();
	});			
});
function doBack(){
	var url="type/listUI.do?t="+Math.random(1000);
	$(".content").load(url);
};
/*编辑编辑页面的上级分类表单元素时执行此函数*/
function loadZtreeNodes(){
	//显示ztree窗口
	$("#typeLayer").css("display","block");	
	//异步加载数据
	var url = "type/doFindZtreeNodes.do";
	$.getJSON(url,function(result){
		if(result.state==1){
			//jquery.zTree.js
			zTree=$.fn.zTree.init($("#typeTree"),setting,result.data);
		}else{
			alert(result.message);
		}
	});
};
/*隐藏zTree*/
function doHideZtree(){
	$("#typeLayer").css("display","none");
};
/*设置上级分类信息*/
function doSetType(){
	//1、获得选中的数据信息
	//FAQ:当此处报getSelectedNodes方法未定义(undefine)
	//首先检查方法名，自此检测zTree是否已赋值
	var nodes = zTree.getSelectedNodes();
	console.log(nodes[0].id);
	//2、将数据信息填充在form表单中
	$("#parentNameId").val(nodes[0].name);
	$("#parentNameId").data("parentId",nodes[0].id);
	//3、隐藏zTee对象。
	doHideZtree();
};
function doSaveOrUpdate(){
	//1、获取表单数据
	if(!$("#editTypeForm").valid()){
		return;
	}
	var params = getEditFormData();
	//2、保存数据
	var url = "type/doSaveObject.do";
	$.post(url,params,function(result){
		if(result.state==1){
			doGetObjects();//不要这么写，建议“返回”
			alert(result.message);
			doBack();
		}else{
			alert(result.message);
		}
	})
};
function getEditFormData(){
	var params = {
			name:$("#typeNameId").val(),
			parentId:$("#parentNameId").data("parentId"),
			sort:$("#typeSortId").val(),
			note:$("#typeNoteId").val()
	};
	return params;
};







