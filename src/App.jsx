
import { useState, useRef } from "react";

const prompts = [
  "What emotion are you avoiding right now, and why?",
  "Describe a moment this week when you felt small—and what you wish someone had said to you.",
  "If your pain could speak, what would it say?",
  "What is one thing your younger self would be proud of you for surviving?",
  "What do you need to hear right now that no one is saying?",
  "What would you write in a letter to your future self who has healed?",
  "What does safety feel like—in your body, your space, your relationships?",
  "What is the kindest sentence you can write to yourself right now?",
  "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty. – Maya Angelou",
  "When the world pushes you to your knees, you're in the perfect position to pray. – Rumi",
  "You are not the darkness you endured. You are the light that refused to surrender.",
  "If you want to fly, you’ve got to give up the things that weigh you down. – Toni Morrison",
  "Self-love, self-respect, self-worth... there’s a reason they all start with ‘self’. You cannot find them in anyone else.",
  "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. – Lao Tzu",
  "A person's best successes come after their disappointments.",
  "Done is better than perfect.",
  "You need someone who goes out of their way to make it obvious that they want you in their life.",
  "Life isn’t about finding yourself. Life is about creating yourself.",
  "There are no accidents. – Master Oogway (Kung Fu Panda)",
  "The scroll is empty because the secret is you. You just have to believe. – Kung Fu Panda",
  "Take one breath at a time. You will find the fire inside of you. – Wim Hof",
  "Healing begins in silence. Sometimes, you need to be away from your devices and just exist.",
  "You have been chosen for a purpose. Sometimes, purpose finds you in your worst moment. – Transformers",
  "Hope is a good thing, maybe the best of things, and no good thing ever dies. – The Shawshank Redemption",
  "Your focus determines your reality. – Qui-Gon Jinn (Star Wars)",
  "I see now that the circumstances of one's birth are irrelevant. It is what you do with the gift of life that determines who you are. – Mewtwo (Pokémon)"
];

export default function NorthernJournal() {
  const [prompt, setPrompt] = useState("");
  const [lanternMode, setLanternMode] = useState(true);
  const [entry, setEntry] = useState("");
  const textAreaRef = useRef(null);

  function generatePrompt() {
    const index = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[index]);
  }

  function copyToClipboard() {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
    }
  }

  function downloadEntry() {
    const blob = new Blob([entry], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `journal_entry_${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 text-white">
      {lanternMode && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50 blur-sm"
        >
          <source src="/lantern_loop_background.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setLanternMode(!lanternMode)}
          className="bg-gray-800 px-4 py-2 rounded text-white"
        >
          {lanternMode ? "Disable Lantern Mode" : "Enable Lantern Mode"}
        </button>
      </div>

      <div className="relative z-10 max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Northern Journal</h1>
        <p className="text-center italic text-sm text-gray-300">
          Healing begins in silence. Sometimes, you need to be away from your devices and just exist.
        </p>
        <div className="shadow-xl bg-white bg-opacity-10 backdrop-blur-md p-6 space-y-4 rounded-lg">
          <p className="text-lg text-white">{prompt || "Click below to receive a journal prompt."}</p>
          <button
            onClick={generatePrompt}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded"
          >
            Generate Prompt
          </button>
          <textarea
            ref={textAreaRef}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full mt-4 p-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 resize-none min-h-[150px]"
          />
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="w-full bg-yellow-500 text-black py-2 px-4 rounded"
            >
              Copy
            </button>
            <button
              onClick={downloadEntry}
              className="w-full bg-green-600 text-white py-2 px-4 rounded"
            >
              Download
            </button>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-4">
          Created by <span className="font-semibold">Veenkoti Studios</span> — Let silence be your sanctuary.
        </div>
      </div>
    </div>
  );
}
