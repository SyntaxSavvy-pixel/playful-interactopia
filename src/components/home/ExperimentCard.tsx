import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
}

export const ExperimentCard = ({ title, description, icon, path, gradient }: ExperimentCardProps) => {
  return (
    <Link to={path}>
      <motion.div 
        className={`experiment-card group bg-gradient-to-br ${gradient}`}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <motion.div 
            className="mb-4 text-primary transform-gpu transition-transform duration-300 group-hover:scale-110"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};