import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = [
  { name: "like", icon: "👍", color: "bg-blue-100" },
  { name: "love", icon: "❤️", color: "bg-red-100" },
  { name: "haha", icon: "😂", color: "bg-yellow-100" },
  { name: "wow", icon: "😮", color: "bg-yellow-100" },
  { name: "sad", icon: "😢", color: "bg-yellow-100" },
  { name: "angry", icon: "😡", color: "bg-orange-100" },
];

export default function EmojiReactions() {
  const [showBar, setShowBar] = useState(false);
  const [selected, setSelected] = useState(null);
  const [hoveredEmoji, setHoveredEmoji] = useState(null);

  return (
    <div className="relative inline-block text-center">
      <button
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => !selected && setShowBar(false)}
        onClick={() => setShowBar(!showBar)}
        className={`p-2 border rounded-full ${
          selected
            ? emojis.find((e) => e.name === selected).color
            : "bg-gray-100"
        } hover:bg-gray-200 transition-colors duration-200`}
      >
        {selected ? emojis.find((e) => e.name === selected).icon : "👍Like"}
      </button>

      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onMouseEnter={() => setShowBar(true)}
            onMouseLeave={() => !selected && setShowBar(false)}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-2 rounded-full shadow-lg flex gap-1 items-center justify-center"
          >
            {emojis.map((emoji) => (
              <motion.div
                key={emoji.name}
                initial={{ scale: 1, y: 0 }}
                animate={{
                  scale: hoveredEmoji === emoji.name ? 1.5 : 1,
                  y: hoveredEmoji === emoji.name ? -15 : 0,
                }}
                transition={{ type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.5, y: -15 }}
                whileTap={{ scale: 1.2 }}
                onHoverStart={() => setHoveredEmoji(emoji.name)}
                onHoverEnd={() => setHoveredEmoji(null)}
                onClick={() => {
                  setSelected(emoji.name);
                  setShowBar(false);
                }}
                className={`cursor-pointer text-2xl p-1 rounded-full transition-all duration-200 ${
                  hoveredEmoji === emoji.name ? "bg-gray-200" : ""
                }`}
              >
                {emoji.icon}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
