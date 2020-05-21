package cn.tedu.ttms.product.dao;

import java.util.List;
import java.util.Map;

import cn.tedu.ttms.common.vo.Node;
import cn.tedu.ttms.product.entity.ProductType;

public interface ProductTypeDao {
	 List<Map<String,Object>> findObjects();
	 /**
	  * 判定此id下是否有子元素
	  * @param id
	  * @return 返回值为0表示没有子元素
	  */
	 int hasChilds(Integer id);
	 /**
	  * 根据id删除分类信息
	  * @param id
	  * @return
	  */
	 int deleteObject(Integer id);
	 
	 List<Node> findZtreeNodes();
	 int insertObject(ProductType entiry);
}
