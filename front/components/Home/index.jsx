import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default connect((s) => ({
  user: s.user.state,
}), {

})(
  ({
    user,
  }) => {

    const calculateLeftDays = () => Math.round((parseInt(new Date(user.subscription.expiresAt).getTime()) - parseInt(new Date().getTime())) / 1000 / 60 / 60 / 24)

    return (
      <section className="content">
        <div className="">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>Главная</h2>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row clearfix">

              {/* <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card widget_2 big_icon">
                  <div className="body">
                    <h6>{languagesTranslate[CurrentLanguage_G].homePage.builderVersion}</h6>
                    <h2>{builderUpdates[0]?.version}</h2>
                    <button class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].homePage.builderDate}: {parseDate(builderUpdates[0]?.date)}</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card widget_2 big_icon">
                  <div className="body">
                    <h6>{languagesTranslate[CurrentLanguage_G].homePage.BuilderSubscription}</h6>
                    {
                      user.subscription.active
                        ? <h2>{languagesTranslate[CurrentLanguage_G].homePage.BuilderSubscriptionTo} {parseDate(user.subscription.expiresAt)}({calculateLeftDays()}{languagesTranslate[CurrentLanguage_G].homePage.BuilderSubscriptionDays}.)</h2>
                        : <h2>{languagesTranslate[CurrentLanguage_G].sidebar.inactive}</h2>
                    }
                    <Link to={'/builder'} class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].homePage.BuilderSubscriptionButton}</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card widget_2 big_icon">
                  <div className="body">
                    <h6>{languagesTranslate[CurrentLanguage_G].homePage.logs}</h6>
                    <h2>{homeStats.all}</h2>
                    <Link to={'/logs'} class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].homePage.logsButton}</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card widget_2 big_icon">
                  <div className="body">
                    <h6>{languagesTranslate[CurrentLanguage_G].homePage.balance}</h6>
                    <h2>{user.balance > 0 ? user.balance.toFixed(5) : '0.00000'} btc</h2>
                    <Link to={'/builder'} class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].homePage.balanceButton}</Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section >
    )

  }
);