import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import { UserCard } from "./features/user-card";
import { UsersListView } from "./features/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="users" element={<UsersListView />} />
      <Route path="users/:userId" element={<UserCard />} />
      <Route
        path="*"
        element={<NotFound message="Sorry your page was not found!" />}
      />
    </Routes>
  );
}
