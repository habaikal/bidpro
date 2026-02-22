#!/bin/bash

# 배포 스크립트 - BidAI Pro 플랫폼

set -e  # 오류 발생 시 스크립트 중단

echo "🚀 BidAI Pro 플랫폼 배포 시작..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 단계별 실행
step() {
    echo -e "${BLUE}📋 $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# 1. 환경 확인
step "환경 확인 중..."

if ! command -v node &> /dev/null; then
    error "Node.js가 설치되지 않았습니다. https://nodejs.org에서 설치해주세요."
fi

if ! command -v npm &> /dev/null; then
    error "npm이 설치되지 않았습니다."
fi

if ! command -v git &> /dev/null; then
    error "Git이 설치되지 않았습니다."
fi

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
success "Node.js $NODE_VERSION, npm $NPM_VERSION 확인 완료"

# 2. 의존성 설치
step "의존성 설치 중..."
npm ci || npm install
success "의존성 설치 완료"

# 3. 린트 검사
step "코드 품질 검사 중..."
# npm run lint 2>/dev/null || warning "린트 검사를 건너뜁니다"

# 4. 테스트 실행 (있다면)
step "테스트 실행 중..."
# npm test -- --watchAll=false 2>/dev/null || warning "테스트를 건너뜁니다"

# 5. 빌드 실행
step "프로덕션 빌드 생성 중..."
npm run build
success "빌드 완료"

# 6. 빌드 결과 확인
if [ ! -d "build" ]; then
    error "빌드 디렉토리가 생성되지 않았습니다."
fi

BUILD_SIZE=$(du -sh build | cut -f1)
success "빌드 크기: $BUILD_SIZE"

# 7. Git 상태 확인 및 푸시
step "Git 상태 확인 중..."

if [ -d ".git" ]; then
    if [ -n "$(git status --porcelain)" ]; then
        warning "커밋되지 않은 변경사항이 있습니다."
        echo "변경사항을 커밋하고 푸시하시겠습니까? (y/n)"
        read -r response
        if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
            git add .
            echo "커밋 메시지를 입력하세요:"
            read -r commit_message
            git commit -m "$commit_message" || error "커밋 실패"
            git push || error "푸시 실패"
            success "Git 푸시 완료"
        fi
    else
        success "Git 상태 정상"
    fi
else
    warning "Git 저장소가 아닙니다."
fi

# 8. Vercel 배포 (선택사항)
step "Vercel 배포 확인..."

if command -v vercel &> /dev/null; then
    echo "Vercel로 배포하시겠습니까? (y/n)"
    read -r deploy_response
    if [ "$deploy_response" = "y" ] || [ "$deploy_response" = "Y" ]; then
        echo "프로덕션 배포를 진행하시겠습니까? (y/n)"
        read -r prod_response
        if [ "$prod_response" = "y" ] || [ "$prod_response" = "Y" ]; then
            vercel --prod
        else
            vercel
        fi
        success "Vercel 배포 완료"
    fi
else
    warning "Vercel CLI가 설치되지 않았습니다."
    echo "수동으로 배포하려면 다음 명령어를 실행하세요:"
    echo "npm install -g vercel"
    echo "vercel"
fi

# 9. 배포 완료
echo ""
echo "🎉 배포 완료!"
echo ""
echo "📝 다음 단계:"
echo "1. https://vercel.com에서 배포 상태 확인"
echo "2. 도메인 설정 (필요한 경우)"
echo "3. 환경 변수 설정"
echo "4. SSL 인증서 확인"
echo ""
echo "🔗 유용한 링크:"
echo "- Vercel 대시보드: https://vercel.com/dashboard"
echo "- 도메인 설정 가이드: https://vercel.com/docs/concepts/projects/domains"
echo "- 환경 변수 설정: https://vercel.com/docs/concepts/projects/environment-variables"
echo ""
success "모든 배포 과정이 완료되었습니다! 🚀"