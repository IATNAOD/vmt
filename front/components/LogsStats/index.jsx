import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import ReactCountryFlag from "react-country-flag"

import ShowStatsRounds from '../ShowStatsRounds';
import languagesTranslate from '../../common/languages'

import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { parseDate, parseFullTime } from '../../common/utils';
import { changeAllStatsFilter, getOwnAllStats, statsRoundAdd, statsRoundUpdate, statsRoundTogglePublic, statsRoundDelete } from '../../store/actions/logs.actions'

export default connect((s) => ({
  user: s.user.state,
  allStats: s.logs.stats,
}), {
  changeAllStatsFilter,
  getOwnAllStats,
  statsRoundAdd,
  statsRoundUpdate,
  statsRoundTogglePublic,
  statsRoundDelete
})(
  ({
    CurrentLanguage_G,

    user,
    allStats,

    changeAllStatsFilter,
    getOwnAllStats,
    statsRoundAdd,
    statsRoundUpdate,
    statsRoundTogglePublic,
    statsRoundDelete
  }) => {
    const [MainCurrentPage, changeMainCurrentPage] = useState(1)
    const [CountriesCurrentPage, changeCountriesCurrentPage] = useState(1)
    const [MarksCurrentPage, changeMarksCurrentPage] = useState(1)
    const [RoundName, changeRoundName] = useState('')
    const [RoundCreated, changeRoundCreated] = useState(false)
    const [ShowRoundsModal, changeShowRoundsModal] = useState({
      show: false
    })

    const handleMainPageChange = (page) => {
      changeMainCurrentPage(page);
    }
    const handleCountriesPageChange = (page) => {
      changeCountriesCurrentPage(page);
    }
    const handleMarksPageChange = (page) => {
      changeMarksCurrentPage(page);
    }

    const addNewRound = (e) => {

      e.preventDefault()

      changeRoundCreated(true)

      statsRoundAdd({
        name: RoundName,
        dateFrom: allStats.filter.dateFrom,
        dateTo: allStats.filter.dateTo,
        token: user.token
      })

    }

    const changeStatsRound = (e) => {

      changeAllStatsFilter({ name: 'dateFrom', value: allStats.rounds.find(v => v.name == e.target.value).dateFrom })
      changeAllStatsFilter({ name: 'dateTo', value: allStats.rounds.find(v => v.name == e.target.value).dateTo })
      changeAllStatsFilter({ name: 'round', value: e.target.value })

    }

    const showRounds = () => changeShowRoundsModal({ show: true })

    useEffect(() => {

      if (RoundCreated) {

        toast.success(languagesTranslate[CurrentLanguage_G].allStatsPage.succesCreated, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        changeRoundCreated(false)

        changeRoundName('')
      }

    }, [allStats.rounds])

    useEffect(() => {
      getOwnAllStats({
        ...allStats.filter,
        token: user.token
      })
    }, [allStats.filter])

    return (
      <section className="content">
        {
          ShowRoundsModal.show
            ? <ShowStatsRounds
              CurrentLanguage_G={CurrentLanguage_G}
              rounds={allStats.rounds}
              deleteRound={(_id) => statsRoundDelete({ _id, token: user.token })}
              updateRound={(_id, dateFrom, dateTo) => statsRoundUpdate({ _id, dateFrom, dateTo, token: user.token })}
              togglePublic={(_id) => statsRoundTogglePublic({ _id, token: user.token })}
              onOutsideClick={() => changeShowRoundsModal({ show: false })}
            />
            : null
        }
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allStatsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allStatsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allStatsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allStatsPage.stats}</strong></h2>
                  </div>
                  <div class="body">

                    <div class="row mb-2">
                      <div class="col-lg-3 pr-1 col-md-12">
                        <DateRangePicker
                          initialSettings={{ startDate: allStats.filter.dateFrom ? new Date(allStats.filter.dateFrom) : new Date(), endDate: allStats.filter.dateTo ? new Date(allStats.filter.dateTo) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeAllStatsFilter({ name: 'dateFrom', value: startDate.toDate() })
                            changeAllStatsFilter({ name: 'dateTo', value: endDate.toDate() })
                          }}
                        >
                          <div>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                              </div>
                              <input type="text" class="form-control" readOnly value={parseDate(allStats.filter.dateFrom)} />
                              <input type="text" class="form-control" readOnly value={parseDate(allStats.filter.dateTo)} />
                            </div>
                          </div>
                        </DateRangePicker>
                      </div>
                      <div class="col-lg-2 pr-1 col-md-12">
                        <select class="custom-select" value={allStats.filter.round} onChange={changeStatsRound}>
                          <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allStatsPage.allTime}</option>
                          {
                            allStats.rounds.map((v, i) =>
                              <option key={i} value={v.name}>{v.name}({parseFullTime(v.dateFrom)} - {parseFullTime(v.dateTo)})</option>
                            )
                          }
                        </select>
                      </div>
                      <div class="col-lg-2 pr-1 col-md-12">
                        <button onClick={showRounds} class="btn btn-primary w-100"><i class="zmdi zmdi-settings mr-2"></i>{languagesTranslate[CurrentLanguage_G].allStatsPage.settings}</button>
                      </div>
                      <form class="col-lg-4 pr-1 col-md-12 m-0" onSubmit={addNewRound}>
                        <div class="input-group">
                          <input type="text" class="form-control" required placeholder={languagesTranslate[CurrentLanguage_G].allStatsPage.roundName} value={RoundName} onChange={e => changeRoundName(e.target.value)} />
                          <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type={'submit'}>{languagesTranslate[CurrentLanguage_G].allStatsPage.roundCreateButton}</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="row mb-2">
                      <div className="col-6 pr-1">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th className={'text-center'}>{languagesTranslate[CurrentLanguage_G].allStatsPage.day}</th>
                              <th className={'text-center'}>
                                {languagesTranslate[CurrentLanguage_G].allStatsPage.all}
                                <div className="w-100 text-center d-inline-block">
                                  <span>{allStats.main.count.all}</span>
                                </div>
                              </th>
                              <th className={'text-center'}>
                                {languagesTranslate[CurrentLanguage_G].allStatsPage.important}
                                <div className="w-100 text-center d-inline-block">
                                  <span className={'mr-2'}>{allStats.main.count.important}</span>
                                  <span className="p-1 bg-warning text-light rounded">{(allStats.main.count.important / (allStats.main.count.all / 100) | 0).toFixed(2)}%</span>
                                </div>
                              </th>
                              <th className={'text-center'}>
                                {languagesTranslate[CurrentLanguage_G].allStatsPage.empty}
                                <div className="w-100 text-center d-inline-block">
                                  <span className={'mr-2'}>{allStats.main.count.empty}</span>
                                  <span className="p-1 bg-primary text-light rounded">{(allStats.main.count.empty / (allStats.main.count.all / 100) | 0).toFixed(2)}%</span>
                                </div>
                              </th>
                              <th className={'text-center'}>
                                {languagesTranslate[CurrentLanguage_G].allStatsPage.duplicates}
                                <div className="w-100 text-center d-inline-block">
                                  <span className={'mr-2'}>{allStats.main.count.duplicates}</span>
                                  <span className="p-1 bg-danger text-light rounded">{(allStats.main.count.duplicates / (allStats.main.count.all / 100) | 0).toFixed(2)}%</span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allStats.main.state.map((v, i) =>
                                i < MainCurrentPage * 15 && i >= (MainCurrentPage - 1) * 15
                                  ? <tr key={i}>
                                    <td className={'text-center'}>
                                      {v.day}
                                    </td >
                                    <td className={'text-center'}>
                                      {v.allLogs}
                                    </td >
                                    <td className={'text-center'}>
                                      <span className={'mr-2'}>{v.importantLogs}</span>
                                      <span className="p-1 bg-warning text-light rounded">{(v.importantLogs / (v.allLogs / 100)).toFixed(2)}%</span>
                                    </td >
                                    <td className={'text-center'}>
                                      <span className={'mr-2'}>{v.emptyLogs}</span>
                                      <span className="p-1 bg-primary text-light rounded">{(v.emptyLogs / (v.allLogs / 100)).toFixed(2)}%</span>
                                    </td >
                                    <td className={'text-center'}>
                                      <span className={'mr-2'}>{v.duplicateLogs}</span>
                                      <span className="p-1 bg-danger text-light rounded">{(v.duplicateLogs / (v.allLogs / 100)).toFixed(2)}%</span>
                                    </td >
                                  </tr>
                                  : null
                              )
                            }
                          </tbody>
                        </table>
                        <div className="w-100 text-right">
                          <ReactPaginate
                            previousLinkClassName={'btn btn-secondary previous'}
                            previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                            nextLinkClassName={'btn btn-secondary next'}
                            nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(allStats.main.state.length / 15)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(page) => handleMainPageChange(page.selected + 1)}
                            containerClassName={'pagination justify-content-end'}
                            activeClassName={'active'}
                            pageLinkClassName={'num'}
                          />
                        </div>
                      </div>

                      <div className="col-3 pr-1 pl-1">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>{languagesTranslate[CurrentLanguage_G].allStatsPage.country}</th>
                              <th>{languagesTranslate[CurrentLanguage_G].allStatsPage.all}({allStats.countries.count})</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allStats.countries.state.map((v, i) =>
                                i < CountriesCurrentPage * 15 && i >= (CountriesCurrentPage - 1) * 15
                                  ? <tr key={i}>
                                    <td className={'text-center'}>
                                      <ReactCountryFlag
                                        countryCode={v.country}
                                        svg
                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                        cdnSuffix="svg"
                                      />
                                      {v.country}
                                    </td >
                                    <td className={'text-center text-secondary'}>
                                      {v.count}
                                      <span className={'text-dark ml-2 text-bold'}>{(v.count / (allStats.countries.count / 100)).toFixed(2)}%</span>
                                    </td >
                                  </tr>
                                  : null
                              )
                            }
                          </tbody>
                        </table>
                        <div className="w-100 text-right">
                          <ReactPaginate
                            previousLinkClassName={'btn btn-secondary previous'}
                            previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                            nextLinkClassName={'btn btn-secondary next'}
                            nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(25 / 25)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(page) => handleCountriesPageChange(page.selected + 1)}
                            containerClassName={'pagination justify-content-end'}
                            activeClassName={'active'}
                            pageLinkClassName={'num'}
                          />
                        </div>
                      </div>
                      <div className="col-3 pl-1">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>{languagesTranslate[CurrentLanguage_G].allStatsPage.mark}</th>
                              <th>{languagesTranslate[CurrentLanguage_G].allStatsPage.all}({allStats.marks.count})</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              allStats.marks.state.map((v, i) =>
                                i < MarksCurrentPage * 15 && i >= (MarksCurrentPage - 1) * 15
                                  ? <tr key={i}>
                                    <td className={'text-center'}>
                                      {v.name}
                                    </td >
                                    <td className={'text-center text-secondary'}>
                                      {v.count}
                                      <span className={'text-dark ml-2 text-bold'}>{(v.count / (allStats.marks.count / 100)).toFixed(2)}%</span>
                                    </td >
                                  </tr>
                                  : null
                              )
                            }
                          </tbody>
                        </table>
                        <div className="w-100 text-right">
                          <ReactPaginate
                            previousLinkClassName={'btn btn-secondary previous'}
                            previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                            nextLinkClassName={'btn btn-secondary next'}
                            nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(50 / 50)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(page) => handleMarksPageChange(page.selected + 1)}
                            containerClassName={'pagination justify-content-end'}
                            activeClassName={'active'}
                            pageLinkClassName={'num'}
                          />
                        </div>
                      </div>
                    </div>
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