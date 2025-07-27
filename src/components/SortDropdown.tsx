import React, { useState } from "react";


const options = ["인기순", "최신순", "공감순", "스크랩순"];

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
          border: "1.5px solid #bbb",
          borderRadius: 10,
          padding: "8px 16px",
          background: "#fff",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          minWidth: 120,
          textAlign: "center"
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {value} <span style={{ float: "right", transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(180deg)" : undefined }}>▼</span>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#fff",
            border: "1.5px solid #bbb",
            borderRadius: 10,
            zIndex: 10,
            minWidth: 120,
            padding: "8px 0"
          }}
        >
          {options.map((opt, index) => (
            <div
              key={opt}
              style={{
                padding: "8px 16px",
                borderTop: index === 0 ? "1px solid #bbb" : undefined,
                borderBottom: "1px solid #bbb",
                fontSize: 14,
                color: "#333",
                cursor: "pointer",
                transition: "background 0.2s",
                textAlign: "center"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
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