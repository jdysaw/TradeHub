package ltd.newbee.mall.entity;

/**
 * 文件上传实体类
 * 用于存储图片的Base64数据到数据库
 */
public class MallFile {
    
    /**
     * 主键id
     */
    private Long fileId;
    
    /**
     * 文件名
     */
    private String fileName;
    
    /**
     * 文件后缀
     */
    private String fileSuffix;
    
    /**
     * 文件Base64内容
     */
    private String fileContent;
    
    /**
     * 创建时间
     */
    private String createTime;

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileSuffix() {
        return fileSuffix;
    }

    public void setFileSuffix(String fileSuffix) {
        this.fileSuffix = fileSuffix;
    }

    public String getFileContent() {
        return fileContent;
    }

    public void setFileContent(String fileContent) {
        this.fileContent = fileContent;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "MallFile{" +
                "fileId=" + fileId +
                ", fileName='" + fileName + '\'' +
                ", fileSuffix='" + fileSuffix + '\'' +
                ", createTime='" + createTime + '\'' +
                '}';
    }
}
