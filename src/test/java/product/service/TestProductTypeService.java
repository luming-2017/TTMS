package product.service;

import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import cn.tedu.ttms.product.service.ProductTypeService;

public class TestProductTypeService extends TestBase{
	
	@Test
	public void testFindObjects(){
		//1.获得productTypeService对象
		ProductTypeService productTypeService = ctx.getBean("productTypeServiceImpl", ProductTypeService.class);
		//2.执行productTypeService对象的findObjects方法
		List<Map<String, Object>> list = productTypeService.findObjects();
		//3.验证结果是否正确
		Assert.assertNotEquals(0, list.size());
		//4.输出执行结果
		System.out.println(list);
	}

}
