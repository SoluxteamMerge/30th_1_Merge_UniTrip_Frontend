import React, { useState, useEffect } from 'react';
import './RouletteComponent.css';
import arrowIcon from '../../assets/RouletteArrow.svg';

interface Props {
  selectedType: string;
}

export default function RouletteComponent({ selectedType }: Props) {
  const [rotation, setRotation] = useState(45);
  const [isResetting, setIsResetting] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setIsResetting(true);
    setRotation(45);

    setItems(getRandomItems(selectedType));

    const timer = setTimeout(() => setIsResetting(false), 50);
    return () => clearTimeout(timer);
  }, [selectedType]);

  const handleSpin = () => {
    const randomDeg = 360 * 7 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + randomDeg);
  };

  const getRandomItems = (type: string) => {
    let itemPool: string[] = [];
    switch (type) {
      case '스몰토크 및 아이스브레이킹':
        itemPool = [
          '요즘 가장 즐겨보는 넷플릭스나 유튜브 콘텐츠는?',
          '최근에 알게 된 TMI, 오늘 있었던 나의 TMI 알려줘요!',
          '지금 이 계절/날씨에 가장 잘 어울리는 음식은 뭐라고 생각해요?',
          '살면서 가장 기억에 남는 여행지는 어디예요?',
          '아이스브레이킹 밸런스게임 ! 이재용 회장와 원수되기 vs 추성훈 선수와 원수되기로 토론해보자 !',
          '만약 타임머신을 탈 수 있다면 가고 싶은 시점은?',
          '나만의 스트레스 해소법이 있다면?',
          '아이스브레이킹 밸런스게임 ! 월 200 백수 vs 월 500 직장인으로 토론해보자!',
          '오늘 먹은 점심 or 저녁메뉴는 무엇이었나요? 추천/비추천과 그 이유는?',
          '인생 맛집/명소 추천! 00에 간다면 여기는 꼭 가보세요!',
          '나의 실제 MBTI와 추구MBTI를 소개해주세요!'
        ];
        break;
      case '레크리에이션(팀,개인)':
        itemPool = [
          '3글자 이어 문장만들기! 맥락이나 어법상 가장 먼저 끊기는 팀(지점)이 패!',
          '초성 단어 퀴즈! 각 팀이 돌아가며 초성 단어 맞히기, 제한시간 10초',
          '“줄줄이 말해요” 돌아가면서 3초안에 이름이 네글자인 연예인 말하기! 가장 먼저 끊기는 팀(지점)이 패!',
          '(메모지 준비 가능의 경우) 양세찬 게임 시작!',
          '“줄줄이 말해요” 돌아가면서 3초안에 아이스크림 이름 말하기! 가장 먼저 끊기는 팀(지점)이 패!',
          '노래 이어 부르기! 앞사람이 노래 끝내면 다음사람은 같은 단어로 시작하는 노래 이어가기',
          '거짓말 탐지기 게임! 저 팀이 숨기고있는 거짓 하나는 무엇일까? 4가지 질문과 문장을 만들어 그 중 거짓인 문장을 판별해보자!',
          '몸으로 말해요! 같은 제시어에 팀원 모두가 같은 동작을 취하면 미션 성공!',
          '(종이 구비시) 릴레이 캐치마인드 시작! 정해진 제시어를 가장 많이 맞추는 팀이 승리!',
          '랜덤 제기차기 시작! 팀에서 랜덤 물체를 하나씩 제출해, 제비뽑기로 나온 물품으로 제기차기 승부!'];

        break;
      case '미니게임':
        itemPool = [
          '각자 아이엠그라운드 소개후 출석부 게임 시작! ',
          '두부게임 시작!',
          '바니바니 시작!',
          '손병호 게임 + 훈민정음 시작!',
          '만두게임 시작!', 
          '김밥말아 김밥!',
          '007 시작!',
          '바보 게임 시작!',
          '옆사람에게 당연하지 게임 시작!',
          '홍삼게임 시작!',
          '딸기당근수박참외메론게임 시작!',
          '뚜알기 게임 시작!',
          '경마게임 시작!',
          '369 시작!',
          '베스킨라빈스 31 시작!',
        ];
        break;
      default:
        itemPool = ['기본1', '기본2', '기본3', '기본4'];
    }
    const shuffled = [...itemPool].sort(() => Math.random() - 0.5);
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
          transition: isResetting ? 'none' : 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)'
        }}
      >
        {items.map((item, idx) => (
          <div className="sector" key={idx}>
            <span>{item}</span>
          </div>
        ))}
        <div className="center-circle"></div>
      </div>
      <button className="spin-button" onClick={handleSpin}>다시 돌리기</button>
    </div>
  );
}
