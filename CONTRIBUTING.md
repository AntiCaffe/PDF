## Project 사용 규칙 ##
### Project 노트의 체크리스트 사용 규칙 및 Git commit 주기 ###
1. 원칙적으로 Project 탭의 체크리스트 작업 하나를 완료했을 때마다 commit 합니다.
2. 작업상황상 또는 코드정리 면에서 불가피하게 체크리스트 여러 개를 합쳐서 commit해야 하거나, 그 편이 더 용이한 경우, 여러 체크리스트 항목을 한꺼번에 commit 하는 것도 허용합니다.
3. 모든 체크리스트 항목의 작업을 마치고 push 한 뒤에는 각 체크리스트 항목마다 작업내용 문구 제일 마지막에 commit 번호를 삽입합니다.
4. 만약 해당 commit이 여러 체크리스트 항목에 영향을 주는 경우, 영향을 주는 모든 체크리스트 항목에 작업내용 문구 마지막에 commit 번호를 삽입합니다.

## Pull request 규칙 ##
1. Pull request시 생성되는 양식을 따릅니다. </br>
https://github.com/AntiCaffe/TechTitan/blob/main/pull_request_template.md

## Commit Msg 규칙 ##
1. 기본적으로 커밋의 형태는 다음을 따릅니다.
### Title
 - (type)([core 여부]): (커밋 제목)([관련 issue번호]) </br>
 ex1) feat(core): 계산 기능 추가 (#56) . . . core는 중요한 변경일 경우만 적습니다. </br>
 ex2) refactor: calculate 함수 분리 . . . 관련 이슈가 없다면 적이 않아도 괜찮습니다.
### Body
 - 간단하게 변경사항, 추가사항에 대한 내용을 적습니다.
 - 코드를 보고 파악하기 힘든 내용도 적습니다.

## 기여 규칙 ##
1. Master 브랜치는 직접 수정하지 않아야합니다. 단, 아래와 같은 경우는 예외로 한다.
1.1. 매우 큰 충돌범위의 충돌이 발생하여 자동 Merge가 불가능하여 해당 충돌의 조치를 위해 Master를 수정해야(덮어써야 or 강제로 Merge 해야)되는 경우
1.2A. 오프라인 회의에서 이미 내용이 완전히 확정된 Document를 추가할 때. Document에는 Issue 양식, PR 양식, 컨트리뷰팅 규칙, README.md 등이 해당됩니다.
1.3. 프로젝트 생성시 파일 초기 업로드는 1. 규칙의 예외로 합니다.
2. 이미 push 된 부분을 hard RESET 하지 않습니다.
3. 협의 없이 리모트 브랜치를 강제 push나 강제 merge 하지 않습니다.
