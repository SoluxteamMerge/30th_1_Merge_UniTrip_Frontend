import React, { useState, useEffect, useRef } from 'react';
import closeIcon from '../assets/module/close.svg';
import { searchPlace } from '../api/Place/searchPlaceApi';

// Kakao Maps API 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { 
    name: string; 
    address: string; 
    lat: number; 
    lng: number;
    kakaoId?: string;
    categoryGroupName?: string;
    region?: string;
  }) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  // Kakao Maps API 로드
  useEffect(() => {
    const loadKakaoMaps = async () => {
      console.log('=== Kakao Maps API 로딩 시작 ===');
      
      // 이미 로드된 경우
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        console.log('이미 로드된 Kakao Maps API 발견');
        setIsMapLoaded(true);
        return;
      }

      // 이미 로딩 중인 경우
      if (scriptLoadedRef.current) {
        console.log('이미 로딩 중입니다');
        return;
      }

      scriptLoadedRef.current = true;
      setIsLoading(true);
      console.log('스크립트 로딩 시작...');

      try {
        // 기존 스크립트 제거
        const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
        if (existingScript) {
          console.log('기존 스크립트 제거');
          existingScript.remove();
        }

        // 새로운 스크립트 생성 및 로드
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=34aa446b21f94bba6fe2a8b3cb86e8d6&autoload=false&libraries=services";
          script.async = false; // 동기 로딩으로 변경
          script.defer = true;
          
          console.log('스크립트 생성:', script.src);
          
          script.onload = () => {
            console.log('스크립트 로드 완료');
            console.log('window.kakao 존재:', !!window.kakao);
            console.log('window.kakao.maps 존재:', !!(window.kakao && window.kakao.maps));
            
            if (window.kakao && window.kakao.maps) {
              console.log('kakao.maps.load() 호출 시작');
              window.kakao.maps.load(() => {
                console.log('kakao.maps.load() 콜백 실행');
                console.log('services 존재:', !!window.kakao.maps.services);
                console.log('LatLng 존재:', !!window.kakao.maps.LatLng);
                console.log('Map 존재:', !!window.kakao.maps.Map);
                
                // API 완전 초기화 확인
                if (window.kakao.maps.services && window.kakao.maps.LatLng && window.kakao.maps.Map) {
                  console.log('모든 API 객체 준비 완료');
                  setTimeout(() => {
                    console.log('API 초기화 완료, 상태 업데이트');
                    setIsMapLoaded(true);
                    setIsLoading(false);
                    resolve();
                  }, 1000); // 초기화 시간 증가
                } else {
                  console.error('API 객체 초기화 실패');
                  console.log('services:', !!window.kakao.maps.services);
                  console.log('LatLng:', !!window.kakao.maps.LatLng);
                  console.log('Map:', !!window.kakao.maps.Map);
                  setIsLoading(false);
                  scriptLoadedRef.current = false;
                  reject(new Error('Kakao Maps API 객체 초기화 실패'));
                }
              });
            } else {
              console.error('window.kakao 또는 window.kakao.maps가 없음');
              setIsLoading(false);
              scriptLoadedRef.current = false;
              reject(new Error('Kakao Maps API 로드 실패 (kakao.maps 없음)'));
            }
          };
          
          script.onerror = (error) => {
            console.error('스크립트 로드 실패:', error);
            setIsLoading(false);
            scriptLoadedRef.current = false;
            reject(new Error('Kakao Maps API 스크립트 로드 실패'));
          };
          
          document.head.appendChild(script);
          console.log('스크립트 DOM에 추가됨');
        });
      } catch (error) {
        console.error('Kakao Maps API 로드 실패:', error);
        setIsLoading(false);
        scriptLoadedRef.current = false;
      }
    };

    loadKakaoMaps();
  }, []);

  // 모달이 열릴 때 지도 초기화
  useEffect(() => {
    console.log('모달 상태 변경:', { isOpen, isMapLoaded, hasMapRef: !!mapRef.current });
    if (isOpen && isMapLoaded && mapRef.current) {
      console.log('지도 초기화 시작');
      // 지도 초기화를 위한 추가 대기 시간
      setTimeout(() => {
        initMap();
      }, 500);
    }
  }, [isOpen, isMapLoaded]);

  // 지도 초기화
  const initMap = () => {
    console.log('=== 지도 초기화 시작 ===');
    console.log('mapRef.current:', !!mapRef.current);
    console.log('window.kakao:', !!window.kakao);
    console.log('window.kakao.maps:', !!(window.kakao && window.kakao.maps));
    
    if (!mapRef.current || !window.kakao || !window.kakao.maps) {
      console.warn('지도 초기화 조건이 충족되지 않음');
      return;
    }

    try {
      // API 객체들이 준비되었는지 확인
      if (!window.kakao.maps.LatLng || !window.kakao.maps.Map) {
        console.warn('Kakao Maps API 객체가 준비되지 않음');
        console.log('LatLng 존재:', !!window.kakao.maps.LatLng);
        console.log('Map 존재:', !!window.kakao.maps.Map);
        return;
      }

      console.log('지도 컨테이너 크기:', mapRef.current.offsetWidth, 'x', mapRef.current.offsetHeight);
      
      // 컨테이너 크기 확인
      if (mapRef.current.offsetHeight === 0) {
        console.warn('지도 컨테이너 높이가 0입니다. 재시도합니다.');
        // 강제로 크기 재계산
        mapRef.current.style.height = '250px';
        setTimeout(() => {
          console.log('재시도 후 컨테이너 크기:', mapRef.current?.offsetWidth, 'x', mapRef.current?.offsetHeight);
          if (mapRef.current && mapRef.current.offsetHeight > 0) {
            initMap();
          }
        }, 100);
        return;
      }
      
      const center = new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청
      const options = {
        center: center,
        level: 3
      };

      mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);
      console.log('지도 초기화 성공');
      
      // 지도 초기화 후 크기 재조정
      setTimeout(() => {
        if (mapInstance.current) {
          mapInstance.current.relayout();
          console.log('지도 크기 재조정 완료');
        }
      }, 100);
    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  };

  // 장소 검색
  const searchPlaces = async () => {
    if (!searchKeyword.trim()) {
      console.warn('검색어가 없습니다');
      return;
    }

    // 백엔드 연동 전까지 카카오맵 API 직접 사용
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      console.warn('Kakao Maps API가 로드되지 않았습니다');
      return;
    }

    try {
      console.log('카카오맵 API로 장소 검색:', searchKeyword);
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(searchKeyword, (results: any[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(results);
          console.log('장소 검색 성공:', results);
        } else {
          setSearchResults([]);
          console.warn('장소 검색 결과 없음:', status);
        }
      });
    } catch (error: any) {
      console.error('장소 검색 오류:', error);
      setSearchResults([]);
    }
  };

  // 장소 선택
  const selectLocation = (place: any) => {
    setSelectedLocation(place);
    
    // 장소를 선택하면 바로 저장 (모달은 닫지 않음)
    onLocationSelect({
      name: place.place_name,
      address: place.address_name,
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      kakaoId: place.id,
      categoryGroupName: place.category_group_name,
      region: place.region
    });
    
    if (!window.kakao || !window.kakao.maps || !mapInstance.current) {
      console.warn('장소 선택 조건이 충족되지 않음');
      return;
    }
    
    try {
      // 기존 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // 새 마커 생성
      const position = new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x));
      markerRef.current = new window.kakao.maps.Marker({
        position: position
      });
      
      markerRef.current.setMap(mapInstance.current);
      mapInstance.current.setCenter(position);
      mapInstance.current.setLevel(3);
    } catch (error) {
      console.error('장소 선택 실패:', error);
    }
  };

  // 장소 확정
  const confirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect({
        name: selectedLocation.place_name,
        address: selectedLocation.address_name,
        lat: parseFloat(selectedLocation.y),
        lng: parseFloat(selectedLocation.x),
        kakaoId: selectedLocation.id,
        categoryGroupName: selectedLocation.category_group_name,
        region: selectedLocation.region
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '15px',
        padding: '30px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh', // 최대 높이를 화면의 90%로 제한
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexShrink: 0 // 헤더 고정
        }}>
          <h2 style={{ color: '#333', margin: 10, fontSize: '20px', fontWeight: 'bold' }}>장소 선택</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            <img src={closeIcon} alt="닫기" style={{ width: '25px', height: '25px' }} />
          </button>
        </div>

        {/* 검색 영역 */}
        <div style={{ 
          marginBottom: '15px',
          flexShrink: 0 // 검색 영역 고정
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="장소를 검색하세요"
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && searchPlaces()}
            />
            <button
              onClick={searchPlaces}
              disabled={!isMapLoaded}
              style={{
                padding: '10px 20px',
                background: isMapLoaded ? '#0b0b61' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: isMapLoaded ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              검색
            </button>
          </div>

          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <div style={{
              maxHeight: '120px', // 검색 결과 높이 줄임
              overflowY: 'auto',
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '10px'
            }}>
              {searchResults.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectLocation(place)}
                  style={{
                    padding: '8px', // 패딩 줄임
                    cursor: 'pointer',
                    borderBottom: index < searchResults.length - 1 ? '1px solid #eee' : 'none',
                    backgroundColor: selectedLocation?.id === place.id ? '#f0f0f0' : 'transparent'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '14px' }}>
                    {place.place_name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {place.address_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 지도 영역 */}
        <div style={{
          flex: 1,
          minHeight: '250px', // 최소 높이 줄임
          maxHeight: '300px', // 최대 높이 제한
          height: '250px', // 고정 높이 설정
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '15px' // 하단 여백 추가
        }}>
          <div
            ref={mapRef}
            style={{ 
              width: '100%', 
              height: '100%',
              minHeight: '250px' // 최소 높이 조정
            }}
          />
          {(!isMapLoaded || isLoading) && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#666'
            }}>
              {isLoading ? 'API를 불러오는 중...' : '지도를 불러오는 중...'}
            </div>
          )}
        </div>

        {/* 선택된 장소 정보 */}
        {selectedLocation && (
          <div style={{
            marginBottom: '15px', // 하단 여백 추가
            padding: '12px', // 패딩 줄임
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            flexShrink: 0 // 고정 크기
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '3px', fontSize: '14px' }}>
              선택된 장소: {selectedLocation.place_name}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {selectedLocation.address_name}
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          flexShrink: 0 // 버튼 영역 고정
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: '#f5f5f5',
              color: '#666',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            취소
          </button>
          <button
            onClick={confirmLocation}
            disabled={!selectedLocation}
            style={{
              padding: '10px 20px',
              background: selectedLocation ? '#0b0b61' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: selectedLocation ? 'pointer' : 'not-allowed',
              fontSize: '16px'
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;