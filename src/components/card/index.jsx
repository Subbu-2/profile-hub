import "./index.scss";

const Card = ({ title, subtitle, children }) => {
  return (
    <div className="ph-card">
      {title && <h1 className="ph-card__title">{title}</h1>}
      {subtitle && <p className="ph-card__subtitle">{subtitle}</p>}
      <div className="ph-card__body">{children}</div>
    </div>
  );
};

export default Card;
