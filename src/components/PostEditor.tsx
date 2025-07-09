import React from "react";

interface PostEditorProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ title, content, onTitleChange, onContentChange }) => (
  <div>
    <input
      type="text"
      placeholder="제목을 입력하세요."
      value={title}
      onChange={onTitleChange}
      style={{
        width: "100%",
        fontSize: 24,
        fontWeight: 700,
        border: "none",
        outline: "none",
        margin: "32px 0 16px 0",
        color: "#bbb",
        textAlign: "center",
        background: "transparent"
      }}
    />
    <textarea
      placeholder="내용을 입력하세요..."
      value={content}
      onChange={onContentChange}
      style={{
        width: "100%",
        minHeight: 200,
        fontSize: 16,
        border: "none",
        outline: "none",
        color: "#bbb",
        background: "transparent",
        resize: "vertical"
      }}
    />
  </div>
);

export default PostEditor; 