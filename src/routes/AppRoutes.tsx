import { Routes, Route } from "react-router-dom";
import YouthTalkBoardPage from "../pages/YouthTalkBoardPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/youth-talk" element={<YouthTalkBoardPage />} />
    {/* 다른 페이지 라우트도 여기에 추가 */}
  </Routes>
);

export default AppRoutes; 