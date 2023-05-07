package project.capstone.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.controller.dto.SignInRequestDto;
import project.capstone.controller.dto.SignUpRequestDto;
import project.capstone.controller.dto.SignInDto;
import project.capstone.controller.dto.SignUpResponseDto;
import project.capstone.entity.Admin;
import project.capstone.entity.Member;
import project.capstone.entity.SignCheck;
import project.capstone.repository.AdminRepository;
import project.capstone.repository.MemberRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final AdminRepository adminRepository;

    @Transactional
    public SignUpResponseDto signUp(SignUpRequestDto signUpDto) {
//        회원가입 성공
        if (validateSignUp(signUpDto)) {
            Admin admin = adminRepository.findByAdminId(signUpDto.getSu_adminId());
            admin.setSigned();

            Member member = new Member(signUpDto.getSu_name(), signUpDto.getSu_nickname(), signUpDto.getSu_password(), signUpDto.getSu_phone(), signUpDto.getSu_email(),admin);
            Member savedMember = memberRepository.save(member);
            return new SignUpResponseDto(savedMember.getNickname(), savedMember.getAdmin().getAdminId());
        }
//        회원가입 실패
        else {
            String nickname = signUpDto.getSu_nickname();
            Admin admin = adminRepository.findByAdminId(signUpDto.getSu_adminId());
            if (!validateMember(signUpDto)) {
                nickname = null;
            }

            if (!validateAdmin(signUpDto)) {
                return new SignUpResponseDto(nickname, null);
            }

                return new SignUpResponseDto(nickname, admin.getAdminId());
        }
    }

    public SignInDto signIn(SignInRequestDto requestDto) {
        String nickname = requestDto.getNickname();
        String pw = requestDto.getPw();

        Member member = memberRepository.findByNicknameAndPassword(nickname, pw);
        if (member != null) {
            return new SignInDto(nickname, pw);
        }
        else return new SignInDto();
    }

    private boolean validateSignUp(SignUpRequestDto signUpDto) {
        if(validateMember(signUpDto) && validateAdmin(signUpDto))
            return true;
        else
            return false;
    }

    /**
     * adminId 가 존재하지 않거나 해당 Id가 이미 가입이 되어 있는 상태라면 false
     */
    public boolean validateAdmin(SignUpRequestDto signUpDto) {
        Admin admin = adminRepository.findByAdminId(signUpDto.getSu_adminId());
        if (admin == null || admin.getSignCheck().equals(SignCheck.SIGNED)) {
            System.out.println("validateAdmin 실패!");
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * 가입하고자 하는 nickname이 존재하면 false
     */
    private boolean validateMember(SignUpRequestDto signUpDto) {
        List<Member> members = memberRepository.findByNickname(signUpDto.getSu_nickname());
        if (members.isEmpty()) {
            System.out.println("validateMember 실패!");
            return true;
        }
        else {
            return false;
        }
    }
}
