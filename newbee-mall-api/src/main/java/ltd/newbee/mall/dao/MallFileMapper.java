package ltd.newbee.mall.dao;

import ltd.newbee.mall.entity.MallFile;
import org.apache.ibatis.annotations.Param;

/**
 * 文件上传 Mapper 接口
 */
public interface MallFileMapper {
    
    /**
     * 插入文件数据
     * @param mallFile 文件实体
     * @return 影响行数
     */
    int insert(MallFile mallFile);
    
    /**
     * 根据文件ID查询文件
     * @param fileId 文件ID
     * @return 文件实体
     */
    MallFile selectById(@Param("fileId") Long fileId);

    /**
     * 根据文件ID删除文件
     * @param fileId 文件ID
     * @return 影响行数
     */
    int deleteById(@Param("fileId") Long fileId);

    /**
     * 批量删除文件
     * @param fileIds 文件ID数组
     * @return 影响行数
     */
    int deleteBatch(@Param("fileIds") Long[] fileIds);
}
