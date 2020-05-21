package cn.tedu.ttms.product.service;

import java.util.List;
import java.util.Map;

import cn.tedu.ttms.product.entity.Project;

public interface ProjectService {
	List<Project> findObjects();
	
	Map<String, Object> findPageObjects(String name,Integer valid,int pageCurrent);
//	Map<String, Object> findPageObjects(int pageCurrent);
	
	void validById(Integer valid,String ids);
	/**
	 * 添加项目信息
	 * @param entity
	 */
	void saveObject(Project entity);
	
	Project findObjectById(Integer id);
	
	void updateObject(Project entity);
}
