import "./style.css"

export function Footer() {

  return (
    <div className="site-footer ">
      <div className="row">

        <div className="col-md-8 col-sm-6 col-xs-12">
          <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved </p>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12 footer-icons">
          <ul className="social-icons">

            <li>
              <a className="facebook" href="https://tr-tr.facebook.com/">
                <i className="fa fa-facebook" />
              </a>
            </li>

            <li>
              <a className="twitter" href="https://twitter.com/i/trends">
                <i className="fa fa-twitter" />
              </a>
            </li>

            <li>
              <a className="dribbble" href="https://github.com/sahinhamza">
                <i className="fa fa-github" />
              </a>
            </li>

            <li>
              <a className="linkedin" href="https://www.linkedin.com/in/hamzasahinn/">
                <i className="fa fa-linkedin" />
              </a>
            </li>

            <li>
              <a className="instagram" href="https://www.instagram.com/hmzshn11/">
                <i className="fa fa-instagram" />
              </a>
            </li>

          </ul>
        </div>

      </div>
    </div>
  )
}