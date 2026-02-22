import React, { useState, useEffect } from 'react';
import { Bell, Search, Filter, TrendingUp, Shield, Clock, CheckCircle, AlertTriangle, User, Settings, LogOut, BarChart3, Brain, Zap, Target, Wifi, WifiOff, Key, Activity, Database } from 'lucide-react';

// 완전 통합 입찰 자동화 플랫폼
const BidAutomationPlatform = () => {
  // 인증 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: 'demo@bidai.pro', password: 'demo123' });

  // 입찰 데이터
  const [bids, setBids] = useState([]);
  const [filteredBids, setFilteredBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);
  const [userPrice, setUserPrice] = useState('');
  
  // UI 상태
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('전체');
  
  // 고급 기능
  const [notifications, setNotifications] = useState([]);
  const [realtimeNotifications, setRealtimeNotifications] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [subscribedBids, setSubscribedBids] = useState(new Set());
  const [certificateInfo, setCertificateInfo] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState({});

  // 모의 데이터 초기화
  useEffect(() => {
    const mockBids = [
      {
        id: 1,
        bidId: 'BID2025001',
        project: "차세대 스마트시티 IoT 통합 플랫폼 구축",
        agency: "서울특별시",
        dueDate: "2025-10-10",
        basePrice: 5000000000,
        category: "IT",
        status: "신규",
        participants: 12,
        description: "도시 전역 IoT 센서 네트워크 및 AI 기반 통합 관리 플랫폼 구축사업",
        aiPrediction: {
          predictedBid: 4750000000,
          confidence: 92,
          analysisDate: new Date(),
          factors: ["IT분야 평균 낙찰률 95.0%", "서울시 기관 특성 반영", "최근 3개월 시장동향 분석"]
        }
      },
      {
        id: 2,
        bidId: 'BID2025002',
        project: "국가 클라우드 보안 강화 및 제로트러스트 구축",
        agency: "과학기술정보통신부",
        dueDate: "2025-10-15",
        basePrice: 12000000000,
        category: "보안",
        status: "마감임박",
        participants: 18,
        description: "정부기관 클라우드 보안 인프라 고도화 및 제로트러스트 아키텍처 구현",
        aiPrediction: {
          predictedBid: 11400000000,
          confidence: 89,
          analysisDate: new Date(),
          factors: ["보안분야 평균 낙찰률 95.0%", "과기부 기관 특성 반영", "고난이도 프로젝트 가산점"]
        }
      },
      {
        id: 3,
        bidId: 'BID2025003',
        project: "AI 기반 디지털 트윈 도로관리 시스템",
        agency: "국토교통부",
        dueDate: "2025-10-20",
        basePrice: 8000000000,
        category: "건설",
        status: "진행중",
        participants: 15,
        description: "인공지능과 디지털트윈을 활용한 차세대 스마트 도로 관리 시스템 구축",
        aiPrediction: {
          predictedBid: 7800000000,
          confidence: 95,
          analysisDate: new Date(),
          factors: ["건설분야 평균 낙찰률 97.5%", "국토부 우호적 입찰환경", "디지털트윈 기술 전문성 우대"]
        }
      },
      {
        id: 4,
        bidId: 'BID2025004',
        project: "블록체인 기반 투명한 전자투표 플랫폼",
        agency: "중앙선거관리위원회",
        dueDate: "2025-10-25",
        basePrice: 3000000000,
        category: "IT",
        status: "관심",
        participants: 8,
        description: "블록체인 기술을 활용한 안전하고 투명한 전자투표 시스템 개발",
        aiPrediction: {
          predictedBid: 2850000000,
          confidence: 87,
          analysisDate: new Date(),
          factors: ["IT분야 평균 낙찰률 95.0%", "선관위 신중한 선택 경향", "블록체인 기술 가점"]
        }
      },
      {
        id: 5,
        bidId: 'BID2025005',
        project: "메타버스 기반 공공서비스 플랫폼 구축",
        agency: "행정안전부",
        dueDate: "2025-11-01",
        basePrice: 6500000000,
        category: "IT",
        status: "신규",
        participants: 22,
        description: "메타버스 환경에서의 공공서비스 제공을 위한 통합 플랫폼 개발",
        aiPrediction: {
          predictedBid: 6175000000,
          confidence: 88,
          analysisDate: new Date(),
          factors: ["IT분야 평균 낙찰률 95.0%", "행안부 혁신사업 지원", "메타버스 기술 트렌드 반영"]
        }
      },
      {
        id: 6,
        bidId: 'BID2025006',
        project: "양자암호통신 기반 정부망 보안 강화",
        agency: "국가정보원",
        dueDate: "2025-11-10",
        basePrice: 15000000000,
        category: "보안",
        status: "신규",
        participants: 6,
        description: "양자암호통신 기술을 활용한 차세대 정부 통신망 보안 시스템 구축",
        aiPrediction: {
          predictedBid: 14250000000,
          confidence: 91,
          analysisDate: new Date(),
          factors: ["보안분야 평균 낙찰률 95.0%", "국정원 최고 보안등급", "양자암호 기술 희소성"]
        }
      }
    ];

    const mockStats = {
      totalBids: 156,
      wonBids: 23,
      pendingBids: 12,
      successRate: 85.2,
      avgSavings: 12.8
    };

    const mockMetrics = {
      websocketConnections: 1,
      crawlingActive: true,
      aiProcessingActive: true,
      lastUpdate: new Date().toISOString()
    };

    const mockNotifications = [
      { id: 1, message: "스마트시티 IoT 사업 입찰 마감 2일 전", type: "warning", time: "10분 전" },
      { id: 2, message: "AI 예측 정확도 95% 달성", type: "success", time: "1시간 전" },
      { id: 3, message: "새로운 입찰 공고 3건 등록", type: "info", time: "2시간 전" }
    ];

    setBids(mockBids);
    setFilteredBids(mockBids);
    setDashboardStats(mockStats);
    setSystemMetrics(mockMetrics);
    setNotifications(mockNotifications);

    // 실시간 알림 시뮬레이션
    const notificationInterval = setInterval(() => {
      if (isAuthenticated) {
        setRealtimeNotifications(prev => {
          const newNotifications = [
            { id: Date.now(), type: 'new_bid', message: '새로운 입찰이 등록되었습니다', time: new Date().toLocaleTimeString() },
            { id: Date.now() + 1, type: 'ai_complete', message: 'AI 분석이 완료되었습니다', time: new Date().toLocaleTimeString() },
            { id: Date.now() + 2, type: 'bid_updated', message: '입찰 정보가 업데이트되었습니다', time: new Date().toLocaleTimeString() }
          ];
          const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
          return [randomNotification, ...prev.slice(0, 9)];
        });
      }
    }, 30000);

    return () => clearInterval(notificationInterval);
  }, [isAuthenticated]);

  // 검색 및 필터링
  useEffect(() => {
    let filtered = bids;
    
    if (searchTerm) {
      filtered = filtered.filter(bid => 
        bid.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.agency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== '전체') {
      filtered = filtered.filter(bid => bid.category === activeFilter);
    }
    
    setFilteredBids(filtered);
  }, [searchTerm, activeFilter, bids]);

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setCurrentUser({
        name: '김입찰',
        email: loginForm.email,
        company: '테크솔루션(주)',
        businessNumber: '123-45-67890'
      });
      setIsAuthenticated(true);
      setConnectionStatus('connected');
      setMessage('로그인에 성공했습니다!');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  // 로그아웃
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setConnectionStatus('disconnected');
    setRealtimeNotifications([]);
    setSubscribedBids(new Set());
  };

  // 입찰 구독 토글
  const toggleBidSubscription = (bidId) => {
    setSubscribedBids(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bidId)) {
        newSet.delete(bidId);
        setMessage(`입찰 ${bidId} 알림이 비활성화되었습니다.`);
      } else {
        newSet.add(bidId);
        setMessage(`입찰 ${bidId} 실시간 알림이 활성화되었습니다.`);
      }
      setTimeout(() => setMessage(''), 3000);
      return newSet;
    });
  };

  // AI 분석 요청
  const requestAIAnalysis = (bidId) => {
    setMessage('AI 분석을 요청했습니다. 잠시 후 결과를 확인하세요.');
    setTimeout(() => {
      // AI 분석 완료 시뮬레이션
      setBids(prev => prev.map(bid => 
        bid.bidId === bidId 
          ? { ...bid, aiPrediction: { ...bid.aiPrediction, analysisDate: new Date(), confidence: Math.min(98, bid.aiPrediction.confidence + 2) }}
          : bid
      ));
      setRealtimeNotifications(prev => [{
        id: Date.now(),
        type: 'ai_complete',
        message: `입찰 ${bidId} AI 분석이 완료되었습니다`,
        time: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);
      setMessage('AI 분석이 완료되었습니다!');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  // 인증서 업로드 시뮬레이션
  const handleCertificateUpload = () => {
    setSubmitting(true);
    setTimeout(() => {
      setCertificateInfo({
        serialNumber: 'DEMO-CERT-2025-001',
        issuer: '한국정보인증(주)',
        subject: '김입찰(테크솔루션)',
        validFrom: new Date(),
        validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        isActive: true
      });
      setShowCertificateModal(false);
      setSubmitting(false);
      setMessage('데모 인증서가 성공적으로 등록되었습니다.');
      setTimeout(() => setMessage(''), 3000);
    }, 2000);
  };

  // 자동 입찰 처리
  const handleAutoBid = async () => {
    if (!userPrice || isNaN(userPrice) || +userPrice <= 0) {
      setMessage("유효한 입찰가를 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setMessage('');

    setTimeout(() => {
      const bidAmount = parseInt(userPrice);
      const predictedAmount = selectedBid.aiPrediction?.predictedBid || 0;
      const difference = predictedAmount > 0 ? 
        ((bidAmount - predictedAmount) / predictedAmount * 100).toFixed(1) : 0;

      setMessage(`
✅ 자동 입찰이 성공적으로 제출되었습니다!
📊 입찰가: ${bidAmount.toLocaleString()}원
🎯 AI 예측가 대비: ${difference > 0 ? '+' : ''}${difference}%
🏆 예상 낙찰 확률: ${selectedBid.aiPrediction?.confidence || 0}%
🔐 디지털 서명으로 보안 처리 완료
📝 제출 ID: AUTO-BID-${Date.now()}
      `);
      
      setRealtimeNotifications(prev => [{
        id: Date.now(),
        type: 'auto_bid_submitted',
        message: `${selectedBid.project} 자동입찰 제출 완료`,
        time: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);

      // 통계 업데이트
      setDashboardStats(prev => ({
        ...prev,
        totalBids: prev.totalBids + 1
      }));

      setSubmitting(false);
      setSelectedBid(null);
      setUserPrice('');
    }, 2000);
  };

  // 유틸리티 함수들
  const getStatusColor = (status) => {
    switch(status) {
      case '마감임박': return 'bg-red-100 text-red-800';
      case '신규': return 'bg-green-100 text-green-800';
      case '진행중': return 'bg-blue-100 text-blue-800';
      case '관심': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return (amount / 100000000).toFixed(1) + '억원';
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'new_bid': return <Target className="h-4 w-4 text-blue-600" />;
      case 'bid_updated': return <Activity className="h-4 w-4 text-yellow-600" />;
      case 'ai_complete': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'auto_bid_submitted': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const ConnectionIndicator = () => (
    <div className="flex items-center space-x-2 text-sm">
      {connectionStatus === 'connected' ? (
        <>
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-green-600">실시간 연결</span>
        </>
      ) : connectionStatus === 'connecting' ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-blue-600">연결 중...</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-red-500" />
          <span className="text-red-600">연결 끊김</span>
        </>
      )}
    </div>
  );

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 m-4">
          <div className="text-center mb-8">
            <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BidAI Pro
            </h1>
            <p className="text-gray-600 mt-2">정부 입찰 자동화 AI 플랫폼</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>데모 계정:</strong><br/>
                이메일: demo@bidai.pro<br/>
                비밀번호: demo123
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="이메일을 입력하세요"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                disabled={loading}
              />
            </div>

            {message && (
              <div className={`p-4 rounded-lg text-sm ${
                message.includes('성공') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  로그인 중...
                </div>
              ) : '데모 시작하기'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 메인 애플리케이션
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white shadow-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  BidAI Pro
                </h1>
              </div>
              <span className="hidden sm:block text-sm text-gray-500 border-l pl-4 ml-4">
                정부 입찰 자동화 AI 플랫폼
              </span>
              <ConnectionIndicator />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors" />
                {realtimeNotifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {realtimeNotifications.length}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Key className={`h-5 w-5 ${certificateInfo?.isActive ? 'text-green-600' : 'text-gray-400'}`} />
                <span className={`text-sm ${certificateInfo?.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {certificateInfo?.isActive ? '인증서 활성' : '인증서 없음'}
                </span>
              </div>

              <button
                onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                title="고급 패널"
              >
                <Settings className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-2 text-sm">
                <User className="h-5 w-5 text-gray-600" />
                <span className="font-medium">{currentUser?.name}</span>
                <span className="text-gray-500">({currentUser?.company})</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="로그아웃"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 고급 시스템 패널 */}
        {showAdvancedPanel && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2 text-indigo-600" />
              시스템 상태 모니터링
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">실시간 연결</p>
                <p className="text-sm font-bold text-gray-900">
                  {systemMetrics.websocketConnections || 0}개
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">크롤링 상태</p>
                <p className="text-sm font-bold text-gray-900">
                  {systemMetrics.crawlingActive ? '활성' : '비활성'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">AI 처리</p>
                <p className="text-sm font-bold text-gray-900">
                  {systemMetrics.aiProcessingActive ? '처리 중' : '대기'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">마지막 업데이트</p>
                <p className="text-sm font-bold text-gray-900">
                  {systemMetrics.lastUpdate ? new Date(systemMetrics.lastUpdate).toLocaleTimeString() : '-'}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setShowCertificateModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm"
              >
                인증서 관리
              </button>
            </div>
          </div>
        )}

        {/* 실시간 알림 패널 */}
        {realtimeNotifications.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-indigo-600" />
              실시간 알림
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {realtimeNotifications.slice(0, 5).map(notification => (
                <div key={notification.id} className="flex items-start p-3 rounded-lg bg-gray-50 border-l-4 border-indigo-400">
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 대시보드 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 입찰 참여</p>
                <p className="text-3xl font-bold text-indigo-600">{dashboardStats.totalBids || 0}</p>
              </div>
              <Target className="h-10 w-10 text-indigo-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">낙찰 성공</p>
                <p className="text-3xl font-bold text-green-600">{dashboardStats.wonBids || 0}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">성공률</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardStats.successRate || 0}%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평균 절감률</p>
                <p className="text-3xl font-bold text-purple-600">{dashboardStats.avgSavings || 0}%</p>
              </div>
              <Zap className="h-10 w-10 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="프로젝트명 또는 발주기관 검색..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              {['전체', 'IT', '보안', '건설'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 입찰 공고 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredBids.map(bid => (
            <div key={bid.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{bid.project}</h3>
                  <p className="text-sm text-gray-600 mb-3">{bid.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      {bid.agency}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {bid.dueDate}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                  {bid.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">기초금액</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(bid.basePrice)}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-xs text-indigo-600 mb-1 flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    AI 예측 입찰가
                  </p>
                  <p className="text-lg font-bold text-indigo-600">
                    {formatCurrency(bid.aiPrediction.predictedBid)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center text-green-600">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    정확도 {bid.aiPrediction.confidence}%
                  </span>
                  <span className="text-gray-500">참가자 {bid.participants}명</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleBidSubscription(bid.bidId)}
                    className={`p-2 rounded-lg ${
                      subscribedBids.has(bid.bidId)
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-all`}
                    title={subscribedBids.has(bid.bidId) ? '구독 해제' : '실시간 알림 구독'}
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => requestAIAnalysis(bid.bidId)}
                    className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-all"
                    title="AI 재분석 요청"
                  >
                    <Brain className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => setSelectedBid(bid)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  AI 자동입찰
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 자동 입찰 모달 */}
        {selectedBid && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI 자동 입찰</h3>
                <p className="text-gray-600">{selectedBid.project}</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">AI 예측가</p>
                    <p className="font-bold text-indigo-600">
                      {formatCurrency(selectedBid.aiPrediction.predictedBid)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">예측 정확도</p>
                    <p className="font-bold text-green-600">{selectedBid.aiPrediction.confidence}%</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  입찰 금액 (원)
                </label>
                <input
                  type="number"
                  placeholder={`예: ${selectedBid.aiPrediction.predictedBid.toLocaleString()}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={userPrice}
                  onChange={(e) => setUserPrice(e.target.value)}
                  disabled={submitting}
                />
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.includes('성공') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  <pre className="text-sm font-medium whitespace-pre-wrap">{message}</pre>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setSelectedBid(null);
                    setUserPrice('');
                    setMessage('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  disabled={submitting}
                >
                  취소
                </button>
                <button
                  onClick={handleAutoBid}
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 font-medium"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      AI 분석 중...
                    </div>
                  ) : '자동 입찰 실행'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 인증서 관리 모달 */}
        {showCertificateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <Key className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">인증서 관리</h3>
                <p className="text-gray-600">디지털 인증서를 등록하여 자동 입찰을 활성화하세요</p>
              </div>

              {certificateInfo ? (
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">등록된 인증서</h4>
                    <div className="text-sm text-green-700">
                      <p>발급자: {certificateInfo.issuer}</p>
                      <p>주체: {certificateInfo.subject}</p>
                      <p>유효기간: {new Date(certificateInfo.validTo).toLocaleDateString()}</p>
                      <p>상태: {certificateInfo.isActive ? '활성' : '비활성'}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setCertificateInfo(null);
                        setMessage('인증서가 비활성화되었습니다.');
                        setTimeout(() => setMessage(''), 3000);
                      }}
                      className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all"
                    >
                      비활성화
                    </button>
                    <button
                      onClick={() => setShowCertificateModal(false)}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
                    >
                      확인
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">데모 모드</h4>
                    <p className="text-sm text-blue-700">
                      실제 환경에서는 공인인증서(.p12, .pfx) 파일을 업로드합니다. 
                      데모에서는 가상 인증서를 생성합니다.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCertificateModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                      disabled={submitting}
                    >
                      취소
                    </button>
                    <button
                      onClick={handleCertificateUpload}
                      disabled={submitting}
                      className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-lg disabled:opacity-50 font-medium"
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          생성 중...
                        </div>
                      ) : '데모 인증서 생성'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 푸터 정보 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 완전 통합 데모 플랫폼</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <strong>✅ 구현된 기능</strong>
                <ul className="mt-2 space-y-1">
                  <li>• 실시간 입찰 모니터링</li>
                  <li>• AI 기반 입찰가 예측</li>
                  <li>• 자동 입찰 시스템</li>
                  <li>• 디지털 인증서 연동</li>
                </ul>
              </div>
              <div>
                <strong>🔧 기술 스택</strong>
                <ul className="mt-2 space-y-1">
                  <li>• React + Hooks</li>
                  <li>• Tailwind CSS</li>
                  <li>• Lucide Icons</li>
                  <li>• 단일 파일 구조</li>
                </ul>
              </div>
              <div>
                <strong>📊 데모 데이터</strong>
                <ul className="mt-2 space-y-1">
                  <li>• 실제 정부기관명 사용</li>
                  <li>• 현실적인 입찰 규모</li>
                  <li>• AI 예측 알고리즘</li>
                  <li>• 실시간 알림 시뮬레이션</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidAutomationPlatform;