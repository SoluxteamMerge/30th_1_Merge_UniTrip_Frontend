import { Routes, Route } from "react-router-dom";
import YouthTalkBoardPage from "../pages/YouthTalkBoardPage";
import WritePostPage from "../pages/WritePostPage";
import RecordedYouthPage from "../pages/RecordedYouthPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RecordedYouthPage />} /> {/*메인 페이지로 교체*/}

    <Route path="/youth-talk" element={<YouthTalkBoardPage />} />
    <Route path="/youth-talk/write" element={<WritePostPage />} />
    {/* 다른 페이지 라우트도 여기에 추가 */}
    <Route path="/recorded-youth" element={<RecordedYouthPage />} />
  </Routes>
);

export default AppRoutes; 