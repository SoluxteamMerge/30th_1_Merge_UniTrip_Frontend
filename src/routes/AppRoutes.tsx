import { Routes, Route } from "react-router-dom";
import YouthTalkBoardPage from "../pages/YouthTalkBoardPage";
import YouthTalkDetailPage from "../pages/YouthTalkDetailPage";
import MTJourneyPage from "../pages/MTJourneyPage";
import WriteReviewPage from "../pages/WriteReviewPage";
import SignupPage from "../pages/signuppage/SignupPage";
import LoginPage from "../pages/loginpage/LoginPage";
import MainPage from "../pages/mainpage/MainPage";
import RecordedYouthPage from "../pages/mypage/RecordedYouthPage";
import ScrappedYouthPage from "../pages/mypage/ScrappedYouth";
import YouthCalendar from "../pages/mypage/YouthCalendar";
import YouthDrawer from "../pages/editprofile/YouthDrawer";
import SearchPage from "../pages/SearchPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/youth-talk" element={<YouthTalkBoardPage />} />
    <Route path="/youth-talk/:id" element={<YouthTalkDetailPage />} />
    <Route path="/mt-journey" element={<MTJourneyPage />} />
    <Route path="/review-write" element={<WriteReviewPage />} />
    <Route path="/recorded-youth" element={<RecordedYouthPage />} />
    <Route path="/youth-drawer" element={<YouthDrawer />} />
    <Route path="/recorded-youth/scrapped-youth" element={<ScrappedYouthPage />} />
    <Route path="/recorded-youth/youth-calendar" element={<YouthCalendar />} />
    <Route path="/search" element={<SearchPage />} />

    {/* 다른 페이지 라우트도 여기에 추가 */}
  </Routes>
);

export default AppRoutes;
