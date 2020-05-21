package cn.tedu.ttms.product.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.tedu.ttms.product.entity.Project;

public interface ProjectDao {
	List<Project> findObjects();
//	List<Project> findPageObjects(@Param("startIndex")int startIndex,@Param("pageSize")int pageSize);
	List<Project> findPageObjects(@Param("name")String name,@Param("valid")Integer valid,
			@Param("startIndex")int startIndex,@Param("pageSize")int pageSize);
	
	int getRowCount(@Param("name")String name,@Param("valid")Integer valid);
//	int getRowCount();
	
	int validById(@Param("valid")Integer valid,@Param("ids")String[] ids);
	
	int insertObject(@Param("entity")Project entity);
	
	Project findObjectById(Integer id);
	
	int updateObject(Project entity);
}
