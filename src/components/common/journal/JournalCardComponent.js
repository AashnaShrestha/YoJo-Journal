export default function JournalCardComponent({ title, createdAt, onClick }) {
  return (
    <div
      className="gap-6 rounded-xl bg-white px-8 py-8 shadow-lg"
      onClick={onClick}
    >
      <h2 className="font-semibold">{title}</h2>
      <p>{createdAt}</p>
    </div>
  );
}
