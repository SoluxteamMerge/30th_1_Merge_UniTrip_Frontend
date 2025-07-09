import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
    비공개
    <input type="checkbox" checked={checked} onChange={onChange} style={{ display: "none" }} />
    <span
      style={{
        width: 40,
        height: 22,
        background: checked ? "#0b0b61" : "#ccc",
        borderRadius: 12,
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s"
      }}
      onClick={() => onChange({ target: { checked: !checked } } as any)}
    >
      <span
        style={{
          position: "absolute",
          left: checked ? 20 : 2,
          top: 2,
          width: 18,
          height: 18,
          background: "#fff",
          borderRadius: "50%",
          transition: "left 0.2s"
        }}
      />
    </span>
  </label>
);

export default ToggleSwitch; 