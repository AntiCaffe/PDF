package project.capstone.data;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.capstone.entity.Admin;
import project.capstone.repository.AdminRepository;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.create10AdminId();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService{
        private final AdminRepository adminRepository;

        public void create10AdminId() {
            for (int i = 1; i < 10; i++) {
                String generateKey = generateRandomKey();
                adminRepository.save(new Admin(generateKey));
            }
            adminRepository.save(new Admin("test_admin1"));
            adminRepository.save(new Admin("test_admin2"));
        }

        private String generateRandomKey() {
            int leftLimit = 48; // numeral '0'
            int rightLimit = 122; // letter 'z'
            int targetStringLength = 10;
            Random random = new Random();
            String generatedString = random.ints(leftLimit, rightLimit + 1)
                    .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                    .limit(targetStringLength)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();
            return generatedString;
        }
    }
}
