## Project 사용 규칙 ##

리포지토리의 구성과 제대로된 협업 경험을 위해 귀찮을수있더라도 최소한의 형식을 지켜주시면 감사하겠습니다.

### Project 노트의 체크리스트 사용 규칙 및 Git commit 주기 ###
1. 원칙적으로 Project 탭의 체크리스트 작업 하나를 완료했을 때마다 commit 합니다.
2. 작업상황상 또는 코드정리 면에서 불가피하게 체크리스트 여러 개를 합쳐서 commit해야 하거나, 그 편이 더 용이한 경우, 여러 체크리스트 항목을 한꺼번에 commit 하는 것도 허용합니다.
3. 모든 체크리스트 항목의 작업을 마치고 push 한 뒤에는 각 체크리스트 항목마다 작업내용 문구 제일 마지막에 commit 번호를 삽입합니다.
4. 만약 해당 commit이 여러 체크리스트 항목에 영향을 주는 경우, 영향을 주는 모든 체크리스트 항목에 작업내용 문구 마지막에 commit 번호를 삽입합니다.

## Pull request 규칙 ##
1. Pull request시 생성되는 양식을 따릅니다. </br>
https://github.com/AntiCaffe/TechTitan/blob/main/pull_request_template.md
2. 만일 코드의 변화에 파악하기 힘드나 중요한 부분이 있다면 명시해주어야 합니다. </br>
3. 기여자들의 과반수가 approve에 찬성해야 merge가 가능합니다. </br>

## Commit Msg 규칙 ##
1. 기본적으로 커밋의 형태는 다음을 따릅니다.
### Title
 - (type)([core 여부]): (커밋 제목)([관련 issue번호]) </br>
 ex1) feat(core): 계산 기능 추가 (#56) . . . core는 중요한 변경일 경우만 적습니다. </br>
 ex2) refactor: calculate 함수 분리 . . . 관련 이슈가 없다면 적이 않아도 괜찮습니다.
### Body
 - 간단하게 변경사항, 추가사항에 대한 내용을 적습니다.
 - 코드를 보고 파악하기 힘든 내용도 적습니다.

2. 타입은 아래와 같은 종류가 있습니다. </br>
feat :	새로운 기능 추가
fix :	버그 수정 </br>
docs :	문서 수정 </br>
style :	코드 formatting, 세미콜론(;) 누락, 코드 변경이 없는 경우 </br>
refactor :	코드 리팩터링 </br>
test :	테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X) </br>
chore :	빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X) </br>
design :	CSS 등 사용자 UI 디자인 변경 </br>
build :	관련 변경 사항 빌드 </br>
ci : 관련 변경 사항 </br>
perf :	성능을 향상시키는 코드 변경 </br>
omment :	필요한 주석 추가 및 변경 </br>
revert :	되돌리기 </br>
rename :	파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 </br>
remove :	파일을 삭제하는 작업만 수행한 경우 </br>
!BREAKING CHANGE :	커다란 API 변경의 경우 </br>
!HOTFIX :	급하게 치명적인 버그를 고쳐야 하는 경우 </br> </br>
- 자세한 코드 Title의 Type에 적어야할 요소는 아래 링크의 Type 부분에 나와있습니다 </br>
https://dejavuhyo.github.io/posts/patterns-for-writing-better-git-commit-messages/

## 기여 규칙 ##
1. Master 브랜치는 직접 수정하지 않아야합니다. 단, 아래와 같은 경우는 예외로 합니다.
1.1. 매우 큰 충돌범위의 충돌이 발생하여 자동 Merge가 불가능하여 해당 충돌의 조치를 위해 Master를 수정해야(덮어써야 or 강제로 Merge 해야)되는 경우
1.2A. 오프라인 회의에서 이미 내용이 완전히 확정된 Document를 추가할 때. Document에는 Issue 양식, PR 양식, 컨트리뷰팅 규칙, README.md 등이 해당됩니다.
1.3. 프로젝트 생성시 파일 초기 업로드는 1. 규칙의 예외로 합니다.
2. 이미 push 된 부분을 hard RESET 하지 않습니다.
3. 협의 없이 리모트 브랜치를 강제 push나 강제 merge 하지 않습니다.
