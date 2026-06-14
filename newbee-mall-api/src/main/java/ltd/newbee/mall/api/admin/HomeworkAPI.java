package ltd.newbee.mall.api.admin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ltd.newbee.mall.util.Result;
import ltd.newbee.mall.util.ResultGenerator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 软件工程期末大作业测试类
 * 用于验证前后端接口的连通性以及测试功能的实现情况
 */
@RestController
@Api(value = "v1", tags = "大作业测试接口")
@RequestMapping("/api/v1")
public class HomeworkAPI {

    /**
     * 大作业连通性测试接口
     * 接收前端的GET请求并返回作业验证信息
     *
     * @return 返回封装好的测试结果字符串
     */
    @GetMapping("/homework/test")
    @ApiOperation(value = "大作业测试接口", notes = "用于期末项目连通性测试")
    public Result<String> homeworkTest() {
        return ResultGenerator.genSuccessResult("期末大作业测试成功！前后端连接正常。");
    }
}
