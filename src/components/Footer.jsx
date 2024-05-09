import icon from "../assets/newsly-icon.png"

export default () => {
  return (
    <footer className="py-5 text-center text-body-secondary bg-body-tertiary footer">
      <img className="header-logo" src={icon}/>
      <p>Built by <a href="https://www.linkedin.com/in/zacharvey/">zac harvey</a> and styled with <a href="https://getbootstrap.com/">Bootstrap</a>.</p>
      <p className="mb-0">
        <a href="#">Back to top</a>
      </p>
    </footer>
  )
}

