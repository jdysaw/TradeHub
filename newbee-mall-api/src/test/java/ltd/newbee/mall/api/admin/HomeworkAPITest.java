package ltd.newbee.mall.api.admin;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * 大作业接口测试类
 * 验证大作业测试接口是否能够正常返回预期的结果
 */
@SpringBootTest
@AutoConfigureMockMvc
public class HomeworkAPITest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * 测试 homeworkTest 接口
     * 验证是否能成功响应HTTP 200并返回预期的文本
     */
    @Test
    public void testHomeworkEndpoint() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/homework/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("期末大作业测试成功！前后端连接正常。"));
    }
}
