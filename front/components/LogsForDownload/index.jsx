import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { baseUrl, logsForDownloadButton, logsForDownloadStatuses } from '../../common/config';
import { parseFullTime } from '../../common/utils';
import { getOwnAllForDownload, changeLogForDownload, changeForDownloadFilter, deleteForDownloadLog } from '../../store/actions/logs.actions'

export default connect((s) => ({
  user: s.user.state,
  allForDownload: s.logs.forDownload,
}), {
  getOwnAllForDownload,
  changeLogForDownload,
  changeForDownloadFilter,
  deleteForDownloadLog
})(
  ({
    CurrentLanguage_G,

    user,
    allForDownload,

    getOwnAllForDownload,
    changeLogForDownload,
    changeForDownloadFilter,
    deleteForDownloadLog
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allForDownload.state.length != allForDownload.all && CurrentPage == (allForDownload.state.length / 50) - 1)
        getOwnAllForDownload({
          status: allForDownload.filter.status == 'all' ? '' : allForDownload.filter.status,
          token: user.token,
          from: allForDownload.state.length
        })

    }

    useEffect(() => {
      getOwnAllForDownload({
        status: allForDownload.filter.status == 'all' ? '' : allForDownload.filter.status,
        token: user.token
      })
    }, [allForDownload.filter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allForDownloadPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allForDownloadPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.forDownload}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-3 pr-1 pl-1 col-md-12">
                        <div class="form-group">
                          <select class="custom-select" value={allForDownload.filter.status} onChange={e => changeForDownloadFilter({ name: 'status', value: e.target.value })}>
                            <option value={'all'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.showAll}</option>
                            <option value={'inProcess'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.inProcess}</option>
                            <option value={'complete'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.complete}</option>
                            <option value={'deleted'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.deleted}</option>
                            <option value={'cancelled'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.cancelled}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span className={'text-muted'}>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.show(((CurrentPage - 1) * 50) + 1, CurrentPage * 50, allForDownload.all)}</span>
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
                          pageCount={Math.ceil(allForDownload.all / 50)}
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
                          <th>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.logs}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.archives}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.status}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allForDownloadPage.date}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allForDownload.state.map((v, i) =>
                            i < CurrentPage * 50 && i >= (CurrentPage - 1) * 50
                              ? <tr key={i}>
                                <th scope="row">{v.id}</th>
                                <td className={'text-center'} style={{ maxWidth: '100px' }}>
                                  <div onClick={() => changeLogForDownload({ id: v.id, name: 'open', value: v.open ? false : true })} className="cursor-pointer d-inline-block border border-secondary rounded pt-1 pb-1 pr-2 pl-2">
                                    <i class="zmdi zmdi-account-box mr-2 text-secondary"></i>
                                    <span className={" text-secondary"}>Логи: {v.logs.length}</span>
                                  </div>
                                  {
                                    v.open
                                      ? <div className={'mt-2 border p-1 rounded'} style={{ overflowY: 'scroll', maxHeight: '100px' }}>
                                        {
                                          v.logs.map((lv, li) =>
                                            <Link
                                              className={'mr-1 ml-1'}
                                              key={li}
                                              to={{
                                                pathname: '/logs',
                                                state: {
                                                  id: lv.id
                                                }
                                              }}>{lv.id}</Link>
                                          )
                                        }
                                      </div>
                                      : null
                                  }

                                </td>
                                <td>
                                  {
                                    v.status != 'deleted' && v.status != 'cancelled'
                                      ? v.archives.map((av, ai) =>
                                        <a key={ai} href={`${baseUrl}${av.link}`} download>
                                          <button type="button" class="btn btn-primary">
                                            {av.name}
                                          </button>
                                        </a>
                                      )
                                      : <span className={'text-center'}>-</span>
                                  }
                                </td>
                                <td>
                                  <div className="d-flex flex-column">
                                    <div className="w-100 text-center mb-2">
                                      <span className={logsForDownloadStatuses[v.status].color}>{logsForDownloadStatuses[v.status][CurrentLanguage_G]}</span>
                                    </div>
                                    {
                                      v.status != 'deleted' && v.status != 'cancelled'
                                        ? <div className="w-100 text-center">
                                          <button onClick={() => confirm(logsForDownloadButton[v.status].ask[CurrentLanguage_G]) ? deleteForDownloadLog({ token: user.token, id: v.id, status: v.status }) : null} type="button" class="btn btn-danger mt-0 mb-0 h-100">
                                            <i class="zmdi zmdi-close mr-2"></i>{logsForDownloadButton[v.status][CurrentLanguage_G]}
                                          </button>
                                        </div>
                                        : null
                                    }
                                  </div>
                                </td>
                                <td>{parseFullTime(v.createdAt)}</td>
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