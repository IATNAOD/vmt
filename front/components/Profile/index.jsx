import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import languagesTranslate from '../../common/languages'

import { changeAccountPassword, resetAccountInfoField } from './../../store/actions/user.actions'

export default connect((s) => ({
  user: s.user.state,
  passwordChanged: s.user.passwordChanged,

}), {
  changeAccountPassword,
  resetAccountInfoField
})(
  ({
    CurrentLanguage_G,

    user,
    passwordChanged,

    changeAccountPassword,
    resetAccountInfoField
  }) => {
    const [User, changeUser] = useState({
      password: '',
      checkPassword: '',
    })

    const submitPasswordChange = (e) => {
      e.preventDefault();
      changeAccountPassword({ ...User, token: user.token })
    }

    useEffect(() => {

      if (passwordChanged) {
        toast.success(languagesTranslate[CurrentLanguage_G].profilePage.successPasswordChange, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        changeUser({
          password: '',
          checkPassword: '',
        })
        resetAccountInfoField({ name: 'passwordChanged', value: null })
      }

    }, [passwordChanged])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].profilePage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].profilePage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].profilePage.pathItem2}</li>
                </ul>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i
                  className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="card">
                  <div className="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].profilePage.security}</strong> {languagesTranslate[CurrentLanguage_G].profilePage.settings}</h2>
                  </div>
                  <div className="body">
                    <form className="row m-0" onSubmit={submitPasswordChange}>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="text" readOnly autoComplete={'current-usernames'} value={user.username} className="form-control" placeholder={languagesTranslate[CurrentLanguage_G].profilePage.username} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="password" required autoComplete={'new-password'} value={User.password} onChange={e => changeUser({ ...User, password: e.target.value })} className="form-control" placeholder={languagesTranslate[CurrentLanguage_G].profilePage.password} />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input type="password" required autoComplete={'repeat-new-password'} value={User.checkPassword} onChange={e => changeUser({ ...User, checkPassword: e.target.value })} className="form-control" placeholder={languagesTranslate[CurrentLanguage_G].profilePage.repeatPassword} />
                        </div>
                      </div>
                      <div className="col-12">
                        <button type={'submit'} className="btn btn-info">{languagesTranslate[CurrentLanguage_G].profilePage.saveButton}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )

  }
);