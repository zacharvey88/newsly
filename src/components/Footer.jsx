import icon from "../assets/newsly-icon.png"

export default () => {
  return (
    <footer className="py-5 text-center text-body-secondary bg-body-tertiary footer">
      <p className="mb-0">
        <a href="#">Back to top</a>
      </p>
      <img className="header-logo" src={icon} alt="Newsly logo"/>
      <div className="footer-links">
        <p>Made by <a href="https://www.linkedin.com/in/zacharvey/">zac harvey</a> | View the code on <a href="https://github.com/zacharvey88/newsly">github</a></p>
      </div>
    </footer>
  )
}

