export default function StoriesPage() {
  const stories = [
    { title: "The Last Ticket", synopsis: "A night conductor meets his younger self." },
    { title: "Postcards to Nowhere", synopsis: "Letters from a city that doesn’t exist." },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Short Stories</h1>
      <ul className="space-y-4">
        {stories.map((s) => (
          <li key={s.title} className="rounded-xl border p-5">
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="text-sm opacity-70">{s.synopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

