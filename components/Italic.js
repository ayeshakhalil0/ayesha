// Renders "plain *italic rose* plain" with the starred part emphasised.
export default function Italic({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") ? (
      <em key={i} className="text-rose">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}
