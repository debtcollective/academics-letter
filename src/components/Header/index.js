import React, { useState } from "react";
import classNames from "classnames";
import logo from "../../img/logo-light.svg";
import { Collapse } from "react-bootstrap";
import "./styles.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const headerClasses = classNames("header", "fixed-top", {
    "slider-nav-open": open,
  });
  const menuTriggerClasses = classNames("menu-trigger", { active: open });

  return (
    <>
      <header className={headerClasses}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-lg-3 d-xl-none">
              <div className="header-col justify-content-start">
                <div
                  id="menu-trigger"
                  className={menuTriggerClasses}
                  role="button"
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls="slider-nav"
                >
                  <div className="menu-icon">
                    <span className="menu-stripe"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-6 col-xl-9">
              <div className="header-col justify-content-xl-start">
                <img
                  className="logo"
                  src={logo}
                  alt="debtcollective logo"
                  width="100%"
                />
                <div className="d-none d-xl-flex">
                  <ul className="nav align-items-center" role="navigation">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="{{ urls.dispute-tools.endpoint }}"
                      >
                        Dispute Your Debt
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="{{ urls.discourse.endpoint }}"
                      >
                        Community
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="{{ urls.power-report.endpoint }}"
                      >
                        The Power Report
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="{{ urls.donate.endpoint }}">
                        Donate
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-3 col-lg-3">
              <div className="header-col justify-content-end buttons">
                {/* >= lg */}
                <a
                  href="{{ urls.discourse.endpoint }}/login"
                  role="button"
                  className="btn btn-lg btn-outline-dark d-none d-xl-block btn-session"
                >
                  Sign up
                </a>
                {/* >= md */}
                <a
                  href="{{ urls.discourse.endpoint }}/login"
                  role="button"
                  className="btn btn-primary btn-lg d-none d-md-block btn-session "
                >
                  Login
                </a>
                {/* small */}
                <a
                  href="{{ urls.discourse.endpoint }}/login"
                  role="button"
                  className="btn btn-primary btn-sm d-md-none d-xs-block d-sm-block btn-session"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Collapse in={open}>
        <div id="slider-nav" className="slider-nav d-xl-none">
          <ul className="nav flex-column" role="navigation">
            <li className="nav-item">
              <a className="nav-link" href="{{ urls.dispute-tools.endpoint }}">
                Dispute Your Debt
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="{{ urls.discourse.endpoint }}">
                Community
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="{{ urls.power-report.endpoint }}">
                The Power Report
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="{{ urls.donate.endpoint }}">
                Donate
              </a>
            </li>
          </ul>
        </div>
      </Collapse>
    </>
  );
};

export default Header;
