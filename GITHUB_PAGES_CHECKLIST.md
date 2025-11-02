# GitHub Pages 배포 체크리스트

## 1) 필수 준비
- [ ] GitHub 계정 생성 및 로그인
- [ ] 포트폴리오 템플릿(이 폴더) 준비

## 2) 새 저장소(repository) 만들기
- [ ] GitHub > New repository > 이름 입력 (예: `my-portfolio`)
- [ ] Public 선택, README는 선택사항

## 3) 코드 업로드
**방법 A. 브라우저 업로드**
- [ ] 저장소 페이지 > `Add file` > `Upload files` > `index.html`, `style.css`, `app.js`, `images/` 업로드 > Commit

**방법 B. Git 사용(선택)**
```bash
git init
git add .
git commit -m "Init portfolio"
git branch -M main
git remote add origin https://github.com/<yourusername>/<reponame>.git
git push -u origin main
```

## 4) GitHub Pages 활성화
- [ ] 저장소 `Settings` > `Pages`
- [ ] `Source`에서 `Deploy from a branch`
- [ ] `Branch`에서 `main` 선택, `/root` 유지 > Save
- [ ] 잠시 후 상단에 **Your site is live at ...** 링크 표시

## 5) 링크 확인 & 공유
- [ ] URL: `https://<yourusername>.github.io/<reponame>/`
- [ ] 모바일/데스크톱에서 반응형 동작 확인
- [ ] README에 스크린샷/설명/라이브 링크 추가

## 6) 다음 단계
- [ ] Projects 카드에 실제 Live/Code 링크 연결
- [ ] Contact 폼 → Formspree 등으로 연동하거나 백엔드 추가
- [ ] 성능/접근성 점검 (Lighthouse, aria-label 등)
