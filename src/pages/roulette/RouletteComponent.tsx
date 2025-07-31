import React, { useState, useEffect } from 'react';
import './RouletteComponent.css';
import arrowIcon from '../../assets/RouletteArrow.svg';

interface Props {
  selectedType: string;
}

interface GameItem {
  name: string;
  rule?: string;
}

export default function RouletteComponent({ selectedType }: Props) {
  const [rotation, setRotation] = useState(45);
  const [isResetting, setIsResetting] = useState(false);
  const [items, setItems] = useState<GameItem[]>([]);
  const [selectedResult, setSelectedResult] = useState<GameItem | null>(null);

  useEffect(() => {
    handleReset();
  }, [selectedType]);

  const handleSpin = () => {
    const randomDeg = 360 * 7 + Math.floor(Math.random() * 360);
    const finalRotation = rotation + randomDeg;
    setRotation(finalRotation);

    setTimeout(() => {
      const normalized = (finalRotation - 90 + 360) % 360;
      const sectorSize = 360 / items.length;
      const selectedIndex = Math.floor((360 - normalized) / sectorSize) % items.length;
      setSelectedResult(items[selectedIndex]);
    }, 5000);
  };

  const handleReset = () => {
    setIsResetting(true);
    setRotation(45);
    setItems(getRandomItems(selectedType));
    setSelectedResult(null);
    setTimeout(() => setIsResetting(false), 50);
  };

  const getRandomItems = (type: string): GameItem[] => {
    let itemPool: GameItem[] = [];

    switch (type) {
      case '스몰토크 및 아이스브레이킹':
        itemPool = [
          { name: '넷플릭스/유튜브', rule: '요즘 가장 즐겨보는 콘텐츠는?' },
          { name: 'TMI', rule: '오늘의 TMI는?' },
          { name: '계절/날씨 음식', rule: '지금 날씨에 딱 맞는 음식은?' },
          { name: '기억에 남는 여행지', rule: '인생 여행지 하나만 말해봐요!' },
          { name: '밸런스 게임', rule: '월200 백수 vs 월500 직장인?' },
          { name: '시간 여행', rule: '타임머신이 있다면 언제로 가고 싶나요?' },
          { name: '스트레스 해소법', rule: '나만의 해소법은?' },
          { name: '취미/관심사', rule: '요즘 뭐에 빠져 있나요?' },
          { name: '오늘 뭐 먹었어요?', rule: '오늘 점심/저녁 추천 or 비추?' },
          { name: '인생 맛집/명소', rule: '추천하고 싶은 장소는?' },
          { name: 'MBTI', rule: '실제 MBTI와 추구 MBTI 소개!' }
        ];
        break;

      case '레크리에이션(팀,개인)':
        itemPool = [
          { name: '3글자 문장 만들기', rule: '가장 먼저 끊기는 팀이 패배' },
          { name: '초성 단어 퀴즈', rule: '초성 단어 맞히기, 10초 제한' },
          { name: '줄줄이 말해요', rule: '연예인 이름 이어 말하기' },
          { name: '양세찬 게임', rule: '메모지 필요!' },
          { name: '노래 이어 부르기', rule: '같은 단어로 시작하는 노래 부르기' },
          { name: '몸으로 말해요', rule: '같은 제시어에 같은 동작 취하기' },
          { name: '릴레이 캐치마인드', rule: '제시어 그리기+맞히기 게임' },
          { name: '랜덤 제기차기', rule: '랜덤 물건으로 제기차기!' }
        ];
        break;

      case '미니게임':
        itemPool = [
          { name: '출석부 게임', rule: '자기소개 릴레이' },
          { name: '두부게임', rule: '한모~다섯모까지 두부 외치기!' },
          { name: '바니바니', rule: '토끼 따라하기 게임!' },
          { name: '손병호 게임', rule: '지목식 벌칙 게임!' },
          { name: '만두게임', rule: '만두 만두 만두~' },
          { name: '김밥말이', rule: '줄 수 외치며 김밥 말기' },
          { name: '007빵', rule: '빠른 템포 총잡이 게임!' },
          { name: '바보 게임', rule: '집중력 테스트!' },
          { name: '당연하지 게임', rule: '센스 있는 질문으로 분위기 UP!' },
          { name: '홍삼게임', rule: '오렌지 키우기 게임' },
          { name: '과일 게임', rule: '시장에 가면~ 게임' },
          { name: '뚜알기 게임', rule: '딸기가 좋아~' },
          { name: '경마게임', rule: '우승말은 몇 번?' },
          { name: '369 게임', rule: '숫자 박수 게임' },
          { name: '베스킨라빈스31', rule: '숫자 외치기 게임!' }
        ];
        break;

      default:
        itemPool = [{ name: '기본 게임', rule: '기본 설명입니다.' }];
    }

    // Fisher-Yates Shuffle
    const shuffled = [...itemPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 4);
  };

  return (
    <div className="roulette-container">
      <div className="arrow">
        <img src={arrowIcon} alt="화살표" />
      </div>

      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isResetting ? 'none' : 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        {items.map((item, idx) => (
          <div className="sector" key={idx}>
            <span>{item.name}</span>
          </div>
        ))}
        <div className="center-circle"></div>
      </div>

      <div className="button-group">
        <button className="spin-new-button" onClick={handleReset}>
          🎲 리셋
        </button>
        <button className="spin-button" onClick={handleSpin}>
          돌리기
        </button>
      </div>

      {selectedResult && (
        <div className="result-text">
          🎯 결과: <strong>{selectedResult.name}</strong>
          <br />
          📝 : {selectedResult.rule}
        </div>
      )}
    </div>
  );
}
