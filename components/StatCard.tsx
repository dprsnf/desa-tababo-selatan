interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-green-600 text-5xl mb-4 flex justify-center transition-transform hover:scale-110">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-800 mb-2">
        {value}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
}
