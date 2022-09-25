package com.bcd.ejournal.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.bcd.ejournal.domain.dto.request.PaperSearchRequest;
import com.bcd.ejournal.domain.entity.Paper;

@Mapper
public interface PaperMapper {
	@Select ({"<script>",
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
	
}
