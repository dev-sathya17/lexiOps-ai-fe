import { motion } from "framer-motion";

type LoaderProps = {
  progress?: number; // 0–100 (optional)
  label?: string;
  steps: readonly string[];
};

export default function Loader({
  progress = 0,
  label,
  steps = [],
}: LoaderProps) {
  const stepIndex = Math.min(
    steps.length - 1,
    Math.floor((progress / 100) * steps.length),
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full h-full px-6 text-center">
      {/* Logo / Mark */}
      <motion.div
        className="mb-8 text-3xl font-extrabold tracking-tight"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
          LexiOps AI
        </span>
      </motion.div>

      {/* Progress Container */}
      <div className="w-full max-w-md">
        <div className="relative h-3 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-pink-500 via-purple-500 to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          />
        </div>

        {/* Glow */}
        <motion.div
          className="h-1 mt-2 rounded-full bg-linear-to-r from-pink-500 to-blue-400 blur-md opacity-60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* Status Text */}
      <motion.p
        key={stepIndex}
        className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label ?? steps[stepIndex]}
      </motion.p>

      {/* Percentage */}
      <span className="mt-2 text-xs text-gray-500">{progress}% complete</span>
    </div>
  );
}
