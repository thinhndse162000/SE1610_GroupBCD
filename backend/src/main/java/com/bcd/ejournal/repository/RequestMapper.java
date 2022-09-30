package com.bcd.ejournal.repository;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.dto.request.ReviewReportSearchRequest;
import com.bcd.ejournal.domain.entity.Paper;
import com.bcd.ejournal.domain.entity.ReviewReport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RequestMapper {
    @Select({"<script>",
            "SELECT * ",
            "FROM Paper ",
            "WHERE 1 = 1 ",
            "<if test='paperId != null and paperId != \"\" '> ",
            "AND PaperId = #{paperId} ",
            "</if>",
            "<if test='title != null and title != \"\" '> ",
            "AND Title = #{title} ",
            "</if>",
            "</script>"})
    List<Paper> search(PaperSearchRequest paper);

    @Select({"<script>",
            "SELECT * ",
            "FROM ReviewReport ",
            "WHERE 1 = 1 ",
            "<if test='reviewReportId != null and reviewReportId != \"\" '> ",
            "AND ReviewReportId = #{reviewReportId} ",
            "</if>",
            "<if test='paperId != null and paperId != \"\" '> ",
            "AND PaperId = #{paperId} ",
            "</if>",
            "</script>"})
    List<ReviewReport> searchReview(ReviewReportSearchRequest ReviewReport);

}
