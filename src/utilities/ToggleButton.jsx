function ToggleBtn({ toggled, setToggled }) {

  return (
    <button
      className={`toggle-btn ${toggled ? "toggled" : ""}`}
      onClick={() => {
        setToggled(!toggled);
      }}  
    >
      <div className="thumb"></div>
    </button>
  );
}

export default ToggleBtn;
