import { getMarqueeItems } from "@/db/queries";

export default async function Marquee() {
  const items = await getMarqueeItems();
  const row = [...items, ...items];

  return (
    <div className="hairline overflow-hidden border-y bg-cream py-4">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="eyebrow px-8 text-taupe">{item}</span>
                <span className="text-clay">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
