package cn.tedu.ttms.product.controller;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.swing.plaf.ListUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.tedu.ttms.common.exception.ServiceException;
import cn.tedu.ttms.common.web.JsonResult;
import cn.tedu.ttms.product.entity.Project;
import cn.tedu.ttms.product.service.ProjectService;

@Controller
@RequestMapping("/project/")
public class ProjectController {
	private Logger log = Logger.getLogger(ProjectController.class.getName());
	
	@Autowired
	private ProjectService projectService;
	
	@RequestMapping("listUI")
	public String ListUI(){
		return "product/project_list";
	}
	
	@RequestMapping("doGetObjects")
	@ResponseBody
	public List<Project> doGetObjects(){
		log.info("projectService="+projectService);
		List<Project> list = projectService.findObjects();
		return list;
	}
	//控制层异常的统一处理或封装为cn.tedu.ttms.common.exception.ControllerExceptionHandler
//	@ExceptionHandler(ServiceException.class)
//	@ResponseBody
//	public JsonResult handleServiceException(ServiceException e){
//		e.printStackTrace();
//		return new JsonResult(e);
//	}
	
	@RequestMapping("doGetPageObjects")
	@ResponseBody
	public JsonResult doGetPageObjects(String name,Integer valid,Integer pageCurrent){
		log.info("projectService="+projectService);
		Map<String, Object> map = projectService.findPageObjects(name,valid,pageCurrent);
		log.info("map="+map);
		return new JsonResult(map);
	}
//	public Map<String ,Object> doGetPageObjects(Integer pageCurrent){
//		Map<String, Object> map = projectService.findPageObjects(pageCurrent);
//		return map;	
//	}
	
	@RequestMapping("doValidById")
	@ResponseBody
	public JsonResult validById(Integer valid,String ids){
		projectService.validById(valid, ids);
		return new JsonResult(valid==1?"启用OK":"禁用OK");
	}

	@RequestMapping("editUI")
	public String EditUI(){
		return "product/project_edit";
	}
	
	@RequestMapping("doSaveObject")
	@ResponseBody
	public JsonResult doSaveObject(Project entity){
		projectService.saveObject(entity);
		return new JsonResult("insert ok");
	}
	
	@RequestMapping("doFindObjectById")
	@ResponseBody
	public JsonResult doFindObjectById(Integer id){
		Project project = projectService.findObjectById(id);
		return new JsonResult(project);
	}
	@RequestMapping("doUpdateObject")
	@ResponseBody
	public JsonResult doUpdateObject(Project entity){
		projectService.updateObject(entity);
		return new JsonResult("更新OK");
	}
}
