import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  link: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color,
  link,
}: FeatureCardProps) => {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        className="p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10"
      >
        <div
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/10`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
        <div className="mt-4 flex items-center text-sm font-medium text-blue-400">
          Try now <span className="ml-2">→</span>
        </div>
      </motion.div>
    </Link>
  );
};
