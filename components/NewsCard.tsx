import Link from "next/link";

interface NewsCardProps {
  title: string;
  date: string;
  image: string;
  link?: string | null;
}

export default function NewsCard({ title, date, image, link }: NewsCardProps) {
  const content = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
      <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <p className="text-green-600 text-sm font-semibold mb-2">{date}</p>
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>
        <span className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-2">
          Baca Selengkapnya →
        </span>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
