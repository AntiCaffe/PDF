package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.CommentDto;
import project.capstone.controller.dto.ProfileDto;
import project.capstone.controller.vo.UpdateMemberVo;
import project.capstone.entity.Admin;
import project.capstone.entity.Comment;
import project.capstone.entity.Member;
import project.capstone.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final MemberRepository memberRepository;

    public ProfileDto searchProfile(String nickname) {
        Member member = memberRepository.findByNickname(nickname).get(0);
        List<Comment> comments = member.getComments();
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentDtos.add(CommentDto.builder()
                    .content(comment.getContent())
                    .itemId(comment.getItem().getId())
                    .build());
        }
        return ProfileDto.builder()
                .memberId(member.getId().toString())
                .name(member.getName())
                .nickname(member.getNickname())
                .pw(member.getPassword())
                .phone(member.getPhone())
                .email(member.getEmail())
                .adminId(member.getAdmin().getAdminId())
                .comments(commentDtos)
                .build();
    }

    public ProfileDto updatePW(String nickname, String pw) {
        List<Member> byNickname = memberRepository.findByNickname(nickname);
        Member member = byNickname.get(0);
        member.changePW(pw);
        List<Comment> comments = member.getComments();
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentDtos.add(CommentDto.builder()
                    .content(comment.getContent())
                    .itemId(comment.getItem().getId())
                    .build());
        }
        return ProfileDto.builder()
                .memberId(member.getId().toString())
                .name(member.getName())
                .nickname(member.getNickname())
                .pw(member.getPassword())
                .phone(member.getPhone())
                .email(member.getEmail())
                .adminId(member.getAdmin().getAdminId())
                .comments(commentDtos)
                .build();
    }

    public ProfileDto updateMember(UpdateMemberVo vo) {
        Member member = memberRepository.findByNickname(vo.getNickname()).get(0);
        member.changeInfo(vo.getEmail(), vo.getPhone());
        List<Comment> comments = member.getComments();
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            commentDtos.add(CommentDto.builder()
                    .content(comment.getContent())
                    .itemId(comment.getItem().getId())
                    .build());
        }
        return ProfileDto.builder()
                .memberId(member.getId().toString())
                .name(member.getName())
                .nickname(member.getNickname())
                .pw(member.getPassword())
                .phone(member.getPhone())
                .email(member.getEmail())
                .adminId(member.getAdmin().getAdminId())
                .comments(commentDtos)
                .build();
    }

    public void deleteMember(String nickname) {
        Member member = memberRepository.findByNickname(nickname).get(0);
        Admin admin = member.getAdmin();
        admin.setUnsigned();
        memberRepository.delete(member);
    }
}
