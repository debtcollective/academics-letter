import React from "react";
import logo from "../../img/logo-dark.svg";
import "./styles.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="container-fluid ml-0">
        <div className="row d-none d-md-flex">
          <div className="footer__list col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Organize</h6>
            <div className="footer__list-item">
              <a href="{{ urls.discourse.endpoint }}">Community</a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Take Action</h6>
            <div className="footer__list-item">
              <a
                href="{{
            urls.discourse.endpoint | append: urls.discourse.paths.events
          }}"
              >
                Events
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="{{
            urls.dispute - tools.endpoint
              | append: urls.dispute - tools.paths.dispute - tools
          }}"
              >
                Dispute your Debt
              </a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Learn</h6>
            <div className="footer__list-item">
              <a href="{{ urls.power - report.endpoint }}">The Power Report</a>
            </div>
            <div className="footer__list-item">
              <a
                href="/#about"
                data-toggle="collapse"
                data-target="#hidden-text"
              >
                About Us
              </a>
            </div>
            <div className="footer__list-item">
              <a href="{{ urls.wiki.endpoint }}">Community Wiki</a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">More</h6>
            <div className="footer__list-item">
              <a
                href="{{
            urls.dispute - tools.endpoint
              | append: urls.dispute - tools.paths.contact
          }}"
              >
                Contact
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="{{
            urls.dispute - tools.endpoint
              | append: urls.dispute - tools.paths.donate
          }}"
              >
                Donate
              </a>
            </div>
            <div className="footer__list-item">
              <a href="{{ urls.repository.endpoint }}">Open Source</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid ml-0">
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
                <a
                  href="{{
              urls.discourse.endpoint | append: urls.discourse.paths.tos
            }}"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
