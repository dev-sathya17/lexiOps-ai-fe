import ChatLayout from "../../components/chat/ChatLayout";
import ChatArea from "../../components/chat/ChatArea";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function ChatPage() {
  useDocumentTitle("AI Assistant");
  return (
    <ChatLayout>
      <ChatArea />
    </ChatLayout>
  );
}
