import React, { useState } from 'react';
import './RouletteModal.css';
import closeIcon from "../../assets/close.svg";
import arrowDown from '../../assets/DropDown.svg';
import arrowUp from '../../assets/DropUp.svg';
import RouletteComponent from '../roulette/RouletteComponent'

interface Props {
  onClose: () => void;
}

export default function RouletteModal({ onClose }: Props) {
  const [selectedOption, setSelectedOption] = useState('룰렛 주제 선정하기');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    '미니 게임',
    '스몰토크 주제 추천',
    '레크레이션 추천',
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>
          <img src={closeIcon} alt="닫기" />
        </button>

        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{selectedOption}</span>
            <img src={isDropdownOpen ? arrowUp: arrowDown} alt="화살표" className="arrow-icon" />
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {options.map((option, idx) => (
                <li key={idx} onClick={() => handleSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <RouletteComponent selectedType={selectedOption} />
      </div>
    </div>
  );
}
