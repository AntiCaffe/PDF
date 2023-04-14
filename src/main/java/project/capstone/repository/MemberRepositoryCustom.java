package project.capstone.repository;

import project.capstone.controller.dto.MemberResponseDto;

public interface MemberRepositoryCustom {

    public MemberResponseDto findByNicknameAndPassword(String nickname, String password);

}
