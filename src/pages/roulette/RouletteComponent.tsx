import React, { useState, useEffect } from 'react';
import './RouletteComponent.css';
import arrowIcon from '../../assets/RouletteArrow.svg';

interface Props {
  selectedType: string;
}

export default function RouletteComponent({ selectedType }: Props) {
  const [rotation, setRotation] = useState(45);
  const [isResetting, setIsResetting] = useState(false);


  /* 드롭다운 바뀌면 정위치로 이동*/
  useEffect(() => {
    setIsResetting(true);
    setRotation(45);

    const timer = setTimeout(() => {
        setIsResetting(false);
    }, 50);

    return() => clearTimeout(timer);

  }, [selectedType]);

  const handleSpin = () => {
    const randomDeg = 360 * 7 + Math.floor(Math.random() * 360); 
    setRotation((prev) => prev + randomDeg);
  };
  const getItems = () => {
    switch (selectedType) {
        case '미니 게임':
        return ['손병호 게임', '가위바위보 릴레이', '3-6-9 게임', '제시어 금지 게임'];
      case '스몰토크 주제 추천':
        return ['날씨', '취미', '음식', '여행'];
      case '레크레이션 추천':
        return ['OX퀴즈','몸으로 말해요','고요 속의 외침', '복불복'];
      default:
        return ['기본1', '기본2', '기본3', '기본4'];
    }
  };

  const items = getItems();

  return (
    <div className="roulette-container">
      <div className="arrow">
        <img src={arrowIcon} alt="화살표" />
      </div>
      <div
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)`,
                 transition: isResetting ? 'none':'transform 5s cubic-bezier(0.33, 1, 0.68, 1)' }}
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
