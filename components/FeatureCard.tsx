import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

export default function FeatureCard({ icon, title, description, link, color }: FeatureCardProps) {
  return (
    <Link href={link}>
      <div className={`bg-linear-to-br ${color} rounded-2xl p-8 text-white h-full shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer`}>
        <div className="mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-green-50">{description}</p>
      </div>
    </Link>
  );
}
