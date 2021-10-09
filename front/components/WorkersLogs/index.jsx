import 'bootstrap-daterangepicker/daterangepicker.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import { connect } from 'react-redux';

import languagesTranslate from '../../common/languages'

import { parseFullTime } from '../../common/utils';

import { getWorkersLogs, changeLogsFilter } from '../../store/actions/workers.actions'

export default connect((s) => ({
  user: s.user.state,
  workers: s.workers.state,
  logs: s.workers.logs,
  logsFilter: s.workers.filter,
  logsCount: s.workers.all,
}), {
  getWorkersLogs,
  changeLogsFilter
})(
  ({
    CurrentLanguage_G,

    user,
    workers,
    logs,
    logsFilter,
    logsCount,

    getWorkersLogs,
    changeLogsFilter
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (logs.length != logsCount && CurrentPage == (logs.length / 25) - 1)
        getWorkersLogs({
          worker: logsFilter.worker == 'all' ? null : logsFilter.worker,
          logid: logsFilter.logid,
          action: logsFilter.action == 'all' ? null : logsFilter.action,
          startDate: logsFilter.startDate,
          endDate: logsFilter.endDate,
          token: user.token,
          from: logs.length
        })

    }

    const logsActions = () => {

      let allLogs = logs.map(v => v.action);

      let uniqueLogs = []

      for (let i = 0; i < allLogs.length; i++)
        if (!uniqueLogs.find(v => v.value == allLogs[i].value))
          uniqueLogs.push(allLogs[i])

      return uniqueLogs;

    }

    useEffect(() => {
      getWorkersLogs({
        worker: logsFilter.worker == 'all' ? null : logsFilter.worker,
        logid: logsFilter.logid,
        action: logsFilter.action == 'all' ? null : logsFilter.action,
        startDate: logsFilter.startDate,
        endDate: logsFilter.endDate,
        token: user.token
      })
    }, [logsFilter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.actionLogging}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row">
                      <div class="col-lg-2 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" onChange={(e) => changeLogsFilter({ name: 'worker', value: e.target.value })} value={logsFilter.worker}>
                            <option value={'all'} >{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.allWorkers}</option>
                            {
                              workers.map((v, i) =>
                                <option key={i} value={v._id}>{v.username}</option>
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-12">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="LOG ID" onChange={(e) => changeLogsFilter({ name: 'logid', value: e.target.value })} value={logsFilter.logid} />
                        </div>
                      </div>
                      <div class="col-lg-2 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" onChange={(e) => changeLogsFilter({ name: 'action', value: e.target.value })} value={logsFilter.action}>
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.allActions}</option>
                            {
                              logsActions().map((v, i) =>
                                <option key={i} value={v.value}>{v[CurrentLanguage_G]}</option>
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-12">
                        <DateRangePicker
                          initialSettings={{ startDate: logsFilter.startDate ? new Date(logsFilter.startDate) : new Date(), endDate: logsFilter.endDate ? new Date(logsFilter.endDate) : new Date() }}
                          onApply={(event, { startDate, endDate }) => {
                            changeLogsFilter({ name: 'startDate', value: startDate.toDate() })
                            changeLogsFilter({ name: 'endDate', value: endDate.toDate() })
                          }}
                        >
                          <div>
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text" id="">{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</span>
                              </div>
                              <input type="text" class="form-control" readOnly value={logsFilter.startDate ? parseFullTime(logsFilter.startDate) : ''} />
                              <input type="text" class="form-control" readOnly value={logsFilter.endDate ? parseFullTime(logsFilter.endDate) : ''} />
                            </div>
                          </div>
                        </DateRangePicker>
                      </div>
                    </div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.workers}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.logid}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.action}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].WorkersLogsPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          logs.map((v, i) =>
                            i < CurrentPage * 25 && i >= (CurrentPage - 1) * 25
                              ? <tr key={i}>
                                <th scope="row">{v.worker.username}</th>
                                <td>{v.id}</td>
                                <td>{v.action[CurrentLanguage_G]}</td>
                                <td>{parseFullTime(v.createdAt)}</td>
                              </tr>
                              : null
                          )
                        }
                      </tbody>
                    </table>
                    <ReactPaginate
                      previousLinkClassName={'btn btn-secondary previous'}
                      previousLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.previous}
                      nextLinkClassName={'btn btn-secondary next'}
                      nextLabel={languagesTranslate[CurrentLanguage_G].WorkersLogsPage.next}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={Math.ceil(logsCount / 25)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={(page) => handlePageChange(page.selected + 1)}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      pageLinkClassName={'num'}
                    />
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