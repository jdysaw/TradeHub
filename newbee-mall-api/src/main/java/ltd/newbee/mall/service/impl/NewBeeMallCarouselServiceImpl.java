package ltd.newbee.mall.service.impl;

import ltd.newbee.mall.api.mall.vo.NewBeeMallIndexCarouselVO;
import ltd.newbee.mall.common.ServiceResultEnum;
import ltd.newbee.mall.dao.CarouselMapper;
import ltd.newbee.mall.dao.MallFileMapper;
import ltd.newbee.mall.entity.Carousel;
import ltd.newbee.mall.entity.MallFile;
import ltd.newbee.mall.service.NewBeeMallCarouselService;
import ltd.newbee.mall.util.BeanUtil;
import ltd.newbee.mall.util.PageQueryUtil;
import ltd.newbee.mall.util.PageResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class NewBeeMallCarouselServiceImpl implements NewBeeMallCarouselService {

    private static final Logger logger = LoggerFactory.getLogger(NewBeeMallCarouselServiceImpl.class);

    @Autowired
    private CarouselMapper carouselMapper;

    @Autowired
    private MallFileMapper mallFileMapper;


    @Override
    public PageResult getCarouselPage(PageQueryUtil pageUtil) {
        List<Carousel> carousels = carouselMapper.findCarouselList(pageUtil);
        int total = carouselMapper.getTotalCarousels(pageUtil);
        PageResult pageResult = new PageResult(carousels, total, pageUtil.getLimit(), pageUtil.getPage());
        return pageResult;
    }

    @Override
    public String saveCarousel(Carousel carousel) {
        if (carouselMapper.insertSelective(carousel) > 0) {
            return ServiceResultEnum.SUCCESS.getResult();
        }
        return ServiceResultEnum.DB_ERROR.getResult();
    }

    @Override
    public String updateCarousel(Carousel carousel) {
        Carousel temp = carouselMapper.selectByPrimaryKey(carousel.getCarouselId());
        if (temp == null) {
            return ServiceResultEnum.DATA_NOT_EXIST.getResult();
        }
        temp.setCarouselRank(carousel.getCarouselRank());
        temp.setRedirectUrl(carousel.getRedirectUrl());
        temp.setCarouselUrl(carousel.getCarouselUrl());
        temp.setUpdateTime(new Date());
        if (carouselMapper.updateByPrimaryKeySelective(temp) > 0) {
            return ServiceResultEnum.SUCCESS.getResult();
        }
        return ServiceResultEnum.DB_ERROR.getResult();
    }

    @Override
    public Carousel getCarouselById(Integer id) {
        return carouselMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean deleteBatch(Long[] ids) {
        if (ids.length < 1) {
            return false;
        }

        // 查询所有轮播图，提取关联的图片ID
        List<Carousel> carousels = carouselMapper.selectByIds(ids);
        List<Long> fileIds = new ArrayList<>();
        for (Carousel carousel : carousels) {
            if (carousel.getCarouselUrl() != null && carousel.getCarouselUrl().startsWith("/db-file/")) {
                String fileIdStr = carousel.getCarouselUrl().substring(9); // 移除 "/db-file/" 前缀
                try {
                    fileIds.add(Long.parseLong(fileIdStr));
                } catch (NumberFormatException e) {
                    logger.warn("Invalid file ID format in carousel URL: {}", carousel.getCarouselUrl());
                }
            }
        }

        // 先删除图片
        if (!fileIds.isEmpty()) {
            mallFileMapper.deleteBatch(fileIds.toArray(new Long[0]));
        }

        // 再删除轮播图
        return carouselMapper.deleteBatch(ids) > 0;
    }

    @Override
    public List<NewBeeMallIndexCarouselVO> getCarouselsForIndex(int number) {
        List<NewBeeMallIndexCarouselVO> newBeeMallIndexCarouselVOS = new ArrayList<>(number);
        List<Carousel> carousels = carouselMapper.findCarouselsByNum(number);
        if (!CollectionUtils.isEmpty(carousels)) {
            newBeeMallIndexCarouselVOS = BeanUtil.copyList(carousels, NewBeeMallIndexCarouselVO.class);
        }
        return newBeeMallIndexCarouselVOS;
    }
}
