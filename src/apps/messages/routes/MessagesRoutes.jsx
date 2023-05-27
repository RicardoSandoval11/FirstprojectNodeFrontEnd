import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../../ui/NotFound";
import { MyConversations } from "../pages/MyConversations";
import { AllConversation } from "../pages/AllConversation";


export const MessagesRoutes = () => {
  return (
    <Routes>
        {/* BASE URL: /messages/ */}
        <Route path="my-conversations" element={<MyConversations/>}/>
        <Route path="conversation/:conversationId" element={<AllConversation/>}/>

        {/* DEFAULT URL */}
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

