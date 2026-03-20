type SectionHeaderProps = {
  id?: string;
  title: string;
  description: string;
};

export function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-6 md:mb-8">
      <h2 id={id} className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
    </header>
  );
}
