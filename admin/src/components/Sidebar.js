
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { useLocation } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBoxOpen, faChartPie, faCog, faFileAlt, faHandHoldingUsd, faSignOutAlt, faTable, faTimes, faCalendarAlt, faMapPin, faInbox, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import ThemesbergLogo from "../assets/img/themesberg.svg";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";

export default (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
            <span>
              <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">
              {children}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.DashboardOverview.path}>
          <Image src={ReactHero} className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="user-avatar lg-avatar me-4">
                  <Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Sign Out
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0 pb-6">
              <NavItem title="Vestashop" link={Routes.Presentation.path} image={ReactHero} />

              <Dropdown.Divider className="my-3 border-indigo" />

              {/* Vestashop Menu */}

              <NavItem title="Dashboard" link={Routes.DashboardOverview.path} icon={faChartPie} />

              <CollapsableNavItem eventKey="tables/" title="Catalog" icon={faTable}>
                <NavItem title="Products" link={Routes.Products.path} />
                <NavItem title="Categories" link={Routes.ProductCategories.path} />
                <NavItem title="Attributes & Features" link={Routes.BootstrapTables.path} />
                <NavItem title="Suppliers" link={Routes.Suppliers.path} />
                <NavItem title="Stock" link={Routes.Stock.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Orders" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <NavItem title="Customers" link={Routes.Customers.path} icon={faTable}/>

              <CollapsableNavItem eventKey="tables/" title="Marketing" icon={faTable}>
                <NavItem title="Price rules" link={Routes.PriceRules.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Modules" icon={faTable}>
                <NavItem title="Module Manager" link={Routes.ModuleManager.path} />
                <NavItem title="Module Catalog" link={Routes.ModuleCatalog.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Appearance" icon={faTable}>
                <NavItem title="Themes" link={Routes.Themes.path} />
                <NavItem title="Pages" link={Routes.PageManagement.path} />
                <NavItem title="Image settings" link={Routes.ImageSettings.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Blog" icon={faTable}>
                <NavItem title="Posts" link={Routes.BootstrapTables.path} />
                <NavItem title="Categories" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>
              
              <CollapsableNavItem eventKey="tables/" title="Localization" icon={faTable}>
                <NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>

              <NavItem title="Shipping methods" link={Routes.Shipping.path}  icon={faTable} />

              <CollapsableNavItem eventKey="tables/" title="Payment" icon={faTable}>
                <NavItem title="Payment methods" link={Routes.PaymentMethods.path} />
                <NavItem title="Preferences" link={Routes.PaymentPreferences.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Users" icon={faTable}>
                <NavItem title="Users" link={Routes.User.path} />
                <NavItem title="Roles" link={Routes.Roles.path} />
              </CollapsableNavItem>

              <CollapsableNavItem eventKey="tables/" title="Settings" icon={faTable}>
                <NavItem title="General" link={Routes.BootstrapTables.path} />
                <NavItem title="Order settings" link={Routes.BootstrapTables.path} />
                <NavItem title="Product settings" link={Routes.BootstrapTables.path} />
                <NavItem title="Customer settings" link={Routes.BootstrapTables.path} />
                <NavItem title="Traffic & SEO" link={Routes.BootstrapTables.path} />
                <NavItem title="Performance" link={Routes.BootstrapTables.path} />
                <NavItem title="Logs" link={Routes.BootstrapTables.path} />
                <NavItem title="Contact" link={Routes.BootstrapTables.path} />
              </CollapsableNavItem>
              
              
              <Button as={Link} to={Routes.Upgrade.path} variant="secondary" className="upgrade-to-pro"><FontAwesomeIcon icon={faRocket} className="me-1" /> View store</Button>
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
