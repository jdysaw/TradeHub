package ltd.newbee.mall.api.admin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import ltd.newbee.mall.config.annotation.TokenToAdminUser;
import ltd.newbee.mall.dao.MallFileMapper;
import ltd.newbee.mall.entity.AdminUserToken;
import ltd.newbee.mall.entity.MallFile;
import ltd.newbee.mall.util.Result;
import ltd.newbee.mall.util.ResultGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@Api(value = "v1", tags = "8-7.后台管理系统文件上传接口")
@RequestMapping("/manage-api/v1")
public class NewBeeAdminUploadAPI {

    private static final Logger logger = LoggerFactory.getLogger(NewBeeAdminUploadAPI.class);

    @Autowired
    private StandardServletMultipartResolver standardServletMultipartResolver;
    
    @Autowired
    private MallFileMapper mallFileMapper;

    /**
     * 图片上传 - 存储到数据库
     */
    @RequestMapping(value = "/upload/file", method = RequestMethod.POST)
    @ApiOperation(value = "单图上传", notes = "file Name \"file\"")
    public Result upload(HttpServletRequest httpServletRequest, @RequestParam("file") MultipartFile file, @TokenToAdminUser AdminUserToken adminUser) throws URISyntaxException {
        logger.info("adminUser:{}", adminUser.toString());
        String fileName = file.getOriginalFilename();
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        
        try {
            // 将文件转换为Base64
            byte[] fileBytes = file.getBytes();
            String base64Content = Base64.getEncoder().encodeToString(fileBytes);
            
            // 创建文件实体
            MallFile mallFile = new MallFile();
            mallFile.setFileName(fileName);
            mallFile.setFileSuffix(suffixName);
            mallFile.setFileContent(base64Content);
            
            // 保存到数据库
            int insertResult = mallFileMapper.insert(mallFile);
            if (insertResult < 1) {
                return ResultGenerator.genFailResult("文件上传失败");
            }
            
            // 返回数据库中的文件ID，前端通过这个ID获取图片
            Result resultSuccess = ResultGenerator.genSuccessResult();
            resultSuccess.setData("/db-file/" + mallFile.getFileId());
            return resultSuccess;
        } catch (IOException e) {
            e.printStackTrace();
            return ResultGenerator.genFailResult("文件上传失败");
        }
    }

    /**
     * 图片上传 - 多图上传存储到数据库
     */
    @RequestMapping(value = "/upload/files", method = RequestMethod.POST)
    @ApiOperation(value = "多图上传", notes = "wangEditor图片上传")
    public Result uploadV2(HttpServletRequest httpServletRequest, @TokenToAdminUser AdminUserToken adminUser) throws URISyntaxException {
        logger.info("adminUser:{}", adminUser.toString());
        List<MultipartFile> multipartFiles = new ArrayList<>(8);
        if (standardServletMultipartResolver.isMultipart(httpServletRequest)) {
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) httpServletRequest;
            Iterator<String> iter = multiRequest.getFileNames();
            int total = 0;
            while (iter.hasNext()) {
                if (total > 5) {
                    return ResultGenerator.genFailResult("最多上传5张图片");
                }
                total += 1;
                MultipartFile file = multiRequest.getFile(iter.next());
                multipartFiles.add(file);
            }
        }
        if (CollectionUtils.isEmpty(multipartFiles)) {
            return ResultGenerator.genFailResult("参数异常");
        }
        if (multipartFiles != null && multipartFiles.size() > 5) {
            return ResultGenerator.genFailResult("最多上传5张图片");
        }
        List<String> fileNames = new ArrayList(multipartFiles.size());
        for (int i = 0; i < multipartFiles.size(); i++) {
            String fileName = multipartFiles.get(i).getOriginalFilename();
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            try {
                // 将文件转换为Base64
                byte[] fileBytes = multipartFiles.get(i).getBytes();
                String base64Content = Base64.getEncoder().encodeToString(fileBytes);
                
                // 创建文件实体
                MallFile mallFile = new MallFile();
                mallFile.setFileName(fileName);
                mallFile.setFileSuffix(suffixName);
                mallFile.setFileContent(base64Content);
                
                // 保存到数据库
                int insertResult = mallFileMapper.insert(mallFile);
                if (insertResult < 1) {
                    return ResultGenerator.genFailResult("文件上传失败");
                }
                
                // 添加到返回结果
                fileNames.add("/db-file/" + mallFile.getFileId());
            } catch (IOException e) {
                e.printStackTrace();
                return ResultGenerator.genFailResult("文件上传失败");
            }
        }
        Result resultSuccess = ResultGenerator.genSuccessResult();
        resultSuccess.setData(fileNames);
        return resultSuccess;
    }
    
    /**
     * 获取数据库中的图片 - 根据文件ID返回Base64图片
     */
    @RequestMapping(value = "/db-file/{fileId}", method = RequestMethod.GET)
    @ApiOperation(value = "获取数据库图片", notes = "根据文件ID获取Base64图片")
    public Result getFileById(@PathVariable("fileId") Long fileId) {
        try {
            MallFile mallFile = mallFileMapper.selectById(fileId);
            if (mallFile == null) {
                return ResultGenerator.genFailResult("文件不存在");
            }
            // 返回完整的 Base64 Data URL
            String base64Url = "data:image" + mallFile.getFileSuffix() + ";base64," + mallFile.getFileContent();
            Result resultSuccess = ResultGenerator.genSuccessResult();
            resultSuccess.setData(base64Url);
            return resultSuccess;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultGenerator.genFailResult("获取文件失败");
        }
    }

}
