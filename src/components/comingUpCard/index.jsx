function ComingUpCard({ title, text }) {
  return (
    <div className="ph-card ph-public__coming">
      <div className="ph-public__comingTitle">{title}</div>
      <div className="ph-public__comingText">{text}</div>
    </div>
  );
}
