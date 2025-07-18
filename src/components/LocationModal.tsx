import React, { useState, useEffect, useRef } from 'react';

// Kakao Maps API 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { name: string; address: string; lat: number; lng: number }) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onLocationSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Kakao Maps API 로드
  useEffect(() => {
    const loadKakaoMaps = () => {
      // 이미 로드된 경우
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        console.log('Kakao Maps API 이미 로드됨');
        setIsMapLoaded(true);
        return;
      }

      // 기존 스크립트가 있는지 확인
      const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
      if (existingScript) {
        console.log('기존 Kakao Maps 스크립트 발견');
        return;
      }

      console.log('Kakao Maps API 스크립트 로드 시작...');
      
      const script = document.createElement('script');
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=31445e842780d596784afdc11b93a75f&libraries=services";
      script.async = true;
      
      script.onload = () => {
        console.log('Kakao Maps API 스크립트 로드 성공');
        
        // API 초기화 대기
        const waitForAPI = (attempts = 0) => {
          console.log(`API 초기화 대기 시도 ${attempts + 1}/20`);
          
          const apiStatus = {
            kakao: !!window.kakao,
            maps: !!(window.kakao && window.kakao.maps),
            services: !!(window.kakao && window.kakao.maps && window.kakao.maps.services),
            LatLng: !!(window.kakao && window.kakao.maps && window.kakao.maps.LatLng),
            Map: !!(window.kakao && window.kakao.maps && window.kakao.maps.Map)
          };
          
          console.log('API 상태:', apiStatus);
          
          if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
            console.log('Kakao Maps API 초기화 완료');
            setIsMapLoaded(true);
          } else if (attempts < 50) { // 더 많은 시도 횟수
            setTimeout(() => waitForAPI(attempts + 1), 500); // 더 긴 대기 시간
          } else {
            console.error('API 초기화 실패');
            console.error('최종 API 상태:', apiStatus);
            console.error('window.kakao 객체:', window.kakao);
            if (window.kakao && window.kakao.maps) {
              console.error('window.kakao.maps 키들:', Object.keys(window.kakao.maps));
              console.error('window.kakao.maps.services:', window.kakao.maps.services);
              console.error('window.kakao.maps.LatLng:', window.kakao.maps.LatLng);
              console.error('window.kakao.maps.Map:', window.kakao.maps.Map);
            }
          }
        };
        
        waitForAPI();
      };
      
      script.onerror = (error) => {
        console.error('Kakao Maps API 스크립트 로드 실패:', error);
      };
      
      document.head.appendChild(script);
    };

    loadKakaoMaps();
  }, []);

  // 모달이 열릴 때 지도 초기화
  useEffect(() => {
    if (isOpen && isMapLoaded && mapRef.current) {
      console.log('지도 초기화 시작');
      initMap();
    }
  }, [isOpen, isMapLoaded]);

  // 지도 초기화
  const initMap = () => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) {
      console.error('지도 초기화 조건 불충족');
      return;
    }

    try {
      const center = new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 시청
      const options = {
        center: center,
        level: 3
      };

      mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);
      console.log('지도 초기화 성공');
    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  };

  // 장소 검색
  const searchPlaces = () => {
    if (!searchKeyword.trim() || !window.kakao || !window.kakao.maps) {
      return;
    }

    try {
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(searchKeyword, (results: any[], status: any) => {
        console.log('검색 결과:', { results: results.length, status });
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      });
    } catch (error) {
      console.error('장소 검색 실패:', error);
    }
  };

  // 장소 선택
  const selectLocation = (place: any) => {
    setSelectedLocation(place);
    
    if (!window.kakao || !window.kakao.maps || !mapInstance.current) {
      console.error('지도가 초기화되지 않았습니다');
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
        lng: parseFloat(selectedLocation.x)
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
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>장소 선택</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        {/* 검색 영역 */}
        <div style={{ marginBottom: '20px' }}>
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
              style={{
                padding: '10px 20px',
                background: '#0b0b61',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              검색
            </button>
          </div>

          {/* 검색 결과 */}
          {searchResults.length > 0 && (
            <div style={{
              maxHeight: '150px',
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
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: index < searchResults.length - 1 ? '1px solid #eee' : 'none',
                    backgroundColor: selectedLocation?.id === place.id ? '#f0f0f0' : 'transparent'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {place.place_name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
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
          minHeight: '400px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
          />
          {!isMapLoaded && (
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
              지도를 불러오는 중...
            </div>
          )}
        </div>

        {/* 선택된 장소 정보 */}
        {selectedLocation && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              선택된 장소: {selectedLocation.place_name}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              {selectedLocation.address_name}
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '20px',
          justifyContent: 'flex-end'
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