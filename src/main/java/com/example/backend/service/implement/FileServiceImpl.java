package com.example.backend.service.implement;

import com.example.backend.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {

        if (file.isEmpty()) return null;

        // 파일의 오리지널 이름 ex)중간고사.png
        String originFileName = file.getOriginalFilename();
        // 확장자 만 저장 ) 오리지널 파일 이름에서 . 다음 만 저장
        String extension = originFileName.substring(originFileName.lastIndexOf("."));
        // 랜덤 UUID 생성
        String uuid = UUID.randomUUID().toString();
        // 저장할 파일 이름 = 랜덤 uuid + 파일 확장자
        String saveFileName = uuid + extension;
        // 저장할 경로
        String savePath = filePath + saveFileName;

        try {
            file.transferTo(new File(savePath));
        }catch (Exception e) {
            e.printStackTrace();
            return  null;
        }

        String url = fileUrl + saveFileName;

        return url;

    }

    @Override
    public Resource getImage(String fileName) {

        Resource resource = null;

        try {
            resource = new UrlResource("file:" + filePath + fileName);
        }catch (Exception e) {
            e.printStackTrace();
            return  null;
        }

        return resource;
    }
}
