import React from "react";
import logo from "../../img/logo-dark.svg";
import "./styles.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="container ml-0">
        <div className="row d-none d-md-flex">
          <div className="footer__list col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Organize</h6>
            <div className="footer__list-item">
              <a href="https://community.debtcollective.org">Community</a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Take Action</h6>
            <div className="footer__list-item">
              <a href="https://community.debtcollective.org/calendar">Events</a>
            </div>
            <div className="footer__list-item">
              <a href="https://tools.debtcollective.org">Dispute your Debt</a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Learn</h6>
            <div className="footer__list-item">
              <a href="https://powerreport.debtcollective.org">
                The Power Report
              </a>
            </div>
            <div className="footer__list-item">
              <a href="https://debtcollective.org/#about">About Us</a>
            </div>
            <div className="footer__list-item">
              <a href="https://wiki.debtcollective.org">Community Wiki</a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">More</h6>
            <div className="footer__list-item">
              <a href="https://tools.debtcollective.org/contact">Contact</a>
            </div>
            <div className="footer__list-item">
              <a href="https://debtcollective.org/donate">Donate</a>
            </div>
            <div className="footer__list-item">
              <a href="https://github.com/debtcollective">Open Source</a>
            </div>
          </div>
        </div>
      </div>
      <div className="brand-container container ml-0">
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 d-none d-md-flex">
            <a href="/">
              <img
                alt="The Debt Collective"
                src={logo}
                height={60}
                width={175}
              />
            </a>
          </div>
          <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12 col-12 pt-3">
            <div className="footer__brand">
              <div className="brand-text copyright">
                Copyright {currentYear}
              </div>
              <div className="brand-text tos">
                <a href="https://community.debtcollective.org/tos">
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 d-none d-md-flex">
        <div className="row">
          <div className="col">
            <div className="footer__netlify-logo">
              Hosted on
              <a href="https://www.netlify.com/" target="_blank">
                <img
                  src="https://www.netlify.com/img/press/logos/full-logo-dark-simple.svg"
                  alt="netlify logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
