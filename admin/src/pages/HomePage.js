import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";



// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

//Vestashop pages
import Products from './ProductsPage';
import ProductCategories from './CategoriesPage';
import Customers from './CustomersPage';
import ImageSettings from './ImageSettingsPage';
import ModuleCatalog from './ModuleCatalogPage';
import ModuleManager from './ModuleManagerPage';
import PageManagement from './PageManagementPage';
import PaymentMethods from './PaymentMethodsPage';
import PaymentPreferences from './PaymentPreferencesPage';
import PostCategories from './PostsCategoriesPage';
import Posts from './PostsPage';
import PriceRules from './PriceRulesPage';
import Roles from './RolesPage';
import Shipping from './ShippingPage';
import Stock from './StockPage';
import Suppliers from './SuppliersPage';
import Themes from './ThemesPage';
import User from './UsersPage';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />

    
    {/* Vestashop pages */}
    <RouteWithSidebar exact path={Routes.Products.path} component={Products} />
    <RouteWithSidebar exact path={Routes.ProductCategories.path} component={ProductCategories} />
    <RouteWithSidebar exact path={Routes.Customers.path} component={Customers} />
    <RouteWithSidebar exact path={Routes.ImageSettings.path} component={ImageSettings} />
    <RouteWithSidebar exact path={Routes.ModuleCatalog.path} component={ModuleCatalog} />
    <RouteWithSidebar exact path={Routes.ModuleManager.path} component={ModuleManager} />
    <RouteWithSidebar exact path={Routes.PageManagement.path} component={PageManagement} />
    <RouteWithSidebar exact path={Routes.PaymentMethods.path} component={PaymentMethods} />
    <RouteWithSidebar exact path={Routes.PaymentPreferences.path} component={PaymentPreferences} />
    <RouteWithSidebar exact path={Routes.PostCategories.path} component={PostCategories} />
    <RouteWithSidebar exact path={Routes.Posts.path} component={Posts} />
    <RouteWithSidebar exact path={Routes.PriceRules.path} component={PriceRules} />
    <RouteWithSidebar exact path={Routes.Roles.path} component={Roles} />
    <RouteWithSidebar exact path={Routes.Shipping.path} component={Shipping} />
    <RouteWithSidebar exact path={Routes.Stock.path} component={Stock} />
    <RouteWithSidebar exact path={Routes.Suppliers.path} component={Suppliers} />
    <RouteWithSidebar exact path={Routes.Themes.path} component={Themes} />
    <RouteWithSidebar exact path={Routes.User.path} component={User} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
