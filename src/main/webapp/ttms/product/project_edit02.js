$(function(){
	$("#modal-dialog")
		//模态框的.ok按钮上注册点击事件
		.on("click",".ok",doSaveOrUpdate);
	//在模态框隐藏后移除ok上注册的事件，防止数据多次提交
	$("#modal-dialog").on("hidden.bs.modal",function(){
		console.log("==hidden.bs.modal==")
		$("#modal-dialog").off("click",".ok");
		//模态框隐藏时移除绑定的idKey(为什么?)
		$("#modal-dialog").removeData("idKey");
	});
	//获取模态框上绑定的值
	var id = $("#modal-dialog").data("idKey");
	if(id){
		doFindObjectById(id);
	}
});
/*添加或修改数据*/
function doSaveOrUpdate(){
	//0、验证表单数据释放为空
	if(!$("#editFormId").valid())return;
	//1、获得表单数据
	var params = getEditFormData();
	console.log(params);
	//2、异步提交表单数据
	var insertUrl = "project/doSaveObject.do";
	var updateUrl = "project/doUpdateObject.do";
	//获取模态框上绑定的id值
	var id = $("#modal-dialog").data("idKey");
	//根据id判定是insert还是update
	var url = id?updateUrl:insertUrl;
	//在修改时需要id值，所以假如是修改需要动态添加id
	if(id){
		params.id = id;
	}
	$.post(url,params,function(result){
		if(result.state==1){
			//隐藏模态框
			$("#modal-dialog").modal("hide");
			//显示相关信息
			alert(result.message);
			//重新查询数据
			doGetObjects();
		}else{
			alert(result.message);
		}
	});
};
function getEditFormData(){
	//1.获得页面上用户输入的数据,封装为json对象(相对比较灵活)
	  var params={//根据id获得数据
		  "name":$("#nameId").val(),
		  "code":$("#codeId").val(),
		  "beginDate":$("#beginDateId").val(),
		  "endDate":$("#endDateId").val(),
		  "valid":$('input[name="valid"]:checked').val(),
		  "note":$("#noteId").val()
	  };//JSON对象

	//2.返回json对象
	  return params;
};
/*根据id执行查询操作*/
function doFindObjectById(id){
	var url="project/doFindObjectById.do";
	var params ={"id":id};
	$.post(url,params,function(result){
		if(result.state==1){
			doInitEditFormData(result.data);
		}else{
			alert(result.message);
		}
	});
};
/*修改初始化表单数据*/
function doInitEditFormData(obj){
	$("#nameId").val(obj.name);
	$("#codeId").val(obj.code);
	$("#beginDateId").val(obj.beginDate);
	$("#endDateId").val(obj.endDate);
	$("#noteId").html(obj.note);
	$("#editFormId input[name='valid']")//radio
	//迭代input标签中name为valid的dom对象
	.each(function(){
		//假如这个对象的值等于obj.valid的值
		//则让其选中.
		if($(this).val()==obj.valid){
		   //设置radio对象的checked属性为true
		   $(this).prop("checked",true)
		}
	});
}