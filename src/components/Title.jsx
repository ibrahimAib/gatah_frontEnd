import "../css/Title.css";
function Title({ title, img = "home" }) {
  return (
    <div className="title">
      <div>
        <span>{title}</span>
      </div>
      <div className="title-icon">
        <img src={`${img}.png`} alt="" />
      </div>
    </div>
  );
}

export default Title;
