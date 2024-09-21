import icon from "../assets/newsly-icon.png"

export default () => {
  return (
    <footer className="py-5 text-center text-body-secondary bg-body-tertiary footer">
      <img className="header-logo" src={icon} alt="Newsly logo"/>
      <p>A full-stack project by <a href="https://www.linkedin.com/in/zacharvey/">zac harvey</a></p>
      <p><a href="https://github.com/zacharvey88/newsly">View the codebase</a></p>
      <p className="mb-0">
        <a href="#">Back to top</a>
      </p>
    </footer>
  )
}

