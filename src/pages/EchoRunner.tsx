import { motion } from "framer-motion";

const EchoRunner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Echo Runner</h1>
        <p className="text-muted-foreground">Coming soon! Race against your past self in this endless runner.</p>
      </motion.div>
    </div>
  );
};

export default EchoRunner;