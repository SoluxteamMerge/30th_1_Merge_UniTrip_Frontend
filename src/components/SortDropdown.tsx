import React, { useState } from "react";

const options = ["최신순", "인기순", "별점순"];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        style={{
          border: "1px solid #bbb",
          borderRadius: 10,
          padding: "8px 24px 8px 16px",
          background: "#fff",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          minWidth: 120,
          textAlign: "center",
          boxShadow: open ? "0 2px 8px #0001" : undefined
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {value} <span style={{ float: "right" }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 2px 8px #0001",
            zIndex: 10,
            minWidth: 120,
            overflow: "hidden"
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              style={{
                padding: "10px 10px",
                background: value === opt ? "#f2f2f2" : "#fff",
                fontWeight: value === opt ? 700 : 400,
                fontSize: 14,
                cursor: "pointer",
                textAlign: "center",
                borderBottom: opt !== options[options.length - 1] ? "1px solid #eee" : undefined
              }}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown; 