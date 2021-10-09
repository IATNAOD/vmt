import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ReactCountryFlag from "react-country-flag"

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { parseDate, parseFullTime } from '../../common/utils';
import { clearSharedStats, getSharedStats, changeSharedStatsLanguage } from '../../store/actions/logs.actions'

export default connect((s) => ({
  sharedStats: s.logs.sharedStats,
}), {
  clearSharedStats,
  getSharedStats,
  changeSharedStatsLanguage
})(
  ({
    sharedStats,

    clearSharedStats,
    getSharedStats,
    changeSharedStatsLanguage
  }) => {
    const [Recived, changeRecived] = useState(false)
    const [NavMenu, changeNavMenu] = useState('general')
    const [CurrentPage, changeCurrentPage] = useState(1)

    const handlePageChange = (page) => {
      changeCurrentPage(page);
    }
    useEffect(() => {

      clearSharedStats()

    }, [])

    useEffect(() => {

      if (sharedStats.countries.length == 0 && !Recived) {

        let token = new URLSearchParams(location.search).get('token')

        getSharedStats(token)

        changeRecived(true)

      }

    }, [sharedStats])

    return (
      <section className="content">
        <div className="login-cover">
          <div className="login-cover-image"></div>
        </div>
        <div class="stats-external width-lg m-auto m-t-40">
          <div class="float-right change-lang">
            <a className={'cursor-pointer d-block'} onClick={() => changeSharedStatsLanguage('ENG')}>
              <ReactCountryFlag
                countryCode={"US"}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
              />
            </a>
            <a className={'cursor-pointer d-block'} onClick={() => changeSharedStatsLanguage('RUS')}>
              <ReactCountryFlag
                countryCode={"RU"}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
              />
            </a>
          </div>
          <ul class="nav nav-pills">
            <li class="nav-items">
              <a onClick={() => changeNavMenu('general')} class={NavMenu == 'general' ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"}>
                <span class="d-sm-none">{languagesTranslate[sharedStats.language].sharedStatsPage.generalStats}</span>
                <span class="d-sm-block d-none">{languagesTranslate[sharedStats.language].sharedStatsPage.generalStats}</span>
              </a>
            </li>
            <li class="nav-items">
              <a onClick={() => changeNavMenu('detail')} class={NavMenu == 'detail' ? "nav-link cursor-pointer active" : "nav-link cursor-pointer"}>
                <span class="d-sm-none">{languagesTranslate[sharedStats.language].sharedStatsPage.detailStats}</span>
                <span class="d-sm-block d-none">{languagesTranslate[sharedStats.language].sharedStatsPage.detailStats}</span>
              </a>
            </li>
          </ul>

          <div className="tab-content">

            <div class={NavMenu == 'general' ? "tab-pane fade active show" : "tab-pane"}>
              <div class="float-left">
                {languagesTranslate[sharedStats.language].sharedStatsPage.logs}: <strong>{sharedStats.main.count.all}</strong>
              </div>
              <div class="float-right">
                <i class="zmdi zmdi-calendar-alt"></i> {parseDate(sharedStats.dateFrom)} — {parseDate(sharedStats.dateTo)}
              </div>
              <div class="clearfix"></div>
              <hr />
              <div class="row">
                <div class="col-md-4 text-center">
                  {languagesTranslate[sharedStats.language].sharedStatsPage.important}: <strong>{sharedStats.main.count.important} <span class="label label-warning">{(sharedStats.main.count.important / (sharedStats.main.count.all / 100)).toFixed(2)}%</span></strong>
                </div>
                <div class="col-md-4 text-center">
                  {languagesTranslate[sharedStats.language].sharedStatsPage.empty}: <strong>{sharedStats.main.count.empty} <span class="label label-info">{(sharedStats.main.count.empty / (sharedStats.main.count.all / 100)).toFixed(2)}%</span></strong>
                </div>
                <div class="col-md-4 text-center">
                  {languagesTranslate[sharedStats.language].sharedStatsPage.duplicates}: <strong>{sharedStats.main.count.duplicates} <span class="label label-danger">{(sharedStats.main.count.duplicates / (sharedStats.main.count.all / 100)).toFixed(2)}%</span></strong>
                </div>
              </div>
              <div class="clearfix"></div>
              <hr />
              {
                sharedStats.countries.map((v, i) =>
                  <div key={i} class="d-inline-block width-80 text-center">
                    <ReactCountryFlag
                      style={{ position: 'relative', top: '-2px' }}
                      countryCode={v.country}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                    />
                    {v.country} {v.count}
                  </div>
                )
              }
            </div>

            <div class={NavMenu == 'detail' ? "tab-pane fade active show" : "tab-pane"}>
              <div className="w-100">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th className={'text-center'}>{languagesTranslate[sharedStats.language].sharedStatsPage.id}</th>
                      <th className={'text-center'}>{languagesTranslate[sharedStats.language].sharedStatsPage.CountryAndIP}</th>
                      <th className={'text-center'}>{languagesTranslate[sharedStats.language].sharedStatsPage.date}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      sharedStats.main.state.map((v, i) =>
                        i < CurrentPage * 15 && i >= (CurrentPage - 1) * 15
                          ? <tr key={i}>
                            <td className={'text-center'}>
                              {v.id}
                              {
                                v.globalduplicate ?
                                  <span style={{ color: "red" }}>☻</span>
                                  : null
                              }
                            </td >
                            <td className={'text-center'}>
                              <span className="w-100 d-inline-block">
                                <ReactCountryFlag
                                  style={{ position: 'relative', top: '-2px' }}
                                  countryCode={v.country}
                                  svg
                                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                  cdnSuffix="svg"
                                />
                                {v.country}
                              </span>
                              <span className="w-100 d-inline-block">
                                {v.ip}
                              </span>
                            </td >
                            <td className={'text-center'}>{parseFullTime(v.createdAt)} </td >
                          </tr>
                          : null
                      )
                    }
                  </tbody>
                </table>
                <div className="w-100 text-right">
                  <ReactPaginate
                    previousLinkClassName={'btn btn-secondary previous'}
                    previousLabel={languagesTranslate[sharedStats.language].WorkersLogsPage.previous}
                    nextLinkClassName={'btn btn-secondary next'}
                    nextLabel={languagesTranslate[sharedStats.language].WorkersLogsPage.next}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(sharedStats.main.state.length / 15)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(page) => handlePageChange(page.selected + 1)}
                    containerClassName={'pagination justify-content-end'}
                    activeClassName={'active'}
                    pageLinkClassName={'num'}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section >
    )

  }
);