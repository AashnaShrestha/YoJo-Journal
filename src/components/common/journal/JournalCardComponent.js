export default function JournalCardComponent({ title, createdAt, onClick }) {
  return (
    <div
      className="gap-6 rounded-xl bg-white px-8 py-8 shadow-lg"
      onClick={onClick}
    >
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p>{createdAt}</p>
    </div>
  );
}
