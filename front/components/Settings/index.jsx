import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import languagesTranslate from '../../common/languages'

import { changeAccountSettings, resetAccountInfoField } from '../../store/actions/user.actions'

export default connect((s) => ({
  user: s.user.state,
  settingsChanged: s.user.settingsChanged,

}), {
  changeAccountSettings,
  resetAccountInfoField
})(
  ({
    CurrentLanguage_G,

    user,
    settingsChanged,

    changeAccountSettings,
    resetAccountInfoField
  }) => {
    const [Settings, changeSettings] = useState(user.settings)

    const submitSettingsChange = (e) => {
      e.preventDefault();
      changeAccountSettings({ settings: Settings, token: user.token })
    }

    useEffect(() => {

      if (settingsChanged) {
        toast.success("Настройки обновлены", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        changeSettings(user.settings)
        resetAccountInfoField({ name: 'settingsChanged', value: null })
      }

    }, [settingsChanged])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].settingsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].settingsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].settingsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].settingsPage.settings}</strong></h2>
                  </div>
                  <div className="body">
                    <form className="row m-0" onSubmit={submitSettingsChange}>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.hwidDayDuplicates}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.HWIDduplicatesDay} onChange={e => changeSettings({ ...Settings, HWIDduplicatesDay: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.hwidDuplicates}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.HWIDduplicates} onChange={e => changeSettings({ ...Settings, HWIDduplicates: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.ipDuplicates}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.IPduplicates} onChange={e => changeSettings({ ...Settings, IPduplicates: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center mt-2">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.telegram}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.telegram} onChange={e => changeSettings({ ...Settings, telegram: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center mt-2">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.screenshot}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.screenshot} onChange={e => changeSettings({ ...Settings, screenshot: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center mt-2">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.cryptoWallets}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.cryptoWallets} onChange={e => changeSettings({ ...Settings, cryptoWallets: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-lg-4 col-md-12 d-flex align-items-center mt-2">
                        <span className={'mr-2'}>{languagesTranslate[CurrentLanguage_G].settingsPage.netHistory}</span>
                        <label class="switch m-0">
                          <input type="checkbox" class="primary" checked={Settings.netHistory} onChange={e => changeSettings({ ...Settings, netHistory: e.target.checked })} />
                          <span class="slider round"></span>
                        </label>
                      </div>

                      <div className="col-12 mt-3">
                        <div className="form-group">
                          <input type="text" value={Settings.staticMarks} onChange={e => changeSettings({ ...Settings, staticMarks: e.target.value })} className="form-control" placeholder={languagesTranslate[CurrentLanguage_G].settingsPage.staticMarks} />
                        </div>
                      </div>

                      <div className="col-12">
                        <button type={'submit'} className="btn btn-info">{languagesTranslate[CurrentLanguage_G].settingsPage.saveSettingsButton}</button>
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