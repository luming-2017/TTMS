package product.service;

import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.tedu.ttms.common.web.PageObject;
import cn.tedu.ttms.product.entity.Project;
import cn.tedu.ttms.product.service.ProjectService;

public class TestProjectService {
	ClassPathXmlApplicationContext ctx;
	
	@Before
	public void init(){
		ctx = new ClassPathXmlApplicationContext("spring-mvc.xml","spring-mybatis.xml");
	}
	@Test
	public void testFindObjects(){
		ProjectService projectService = ctx.getBean("projectServiceImpl", ProjectService.class);
		List<Project> list = projectService.findObjects();
		//3、验证结果是否正确
		Assert.assertNotEquals(0, list.size());
		//4、输出执行结果
		System.out.println(list);	
	}
	@Test
	public void testFindPageObjects(){
		ProjectService projectService = ctx.getBean("projectServiceImpl", ProjectService.class);
		Map<String, Object> map = projectService.findPageObjects("环球",1,1);
		List<Project> list = (List<Project>) map.get("list");
		PageObject pageObject = (PageObject) map.get("pageObject");
		Assert.assertEquals(1, list.size());
		Assert.assertEquals(1, pageObject.getPageCount());
		System.out.println(list);
	}
	@Test
	public void testValidById(){
		ProjectService projectService = ctx.getBean("projectServiceImpl", ProjectService.class);
		Integer valid = 1;
		String ids = "1,3,4";
		projectService.validById(valid, ids);
	}
	@After
	public void destory(){
		ctx.close();
	}

}
