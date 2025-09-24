import { useState } from "react";

const ChatPanel = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setMessages([...messages, {role: "user", content: input}]);
    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: input})
      });
      const data = await response.json();
      setMessages(msgs => [...msgs, {role: "assistant", content: data.response || "No response"}]);
      setInput("");
    } catch (err) {
      setError("Failed to get response");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-64 rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <span className={msg.role === "user" ? "bg-blue-100" : "bg-gray-100"} style={{padding: "4px 8px", borderRadius: "8px", display: "inline-block", margin: "2px 0"}}>{msg.content}</span>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex">
        <input
          className="flex-1 border rounded-l px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" ? sendMessage() : undefined}
          disabled={loading}
          placeholder="Type your message..."
        />
        <button
          className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-1 rounded-r"
          onClick={sendMessage}
          disabled={loading}
        >Send</button>
      </div>
    </div>
  );
};

export default ChatPanel;